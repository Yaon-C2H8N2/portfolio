# Github Actions Artifacts

Les github actions sont des outils très puissants pour automatiser les processus d'intégration continue et de
déploiement continu. Un avantage (et aussi inconvénient majeur) de ces actions est qu'elles sont exécutées dans des
environnements isolés les unes des autres. Cela pose en effet un problème dans le cadre d'un déploiement effectué en
plusieurs étapes (Exemple: build d'une API et d'un client dans la première action, puis déploiement dans une seconde
action).

***

### Artifacts

Pour résoudre ce problème, Github propose
les [artifacts](https://docs.github.com/en/actions/guides/storing-workflow-data-as-artifacts), une action permettant
d'uploader des fichiers depuis une action, agissant comme un cache, pouvant ensuite être téléchargés depuis une autre
action.

***

### Upload d'un fichier/dossier en tant qu'artifact

Afin d'uploader un fichier ou un dossier en tant qu'artifact, il suffit d'utiliser l'
action [actions/upload-artifact](https://github.com/actions/upload-artifact) en spécifiant un nom et un chemin. Ici tout
le contenu du dossier `cache/docker` sera uploadé en tant qu'artifact avec le nom `docker-image` et aura une durée de
vie de 1 jour.

```yml
steps:
  - name: Caching the docker image
    uses: actions/upload-artifact@v2
    with:
      name: docker-image
      path: cache/docker
      retention-days: 1
```

***

### Download d'un artifact

Le téléchargement d'un artéfact se fait d'une manière similaire à l'upload. Il suffit d'utiliser l'
action [actions/download-artifact](https://github.com/actions/download-artifact) en spécifiant le nom de l'artifact à
télécharger. Ici le contenu de l'artifact `docker-image` sera téléchargé dans le dossier `cache/docker`.

```yml
steps:
  - name: Retrieve the cached docker images
    uses: actions/download-artifact@v2
    with:
      name: docker-image
      path: cache/docker
```

***

### Exemple d'utilisation

Voici un exemple d'utilisation des artifacts pour un workflow de build et de push d'images Docker. Dans ce workflow,
deux images sont build dans deux jobs simultanément puis sont stockées dans un artifact. Un troisième job s'exécutant
uniquement si les deux premiers ont réussi, récupère les images depuis l'artifact et les push sur le Github Registry.

```yml
name: Example Docker Image Build

on:
  pull_request:
    branches:
      - '**'

jobs:
  build-api:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Building the API Docker image
        run: |
          docker build ./api/ --tag ghcr.io/${{ secrets.USERNAME }}/app-api:latest
          mkdir -p cache/docker
          docker save ghcr.io/${{ secrets.USERNAME }}/app-api:latest > cache/docker/app-api-latest.tar

      - name: Caching the docker image
        uses: actions/upload-artifact@v2
        with:
          name: docker-image
          path: cache/docker
          retention-days: 1

  build-client:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Building the client Docker image
        run: |
          docker build ./client/ --tag ghcr.io/${{ secrets.USERNAME }}/app-client:latest
          mkdir -p cache/docker
          docker save ghcr.io/${{ secrets.USERNAME }}/app-client:latest > cache/docker/app-client-latest.tar

      - name: Caching the docker image
        uses: actions/upload-artifact@v2
        with:
          name: docker-image
          path: cache/docker
          retention-days: 1

  push-images:
    needs: [ build-api, build-client ]
    runs-on: ubuntu-latest

    steps:
      - name: Retrieve the cached docker images
        uses: actions/download-artifact@v2
        with:
          name: docker-image
          path: cache/docker

      - name: Push the Docker images to the ghcr.io registry
        working-directory: cache/docker
        run: |
          docker login ghcr.io -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.GITHUB_TOKEN }}
          docker load -i app-api-latest.tar
          docker load -i app-client-latest.tar
          docker push ghcr.io/${{ secrets.USERNAME }}/app-api:latest
          docker push ghcr.io/${{ secrets.USERNAME }}/app-client:latest
```