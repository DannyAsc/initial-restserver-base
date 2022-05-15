const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
	const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
	res.json({
		msg: 'get API - controlador',
		q,
		nombre,
		apikey,
		page,
		limit,
	});
};

const usersPost = (req, res = response) => {
	const body = req.body;
	res.json({
		msg: 'post API - controlador',
		body,
	});
};

const usersPut = (req, res = response) => {
	id = req.params.id;
	res.json({
		msg: 'put API - controlador',
		id,
	});
};
const usersPatch = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'patch API - controlador',
	});
};
const usersDelete = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'delete API - controlador',
	});
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete,
};
