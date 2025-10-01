import express from 'express';

const PUERTO = 3100;
const app = express();

// Middleware para parsear JSON en body
app.use(express.json());

// Datos de ejemplo
const datos = {
    servicios: [
        { id: 1, nombre: 'Servicio 1' },
        { id: 5, nombre: 'Servicio 2' },
        { id: 6, nombre: 'Servicio 3' },
    ],
};

// ✅ GET todos los servicios
app.get('/servicios/online', (req, res) => {
    res.status(200).json(datos.servicios);
});

// ✅ GET un servicio por ID
app.get('/servicios/online/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const servicio = datos.servicios.find(s => s.id === idBuscado);

    if (!servicio) {
        return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }
    res.status(200).json(servicio);
});




// ✅ POST (crear un nuevo servicio)
app.post('/servicios/online', (req, res) => {
    const { id, nombre } = req.body;

    // Validación mínima
    if (!id || !nombre) {
        return res.status(400).json({ mensaje: 'Faltan datos (id y nombre son obligatorios)' });
    }

    // Verificar que no exista un servicio con ese ID
    const existe = datos.servicios.find(s => s.id === id);
    if (existe) {
        return res.status(400).json({ mensaje: 'Ya existe un servicio con ese ID' });
    }

    // Crear nuevo servicio
    const nuevoServicio = { id, nombre };

    // Guardarlo en la lista
    datos.servicios.push(nuevoServicio);

    res.status(201).json({ mensaje: 'Servicio creado', servicio: nuevoServicio });
});


// ✅ DELETE un servicio por ID (con filter)
app.delete('/servicios/online/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);

    // Verificar si existe
    const servicio = datos.servicios.find(s => s.id === idBuscado);
    if (!servicio) {
        return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }

    // Usar filter para excluir el servicio con ese ID
    datos.servicios = datos.servicios.filter(s => s.id !== idBuscado);

    res.status(200).json({ mensaje: 'Servicio eliminado', eliminado: servicio });
});

// ✅ PUT (modificar) un servicio por ID
app.put('/servicios/online/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const servicio = datos.servicios.find(s => s.id === idBuscado);

    if (!servicio) {
        return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }

    // Actualizar nombre (u otros campos si hubiera)
    if (req.body.nombre) {
        servicio.nombre = req.body.nombre;
    }

    res.status(200).json({ mensaje: 'Servicio actualizado', servicio });
});

// ✅ PATCH que agrega "descripcion" a cada servicio
app.patch('/servicios/online/descripciones', (req, res) => {
    datos.servicios = datos.servicios.map(s => ({
        ...s,
        descripcion: `Descripción de ${s.nombre}`
    }));

    res.status(200).json({ mensaje: 'Descripciones agregadas', servicios: datos.servicios });
});






// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
