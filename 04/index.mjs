import * as http from 'http';

// 1. Configuración de constantes
const PORT = 4500;
const TARGET_ROUTE = '/numeros-filtrados';
const GET_METHOD = 'GET';
const JSON_HEADER = { 'Content-Type': 'application/json' };
const NUMEROS = [15, 200, 1, 68, 12, 25, 30, 115];

// 2. Función de manejo de peticiones
const requestHandler = (req, res) => {
    const { url, method } = req;

    // --- Lógica para la RUTA Y MÉTODO CORRECTOS: /numeros-filtrados y GET ---
    if (url === TARGET_ROUTE && method === GET_METHOD) {

        // 2.1. Filtrar el arreglo (Criterio: números menores a 100)
        const numerosFiltrados = NUMEROS.filter(numero => numero < 100);

        // 2.2. Definir la estructura JSON requerida
        const respuestaObjeto = {
            numeros: numerosFiltrados
        };

        // 2.3. Convertir el objeto JavaScript a string JSON para el envío
        const respuestaJSON = JSON.stringify(respuestaObjeto);

        // 2.4. Enviar la respuesta de éxito (Código 200 y Content-Type: application/json)
        res.writeHead(200, JSON_HEADER);
        res.end(respuestaJSON);


        return;
    }

    // --- Lógica para CUALQUIER OTRA RUTA O MÉTODO (Error 404) ---

    // 2.5. Definir el mensaje de error en formato objeto/JSON
    const errorObjeto = {
        mensaje: "¡Ruta o verbo inválido!"
    };
    const errorJSON = JSON.stringify(errorObjeto);

    // 2.6. Enviar la respuesta de error (Código 404 y Content-Type: application/json)
    res.writeHead(404, JSON_HEADER);
    res.end(errorJSON);


};

// 3. Crear e iniciar el servidor
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`\n🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log(`✅ Petición correcta: GET http://localhost:${PORT}${TARGET_ROUTE}`);
});