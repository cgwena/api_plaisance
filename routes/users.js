var express = require('express');
var router = express.Router();

const auth = require('../middlewares/auth')


const userCtrl = require('../services/users')
// Route pour afficher la page signup
router.get('/signup', (req, res) => {
    
    res.render('signup', { title: 'Port de plaisance Russel' });
});

// Route pour gérer la soumission du formulaire d'inscription
router.post('/signup', userCtrl.signup);
router.post('/', userCtrl.login)

router.get('/welcome', auth, (req, res) => {
    res.render('welcome', {catways, users} );
});

router.get('/users', auth, userCtrl.getAllUsers)
router.get('/users/:id', auth, userCtrl.getOneUser);
router.post('/users/', auth, userCtrl.createUser);
router.put('/users/:id', auth, userCtrl.updateUser);
router.patch('/users/:id', auth, userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

module.exports = router;
