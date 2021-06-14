const _userService = require("../services/userService");

class UserController {
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const result = await _userService.getUserById({ id });
      return res.status(200).json(result);
    } catch (ex) {
      return res
        .status(400)
        .json({ error: "não foi possivel obter o usuario" });
    }
  }
  async createUser(req, res) {
    try {
      const result = await _userService.createUser(req.body);

      return res.status(200).json(true);
    } catch (ex) {
      return res
        .status(400)
        .json({ error: "não foi possivel criar o usuario" });
    }
  }
  async updateUserById(req, res) {
    const { id } = req.params;
    const { creditCardToken, userDocument, value } = req.body;
    try {
      const result = await _userService.updateUserById({
        creditCardToken,
        userDocument,
        value,
        id,
      });
      return res.status(200).json(true);
    } catch (ex) {
      return res
        .status(400)
        .json({ error: "não foi possivel atualizar o usuario" });
    }
  }
  async deleteUserById(req, res) {
    const { id } = req.params;
    const result = await _userService.deleteUserById({ id });
    return res.status(200).json(true);
    try {
    } catch (ex) {
      return res
        .status(400)
        .json({ error: "não foi possivel deletar o usuario" });
    }
  }
}

module.exports = new UserController();
