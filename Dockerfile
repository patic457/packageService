FROM node:16-alpine as builder

ENV NODE_ENV development

USER root
WORKDIR /home/root

COPY package*.json ./
RUN npm ci

COPY --chown=root:root . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:16-alpine

ENV NODE_ENV production

USER root
WORKDIR /home/root

COPY --from=builder --chown=root:root /home/root/package*.json ./
COPY --from=builder --chown=root:root /home/root/node_modules/ ./node_modules/
COPY --from=builder --chown=root:root /home/root/dist/ ./dist/

CMD ["node", "dist/main.js"]