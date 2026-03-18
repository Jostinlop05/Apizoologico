const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

/**
 * CREATE: Crear un nuevo animal
 */
router.post("/", async (req, res) => {
  try {
    const animal = new Animal(req.body); // Crear una nueva instancia con los datos recibidos
    const savedAnimal = await animal.save(); // Guardar en la base de datos
    res.status(201).json(savedAnimal); // Devolver el animal creado
  } catch (err) {
    res.status(400).json({ error: err.message }); // En caso de error, devolver mensaje
  }
});

/**
 * READ ALL: Obtener todos los animales
 */
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find(); // Obtener todos los animales
    res.json(animals); // Devolver los animales en JSON
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * READ ONE: Obtener un solo animal por su ID
 */
router.get("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id); // Buscar animal por ID
    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }
    res.json(animal); // Devolver el animal encontrado
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * UPDATE: Actualizar un animal por su ID
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id, // Buscar por ID
      req.body,      // Datos para actualizar
      { new: true }  // Retornar el documento actualizado
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }
    res.json(updatedAnimal); // Devolver el animal actualizado
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE: Eliminar un animal por su ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id); // Eliminar por ID
    if (!deletedAnimal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }
    res.json({ message: "Animal eliminado" }); // Confirmar eliminación
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;