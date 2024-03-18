# Serveur de démo + portfolio

Ce portfolio est hébergé sur un serveur hébergeant également une démo de l'application Snoopy. Afin d'expérimenter avec
le déploiement d'une application dans un environnement de production, des solutions de monitoring ont également été
mises en place. De plus, pour cloisonner chacune des applications hébergées, tous les services sont installés avec
Docker.

***

### Snoopy + Snoopy Beta

Afin d'agir comme un serveur de démo/pre-prod, une instance de Snoopy sur la dernière version stable ainsi qu'une
instance de Snoopy sur la dernière version beta sont hébergées sur ce serveur. Elles sont déployées et mis à jour via
Docker.

***

### Monitoring

Pour la partie monitoring du serveur, un conteneur Prometheus est déployé ainsi qu'un Node Exporter. Un conteneur
Grafana est également déployé pour visualiser les métriques collectées par Prometheus. (Voir
la [page publique](https://monitoring.yaon.fr) de monitoring)

***

### Gestion des conteneurs Docker

Un conteneur Portainer est déployé sur le serveur afin de gérer à l'aide d'une interface web les différents conteneurs
déployés sur le serveur.

***

### Reverse-proxy Nginx

Tous les services hébergés sur le serveur sont exposés via un reverse-proxy Nginx déployé également à l'aide d'un
conteneur Docker. Ainsi chaque service est accessible via un sous-domaine de [yaon.fr](https://yaon.fr). Cela permet de
sécuriser chacun des services via HTTPS grâce à un seul et unique certificat SSL.