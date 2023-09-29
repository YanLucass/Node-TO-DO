const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

try {
  sequelize.authenticate();
  console.log("Conectado ao MYSQl");
} catch (err) {
  console.log(`deu erro ${err}`);
}

module.exports = sequelize;
