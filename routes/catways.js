const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')

const catwayCtrl = require('../services/catways')
const reservationCtrl = require('../services/reservations')

router.get('/reservations', auth, reservationCtrl.getAllReservations)
router.get('/reservations/:idReservation', auth, reservationCtrl.getOneReservation);



router.get('/', auth, catwayCtrl.getAllCatways);
router.get('/:id', auth, catwayCtrl.getOneCatway);
router.post('/', auth, catwayCtrl.createCatway);
router.put('/:id', auth, catwayCtrl.updateCatway);
router.patch('/:id', auth, catwayCtrl.updateCatway);
router.delete('/:id', catwayCtrl.deleteCatway);

//router.get('/:id/reservations',auth, reservationCtrl.getAllReservations);
router.post('/:id/reservations', auth, reservationCtrl.createReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationCtrl.deleteReservation);

module.exports = router;