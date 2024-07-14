# Étape 1 : Construction
FROM --platform=linux/arm64 node:18.17.0-alpine as builder

# Installation de pnpm
RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json pnpm*.yaml ./

RUN pnpm install && pnpm store prune && rm -rf /root/.npm

# Copier tout le répertoire
COPY . .

# Étape 2 : Image finale
FROM --platform=linux/arm64 node:18.17.0-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN npm i -g pnpm

EXPOSE 4000

# Commande pour lancer le serveur
CMD ["pnpm", "start:docker"]
