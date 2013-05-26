var count = 0;

// Devuelve el contador
exports.getCount = function() {return count;};
//exports.increaseCount = function() {count++;};

// El middleware para incrementar el contador
exports.count_mw = function(req, res, next) {
    if (req.path == '/') {
        count++;
    }
    next();
};
