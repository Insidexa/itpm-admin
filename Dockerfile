FROM node:7 as node

RUN mkdir -p /var/www/
WORKDIR /var/www

#RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install -g @angular/cli

COPY package.json .
RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.13.3-alpine

RUN mkdir -p /var/www/
WORKDIR /var/www

COPY --from=node /var/www .
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

#RUN rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log