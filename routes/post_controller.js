
var models = require('../models/models.js');


/*
*  Auto-loading con app.param
*/
exports.load = function(req, res, next, id) {

   models.Post
        .find({where: {id: Number(id)}})
        .success(function(post) {
            if (post) {
                req.post = post;
		            next();
            } else {
		            req.flash('error', 'No existe el post con id='+id+'.');
                next('No existe el post con id='+id+'.');
            }
        })
        .error(function(error) {
            next(error);
        });
};


// GET /posts
exports.index = function(req, res, next) {
    models.Post
            .findAll({ order: 'updatedAt DESC',
                include: [{model:models.User, as:'Author'}]
            })
            .success(function(posts) {
                var contados = 0;
                var nComments = [];
                for (var i in posts) {
                    // Lo incializo a 0;
                    nComments[i] = 0;
                    // el id empieza por 1, mientras que el indice por 0.
                    models.Comment.count({where: {postId: parseInt(i) +1}})
                        .success(function(count) {
                            if(count) {
                                nComments[posts.length - contados -1] = count;
                            }
                            // Respondo una vez que tengo todos
                            contados++;
                            if ((contados) == posts.length) {
                                console.log("contados: " + contados);
                                console.log(nComments);
                                res.render('posts/index', {posts: posts, nComments: nComments});
                            }
                        })
                        .error(function(error) { 
                            return;
                         });
                }
            })
            .error(function(error) {
                next(error);
            });
};

// GET /posts/33
exports.show = function(req, res, next) {
    // Buscar el autor
    models.User
            .find({where: {id: req.post.authorId}})
            .success(function(user) {
                // Si encuentro al autor lo añado como el atributo author,
                // sino añado {}.
                req.post.author = user || {};
                // Buscar comentarios
                models.Comment.findAll({where: {postId: req.post.id},
                                        order: 'updatedAt DESC',
                                        include: [{ model: models.User, as: 'Author' }]
                                })
                                .success(function(comments) {
                                    var new_comment = models.Comment.build({
                                        body: 'Introduzca el texto del comentario'
                                    });
                                    models.Comment.count({where: {postId: req.post.id}})
                                            .success(function(count) {
                                                req.post.ccount = count;
                                                res.render('posts/show',
                                                {post: req.post,
                                                comments: comments,
                                                comment: new_comment
                                                });
                                                })
                                            .error(function(error) { 
                                                next(error)
                                             });

                                    //res.render('posts/show', {
                                    //    post: req.post, // post a mostrar
                                     //   comments: comments, // comentarios al post
                                    //    comment: new_comment // para editor de comentarios
                                    //});
                                })
                                .error(function(error) {next(error);});
            })
            .error(function(error) {
                next(error);
            });
};

// GET /posts/new
exports.new = function(req, res, next) {

    var post = models.Post.build(
        { title:  'Introduzca el titulo',
          body: 'Introduzca el texto del articulo'
        });
    
    res.render('posts/new', {post: post});
};

// POST /posts
exports.create = function(req, res, next) {

    var post = models.Post.build(
        { title: req.body.post.title,
          body: req.body.post.body,
          authorId: req.session.user.id
        });
    
    var validate_errors = post.validate();
    if (validate_errors) {
        console.log("Errores de validación:", validate_errors);

        req.flash('error', 'Los datos del formulario son incorrectos.');
        for (var err in validate_errors) {
           req.flash('error', validate_errors[err]);
        };

        res.render('posts/new', {post: post,
                                 validate_errors: validate_errors});
        return;
    } 
    
    post.save()
        .success(function() {
            req.flash('success', 'Post creado con éxito.');
            res.redirect('/posts');
        })
        .error(function(error) {
            next(error);
        });
};

// GET /posts/33/edit
exports.edit = function(req, res, next) {
    res.render('posts/edit', {post: req.post});
};

// PUT /posts/33
exports.update = function(req, res, next) {
    req.post.title = req.body.post.title;
    req.post.body = req.body.post.body;
    
    var validate_errors = req.post.validate();
    if (validate_errors) {
        console.log("Errores de validacion:", validate_errors);
        res.render('posts/edit', {post: req.post});
        return;
     }
    req.post.save(['title','body'])
            .success(function() {
                res.redirect('/posts');
            })
            .error(function(error) {
                console.log("Error: No puedo editar el post:", error);
                res.render('posts/edit', {post: req.post});
            });
};

// DELETE /posts/33
exports.destroy = function(req, res, next) {
    var Sequelize = require('sequelize');
    var chainer = new Sequelize.Utils.QueryChainer

    // Obtener los comentarios
    req.post.getComments()
            .success(function(comments) {
                for (var i in comments) {
                    // Eliminar un comentario
                    chainer.add(comments[i].destroy());
                }
            // Eliminar el post
            chainer.add(req.post.destroy());
            // Ejecutar el chainer
            chainer.run()
                    .success(function(){
                        req.flash('success', 'Post (y sus comentarios) eliminado con éxito.');
                        res.redirect('/posts');
                     })
                    .error(function(errors){ next(errors[0]); })
            })
            .error(function(error) { next(error); });
};

/*
* Comprueba que el usuario logeado es el author.
*/
exports.loggedUserIsAuthor = function(req, res, next) {
    if (req.session.user && req.session.user.id == req.post.authorId) {
        next();
    } else {
        console.log('Prohibida: usuario logeado no es el autor.');
        res.send(403);
    }
};

