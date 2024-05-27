# Stockage distribué avec GlusterFS : Chapitre 1 - Présentation du projet et wrapper go-glusterfs

## Présentation du projet

Dans l'article sur [Ceph](/article/CephCluster) et la mise en place d'un cluster de stockage distribué, nous avons vu
comment déployer un cluster Ceph sur plusieurs noeuds. Une alternative à Ceph, plus simple à déployer et à maintenir,
est [GlusterFS](https://www.gluster.org). Ce dernier vient avec un outil en ligne de commande `gluster` permettant de
déployer et de gérer le cluster. Un cluster GlusterFS est composé de plusieurs noeuds, appelés `bricks` pouvant être
représentées par la forme suivante : `node1:/data/brick1`, `node2:/data/brick2`, etc. Ici `node1` et `node2`
correspondent au nom des noeuds et `/data/brick1` et `/data/brick2` correspondent aux chemins des `bricks` sur les
noeuds. Les `volumes` sont ensuite créés à partir des bricks du cluster. Un volume peut enfin être monté dans un système
de fichier pour être utilisé.

Cependant, contrairement à Ceph, GlusterFS ne propose pas d'interface web comme Cephadm. Ce projet a donc pour but de
réaliser une interface web permettant de déployer et de gérer un cluster GlusterFS.

## Analyse des besoins et architecture

Afin de réaliser l'interface web il est nécessaire de définir l'architecture du projet. L'outil en ligne de
commande `gluster` étant assez transparent à la localisation (c'est à dire que son utilisation est plus ou moins
identique peu importe le noeud sur lequel il est executé), il est possible de déployer l'application sur chaque noeud du
cluster afin d'avoir une haute disponibilité.

L'interface web ayant besoin d'accéder à l'outil `gluster`, il est nécessaire de déployer un wrapper permettant
d'exposer les fonctionnalités de `gluster` via une API. Ce wrapper sera divisé en 2 parties :

- Une partie serveur exposant une API REST
- Une partie wrapper de l'outil `gluster`

Ce wrapper sera développé en Go, il s'agit ici d'un choix personnel afin de me former sur ce langage.

Enfin, l'interface web sera développée avec Svelte avec Vite. Encore une fois, ce choix n'a pas d'importance, il s'agit
à nouveau d'un choix dans le but de me familiariser avec cet outil.

Afin de simplifier le déploiement de l'application (et le développement), l'ensemble des services seront déployés dans
des conteneurs Docker sur chaque noeud avec Docker Swarm. Ainsi chaque noeud du cluster sera capable de déployer
l'application dans des conteneurs identiques permettant de simplifier le wrapper pour ne répondre qu'au besoin de ce
projet. Cependant le wrapper étant indépendant de l'API REST, il sera possible de le faire évoluer pour répondre à
d'autres besoins.

## Wrapper go-glusterfs

Dans la première partie de ce projet sera présenté le développement du
wrapper [go-glusterfs](https://github.com/Yaon-C2H8N2/go-glusterfs).

### Fonctionnement

Le wrapper est séparé en 3 packages :

- brick : Contient les fonctions permettant de gérer les bricks et les modèles de données pour représenter les bricks.
- volume : Contient les fonctions permettant de créer, supprimer et lister les volumes. Les volumes sont représentés par
  un modèle composé d'un nom, d'un type, d'un status et d'une liste de bricks.
- peer : Contient les fonctions permettant de gérer les peers du cluster. Les peers sont représentés par un modèle
  composé d'un UUID, d'une adresse IP/Hostname et d'un status.

### Intégration continue

Afin de garantir le fonctionnement du wrapper, un environnement d'intégration continue a été mis en place.
L'environnement déploie automatiquement un environnement temporaire composé de 3 noeuds sous forme de conteneurs Docker
permettant ainsi d'exécuter les tests unitaires.

```yaml
name: Unit tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Running test env
        run: docker compose up -d
      - name: Setting up test cluster
        run: |
          docker compose exec node1 mkdir -p /mnt/brick1/brick
          docker compose exec node2 mkdir -p /mnt/brick1/brick
          docker compose exec node3 mkdir -p /mnt/brick1/brick
      - name: Running tests
        run: docker compose exec node1 bash -c "cd /app/test && go test -v"
      - name: Stopping test env
        run: docker compose down
```

> Workflow GitHub Actions pour les tests unitaires

### Fonctionnalités

Le wrapper permet de gérer les bricks, les volumes et les peers du cluster. Voici un exemple d'utilisation du wrapper :

```go
package main

import (
	"go-glusterfs.yaon.fr/pkg/brick"
	"go-glusterfs.yaon.fr/pkg/peer"
	"go-glusterfs.yaon.fr/pkg/volume"
)

func main() {
	//Probing nodes 2 and 3
	hostnameList := []string{"node2", "node3"}
	for _, hostname := range hostnameList {
		err := peer.PeerProbe(hostname)
		if err != nil {
			panic(err)
		}
	}

	//Creating bricks for each nodes in the pool
	peers, err := peer.ListPeers()
	var bricks []brick.Brick
	if err != nil {
		panic(err)
	}
	for _, p := range peers {
		bricks = append(bricks, brick.Brick{
			Peer: p,
			Path: "/data/brick1",
		})
	}
	
	//Creating a volume with the bricks
	v, err := volume.CreateReplicatedVolume("test-volume", bricks)
	if err != nil {
        panic(err)
    }
	err = v.Start()
	if err != nil {
        panic(err)
    }
}
```

> Exemple d'utilisation du wrapper

Dans cet exemple, le wrapper va sonder les noeuds `node2` et `node3` pour les ajouter au cluster. Ensuite, il va créer
un volume répliqué nommé `test-volume` avec les bricks `/data/brick1` de chaque noeud. Enfin, le volume est démarré.

## Conclusion

Maintenant que l'outil `gluster` est utilisable via un module Go, on peut maintenant passer à la seconde partie du
projet : développer l'interface web et l'API REST permettant de gérer un cluster GlusterFS. Cette partie sera détaillée
dans le chapitre 2 de ce projet.