FROM node:18.17.0 as base

# Installation de pnpm
RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json pnpm*.yaml ./

RUN pnpm install --frozen-lockfile

# Copier tout le répertoire
COPY . .

EXPOSE 8080

# Commande pour lancer le serveur
CMD ["pnpm", "start"]
