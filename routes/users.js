var express = require('express');
var router = express.Router();
let connection = require('../config/db.js');

// La URL de esta ruta parte de --- localhost3000/user

router.get('/', function(req, res, next) {

  let sql = `SELECT * FROM user`;

  connection.query(sql,function(err, results){
    if(err){
      throw err;
    }

    res.render('user', {results});
  })
});


// POST USERS LISTS ------CREATE------

router.post('/guardar', function(req,res){

  let name = req.body.name;
  let last_name = req.body.last_name;

  let sql = `INSERT INTO user (name, last_name) VALUES ('${name}','${last_name}')`

  connection.query(sql, function(err, result){
    if(err){
      throw err;
    }
    
    // 'redirect' te redirecciona a una seccion concreta
    
    res.redirect('/users')
  })
})

// GET users Eliminar ------DELETE ----

router.get('/eliminar/:iduser', function(req,res){
  console.log(req.params);
  let iduser = req.params.iduser;

  let sql = `DELETE FROM user WHERE iduser = ${iduser}`

  connection.query(sql, function(err,result){
    if(err) throw err;
    res.redirect('/users')
  });
})

// GET users Editar para traernos los datos de un usuario en concreto ------EDIT ----

router.get('/perfil/:iduser', function(req,res){
  console.log(req.params);
  let iduser = req.params.iduser
  let sql = `SELECT * FROM user WHERE iduser = ${iduser}`

  connection.query(sql, function(err,result){
    if(err) throw err;
    res.render('userProfile', {result:result[0]})
  });
});
router.post('/update/:iduser', function(req, res) {
  console.log(req.params)
  let iduser = req.params.iduser
  console.log(req.body)
  let name = req.body.name
  let last_name = req.body.last_name
  // let name = req.body.name;
  let sql = `UPDATE  user SET name = '${name}', last_name = '${last_name}' WHERE iduser= ${iduser}`;
  connection.query(sql, function(err, result) {
      if (err) throw err;
      res.redirect('/users')
  })
})

module.exports = router;


