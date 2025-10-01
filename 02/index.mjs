
// Importamos la función writeFile del módulo nativo de Node.js fs/promises para escribir archivos
import { writeFile } from 'fs/promises';
import { join } from 'path';

async function crearArchivoArgentina() {
    try {
        // 1. Definir el objeto JavaScript 'argentina'
        const argentina = {
            provincias: [
                "Buenos Aires",
                "Córdoba",
                "Santa Fe",
                "Mendoza",
                "Tucumán",
                "Salta"
            ]
        };

        // 2. Convertir el objeto JavaScript a formato JSON (string)
        const contenidoJSON = JSON.stringify(argentina, null, 2);

        // 3. Construir la ruta al nuevo archivo
        const rutaArchivo = join(process.cwd(), 'argentina.json');

        // 4. Escribir/Crear el archivo (asíncrono)
        await writeFile(rutaArchivo, contenidoJSON, { encoding: 'utf8' });

        console.log(`✅ Éxito: Archivo 'argentina.json' creado correctamente.`);
        console.log(`Ruta: ${rutaArchivo}`);

    } catch (error) {
        // 5. Gestionar errores con try/catch
        console.error('❌ Ocurrió un error al crear el archivo:');


    }
}

// Ejecutar la función
crearArchivoArgentina();