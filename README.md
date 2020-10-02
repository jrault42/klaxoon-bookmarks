
# klaxoon-bookmarks 

Application de gestion de bookmark pour ajouter des liens Vimeo et Flickr.

## Fonctionnement
 Pour récupérer klaxoon-bookmarks vous avez besoin de [git](https://git-scm.com/downloads).
 Pour faire fonctionner klaxoon-bookmarks vous avez besoin de [node/npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (version la plus récente).
 Si vous n'avez pas mongodb sur votre machine, vous avez également besoin de [docker](https://docs.docker.com/get-docker/) et [docker-compose](https://docs.docker.com/compose/install/).

### Installation
Une fois que vous avez installé, si besoin, git, npm, docker et docker-compose, vous pouvez récupérer le projet et le lancer :
- Dans un terminal, taper les commandes suivantes :
  - `git clone https://github.com/jrault42/klaxoon-bookmarks.git`
  - `cd klaxoon-bookmarks`

- Si vous n'avez pas mongodb sur votre machine, tapez également cette commande afin de lancer le docker mongo :
  - `docker-compose up -d`

- Ouvrir deux onglets de terminal pour pouvoir faire ces deux commandes en parallèle :
  - `cd backend && npm i && npm start`
  - `cd frontend && npm i && npm start`

- Une fois le "npm start" lancé sur les deux onglets, aller sur **http://localhost:3000** dans votre navigateur.

## Les exigences

    Frontend en React
    Backend en NodeJS 
    ne pas utiliser de générateur d'API tel que API Platform


Ces liens référencés ne pourront être que de 2 types :

    * vidéo (provenant de Vimeo)
    * photo (provenant de Flickr)

### Les propriétés communes d’un lien référencé sont :

    URL
    titre
    auteur
    date d'ajout

### Les liens de type video auront les propriétés spécifiques suivantes :

    largeur
    hauteur
    durée

### Les liens de type photo devront avoir en plus les propriétés :

    largeur
    hauteur

### Mots-clés
    Il est possible d’associer des mots-clés pour chaque lien référencé.

### oEmbed
La récupération des propriétés d’un lien référencé sont obtenues en utilisant le protocole ouvert oEmbed (http://oembed.com/).

### Visualisation :
* Pour visualiser et gérer ses liens référencés, l’utilisateur aura une vue principale sous forme de liste paginée avec un bouton d’ajout. 
* Chaque ligne du tableau doit avoir les informations communes et des liens pour **modifier** ou **supprimer** le lien.

### Modification
La page de modification du lien comporte un formulaire pour ajouter, modifier et supprimer les mots clés associé au lien.


### Livrable
=> Le livrable attendu est l’application sous forme de repository git ou package zip incluant les instructions d’installation.
