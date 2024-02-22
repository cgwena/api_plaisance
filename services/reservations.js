const Reservations = require('../models/reservations')
const User = require('../models/users')
const Catway = require('../models/catways')

exports.createReservation = async (req, res, next) => {
    try {
        //const reservationObject = JSON.parse(req.body.thing)
        //delete reservationObject._id
        //delete reservationObject._userId
        const reservation = new Reservations({
            catwayNumber: req.body.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        })
        const catway = await Catway.findOne({ catwayNumber: reservation.catwayNumber })
        catway.catwayState = 'réservé'
        await reservation.save()
        await catway.save()
        res.status(201).json({ message: 'Réservation enregistrée !' });
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getOneReservation = async (req, res, next) => {
    try {
        const reservation = await Reservations.findOne({ _id: req.params.idReservation })
        if (!reservation) {
            return res.status(400).json({ message: 'Réservation non trouvée' })
        }
        res.status(200).render('reservation_detail', {reservation : reservation})
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservations.find()
        res.status(200).render('reservations', { reservations: reservations })
    } catch (error) {
        res.status(400).render({ error })
    }
};

exports.deleteReservation = async (req, res, next) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: reservation.catwayNumber })
        catway.catwayState = 'libre'
        await catway.save()
        await Reservations.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Réservation supprimée !' })
    } catch (error) {
        res.status(400).json({ error })
    }
}