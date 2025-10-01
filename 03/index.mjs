// index.mjs

import * as http from 'http';

// 1. Definir constantes para configuración
const PORT = 5500;
const WELCOME_ROUTE = '/saludo/bienvenida';
const POST_METHOD = 'POST';
const TEXT_PLAIN_HEADER = { 'Content-Type': 'text/plain' };

// 2. Función de manejo de peticiones
const requestHandler = (req, res) => {
    // Desestructuramos para obtener la URL y el método de la petición
    const { url, method } = req;



    // El servidor SOLO debe responder a /saludo/bienvenida y POST
    if (url === WELCOME_ROUTE && method === POST_METHOD) {

        // Configurar la respuesta de éxito (Código 200) status y cabecera
        res.writeHead(200, TEXT_PLAIN_HEADER);

        // Enviar el mensaje de bienvenida en el body
        res.end("¡Bienvenidos a NodeJS!");


        return;
    }

    // --- LÓGICA DE ERROR (Cualquier otra ruta o método) ---

    // Para cualquier otra combinación de ruta y/o método
    const errorMessage = "¡Ruta o verbo inválido!";

    // Configurar la respuesta de error (Código 404)
    res.writeHead(404, TEXT_PLAIN_HEADER);

    // Enviar el mensaje de error
    res.end(errorMessage);

    // console.log(`[${method}] ${url} -> 404 NOT FOUND`);
};

// 3. Crear y configurar el servidor, cada peticion del cliente se ejecuta esa función
const server = http.createServer(requestHandler);

// 4. Iniciar el servidor para que escuche en el puerto 5500
server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log(`✅ Ruta POST correcta: http://localhost:${PORT}${WELCOME_ROUTE}`);
    console.log(`❌ Cualquier otra petición devolverá 404`);
});