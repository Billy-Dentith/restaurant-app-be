# Restaurant App Back End

### Project Summary

- This project creates the back end for a restaurant app, containing a database of products, categories, users and orders

### Set-Up Instructions 

- Clone repo to local environment

- Run npm install to install required dependencies

- Create .env files for test database (.env.test) and development database (.env.development) containing the following:
    - 'PGDATABASE=database_name_test'
    - 'PGDATABASE=database_name'

- Add above files to .gitignore file

- To initialise and seed the databases run the following:
    - npm run setup-dbs
    - npm run seed