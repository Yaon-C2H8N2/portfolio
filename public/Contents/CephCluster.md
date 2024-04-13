# Calcul et stockage distribué au sein d'un cluster

Il existe deux grandes manières pour étendres les capacités d'un système :

- L'ajout de ressources (CPU, RAM, stockage) au sein d'un même système (scalabilité verticale)
- L'ajout de plusieurs systèmes pour répartir la charge (scalabilité horizontale)

L'avantage de la scalabilité verticale est sa simplicité de mise en place (un seul système monolithique) mais elle a des
limites en terme de coût et de performance. En effet, les performances maximales du système sont liées à la puissance
des
composants utilisés. De plus, une fois ce système déployé en production, il devient délicat si ce
n'est impossible d'en améliorer les capacités sans devoir arrêter le service.

Le but de ce projet est d'explorer les possibilités de la scalabilité horizontale en crééant un cluster à base de
mini-PC et en y déployant un système de stockage distribué : Ceph.

## Mise en place du cluster

Tout d'abord il est nécessaire de mettre en place le cluster. L'objectif étant sur le long terme d'avoir un cluster
multi-rôle sur lequel rapidement mettre en place de nouveaux services, l'utilisation de Machines Virtuelles/Conteneurs
à l'aide d'un hyperviseur de type 1 comme Proxmox est la meilleure solution car elle offre plus de flexibilité et permet
de rapidement migrer une VM/Conteneur d'un noeud à l'autre en cas de besoin.

### Proxmox

Proxmox est un système d'exploitaiton/hyperviseur open source basé sur Debian ayant pour but de gérer des machines
virtuelles ainsi que des conteneurs LXC. En installant Proxmox sur chacun des noeuds, il devient possible de les gérer
depuis une interface web.

![image](https://raw.githubusercontent.com/Yaon-C2H8N2/portfolio/main/public/assets/CephCluster/proxmox_interface.png)

Ici nous avons 2 noeuds Proxmox :

- Le noeud 1 hébergeant 2 VMs : ceph-node1 et ceph-node2
- Le noeud 2 hébergeant 2 VMs : ceph-node3 et ceph-node4

Ici plusieurs noeuds Ceph sont déployés sur un même noeud Proxmox pour des raisons de simplicité.

## Installation de Ceph

Il existe plusieurs méthodes pour installer et déployer un cluster Ceph. La méthode la plus simple et la plus rapide est
l'utilisation de Cephadm, un outil permettant de déployer un cluster Ceph en quelques commandes. Une fois installé,
Cephadm expose également une interface web permettant de gérer le cluster.

### Installation de Cephadm

Tout d'abord il est nécessaire d'installer Cephadm sur un noeud (ici ceph-node1) :

```shell
apt update
apt install cephadm
```

Une fois Cephadm installé, le premier noeud peut être initialisé en passant l'adresse IP du noeud :

```shell
cephadm bootstrap --mon-ip 192.168.1.XXX
```

Une fois l'initialisation terminée, les identifiants de connexion à l'interface web sont affichés. Cependant, pour
continuer le déploiement du cluster, Cephadm se connectera en SSH sur les noeuds. Il faut donc ajouter la clé SSH
générée sur les autres noeuds.

#### Préparation des autres noeuds

Une fois le premier noeud initialisé, Cephadm génère une clé SSH qui sera utilisée pour l'ajout des autres noeuds. Il
est donc nécessaire de copier cette clé sur les autres noeuds du cluster.

```shell
ssh-copy-id -f -i /etc/ceph/ceph.pub root@192.168.1.YYY
```

De plus, Cephadm utilise des conteneurs pour déployer les différents modules de Ceph, il est donc nécessaire d'installer
Podman ou Docker sur les différents noeuds. Ici nous utiliserons Podman. Un utilitaire comme `lvm2` est également
nécessaire pour la gestion des volumes logiques par Ceph.

```shell
apt install podman lvm2
```

> Répéter ces opérations pour chaque noeud du cluster

#### Ajout des noeuds

Une fois les noeuds préparés, il est possible de se connecter à l'interface web de Cephadm pour ajouter les noeuds au
cluster.

![image](https://raw.githubusercontent.com/Yaon-C2H8N2/portfolio/main/public/assets/CephCluster/ceph_node_add.png)

Une fois les noeuds ajoutés, il est maintenant possible de créer les Object Storage Daemons (OSD). Les OSD sont les
noeuds de stockage du cluster, ils sont responsables de la gestion des disques et de la réplication des données. Pour
ajouter un OSD, il est nécessaire de sélectionner un disque sur le noeud et de l'ajouter à un OSD. Cephadm se chargera
ensuite de formater le disque et de l'ajouter au cluster.

![image](https://raw.githubusercontent.com/Yaon-C2H8N2/portfolio/main/public/assets/CephCluster/add_osd.png)

## Conclusion

Le cluster Ceph est maintenant opérationnel. Il est possible de créer des pools de stockage, des systèmes de fichiers et
de mettre en place la réplication/répartition des données. L'avantage de cette solution est la possibilité d'étendre le
stockage en ajoutant simplement des noeuds au cluster. Cependant, il est nécessaire de bien comprendre le fonctionnement
de Ceph pour éviter des erreurs de configuration qui pourraient mener à la perte de données.

Dans ce cas précis, le cluster Ceph est utilisé comme un NAS distribué. Il utilise chaque noeuds pour étendre sa
capacité de stockage total. Ce n'est pas la seule utilisation possible. En effet Proxmox par exemple permet depuis
l'interface web de rapidement mettre en place un cluster Ceph permettant de répliquer les données des VMs sur plusieurs
noeuds permettant une migration à chaud des VMs en cas de panne d'un noeud.