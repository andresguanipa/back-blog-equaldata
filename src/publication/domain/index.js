 const Publication = require('./model');
 
function single(attr) {
  return Publication.findOne(attr)
}

function all(attr) {
  return Publication.findAll(attr)
}

function create(attr) {
  return Publication.create(attr)
}

function up(attr, where) {
  return Publication.update(attr, where)
}



module.exports = {
  single,
  all,
  create,
  up
}
