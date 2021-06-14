const { encrypt, decrypt } = require("../security/encrypt");
const userEntity = require("../entities/userEntity");
const _userRepository = require("../repositories/userRepository");

class UserService {
  async getUserById({ id }) {
    const entity = await _userRepository.GetUserById({ Id: id });

    entity.creditCardToken = decrypt(entity.creditCardToken);
    entity.userDocument = decrypt(entity.userDocument);
    return entity;
  }
  async createUser({ userDocument, creditCardToken, value }) {
    const entity = await this.generateEncryptedUser({
      userDocument,
      creditCardToken,
      value,
    });
    await _userRepository.InsertUser(entity);
    return true;
  }

  async updateUserById({ userDocument, creditCardToken, value, id }) {
    const entity = this.generateEncryptedUser({
      userDocument,
      creditCardToken,
      value,
    });
    entity.id = id;
    return true;
  }

  async deleteUserById({ id }) {
    await _userRepository.DeleteUserById({ Id: id });
    return true;
  }

  async generateEncryptedUser({ userDocument, creditCardToken, value }) {
    const encryptedDocument = await encrypt(userDocument);
    const encryptedCreditCardToken = await encrypt(creditCardToken);

    const entity = new userEntity({
      userDocument: encryptedDocument,
      creditCardToken: encryptedCreditCardToken,
      value: value,
    });
    return entity;
  }
}

module.exports = new UserService();
