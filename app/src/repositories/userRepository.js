const table = "user";

const database = require("../database/db");
const userEntity = require("../entities/userEntity");

class UserRepository {
  async InsertUser({ userDocument, creditCardToken, value }) {
    const db = await database();
    const query = `insert into ${table} (userDocument,creditCardToken,value,active) values (?,?,?,?)`;

    await db.beginTransaction();

    const result = await db.query(query, [
      userDocument,
      creditCardToken,
      value,
      1,
    ]);
    await db.commit();
    db.destroy();
    return true;
  }

  async GetUserById({ Id }) {
    const query = `select id,creditCardToken,userDocument,value from ${table} where active = 1 and id = ?`;
    const db = await database();

    let objResult = {
      id: "",
      userDocument: "",
      creditCardToken: "",
      value: 0,
    };
    const [rows, fields] = await db.query(query, [Id]);

    db.destroy();

    if (rows && rows.length > 0) {
      // objResult = new userEntity(result[0]);
      objResult.id = rows[0].id;
      objResult.userDocument = rows[0].userDocument;
      objResult.creditCardToken = rows[0].creditCardToken;
      objResult.value = rows[0].value;
    }
    return objResult;
  }

  async DeleteUserById({ Id }) {
    const date = new Date();
    const query = `update ${table} set active = 0,removedDate = ? where id =? `;
    const db = await database();
    await db.beginTransaction();

    const result = await db.query(query, [date, Id]);
    await db.commit();
    db.destroy();
    return true;
  }

  async UpdateUserById({ userDocument, creditCardToken, value, id }) {
    const date = new Date();
    const query = `update ${table} set userDocument = ? , creditCardToken = ? , value = ?,updatedDate = ? where id = ?`;

    const db = await database();
    await db.beginTransaction();

    const result = await db.query(query, [
      userDocument,
      creditCardToken,
      value,
      date,
      id,
    ]);
    await db.commit();
    db.destroy();
    return true;
  }
}

module.exports = new UserRepository();
