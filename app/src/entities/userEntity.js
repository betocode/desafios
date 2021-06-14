class userEntity {
  constructor({ userDocument, creditCardToken, value, id }) {
    this.userDocument = userDocument;
    this.creditCardToken = creditCardToken;
    this.value = value;
    this.id = id;
  }
}

module.exports = userEntity;
