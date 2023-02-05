const { Content } = require('../validations/index');
const Publication = require('../domain');
const User = require('../../user/domain/model');



async function create(req, res) {

  try {

    req.body.idUser = req.usuario.id;

    const body = await Content.validateAsync(req.body);
    const data = await Publication.create(body);

    if (!data) {
      res.send({
        ok: false,
        message: 'No se pudo crear el elemento'
      })
    }

    res.send({
      ok: true,
      data
    })

  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function getAll(req, res) {

  try {

    const data = await Publication.all({
      include: [{ model: User, attributes: ['name', 'img'] }],
      order: [
        ['id', 'DESC'],
      ],
    });

    if (!data) {
      return res.send({
        ok: false,
        message: 'Sin datos',
      })
    }

    res.send({
      ok: true,
      data
    })

  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

async function getById(req, res) {

  try {

    let id = req.params.id;

    const data = await Publication.single({
      where: { id },
      include: [{ model: User, attributes: ['name', 'img'] }],
      order: [
        ['id', 'DESC'],
      ],
    });

    if (!data) {
      return res.send({
        ok: false,
        message: 'Sin datos',
      })
    }

    res.send({
      ok: true,
      data
    })

  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}


module.exports = {
  create,
  getAll,
  getById,
}
