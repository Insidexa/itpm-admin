FROM node:7

RUN mkdir -p /var/www/

WORKDIR /var/www

#RUN npm install -g npm@5.6.0
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install -g @angular/cli

COPY . .

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install

## Build the angular app in production mode and store the artifacts in dist folder
RUN ng build --prod --aot


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
ADD nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#RUN rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log