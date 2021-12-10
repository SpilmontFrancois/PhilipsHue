# Installation

## Identification Hue
Aller sur la page https://discovery.meethue.com/

Elle donne l'adresse IP du Hue Bridge

## Creation d'un user
Aller sur la page `https://{IP_HUE_BRIDGE}/debug/clip.html`

C'est un outil de debug

Saisir l'URL `/api` avec en body `{"devicetype":"my_hue_app#iphone peter"}` (nom et appareil customizables)

Appuyer sur le bouton de votre Hue Bridge

Envoyer la requête en cliquant sur `POST`

Copier le nom d'utilisateur renvoyé par l'API


## .ENV
HUE_BRIDGE_IP => IP du Hue Bridge

HUE_USERNAME => nom d'utilisateur renvoyé par l'API
