const express = require("express");
const app = express();

const datasRouter = require("./routes/data.route");
const produtosRouter = require("./routes/produto.route");
const userRouter = require("./routes/user.route");
const orderRouter = require("./routes/order.route");

app.use(express.json());
app.use(datasRouter);
app.use(produtosRouter);
app.use(userRouter);
app.use(orderRouter);

PORT = 3333;

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}`)
);
