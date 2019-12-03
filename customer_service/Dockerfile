FROM node
LABEL author = "github.com/ziaagikian"
ENV codePath /usr/src/customer_service
# RabbitMQ Queue Connection Timeout 60 sec
# Development Environment
ARG NODE_ENV=test

ENV NODE_ENV=${test}
ENV queueTimeout 30 
WORKDIR $codePath

COPY package.json $codePath
RUN npm prune
RUN npm install
COPY . $codePath

RUN chmod +x $codePath/libs/wait-for-it.sh

CMD  $codePath/libs/wait-for-it.sh localhost:15672 -t $queueTimeout;  /bin/sh ./start.sh

USER   node