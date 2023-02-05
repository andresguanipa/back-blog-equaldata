const User = require('../domain');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { Username, New } = require('../validations/index');


async function login(req, res) {

  try {
    const { username, password } = await Username.validateAsync(req.body);

    const passwordHash = md5(password);

    User.single({
      where: { username }
    }).then(data => {

      if (!data) {
        return res.send({
          ok: false,
          message: 'Usuario o contraseña incorrectos'    // Si el usuario no existe...
        })
      }

      if (passwordHash !== data.password) {
        return res.send({
          ok: false,
          message: 'Usuario o contraseña incorrectos'      // Si la contraseña es incorrecta...
        })
      }

      let token = jwt.sign({
        usuario: data
      }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });   // Si los datos son correctos, creamos el token

      data.password = null;

      res.send({
        ok: true,
        usuario: data,
        token
      });


    }).catch(err => {
      return res.send({
        ok: false,
        message: 'Se ha producido un error, por favor vuelve a intentarlo',
        err
      });
    });

  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function comprobate(req, res) {

  try {
    res.send({
      ok: true,
      message: 'Auth-token',
      user: req.usuario
    });

  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function signup(req, res) {

  try {

    let body = await New.validateAsync(req.body);

    User.single({
      where: { username: body.username }
    }).then(data => {

      if (data) {
        return res.send({
          ok: false,
          message: 'El nombre de usuario ingresado ya existe'
        })
      }

      console.log(data);

      body.password = md5(body.password);

      User.create(body).then(data => {

        res.send({
          ok: true,
          usuario: data,
        });

      }).catch(err => {
        return res.send({
          ok: false,
          message: 'Se ha producido un error, por favor vuelve a intentarlo',
          err
        });
      });

    }).catch(err => {
      return res.send({
        ok: false,
        message: 'Se ha producido un error, por favor vuelve a intentarlo',
        err
      });
    });



  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function updateUser(req, res) {

  try {

    let data = await User.up(req.body, { where: { id: req.body.id } });

    if (!data) {

      return res.send({
        ok: false,
        message: "An error has ocurred",
      });

    }

    res.send({
      ok: true,
      usuario: data,
    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function updatePassword(req, res) {

  try {

    let body = req.body;
    body.id = req.usuario.id;
    let passwordHash = md5(body.password);

    let data = await User.single({
      where: { id: body.id }
    })

    console.log(passwordHash);
    console.log(data.password);

    if (passwordHash != data.password) {
      return res.send({
        ok: false,
        message: 'La contraseña actual ingresada es incorecta'      // Si la contraseña es incorrecta...
      })
    }

    let newData = {
      password: md5(req.body.newPassword)
    }

    let update = await User.up(newData, { where: { id: body.id } });

    if (!update) {

      return res.send({
        ok: false,
        message: "Ocurrió un error inesperado intentando actualizar la contraseña",
      });

    }

    res.send({
      ok: true,
      usuario: data,
    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function updateName(req, res) {

  try {

    let body = req.body;
    body.id = req.usuario.id;

    let newData = {
      name: body.name
    }

    let update = User.up(newData, { where: { id: body.id } })

    if (!update) {

      return res.send({
        ok: false,
        message: "Ocurrió un error inesperado intentando actualizar el nombre",
      });

    }

    res.send({
      ok: true,
      message: 'El nombre se actualizó correctamente'
    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}


module.exports = {
  login,
  signup,
  comprobate,
  updateUser,
  updatePassword,
  updateName
}
