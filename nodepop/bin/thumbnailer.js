'use strict'

const Jimp = require('jimp');

const Anuncio = require('../models/Anuncio');
const { Responder } = require('cote');

const responder= new Responder({ name: 'thumbnails maker' });

const generarThumbnail = async () => {
    const foto = await Foto.findOne({}); // Obtén un documento de la colección (puedes ajustar esta consulta según tus necesidades)
  
    const image = await Jimp.read(foto.fotosubida);
    await image.resize(200, 200).writeAsync('ruta_del_thumbnail'); // Reemplaza 'ruta_del_thumbnail' por la ruta real del thumbnail
  
    foto.thumbnail = 'ruta_del_thumbnail'; // Reemplaza 'ruta_del_thumbnail' por la ruta real del thumbnail
    await foto.save();
  
    console.log('Thumbnail generado y campos actualizados correctamente');
};

responder.on('create-thumbnail', (req, done) => {
    generarThumbnail().catch(err => {
      console.error('Error al generar thumbnail:', err);
    });
});



  
  // Llama a la función generarThumbnail para ejecutar el proceso
  