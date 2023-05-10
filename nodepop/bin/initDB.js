'use strict';

const Anuncio = require('../models/Anuncio');
const connection = require ('../lib/connectMongoose');

main().catch(err => console.log('***There was an error***',err));

async function main() {

    await initAnuncios();

    connection.close();
}

async function initAnuncios() {

    // Eliminar anuncios anteriores
    const deleted = await Anuncio.deleteMany();
    console.log(`***Eliminados ${deleted.deletedCount} anuncios.***`);

    // Crear anuncios iniciales
    const inserted = await Anuncio.insertMany ([
        {nombre:'Anuncio1',venta:true, precio: 100, foto:'foto1.jpg', tags: ['motor', 'mobile']},
        {nombre:'Anuncio2',venta:true, precio: 200, foto:'foto2.jpg', tags: ['lifestyle', 'mobile']},
        {nombre:'Anuncio3',venta:true, precio: 300, foto:'foto3.jpg', tags: ['lifestyle', 'motor']},
        {nombre:'Anuncio4',venta:false, precio: 400, foto:'foto4.jpg', tags: ['motor']},
    ]);
    console.log(`***Creados ${inserted.length} anuncios.***`)
}
