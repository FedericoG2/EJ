// Importamos la función readFile del módulo nativo de Node.js fs/promises
import { readFile } from 'fs/promises';
// Importamos la función join del módulo nativo path. Este módulo nos ayuda a construir rutas de archivos 
import { join } from 'path';

// Función asíncrona 

//Comentarios

// Se puede importar el archivo JSON directamente en Node.js automáticamente sabe que es JSON, lo lee, y lo convierte en objeto
// Pero la idea del ejercicio es aprender la forma robusta y asíncrona de leer archivos del disco, no siempre va a ser un json puede ser un CSV o algo que no es estatico sino dinamico pero se que va a estar en ese ruta.
async function leerMensajeDespedida() {
    try {

        // 1. En criollo creamos la ruta absoluta donde se ubica el json
        // Basicamente unimos el directorio actual y el nombre del archivo , osea modelo/01/nombre
        const rutaArchivo = join(process.cwd(), 'mensajes.json');

        // 2.readFile es asincrónica y devuelve una Promesa con el await esperamos a que se resuelva sin trabar el flujo. 
        // Cuando se resuelve, lee el archivo especificado en la ruta y, gracias al encoding utf8, devuelve el contenido como un string que contiene el texto del JSON
        const contenidoJSON = await readFile(rutaArchivo, { encoding: 'utf8' });

        // 3. Convertir el contenido de formato JSON a un Objeto JavaScript
        // Basicamente con un objeto se puede manipularlo con la notacion de punto cosa que con una cadena no
        const mensajesObjeto = JSON.parse(contenidoJSON);

        // ---

        // 4. Imprimir por consola el mensaje de despedida
        const mensajeDespedida = mensajesObjeto.despedida;
        console.log(mensajeDespedida);

    } catch (error) {

        console.error('Ocurrió un error al procesar el archivo:');

    }
}

// Ejecutar 
leerMensajeDespedida();











