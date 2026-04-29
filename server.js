require("dotenv").config(); // Cargar variables de entorno

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/** ------------------------------
 * Middleware
 * ------------------------------ */
app.use(cors());           // Permitir solicitudes CORS
app.use(express.json());   // Permitir recibir datos JSON en el cuerpo de la solicitud

/** ------------------------------
 * Conexión a MongoDB
 * ------------------------------ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

/** ------------------------------
 * Rutas
 * ------------------------------ */
app.use("/api/animals", require("./routes/animalRoutes")); // Ruta base para animales

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

/** ------------------------------
 * Inicializar servidor
 * ------------------------------ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}/`);
});