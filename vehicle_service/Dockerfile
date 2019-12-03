FROM node
LABEL author = "github.com/ziaagikian"
# Development Environment
ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

ENV codePath /usr/src/vehicle_service
ENV queueTimeout 30 
WORKDIR $codePath

COPY package.json $codePath
RUN npm prune
RUN npm install
COPY . $codePath
RUN chmod +x $codePath/libs/wait-for-it.sh
CMD     $codePath/libs/wait-for-it.sh localhost:15672 -t ${queueTimeout};  /bin/sh ./start.sh

USER   node