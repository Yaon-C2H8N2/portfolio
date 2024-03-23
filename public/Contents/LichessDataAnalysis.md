# Analyse de données Lichess.org

### Introduction

Lichess.org est un site web de jeu d'échecs en ligne. Il propose de jouer en temps réel contre d'autres joueurs, de
suivre des tournois, de regarder des parties de joueurs professionnels, de résoudre des problèmes tactiques, etc. Est
également mis à disposition publiquement une base de données de parties jouées sur le site, mise à jour tous les mois et
[téléchargeable gratuitement ici](https://database.lichess.org).

Cet article est une adaptation du compte-rendu d'un projet universitaire de seconde année de Licence réalisé avec
Corentin Diehl en 2022 dont l'objectif était de mettre en évidence les mécanismes des systèmes d'exploitation (
ordonnancement, gestion de la mémoire, gestion de la concurrence, etc) au travers d'un programme Java sans framework
traitant les données de parties d'échecs de Lichess.org. L'objectif du projet était initialement de traiter les données
du mois de Juillet 2013 (43 Mo compressé) et finalement étendu à l'ensemble des données disponibles (plus de 10 To
décompressé).

### Analyse fonctionnelle

L’objectif est de traiter une base de données recensant toutes les parties d’échec du
site [lichess.org](https://lichess.org/).
Chaque fichier contient toutes les parties d’un mois dans un format spécifique (.pgn qui est un format de codage pour
les parties d’échecs). Le but est d’extraire les données de chaque fichier et d’y effectuer des recherches simples.

Un des objectifs principaux que l'on s’était fixé était de traiter l’entièreté de la base de donnée fournie ce qui
posait donc notre premier problème auquel on devait faire face : le volume de données présent (environ 10 To de données
une fois décompressé). Dû à une limitation matérielle (simple disque dur), on faisait face dans un premier temps à la
quasi
impossibilité de paralléliser la lecture d’un fichier (la tête de lecture du disque dur ne pouvant être qu’à un endroit
à la fois). De plus dans une lecture séquentielle du fichier, la vitesse d’extraction des données est de facto limitée
par la vitesse de lecture étant donné que le programme lirait une partie puis en extrairait les informations avant de
passer à la partie suivante.

Second problème et non pas des moindres, dû au volume de données, peu importe le type de recherche souhaitée, le temps
avant la production d’un quelconque résultat serait extrêmement long si on faisait nos recherches directement sur les
fichiers .pgn. (Sans le savoir au moment de la réalisation du projet, nous avons plus ou moins reproduit les mécanismes
au sein des Systèmes de Gestion de Base de Données (SGBD)).

### Conception

#### Lecture des fichiers .pgn

Au moment de la réalisation de ce projet, les fichiers .pgn avaient des formats différents entre ceux de 2013 et ceux de
2022, l'extraction des données ne pouvait donc pas se faire selon un pattern fixe. Étant donné la longueur variable
d’une
partie dans le fichier, nous avons dû repérer un paterne récurrent afin de retrouver la fin d’une partie :

- Une ligne blanche
- La liste des coups joués
- Une ligne blanche

Nous pouvons donc maintenant repérer la fin d’une partie juste en comptant le nombre de ligne blanches en lisant le
fichier ligne par ligne. Si ce compteur vaut 2 alors une partie a été complètement lue et le compteur est réinitialisé.
Chaque ligne lue est ajoutée à une chaîne de caractère qui, une fois une partie lue, est envoyée dans un premier
tampon afin de limiter les accès conccurents au tampon de communication avec les threads d'extraction des données
améliorant grandement la vitesse de lecture.

Nous pouvons voir ici un schéma producteur/consommateur se dessiner :

- Le producteur lit les fichiers .pgn et les envoie dans un tampon
- Les consommateurs lisent les données du tampon et les traitent

La lecture des fichiers étant plus rapide que le traitement des données, il faudra donc créer plusieurs threads de
traitement des données pour ne pas se retrouver avec un tampon plein et bloquer la lecture des fichiers.

#### Extraction des données

Les threads d'extraction des données retirent plusieurs parties à la fois du tampon de communication afin de les stocker
dans leur tampon interne. Comme pour le thread de lecture, ce système de tampon interne diminue les accès synchronisés
au tampon et accélère grandement la vitesse de lecture. Chaque partie est alors lue ligne par ligne, interprétée grâce
aux balises au début de chaque ligne et les informations sont désérialisée dans un objet Java puis stockées dans des
tables de hashages internes aux threads. Une fois la lecture d'un fichier fini, le tampon de communication et les
tampons internes des threads d'extraction vides, les données des tables de hashage sont fusionnées et sont utilisées
pour écrire les fichiers d'indexation.

#### Indexation des données

Plusieurs fichiers d'indexation sont créés après l'extraction des données d'un fichier .pgn. L'index le plus important
ici est celui concernant les joueurs : il contient le nom des joueurs avec les octets de départ de toute leurs parties
dans le fichier .pgn. Leur nombre de parties y est également renseigné afin de faire une recherche rapide sur les
joueurs les plus actifs. Enfin un autre index est également créé contenant les ouvertures jouées pendant un mois ainsi
que leur nombre d'occurence pour faire une recherche rapide sur les ouvertures les plus jouées. Tous ces fichiers
permettent de réduire considérablement le temps de traitement des requêtes.

### Conclusion

Pour entamer cette conclusion, il est important de rappeler le contexte de la réalisation de ce projet :
Nous étions 2 étudiants en seconde année de Licence Informatique, le but du projet était de reproduire les mécanismes
des systèmes d'exploitation (ici les programmes sont représentés par les threads, la mémoire par les tampons, etc) et ce
uniquement avec les connaissances étudiées en cours. Nous n'avions donc pas connaissance des SGBD et de leur
fonctionnement.

Au moment où j'ecris cette conclusion, je suis en Master Informatique spécialité Base de Données et Intelligence
Artificielle et je réalise que, sans le savoir à l'époque, nous avions reproduit les mécanismes des SGBD. En effet, les
fichiers d'indexation (que nous appelions des .dat à ce moment là) ont un comportement analogue aux index des SGBD.

Enfin, ce projet nous a permis de mettre en pratique nos connaissances en programmation concurrente, notre compréhension
du fonctionnement des systèmes d'exploitation et de nous familiariser avec la manipulation de données massives.

Le code source du projet est disponible sur [GitHub](https://github.com/Yaon-C2H8N2/info4b_project) (à consulter en
gardant en tête que nous ne connaissions aucune convention de nommage, de design pattern, etc à l'époque).

### Remerciements

Merci Coco pour ce projet, aujourd'hui encore je me prends une claque avec le recul sur le boulot qu'on a fait. J'ai
rarement autant apprécier travailler sur un projet que celui là.