const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { Promise } = require('mongoose');

const usersGet = async (req = request, res = response) => {
	// const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
	const { limite = 5, desde = 0 } = req.query;
	// const usuarios = await Usuario.find({ estado: true })
	// 	.skip(desde)
	// 	.limit(limite);
	// const total = await Usuario.countDocuments({ estado: true });

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments({ estado: true }),
		Usuario.find({ estado: true }).skip(desde).limit(limite),
	]);

	res.json({
		total,
		usuarios,
	});
};

const usersPost = async (req, res = response) => {
	const { nombre, correo, password, rol } = req.body;

	const usuario = new Usuario({ nombre, correo, password, rol });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	// Guardar en BD
	await usuario.save();

	res.json({
		usuario,
	});
};

const usersPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, email, ...resto } = req.body;

	// TODO validar contra base de datos
	if (password) {
		// Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);
	res.json(usuario);
};

const usersPatch = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'patch API - controlador',
	});
};

const usersDelete = async (req, res = response) => {
	const { id } = req.params;

	// Eliminacion fisica
	// const usuario = await Usuario.findByIdAndDelete(id);
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
	res.json({
		id,
		usuario,
	});
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete,
};
