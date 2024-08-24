# Stockage distribué avec GlusterFS : Chapitre 2 - Création de l'API REST et de la WebUi pour la gestion de GlusterFS.

> Cet article fait suite à la [présentation du projet](/articles/GoGlusterFs) ainsi
> que [du wrapper développé pour le projet](https://github.com/Yaon-C2H8N2/go-glusterfs).

## Ajout d'une API d'évènements au wrapper

Afin de pouvoir remonter les derniers évènements du cluster (que ça soit en direct ou sous forme d'historique), une API
d'évènement a été mise en place dans le wrapper. Son fonctionnement est relativement simple :

```go
import "github.com/Yaon-C2H8N2/go-glusterfs/pkg/eventListener"

func main() {
	glusterEventListener := eventListener.Default()
	glusterEventListener.SetPollingTimeout(100)
	
	onPeerUpdate := func(event eventListener.PeerEvent) {
		fmt.Printf("Peer event: %v\n", event)
		//code à executer lors de la réception d'un évènement Peer
	}
	onVolumeUpdate := func(event eventListener.VolumeEvent) {
		fmt.Printf("Volume event: %v\n", event)
		//code à executer lors de la réception d'un évènement Volume
	}
	listener.OnPeerUpdate = onPeerUpdate
	listener.OnVolumeUpdate = onVolumeUpdate
	
	
	err := glusterEventListener.Start()
	if err != nil {
		panic(err)
	}
}
```

Dans cet exemple, on crée un `eventListener` avec une timeout de 100ms. On définit ensuite deux fonctions `onPeerUpdate`
et `onVolumeUpdate` qui seront appelées lors de la réception d'un évènement Peer ou Volume. Enfin, on démarre l'écoute
des évènements.

Le fonctionnement de cet `eventListener` met parfaitement en évidence une mécanique propre à Go : les goroutines. En
effet, la fonction `Start` est une boucle appelant à chaque itération, sous forme de gouroutine, les fonctions
permettant de récupérer les informations sur les volumes, bricks et peers du cluster et les compare avec les valeurs de
l'itération précédente. Ainsi à chaque changement, les fonctions de callback `OnPeerUpdate` et `OnVolumeUpdate` sont
appelées. L'exécution sous forme de goroutine permet de ne pas bloquer le reste du programme et de paralleliser les
comparaisons à effectuer pour détecter les changements.

## Création de l'API REST

L'API REST a été développée en utilisant le framework Gin. Elle est composée de 3 services :

- L'endpoint permettant de créer une connexion websocket pour écouter les évènements du cluster
- Les endpoints relatifs aux peers
- Les endpoints relatifs aux volumes

## Conception de la WebUi

![image](https://github.com/Yaon-C2H8N2/glusterfs-webui/raw/main/resources/img/screen_peers_list.png)
> Liste des peers du cluster

![image](https://github.com/Yaon-C2H8N2/glusterfs-webui/raw/main/resources/img/screen_peer_detail.png)
> Détail d'un peer

![image](https://github.com/Yaon-C2H8N2/glusterfs-webui/raw/main/resources/img/screen_volumes_list.png)
> Liste des volumes du cluster

![image](https://github.com/Yaon-C2H8N2/glusterfs-webui/raw/main/resources/img/screen_volume_detail.png)
> Détail d'un volume

![image](https://github.com/Yaon-C2H8N2/glusterfs-webui/raw/main/resources/img/screen_volume_creation.png)
> Création d'un volume

## Déploiement

Comme abordé dans l'introduction du projet, ce dernier est déployé dans des conteneurs Docker sur chaque noeud du
cluster avec Docker Swarm.

L'image d'un noeud du cluster est construite à partir du Dockerfile suivant :

```Dockerfile
FROM node:22-alpine as bundler

WORKDIR /tmp/app

COPY client/ /tmp/app

RUN npm ci && npm run build

FROM golang:1.22 as builder

WORKDIR /tmp/app

COPY api/ /tmp/app

RUN go mod tidy && go mod download && go build -o /tmp/app/dist/api

FROM debian:stable-slim
LABEL authors="yaon"

WORKDIR /root

RUN apt update &&\
    apt install -y glusterfs-server golang nginx

COPY --from=bundler /tmp/app/dist /var/www/html
COPY --from=builder /tmp/app/dist/api /usr/local/bin/api

COPY docker/etc/nginx/sites-available/glusterfs_webui /etc/nginx/sites-available/glusterfs_webui
RUN ln -s /etc/nginx/sites-available/glusterfs_webui /etc/nginx/sites-enabled/glusterfs_webui

RUN echo "#!/bin/sh" > start.sh &&\
    echo "glusterd -N &" >> start.sh &&\
    echo "nginx -g 'daemon off;' &" >> start.sh &&\
    echo "/usr/local/bin/api >> /var/log/glusterfs_webui.log 2>&1 &" >> start.sh &&\
    echo "tail -f /var/log/nginx/access.log >> /var/log/glusterfs_webui.log 2>&1 &" >> start.sh &&\
    echo "tail -f /var/log/glusterfs_webui.log" >> start.sh &&\
    chmod +x start.sh

EXPOSE 8080 8081

ENTRYPOINT ["sh", "start.sh"]
```

> Ce Dockerfile permet de construire une image contenant un noeud GlusterFS, un serveur web Nginx pour servir l'interface
> web et l'API REST en Go.

Enfin pour déployer l'application avec Docker Swarm, une stack est définie dans un fichier `docker-compose.yml` :

```yaml
version: "3.2"
services:
  node1:
    image: ghcr.io/yaon-c2h8n2/glusterfs-webui:${GLUSTERFS_WEBUI_VER}
    privileged: true
    environment:
      - GLUSTERFS_NODE_NAME=swarm-node1
    deploy:
      placement:
        constraints:
          - node.hostname==swarm-node1
    volumes:
      - node1:/mnt/glusterfs
    restart: unless-stopped

  node2:
    image: ghcr.io/yaon-c2h8n2/glusterfs-webui:${GLUSTERFS_WEBUI_VER}
    privileged: true
    environment:
      - GLUSTERFS_NODE_NAME=swarm-node2
    deploy:
      placement:
        constraints:
          - node.hostname==swarm-node2
    volumes:
      - node2:/mnt/glusterfs
    restart: unless-stopped
    
  node3:
    image: ghcr.io/yaon-c2h8n2/glusterfs-webui:${GLUSTERFS_WEBUI_VER}
    privileged: true
    environment:
      - GLUSTERFS_NODE_NAME=swarm-node3
    deploy:
      placement:
        constraints:
          - node.hostname==swarm-node3
    volumes:
      - node3:/mnt/glusterfs
    restart: unless-stopped

volumes:
  node1:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: /mnt/glusterfs

  node2:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: /mnt/glusterfs
      
  node3:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: /mnt/glusterfs
```