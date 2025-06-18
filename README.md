# PlantNet

Une application web de gestion de plantes connectées pour surveiller et prendre soin de vos plantes.

## Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [API](#api)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Présentation

PlantNet est une application web complète pour gérer vos plantes d'intérieur et d'extérieur. Grâce à cette application, vous pouvez suivre les besoins de vos plantes, recevoir des alertes, et planifier vos tâches d'entretien. L'application est conçue pour fonctionner avec des capteurs IoT, mais peut également être utilisée de manière autonome.

## Fonctionnalités

- **Gestion des plantes** : Ajoutez, modifiez et supprimez vos plantes avec des informations détaillées (espèce, famille, besoins en eau et lumière, etc.).
- **Tableau de bord** : Vue d'ensemble de l'état de vos plantes et des tâches à venir.
- **Calendrier d'entretien** : Planifiez et suivez vos tâches d'arrosage, fertilisation, rempotage et taille.
- **Système d'alertes** : Recevez des notifications lorsque vos plantes ont besoin d'attention.
- **Données de capteurs** : Intégration avec des capteurs IoT pour surveiller l'humidité du sol, la température, la luminosité et l'humidité de l'air.
- **Gestion des utilisateurs** : Système d'authentification pour sécuriser vos données.

## Technologies utilisées

### Backend
- Node.js
- NestJS
- TypeORM
- MySQL / MariaDB
- JWT pour l'authentification
- Validation des données avec class-validator

### Frontend
- Vue.js 3
- Tailwind CSS
- Vue Router
- Fetch API pour les requêtes HTTP

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- MySQL ou MariaDB

### Étapes d'installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-nom/plantnet.git
cd plantnet
```

2. Installez les dépendances du backend :
```bash
cd backend
npm install
```

3. Installez les dépendances du frontend :
```bash
cd ../frontend
npm install
```

4. Configurez la base de données :
   - Créez une base de données MySQL
   - Copiez le fichier `.env.example` en `.env` dans le dossier `backend`
   - Modifiez les informations de connexion à la base de données dans le fichier `.env`

5. Exécutez les migrations de base de données :
```bash
cd ../backend
npm run migration:run
```

## Démarrage

### Démarrer le backend
```bash
cd backend
npm run start:dev
```
Le serveur backend sera disponible à l'adresse : http://localhost:3006

### Démarrer le frontend
```bash
cd frontend
npm run serve
```
L'application frontend sera disponible à l'adresse : http://localhost:8080

## Structure du projet

```
plantnet/
├── backend/                 # Code source du backend NestJS
│   ├── src/
│   │   ├── alerts/          # Module de gestion des alertes
│   │   ├── auth/            # Module d'authentification
│   │   ├── plants/          # Module de gestion des plantes
│   │   ├── scheduled-tasks/ # Module de gestion des tâches
│   │   ├── sensor-data/     # Module de gestion des données capteurs
│   │   ├── users/           # Module de gestion des utilisateurs
│   │   ├── app.module.ts    # Module principal de l'application
│   │   └── main.ts          # Point d'entrée de l'application
│   ├── test/                # Tests
│   └── package.json         # Dépendances du backend
├── frontend/                # Code source du frontend Vue.js
│   ├── public/              # Ressources statiques
│   ├── src/
│   │   ├── assets/          # Images et ressources
│   │   ├── components/      # Composants Vue réutilisables
│   │   ├── layouts/         # Mises en page
│   │   ├── router/          # Configuration du routeur
│   │   ├── views/           # Composants de pages
│   │   ├── App.vue          # Composant racine
│   │   └── main.js          # Point d'entrée du frontend
│   └── package.json         # Dépendances du frontend
└── README.md                # Ce fichier
```

## API

### Authentification

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion d'un utilisateur

### Plantes

- `GET /api/plants` - Récupérer toutes les plantes de l'utilisateur connecté
- `GET /api/plants/:id` - Récupérer une plante spécifique
- `POST /api/plants` - Créer une nouvelle plante
- `PUT /api/plants/:id` - Mettre à jour une plante
- `DELETE /api/plants/:id` - Supprimer une plante

### Alertes

- `GET /api/alerts` - Récupérer toutes les alertes
- `GET /api/alerts/plant/:id` - Récupérer les alertes d'une plante
- `GET /api/alerts/plant/:id/active` - Récupérer les alertes actives d'une plante
- `POST /api/alerts` - Créer une nouvelle alerte
- `PUT /api/alerts/:id` - Mettre à jour une alerte
- `DELETE /api/alerts/:id` - Supprimer une alerte

### Tâches d'entretien

- `GET /api/tasks` - Récupérer toutes les tâches
- `GET /api/tasks/plant/:id` - Récupérer les tâches d'une plante
- `GET /api/tasks/plant/:id/pending` - Récupérer les tâches en attente d'une plante
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

### Données des capteurs

- `GET /api/sensor-data` - Récupérer toutes les données des capteurs
- `GET /api/sensor-data/plant/:id` - Récupérer les données des capteurs d'une plante
- `GET /api/sensor-data/plant/:id/latest` - Récupérer les dernières données des capteurs d'une plante
- `POST /api/sensor-data` - Ajouter de nouvelles données de capteur

## Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. Poussez la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
