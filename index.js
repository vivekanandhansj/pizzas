const express = require("express");
require("dotenv").config;
const db = require("./db");
const otherRoutes = require("./routes/otherRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const userRoutes = require("./routes/userRoute");
const oderRoutes = require("./routes/orderRoute");
const deliveryPartnerRoutes = require("./routes/deliveryPartnerRoute");
const app = express();
const path = require("path");

app.use(express.json());
app.use("/api/pizza/", pizzaRoutes);
app.use("/api/others/", otherRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/order/", oderRoutes);
app.use("/api/deliverypartner/", deliveryPartnerRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server listening"));
