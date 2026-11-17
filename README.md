# Mosaïque

Site vitrine de Mosaïque, studio indépendant de création de sites web.

Site en ligne : https://mosaique-murex.vercel.app/

## Développement local

Le site est statique. Les fichiers publiés se trouvent dans `dist/` : `index.html`, `styles.css`, `script.js` et `assets/`.

Pour le prévisualiser localement, ouvrez `dist/index.html` dans un navigateur ou servez le dossier `dist` avec un serveur HTTP statique.

## Déploiement

Le projet Vercel utilise `dist` comme répertoire de sortie, sans étape de compilation. L’intégration GitHub publie automatiquement les changements poussés sur la branche `main`.
