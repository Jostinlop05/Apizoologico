const mongoose = require("mongoose");

// Definir el esquema del Animal
const animalSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true, // El nombre es obligatorio
    },
    edad: {
      type: Number,
      required: true, // La edad es obligatoria
    },
    tipo: {
      type: String,
      required: true, // El tipo de animal es obligatorio
    },
    fechaCreacion: {
      type: Date,
      default: Date.now, // Se genera automáticamente al crear un nuevo documento
    },
  },
  {
    timestamps: true, // Mongoose genera automáticamente `createdAt` y `updatedAt`
  }
);

// Exportar el modelo Animal
module.exports = mongoose.model("Animal", animalSchema);