![webpage preview](https://user-images.githubusercontent.com/71560280/121545114-ceb8d400-ca3c-11eb-8098-5ee1fac22ab3.JPG)
# Todo List
Keep your todos, keep moving!

## About the Webpage
1. Log in with password and email, alternatively, log in with facebook.
2. Modify or delete outdated todos with CRUD functions.

---

## Installation

You can clone this project from here: [github link](https://github.com/CHIA-AN-YANG/Todo-sequelizer.git)
### 1. Web app installation
Clone with HTTPs:

```bash
git clone https://github.com/CHIA-AN-YANG/Todo-sequelizer.git
```
Alternatively, clone with SSH:
```bash
git clone git@github.com:CHIA-AN-YANG/Todo-sequelizer.git
```
Run npm install to install required plugins.

```bash
npm install
```
### 2. Database installation
  a. Todo-sequelizer use MySQL as its database. To run it locally, please download and installMySQL workbench from MySQL community service.
  b. Build connection on MySQL workbench and enter the query interface.
  
  c. Type the following code and run to generate the database and table:
  ```MySQL
  drop database if exists todo_sequelize;
  create database todo_sequelize;
  use todo_sequelize;
  select * from `todos`;
  select * from `users`;
  ```

### 3. Set up environmental variables
Please refer to `.env.example` for reference on setting environmental variables.

---

## Usage
The npm used in this project is **6.14.12**. This project is built under **Node.js v14.16.1** runtime environment, with Express framework.

### 1. Migration and Seeding
Run the following commands to set up tables and seed:
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```
This will create 1 user with 10 todos. To log in as seed user, use the following identity:
> name: root
> email: root@example.com
> password: 12345678

### 2. Run on Local Host
To start it on local server, simply run the app.js file with `node` command in CLI:
```bash
node app.js
```
If you wish to automatically restarting the node application when file changes in the directory are detected, you may run nodemon with this script:
```bash
npm run dev
```
Now, enter http://localhost:3000/ in your browser and you are good to go!


---

## Contributing
Drop me a line in email if you have any suggestions for improvement! My email address is: chiaan.y.creativeworker@gmail.com
