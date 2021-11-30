# How to 

```bash
#start app
sudo docker-compose up -d --build

#create migration 
docker-compose run nestjs npm run typeorm:generate create_tables

#run migration
docker-compose run nestjs npm run typeorm:run

#go to:
http://localhost:3000/api

register and login and then enter the access token in authorize button (top right swagger ui)
```
