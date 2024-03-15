# Snoopy

Snoopy est une application web permettant l'édition de bon au format PDF. Elle permet la saisie d'intervention dans un
formulaire et génère à partir des données renseignées le bon correspondant. Les précèdents bons sont consultables et
peuvent également être envoyés depuis l'application par mail au client.

Une interface d'administration permet de gérer les utilisateurs, les clients, les interventions et les paramètres de
l'application.

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