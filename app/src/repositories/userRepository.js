const table = "user";

const database = require("../database/db");

class UserRepository {
  async InsertUser({ userDocument, creditCardToken, value }) {
    const db = await database();
    const query = `insert into ${table} (userDocument,creditCardToken,value,active) values (?,?,?,?)`;

    await db.beginTransaction();

    const [rows, fields] = await db.query(query, [
      userDocument,
      creditCardToken,
      value,
      1,
    ]);
    await db.commit();
    db.destroy();
    console.log(rows);
    return rows.insertId;
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
    if (rows.length <= 0) {
      throw new Error("Usuário não encontrado");
    }
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
    const query = `update ${table} set active = 0,removedDate = ? where id =? and active = 1 `;
    const db = await database();
    await db.beginTransaction();

    const [rows, fields] = await db.query(query, [date, Id]);
    await db.commit();
    db.destroy();
    if (rows.affectedRows) {
      return true;
    } else {
      return false;
    }
  }

  async UpdateUserById({ userDocument, creditCardToken, value, id }) {
    const date = new Date();
    const query = `update ${table} set userDocument = ? , creditCardToken = ? , value = ?,updatedDate = ? where id = ? and active = 1`;

    const db = await database();
    await db.beginTransaction();

    const [rows, fields] = await db.query(query, [
      userDocument,
      creditCardToken,
      value,
      date,
      id,
    ]);
    await db.commit();
    db.destroy();
    if (rows.affectedRows) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new UserRepository();
