var Monad = function(){
    
}

Monad.prototype.setAppName = function(app) {
    
    var monad = function(req, res, next) {
      req.appName = app.get("appName");
      next();
    };
    
    return monad;

}
Monad.prototype.exampleOfPort = function(app) {
    
    var monad = function(req, res, next) {
      req.port = app.get("port");
      next();
    };
    
    return monad;

}


module.exports = function() { 
    return new Monad();
}