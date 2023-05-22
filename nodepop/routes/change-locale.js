const express = require('express');
const router = express.Router();

/* GET /change-locale */
router.get('/:locale', (req,res,next) => {
    
    const locale = req.params.locale;

    // Ponemos una cookie en la respuesta que indique el nuevo locale al browser
    res.cookie('nodepop-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30  // Expira en 1 mes
    })

    // responder con redirección a la página de donde venia
    res.redirect(req.get('referer'));
});

module.exports = router;
