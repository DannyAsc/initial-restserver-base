const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no está registrado en la BD`);
	}
};

const emailExiste = async (correo = '') => {
	const existEmail = await Usuario.findOne({ correo });
	if (existEmail) {
		// return res.status(400).json({
		// 	msg: 'Ese coreo ya está registrado',
		// });
		throw new Error(`El email ${correo} ya esta registrado a un usuario`);
	}
};

const existeUsuarioPorId = async (id) => {
	const existUsuario = await Usuario.findById(id);
	if (!existUsuario) {
		// return res.status(400).json({
		// 	msg: 'Ese coreo ya está registrado',
		// });
		throw new Error(`El ID no existe ${id} `);
	}
};

module.exports = {
	esRolValido,
	emailExiste,
	existeUsuarioPorId,
};
