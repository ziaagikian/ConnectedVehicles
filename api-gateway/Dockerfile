### Stage 1 Download Dependencies Once

FROM node 

LABEL author = "github.com/ziaagikian"

# Testing Environment for CI  Automation
ARG NODE_ENV=test

ENV NODE_ENV=${NODE_ENV}
ENV queueTimeout 30 
ENV codePath /usr/src/api-gateway
WORKDIR $codePath


COPY package.json $codePath
RUN npm prune
RUN npm install
COPY . $codePath
RUN chmod a+x $codePath/libs/wait-for-it.sh

CMD    $codePath/libs/wait-for-it.sh localhost:15672 -t $queueTimeout;  /bin/sh ./start.sh

USER   node