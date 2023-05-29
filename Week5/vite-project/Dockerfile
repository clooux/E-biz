FROM node:18.16

WORKDIR /app

COPY ./src /app/src
COPY ./index.html /app/index.html
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./postcss.config.js /app/postcss.config.js
COPY ./tailwind.config.js /app/tailwind.config.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.node.json /app/tsconfig.node.json
COPY ./vite.config.ts /app/vite.config.ts

RUN npm install --ignore-scripts

RUN chown -R node:node /app

USER node

EXPOSE 5173

CMD ["npm", "run", "dev"]