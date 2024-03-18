# Snoopy

Snoopy est une application web permettant l'édition de bon au format PDF. Elle permet la saisie d'intervention dans un
formulaire et génère à partir des données renseignées le bon correspondant. Les précèdents bons sont consultables et
peuvent également être envoyés depuis l'application par mail au client.

Une interface d'administration permet de gérer les utilisateurs, les clients, les interventions et les paramètres de
l'application.

Vous pourrez trouver une version de démonstration de l'application sur [snoopy.yaon.fr](https://snoopy.yaon.fr). Les
identifiants pour se connecter sont `admin` et `admin`. La base de données est réinitialisée toutes les nuits.

***

### Stack technique

- React w/ Vite.js
- Java w/ Spring Boot
- PostgreSQL
- Docker

La philosophie derrière le développement de ce projet était de limiter au plus l'adhérence système. L'application est
donc entièrement livrable avec Docker. Elle est découpée en 4 services :

- `snoopy-api` : Conteneur Alpine Linux avec l'application Spring Boot
- `snoopy-db` : Conteneur PostgreSQL
- `snoopy-client` : Conteneur nginx servant le front React
- `gotenberg` : Service faisant la conversion XLSX -> PDF des bons d'intervention

***

### Génération des PDF

La librairie [Apache POI](https://poi.apache.org/) est utilisée pour la génération des PDF. Elle permet de lire et
d'éditer des fichiers XLSX dans ce cas précis. Lorsqu'un bon d'intervention est généré, le fichier XLSX est rempli avec
les données saisies par l'utilisateur puis converti en PDF par le
service [gotenberg](https://github.com/gotenberg/gotenberg).

Les fichiers sont générés à la volée à l'aide d'un template, ainsi les rapport ne sont pas stockés sur le serveur.
Cependant vu que les données saisies sont sauvegardées en base, il est possible de les regénérer à tout moment.

Comme précisé plus tôt, un conteneur [gotenberg](https://github.com/gotenberg/gotenberg) est utilisé pour la conversion
des fichiers. Il s'agit d'un service
sous forme d'API REST qui permet de convertir des fichiers en PDF. Dans ce cas précis il est utilisé pour la conversion
des fichiers XLSX en PDF.