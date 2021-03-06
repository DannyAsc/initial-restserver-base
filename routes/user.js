const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {
	esRolValido,
	emailExiste,
	existeUsuarioPorId,
} = require('../helpers/db-validators');

const {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete,
} = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password debe ser mas de 6 letras').isLength({
			min: 6,
		}),
		check('correo', 'El correo no es válido').isEmail().custom(emailExiste),
		// check('rol', 'No es un rol válido').isIn('ADMIN_ROLE', 'USER_ROLE'),
		check('rol').custom(esRolValido),
		validarCampos,
	],
	usersPost
);

router.put(
	'/:id',
	[
		check('id', 'No es un ID válido').isMongoId().custom(existeUsuarioPorId),
		check('rol').custom(esRolValido),
		validarCampos,
	],
	usersPut
);

router.patch('/', usersPatch);

router.delete(
	'/:id',
	[
		check('id', 'No es un ID válido').isMongoId().custom(existeUsuarioPorId),
		validarCampos,
	],
	usersDelete
);

module.exports = router;
