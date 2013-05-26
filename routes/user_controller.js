var models = require('../models/models.js');
/*
* Auto-loading con app.param
*/
exports.load = function(req, res, next, id) {
    models.User
        .find({where: {id: Number(id)}})
        .success(function(user) {
    
            if (user) {
                req.user = user;
            next();
            } else {
                req.flash('error', 'No existe el usuario con id='+id+'.');
                next('No existe el usuario con id='+id+'.');
            }
        })
        .error(function(error) {
            next(error);
        });
};

var crypto = require('crypto');
function createNewSalt() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};
function encriptarPassword(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

exports.autenticar = function(login, password, callback) {
    models.User.find({where: {login: login}})
               .success(function(user) {
                    if (user) {
                        if (user.hashed_password == "" && password == "") {
                            callback(null,user);
                            return;
                        }
                        var hash = encriptarPassword(password, user.salt);
                        if (hash == user.hashed_password) {
                            callback(null,user);
                        } else {
                            callback('Password erróneo.');
                        };
                    } else {
                        callback('No existe ningún usuario registrado con ese login.');
                    }
              })
             .error(function(err) {
                callback(err);
             });
};


// ----------------------------------
// Rutas
// ----------------------------------

// GET /users
exports.index = function(req, res, next) {
    console.log("users.index");
    models.User
        .findAll({order: 'name'})
        .success(function(users) {
            console.log("Intentando renderizar");
            res.render('users/index', {
                users: users
             });
        })
        .error(function(error) {
            next(error);
            });
};


// GET /users/33
exports.show = function(req, res, next) {
    res.render('users/show', {
        user: req.user
    });
};

// GET /users/new
exports.new = function(req, res, next) {
    var user = models.User.build(
        { login: 'Tu login',
          name: 'Tu nombre',
          email: 'Tu email'
        });
    res.render('users/new', {user: user});
};

// GET /users/33/edit
exports.edit = function(req, res, next) {
    res.render('users/edit', {user: req.user});
};

// POST /users
exports.create = function(req, res, next) {
    var user = models.User.build({ login: req.body.user.login,
            name: req.body.user.name,
            email: req.body.user.email,
            });
            
     // El password no puede estar vacio
    if ( ! req.body.user.password) {
        req.flash('error', 'El campo Password es obligatorio.');
        res.render('users/new', {user: user});
        return;
    }
    user.salt = createNewSalt();
    user.hashed_password = encriptarPassword(req.body.user.password, user.salt);
    user.save()

    // El login debe ser unico:
    models.User
    .find({where: {login: req.body.user.login}})  // no se usa “built”, se busca en la BD
    .success(function(existing_user) {
        if (existing_user) {
            req.flash('error', "Error: El usuario \""+ req.body.user.login +"\" ya existe.");
            res.render('users/new',
                { user: user,
                  validate_errors: {login: 'El usuario \"'+ req.body.user.login +'\" ya existe.'}
                });
            return;
        } else {
            var validate_errors = user.validate();
            if (validate_errors) {
                req.flash('error', 'Los datos del formulario son incorrectos.');
                for (var err in validate_errors) {
                    req.flash('error', validate_errors[err]);
                };
                res.render('users/new', {user: user,
                validate_errors: validate_errors});
                return;
             }
            user.save()
                .success(function() {
                    req.flash('success', 'Usuario creado con éxito.');
                    res.redirect('/users');
                })
                .error(function(error) { next(error); });
        }
    })
    .error(function(error) { next(error); });
};

// PUT /users/33
exports.update = function(req, res, next) {
    req.user.name = req.body.user.name;
    req.user.email = req.body.user.email;
    var validate_errors = req.user.validate();
    
    if (validate_errors) {
        console.log("Errores de validación:", validate_errors);
        req.flash('error', 'Datos del formulario son incorrectos.');
        for (var err in validate_errors) {
            req.flash('error', validate_errors[err]);
        };
    
        res.render('users/edit', {user: req.user,
        validate_errors: validate_errors});
        return;
    }

    var fields_to_update = ['name','email'];
    if (req.body.user.password) { // ¿Cambio el password?
        console.log('Hay que actualizar el password');
        req.user.salt = createNewSalt();
        req.user.hashed_password = encriptarPassword(req.body.user.password,
        req.user.salt);
        fields_to_update.push('salt');
        fields_to_update.push('hashed_password');
    }

    req.user.save(fields_to_update)
            .success(function() {
                req.flash('success', 'Usuario actualizado con éxito.');
                res.redirect('/users');
             })
            .error(function(error) {
                next(error);
            });
};



// DELETE /users/33
exports.destroy = function(req, res, next) {
    req.user.destroy()
            .success(function() {
                req.flash('success', 'Usuario eliminado con éxito.');
                res.redirect('/users');
            })
            .error(function(error) {
                next(error);
            });
};

