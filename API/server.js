require("dotenv").config()
const cors = require("cors")
const express = require("express");
const mongoose = require("mongoose");


//Crear server

const app = express();

const port = 3001;

//Conexión a la BD
mongoose.connect(process.env.DATABASE_URL_CLOUD, {useNewUrlParser: true});
const db = mongoose.connection;

//Setear manejo de eventos
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectando a la base de datos"));

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Rutas

app.use("/tareas", require("./routes/tareas-routes"));
port = process.env.PORT || 3001
//Iniciar el servidor
app.listen(port, () => console.log("El servidor esta escuchando..."));