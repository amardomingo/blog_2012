
/*
 * GET home page.
 */
var count = require('../count.js');
exports.index = function(req, res){
// añadimos el valor de count a la vista
  res.render('index', { title: 'Express', counter: count.getCount() });
};
