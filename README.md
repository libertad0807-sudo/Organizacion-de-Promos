npm# Organización Promo 2026
Plataforma web para la gestión, planificación y organización integral de eventos, viajes y recuerdos de egresados.

**Materia:** Herramientas de Desarrollo Multimedia

**Curso:** 5° 7°

**Profesor:** Domingo Britos

## Integrantes

- Zoe Cantos
- Valeria Acosta
-Libertad Bastias

## Descripción

Organizar un año de egresados implica coordinar múltiples fechas, recaudaciones, fiestas y recuerdos entre muchos compañeros, lo que suele generar desorden en grupos de chat. Este proyecto propone una **plataforma web centralizada** que permite a los estudiantes llevar una cuenta regresiva hacia su viaje, agendar eventos importantes, compartir una galería de fotos y gestionar consultas de presupuesto de manera simple y visual.

## Problemas detectados

- Información dispersa en chats sobre fechas de reuniones, ventas y eventos.
- Falta de un espacio común para guardar y compartir los recuerdos fotográficos de la promo.
- Dificultad para centralizar consultas y pedidos de presupuesto para fiestas y viajes.
- Poca visibilidad de cuánto tiempo falta para el viaje de egresados.

## Propuesta

- **Cuenta regresiva en tiempo real:** reloj dinámico que muestra los días, horas, minutos y segundos exactos que faltan para el viaje de egresados.
- **Calendario de actividades:** agenda colaborativa para registrar y visualizar fechas clave (reuniones, venta de comida, diseño de buzos).
- **Galería de recuerdos:** espacio para que los compañeros publiquen fotos con autor y descripción, almacenándolas en la base de datos.
- **Sección de servicios y contacto:** catálogo visual de propuestas (fiesta, viajes, previas) junto con un formulario directo para solicitar presupuestos.

## Interfaz de Usuario

El proyecto cuenta con una interfaz moderna, responsiva y fácil de navegar, pensada para que cualquier estudiante o referente pueda usarla desde la computadora o el celular sin complicaciones.

Las secciones principales abarcan:
- **Hero y Cuenta Regresiva:** encabezado principal con acceso rápido al menú y reloj en vivo.
- **Catálogo de Servicios:** tarjetas informativas sobre fiestas de egresados, viajes y encuentros.
- **Calendario de Actividades:** formulario de carga rápida y listado de próximos eventos.
- **Galería de Fotos:** formulario para subir imágenes mediante enlace con vista en cuadrícula.
- **Formulario de Contacto:** envío de solicitudes con confirmación visual inmediata en pantalla.

## Instalación

**Requisitos:** tener instalados [Node.js](https://nodejs.org) y MySQL (con MySQL Workbench).

### 1. Base de datos

El proyecto usa **MySQL Workbench** en local. Antes de levantar el servidor hay que crear la base de datos y sus tablas:

1. Abrir **MySQL Workbench** y entrar a la conexión local (`localhost`, puerto `3306`).
2. Abrir o pegar el contenido del archivo [`schema.sql`](./schema.sql) en una pestaña de consulta y ejecutarlo (ícono del rayo).
3. Comprobar en el panel *SCHEMAS* que apareció la base **`promo_egresados`** con las tablas `actividades`, `fotos` y `contactos`.

### 2. Servidor

1. Abrir la carpeta del proyecto en una terminal e instalar las dependencias (`express` y `mysql2`):

   ```bash
   npm install express mysql2
   ```

2. Verificar que los datos de conexión en `server.js` coincidan con los de tu MySQL local:

   ```js
   const pool = mysql.createPool({
     host: "localhost",
     user: "root",
     password: "", // Colocar aquí tu contraseña de MySQL
     database: "promo_egresados",
   });
   ```

3. Iniciar el servidor:

   ```bash
   npm start
   ```

4. Si todo está bien, la terminal mostrará:
   ```text
   Servidor listo: http://localhost:3000
   ✅ Conectado a MySQL
   ```
   Luego, abrir `http://localhost:3000` en el navegador.

5. Si la terminal de Windows muestra *"la ejecución de scripts está deshabilitada"*, ejecutar una vez:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
