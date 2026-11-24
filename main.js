class Actividad {
    constructor(nombre, fecha) {
        this.nombre = nombre;
        this.fecha = fecha;
    }

    obtenerTexto() {
        return `📌 ${this.nombre} - Fecha: ${this.fecha}`;
    }
}

// Clase 2: Objeto simple para representar una Foto
class Foto {
    constructor(autor, descripcion, url) {
        this.autor = autor;
        this.descripcion = descripcion;
        this.url = url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80';
    }
}


class OrganizadorPromo {
    constructor() {
        this.actividades = [];
        this.fotos = [];
        // Fecha de destino para el viaje de egresados (Ejemplo: 15 de Octubre de 2027)
        this.fechaViaje = new Date("December 17, 2026 00:00:00").getTime();
    }


    toggleMenu() {
        const menu = document.getElementById("menuNavegacion");
        menu.classList.toggle("oculto");
    }


    actualizarReloj() {
        const ahora = new Date().getTime();
        const diferencia = this.fechaViaje - ahora;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            document.getElementById("dias").textContent = dias < 10 ? "0" + dias : dias;
            document.getElementById("horas").textContent = horas < 10 ? "0" + horas : horas;
            document.getElementById("minutos").textContent = minutos < 10 ? "0" + minutos : minutos;
            document.getElementById("segundos").textContent = segundos < 10 ? "0" + segundos : segundos;
        } else {
            document.getElementById("cuenta-regresiva").innerHTML = "<h2>🎉 ¡LLEGÓ EL MOMENTO DEL VIAJE! ✈️</h2>";
        }
    }


    agregarActividad(nombre, fecha, id = null) {
        const nuevaActividad = new Actividad(nombre, fecha);
        this.actividades.push(nuevaActividad);

        const ul = document.getElementById("listaActividades");
        const li = document.createElement("li");
        li.style.cssText = "display:flex;justify-content:space-between;align-items:center;";
        if (id) li.dataset.id = id;

        const span = document.createElement("span");
        span.textContent = nuevaActividad.obtenerTexto();

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "✕";
        btnEliminar.title = "Eliminar actividad";
        btnEliminar.style.cssText = "background:#9d0208;color:#fff;border:none;border-radius:50%;width:26px;height:26px;cursor:pointer;font-weight:bold;";
        btnEliminar.onclick = () => {
            if (window.eliminarItem && li.dataset.id) window.eliminarItem("/actividades", li.dataset.id);
            li.remove();
        };

        li.appendChild(span);
        li.appendChild(btnEliminar);
        ul.appendChild(li);
        return li;
    }

    subirFoto(autor, descripcion, url, id = null) {
        const nuevaFoto = new Foto(autor, descripcion, url);
        this.fotos.push(nuevaFoto);

        const grid = document.getElementById("gridGaleria");
        const tarjeta = document.createElement("div");
        tarjeta.className = "foto-item";
        tarjeta.style.position = "relative";
        if (id) tarjeta.dataset.id = id;

        tarjeta.innerHTML = `
            <button class="btn-eliminar" title="Eliminar foto" style="position:absolute;top:8px;right:8px;background:#9d0208;color:#fff;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,.4);">✕</button>
            <img src="${nuevaFoto.url}" alt="${nuevaFoto.descripcion}">
            <div class="foto-info">
                <p>${nuevaFoto.descripcion}</p>
                <p><strong>Por:</strong> ${nuevaFoto.autor}</p>
            </div>
        `;

        tarjeta.querySelector(".btn-eliminar").onclick = () => {
            if (window.eliminarItem && tarjeta.dataset.id) window.eliminarItem("/fotos", tarjeta.dataset.id);
            tarjeta.remove();
        };

        grid.appendChild(tarjeta);
        return tarjeta;
    }

}


const app = new OrganizadorPromo();


app.actualizarReloj();
setInterval(() => {
    app.actualizarReloj();
}, 1000);


app.subirFoto("Sofía", "Presentación de Camperas", "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=500&q=80");
app.subirFoto("Mateo", "Diseño de la bandera", "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80");


app.agregarActividad("Reunión para organizar buzos", "20 de Noviembre");


document.getElementById("btnMenu").addEventListener("click", function () {
    app.toggleMenu();
});


document.getElementById("formActividad").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    const nombre = document.getElementById("actNombre").value;
    const fecha = document.getElementById("actFecha").value;

    app.agregarActividad(nombre, fecha);

    document.getElementById("actNombre").value = "";
    document.getElementById("actFecha").value = "";
});


document.getElementById("formFoto").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    const autor = document.getElementById("fotoAutor").value;
    const desc = document.getElementById("fotoDesc").value;
    const url = document.getElementById("fotoUrl").value;

    app.subirFoto(autor, desc, url);

    document.getElementById("fotoAutor").value = "";
    document.getElementById("fotoDesc").value = "";
    document.getElementById("fotoUrl").value = "";
});

document.getElementById("formContacto").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    const mensaje = document.getElementById("mensajeContacto");
    mensaje.classList.remove("oculto");

    document.getElementById("contactoNombre").value = "";
    document.getElementById("contactoColegio").value = "";
});