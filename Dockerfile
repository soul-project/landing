FROM node:16.14.2

ARG SENTRY_AUTH_TOKEN=''
ARG SENTRY_DSN=''
ARG NEXT_PUBLIC_SENTRY_DSN=''
ARG NEXT_PUBLIC_FIREBASE_API_KEY=''
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=''
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID=''
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=''
ARG NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID=''
ARG NEXT_PUBLIC_FIREBASE_APP_ID=''
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=''

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm ci

RUN SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
  SENTRY_DSN=$SENTRY_DSN \
  NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID \
  NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID \
  APP_ENV=production \
  npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
