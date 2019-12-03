#!bin/bash

echo "Running PM2 startup scripts"
npm install
npm  install -g pm2
sudo apt install rabbitmq*
rabbitmqctl start_app
cd api-gateway/
pm2 start ./bin/www --name "TEST API Gateway"
pm2 start ../vehicle_service/vehicle-app.js --name "Vehicle Service"
pm2 start ../customer_service/customer-app.js --name "Customer Service" 

exit
