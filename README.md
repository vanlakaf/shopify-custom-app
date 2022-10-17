# Test sur Shopify

## Product catalogue management

    - credentials: { username: "username", password: "password" }
	- variables d'environnements: ACCESS_KEY=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
	
L'application se démarre depuis la CLI de node avec la commande "npm run dev" lancée depuis le dossier du projet.
Inclure les variables d'environnement dans un fichier .env à la racine du dossier du projet.
Pour acceder à l'espace, il faut se rendre sur http://localhost:3032/client
Une redirection sera faite sur le chemin /not-auth, où vous serez invité à vous connecter. 
Utilisez les credentials ci-dessus pour vous y connecter.

Une fois l'interface ouverte, vous pouvez acceder aux produits du store vaneck-store.myshopify.com

En tant qu'admin, vous pouvez, depuis l'interface:
	- afficher la liste des produits
	- editer un produit
	- supprimer un produit
	- ajouter un produit (titre et description)

