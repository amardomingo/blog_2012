var models = require('../models/models.js');

/*
*  Auto-loading con app.param
*/
exports.load = function(req, res, next, id) {

   models.Favourite
        .find({where: {authorId: Number(id)}})
        .success(function(favs) {
            if (favs) {
                console.log('AutoLoadfavs: ' + favs);
                req.fav = favs;
                next();
            } else {
                // Simplemente no tiene favoritos
                //req.flash('error', 'El post con id ' + id + ' no está en favoritos' );
                //next('El post con id ' + id + ' no está en favoritos');
            }
        })
        .error(function(error) {
            next(error);
        });
};


// List all the favs.
// GET /users/:userid/favourites
exports.index = function(req, res, next) {
// Busqueda del array de posts favoritos de un usuario

  models.Favourite.findAll({where: {authorId: req.user.id}})
     .success(function(favourites) {

         // generar array con postIds de los post favoritos

         var postIds = favourites.map( 
                            function(favourite) 
                              {return favourite.postId;}
                           );

        // busca los posts identificados por array postIds

        var patch;

        if (postIds.length == 0) {
            patch= '"Posts"."id" in (NULL)';
        } else {
            patch='"Posts"."id" in ('+postIds.join(',')+')';
        } 

        // busca los posts identificados por array postIds

        models.Post.findAll({order: 'updatedAt DESC',

                    where: patch, 

                    include:[{model:models.User,as:'Author'},
                    models.Favourite ]
                 })
                 .success(function(posts) {
                        res.render('favourites/index', {
                            posts: posts
                        });
                 })
                 .error(function(error) {
                    next(error);
                 });
        })
        .error(function(error) {
            next(error);
        });
//    });                    
};

// PUT  /users/:userid/favourites/:postid
exports.add = function(req, res, next) {
    // Compruebo que no esté ya añadido. O no...
    //models.Favourite.find({where: {authorId: req.user.id, postId: req.post.id}})
      //      .success(function(post){
        //        if (post.length == 0) {
                    // No esta en favoritos, lo añado
                    console.log('user: ' + req.session.user.id);
                    console.log('post: ' + req.post.id);
                    var fav = models.Favourite.build({
                        authorId: req.session.user.id,
                        postId: req.post.id}
                    );
                    console.log('Añadiendo: ' + fav);
                    var validate = fav.validate();
                    if (validate) {
                        for (var error in validate) {
                            req.flash('error', validate[error])
                        }
                        
                        res.redirect('/posts/' + req.post.id);
                        return;
                    }
                    
                    // Guardamos el fav
                    fav.save()
                        .success(function() {
                            req.flash('success', 'Post añadido a favoritos');
                            res.redirect('/posts/' + req.post.id);
                        })
                        .error(function(error) {
                            next(error);
                        });
                    
                //} else {
                //    req.flash('info', 'El post ya está en favoritos');
               // }
            //})
            //.error(function(error) {
            //    next(error);
            //});
};


// DELETE  /users/:userid/favourites/:postid
exports.delete = function(req, res, next) {
    // Compruebo que exista
    models.Favourite.find({where: {authorId: req.user.id, postId: req.post.id}})
            .success(function(post){
                if (post) {
                    req.favourites.destroy();
                } else {
                    req.flash('info', 'El post no está en favoritos');
                }
            })
            .error(function(error) {
                next(error);
            });
};

