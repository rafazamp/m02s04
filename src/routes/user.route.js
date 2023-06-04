const { Router } = require("express");

const userRouter = Router();

const {
  listarUser,
  atualizarUser,
  apagarUser,
  retornaUser,
} = require("../controllers/user.controller");

userRouter.get("/listarUser", listarUser);
userRouter.put("/atualizarUser/:id", atualizarUser);
userRouter.delete("/apagarUser/:id", apagarUser);
userRouter.get("/retornaUser/:id", retornaUser);

module.exports = userRouter;
