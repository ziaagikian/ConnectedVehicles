### Stage 1 Create Production Build
FROM node As builder

LABEL author = "Zia Ur Rahman <github.com/ziaagikian>"

ENV codePath /usr/src/frontend
WORKDIR $codePath

ENV deploy_environment  prod
ENV deploy_url  localhost

COPY package.json ${codePath}
RUN npm prune
RUN npm install
RUN npm install -g  @angular/cli@latest

COPY . ${codePath}

#Disable CLI mismatch version  warning for Local builds
#RUN ng config -g cli.warnings.versionMismatch

RUN ng build --$deploy_environment

### Stage  2 Deploy to Nginx

FROM nginx:alpine
RUN apk --no-cache add ca-certificates
LABEL author = "Zia Ur Rahman <github.com/ziaagikian>"

#Copy modified nginx config
COPY ./nginx-files/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/frontend/dist/frontend    /usr/share/nginx/html

EXPOSE 4200

#CMD service nginx  restart;
CMD ["nginx", "-g", "daemon off;"]

#CMD ng serve --host ${deploy_url}
