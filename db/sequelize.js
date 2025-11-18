import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
    dialect: "postgres",
    username: "db_contacts_2wo5_user",
    password: "KlBt4vAuVaC7I4stk5pTyTmwHHtwg8sl",
    host: "dpg-d4e7saemcj7s73chehjg-a.frankfurt-postgres.render.com",
    database: "db_contacts_2wo5",
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

export default sequelize;