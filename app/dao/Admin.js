const db = require("./../../common/db/mysqldb");

class Admin {
  async login(email, pass) {
    console.log(arguments);
    let query = `select * from admin where correo = ? and pass = ?`;
    let params = [email, pass];
    let result = await db.query(query, params);

    return result;
  }
  async validar_token(token) {
    console.log(arguments);
    let query = `select token from admin where token = ?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
  async updateToken(tokens, token) {
    console.log(arguments);
    let query = `update admin set token = ? where token = ?`;
    let params = [tokens, token];
    let result = await db.query(query, params);

    return result;
  }
  async aforoActual() {
    let query = `SELECT id,nombre,aforo,actual from mercados`;
    let params = [];
    let result = await db.query(query, params);

    return result;
  }
}
module.exports = new Admin();
