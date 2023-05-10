var express = require('express');
var router = express.Router();

const {query, validationResult} = require ('express-validator');
const Anuncio = require('../models/Anuncio');


/* GET home page. */
// router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
// });

router.get('/', async function(req,res,next) {
  try {

    // filtros
    const filtro = {};
        
    // filtro nombre: que empiece por el texto marcado
    const filterByNombre = req.query.nombre;
    if (filterByNombre) {
      const filterByNombre = new RegExp('^' + req.query.nombre,"i");
      filtro.nombre = filterByNombre;
    }
        
    // filtro: si es venta o no
    const filterByVenta = req.query.venta;
    if (filterByVenta) {
      filtro.venta = filterByVenta;
    }
        
    // filtro precio : posibilidades: desde-hasta , desde- -hasta , fijo
    const filterByPrecio = req.query.precio;
    if (filterByPrecio) {
      // Convertimos el filtro en formato "MIN-MAX" en un array ["MIN","MAX"]
      const valores = filterByPrecio.split('-');
      if (valores[0] === filterByPrecio) {
          // Precio exacto --> precio=X
          filtro.precio = valores[0]
      } else {
          if (valores[0] && !valores[1]) {
              // Precio mayor que --> precio=X-
              filtro.precio = {'$gte':valores[0]}
          } else {
              if (!valores[0] && valores[1]) {
                  // Precio menor que --> precio=-X'
                  filtro.precio = {'$lte':valores[1]}
              } else {
                  if (valores[1]) {
                      // Intérvalo --> Precio=X-Y
                      filtro.precio = {'$gte':valores[0], '$lte':valores[1]};
                  }
              }
          }
      }
  }

    // filtro tags, en la llamada lo llamo "tag" en singular
    const filterByTag = req.query.tag;
    if (filterByTag) {
        filtro.tags = filterByTag;
    }

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // ordenación
    const sort = req.query.sort;

    // campos
    const fields = req.query.fields;
       
    const anuncios = await Anuncio.lista(filtro, skip, limit, sort, fields);

    res.locals.anuncios = anuncios;
    res.render('index');
    
  } catch (error) {
    next(error);
  }
});


module.exports = router;
