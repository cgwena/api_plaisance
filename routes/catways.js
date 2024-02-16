var express = require('express');
var router = express.Router();

const catwayCtrl = require('../controllers/catways')
const reservationCtrl = require('../controllers/reservations')

router.get('/', catwayCtrl.getAllCatways);
router.get('/:id', catwayCtrl.getOneCatway);
router.post('/', catwayCtrl.createCatway);
router.put('/:id', catwayCtrl.updateCatway);
router.patch('/:id', catwayCtrl.updateCatway);
router.delete('/:id', catwayCtrl.deleteCatway);

router.get('/:id/reservations', reservationCtrl.getAllReservations);
router.get('/:id/reservations/:idReservation', reservationCtrl.getOneReservation);
router.post('/:id/reservations', reservationCtrl.createReservation);
router.delete('/:id/reservations/:idReservation', reservationCtrl.deleteReservation);

module.exports = router;