const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
server.use(cors());
server.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_inscripciones",
});

// Obtener información dinámica de cualquier tabla
server.get("/api/get/:tabla", (req, res) => {
  const tabla = req.params.tabla;
  const sqlSelect = `SELECT * FROM ${tabla}`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

// Registrar estudiantes, profesores, representantes, notas
server.post("/api/registro", (req, res) => {
  const { tabla, data } = req.body;
  const sqlInsert = `INSERT INTO ${tabla} SET ?`;
  db.query(sqlInsert, data, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al registrar datos");
    } else {
      res.send("Registro exitoso");
    }
  });
});

// Actualizar registros de estudiantes, profesores, representantes, notas
server.post("/api/actualizar", (req, res) => {
  const { tabla, id, campo, valor } = req.body;
  const sqlUpdate = `UPDATE ${tabla} SET ${campo} = ? WHERE id = ?`;
  db.query(sqlUpdate, [valor, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al actualizar datos");
    } else {
      res.send("Actualización exitosa");
    }
  });
});

// Eliminar registros de estudiantes, profesores, representantes, notas
server.post("/api/eliminar", (req, res) => {
  const { tabla, id } = req.body;
  const sqlDelete = `DELETE FROM ${tabla} WHERE id = ?`;
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar datos");
    } else {
      res.send("Eliminación exitosa");
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
