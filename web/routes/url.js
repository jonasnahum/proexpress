var express = require('express');
var router = express.Router();


router.param('texto', function (request, response, next, texto) {
    request.texto = texto;
    return next();
});
    
router.get('/texto/:texto', function(request, response, next) {
    var texto = request.texto;
    return response.render("texto", {
        texto:texto
    });
});
router.get('/:nombre/:apellido', function(req, res, next) {
    var userName = req.query.userName;
    var password = req.query.password;
    var nombre = req.params.nombre;
    var apellido = req.params.apellido;
    res.render("urlparams", {
            userName: userName, password: password,
            nombre: nombre, apellido: apellido
        });

});
router.get('/prueba/:texto/prueba', function(request, response, next) {
    var texto = request.texto;
    return response.render("texto", {
        texto:texto
    });
});
         
router
    .route('/posts')
    .post(function(request, response, next){
        console.log("se cargo el metodo post");
})
    .get(function(request, response, next){
        console.log("se cargo el get en router");
    response.json(request.post);
})
    .put(function(request, response, next){
        console.log("se cargo el metodo put");
    response.json(request.post);
})
    .delete(function(request, response, next){
        console.log("se cargo el metodo delete");
    response.json({'message': 'ok'});
})


    

module.exports = router;
