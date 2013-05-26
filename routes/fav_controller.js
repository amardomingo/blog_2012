

// List all the favs.
// GET /users/:userid/favourites
exports.index = function(req, res, next) {
// Busqueda del array de posts favoritos de un usuario

  models.Favourite.findAll({where: {userId: req.user.id})
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

                            //TODO
                 })
                 .error(function(error) {
                    next(error);
                 });
        })
        .error(function(error) {
            next(error);
        });
    });                    
};

// PUT  /users/:userid/favourites/:postid
exports.add = function( req, res, next) {
    // TODO
};


// DELETE  /users/:userid/favourites/:postid
exports.delete = function(req, res, next) {
    //TODO
};

