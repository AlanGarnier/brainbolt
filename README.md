# Brainbolt - Guide d'installation

# Frontend

Ce guide explique comment installer et exécuter le projet côté frontend de Brainbolt.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre système :

- Node.js (version 18 recommandée)
- npm (gestionnaire de paquets Node.js)
- nvm (gestionnaire de versions de Node.js)

## Installation

**Cloner le dépôt :**

```bash
git clone https://github.com/AlanGarnier/brainbolt.git
```

**Accéder au dossier frontend :**

```bash
cd brainbolt/frontend
```

- Si vous n'avez pas encore installé Node Version Manager (nvm), vous pouvez le faire en suivant les instructions disponibles sur le site officiel.

**Sélectionner la version de Node.js :**

```bash
nvm use 18
```

**Installer les dépendances :**

```bash
npm install
```

**Exécution :**

```bash
npm run dev
```

# Backend

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre système :

- Python (version 3.10 recommandée)
- pip (gestionnaire de paquets Python)
- virtualenv (pour créer des environnements virtuels)

## Installation

**Accéder à la racine du projet :**

```bash
cd brainbolt
```

**Créer un environnement virtuel :**

```bash
python -m venv .venv
```

**Activer l'environnement virtuel :**
**Sur MacOS et Linux :**

```bash
source .venv/bin/activate
```

**Sur Windows :**

```bash
.venv\Scripts\activate
```

**Accéder au dossier backend :**

```bash
cd backend
```

**Installer les dépendances :**

```bash
pip install -r requirements.txt
```

**Exécution :**

```bash
flask run
```

- Amusez-vous bien à explorer le projet, et n'oubliez pas d'essayer de ne pas casser trop de trucs ! 😊
