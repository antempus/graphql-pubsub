FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)COPY package*.json ./
COPY package*.json ./
RUN npm --version

RUN rm -rf node_modules
RUN npm install --unsafe-perm --production
RUN npm prune --production

COPY . .


CMD ["npm", "start"]

EXPOSE 3000
