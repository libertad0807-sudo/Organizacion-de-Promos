// Guarda, carga y elimina en MySQL los datos de los formularios.

const API = "http://localhost:3000/api";

function avisar(texto, ok) {
    const aviso = document.createElement("div");
    aviso.textContent = texto;
    aviso.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:1000;" +
        "padding:12px 20px;border-radius:10px;font-style:normal;font-weight:600;color:#fff;" +
        "max-width:90%;text-align:center;box-shadow:0 0 15px rgba(0,0,0,.5);" +
        "background:" + (ok ? "#2d6a4f" : "#9d0208");
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 4500);
}

function guardar(ruta, datos, elementoDOM) {
    fetch(API + ruta, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(async (respuesta) => {
        if (!respuesta.ok) {
            const error = await respuesta.json().catch(() => ({}));
            throw new Error(error.detalle || error.error || "Error del servidor");
        }
        const resJson = await respuesta.json();
        if (elementoDOM && resJson.id) {
            elementoDOM.dataset.id = resJson.id;
        }
        avisar("✅ Tus datos ya fueron guardados", true);
    })
    .catch((e) => {
        console.error(e);
        avisar(e instanceof TypeError
            ? "⚠️ Se agregó en la página pero NO se guardó: el servidor está apagado"
            : "⚠️ NO se guardó: MySQL dio un error (" + e.message + ")", false);
    });
}

window.eliminarItem = function (ruta, id) {
    fetch(`${API}${ruta}/${id}`, { method: "DELETE" })
        .then((res) => {
            if (!res.ok) throw new Error("No se pudo eliminar");
            avisar("🗑️ Eliminado correctamente", true);
        })
        .catch((e) => {
            console.error(e);
            avisar("⚠️ Error al eliminar de la base de datos", false);
        });
};

// Formulario de actividades
const agregarActividadOriginal = app.agregarActividad.bind(app);
app.agregarActividad = function (nombre, fecha, id = null) {
    const li = agregarActividadOriginal(nombre, fecha, id);
    if (!id) guardar("/actividades", { nombre, fecha }, li);
    return li;
};

// Formulario de fotos
const subirFotoOriginal = app.subirFoto.bind(app);
app.subirFoto = function (autor, descripcion, url, id = null) {
    const tarjeta = subirFotoOriginal(autor, descripcion, url, id);
    if (!id) guardar("/fotos", { autor, descripcion, url }, tarjeta);
    return tarjeta;
};

// Formulario de contacto
document.addEventListener("submit", function (event) {
    if (event.target.id !== "formContacto") return;
    guardar("/contactos", {
        nombre: document.getElementById("contactoNombre").value,
        colegio: document.getElementById("contactoColegio").value
    });
}, true);

// Cargar actividades y fotos desde MySQL al abrir o recargar la página
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const resAct = await fetch(API + "/actividades");
        if (resAct.ok) {
            const actividades = await resAct.json();
            actividades.forEach(act => agregarActividadOriginal(act.nombre, act.fecha, act.id));
        }

        const resFotos = await fetch(API + "/fotos");
        if (resFotos.ok) {
            const fotos = await resFotos.json();
            fotos.forEach(foto => subirFotoOriginal(foto.autor, foto.descripcion, foto.url, foto.id));
        }
    } catch (e) {
        console.error("No se pudieron cargar los datos guardados:", e);
    }
});
