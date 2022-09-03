FROM node:16.14.2

ARG SENTRY_AUTH_TOKEN=''
ARG SENTRY_DSN=''

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm ci

RUN SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN SENTRY_DSN=$SENTRY_DSN APP_ENV=production npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
