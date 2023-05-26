'use strict'

const jimp = require('jimp');
const path = require('node:path');
// const Anuncio = require('../models/Anuncio');

const { Responder } = require('cote');

const responder= new Responder({ name: 'thumbnails maker' });

//  Versión que únicamente genera el Thumbnail y lo guarda  
responder.on('create-thumbnail', async (req,done) => {
  try {
    const rutaImagenOriginal = req.fotosubida;
    const rutaThumbnail = req.thumbnail;
    
    const imagenOriginal = await jimp.read(path.join(__dirname,'..','public','fotossubidas',rutaImagenOriginal));
    imagenOriginal.resize(100, 100).write(path.join(__dirname,'..','public','thumbnails',rutaThumbnail)); // Cambiar el tamaño del thumbnail según tus necesidades
  
    console.log('Thumbnail creado --> ', rutaThumbnail);
    done(true)

  } catch (error) {
    console.error('Error al generar el thumbnail:', error);
  }
})

/* VERSION QUE NO FUNCIONA, NO ALMACENA EL ANUNCIO

responder.on('create-thumbnail', async (req,done) => {
  try {
    const anuncio = new Anuncio(req.anuncio);

    const rutaImagenOriginal = anuncio.fotosubida;
    const rutaThumbnail = rutaImagenOriginal.replace('.jpg', '-thumbnail.jpg'); // Cambiar la extensión a "x.jpg"

    const imagenOriginal = await jimp.read(path.join(__dirname,'..','public','fotossubidas',rutaImagenOriginal));
    imagenOriginal.resize(100, 100).write(path.join(__dirname,'..','public','thumbnails',rutaThumbnail)); // Cambiar el tamaño del thumbnail según tus necesidades

    await anuncio.updateOne({ thumbnail: rutaThumbnail });
  
  } catch (error) {
    console.error('Error al generar el thumbnail:', error);
  }
})
*/