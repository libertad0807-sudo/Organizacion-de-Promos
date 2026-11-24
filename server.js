const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

//credenciales de la base de datos
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "promo_egresados",
});

const FOTO_POR_DEFECTO =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80";

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Permite que la página hable con el servidor aunque se abra desde un archivo
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});


// Abrir http://localhost:3000 muestra la página (así se comprueba que el servidor anda)
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

function fallo(res, e, mensaje) {
  console.error(mensaje + ":", e.message);
  res.status(500).json({ error: mensaje, detalle: e.message });
}

// Guardar actividad
app.post("/api/actividades", async (req, res) => {
  const { nombre, fecha } = req.body;
  if (!nombre || !fecha) return res.status(400).json({ error: "Faltan datos" });
  try {
    await pool.query(" INTO actividades (nombre, fecha) VALUES (?, ?)", [nombre, fecha]);
    res.status(201).json({ ok: true });
  } catch (e) { fallo(res, e, "Error al guardar la actividad"); }
});

// Guardar foto
app.post("/api/fotos", async (req, res) => {
  const { autor, descripcion } = req.body;
  const url = req.body.url || FOTO_POR_DEFECTO;
  if (!autor || !descripcion) return res.status(400).json({ error: "Faltan datos" });
  try {
    await pool.query("INSERT INTO fotos (autor, descripcion, url) VALUES (?, ?, ?)", [autor, descripcion, url]);
    res.status(201).json({ ok: true });
  } catch (e) { fallo(res, e, "Error al guardar la foto"); }
});

// Guardar contacto
app.post("/api/contactos", async (req, res) => {
  const { nombre, colegio } = req.body;
  if (!nombre || !colegio) return res.status(400).json({ error: "Faltan datos" });
  try {
    await pool.query("INSERT INTO contactos (nombre, colegio) VALUES (?, ?)", [nombre, colegio]);
    res.status(201).json({ ok: true });
  } catch (e) { fallo(res, e, "Error al guardar el contacto"); }
});

// Obtener todas las actividades guardadas
app.get("/api/actividades", async (req, res) => {
  try {
    const [filas] = await pool.query("SELECT * FROM actividades");
    res.json(filas);
  } catch (e) { fallo(res, e, "Error al cargar las actividades"); }
});

// Obtener todas las fotos guardadas
app.get("/api/fotos", async (req, res) => {
  try {
    const [filas] = await pool.query("SELECT * FROM fotos");
    res.json(filas);
  } catch (e) { fallo(res, e, "Error al cargar las fotos"); }
});

// Guardar actividad (devuelve el ID generado)
app.post("/api/actividades", async (req, res) => {
  const { nombre, fecha } = req.body;
  if (!nombre || !fecha) return res.status(400).json({ error: "Faltan datos" });
  try {
    const [resultado] = await pool.query("INSERT INTO actividades (nombre, fecha) VALUES (?, ?)", [nombre, fecha]);
    res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (e) { fallo(res, e, "Error al guardar la actividad"); }
});

// Eliminar actividad
app.delete("/api/actividades/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM actividades WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { fallo(res, e, "Error al eliminar la actividad"); }
});

// Guardar foto (devuelve el ID generado)
app.post("/api/fotos", async (req, res) => {
  const { autor, descripcion } = req.body;
  const url = req.body.url || FOTO_POR_DEFECTO;
  if (!autor || !descripcion) return res.status(400).json({ error: "Faltan datos" });
  try {
    const [resultado] = await pool.query("INSERT INTO fotos (autor, descripcion, url) VALUES (?, ?, ?)", [autor, descripcion, url]);
    res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (e) { fallo(res, e, "Error al guardar la foto"); }
});

// Eliminar foto
app.delete("/api/fotos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM fotos WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { fallo(res, e, "Error al eliminar la foto"); }
});


app.listen(3000, () => {
  console.log("Servidor listo: http://localhost:3000");
  pool.query("SELECT 1")
    .then(() => console.log("✅ Conectado a MySQL"))
    .catch((e) => console.error("❌ No se pudo conectar a MySQL:", e.message,
      "\n   Revisá usuario/contraseña en server.js y que hayas corrido schema.sql"));
});
