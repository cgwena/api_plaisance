const Reservations = require('../models/reservations')

exports.createReservation = async (req, req, next) => {
    try {
        const reservationObject = JSON.parse(req.body.thing)
        delete reservationObject._id
        delete reservationObject._userId
        const reservation = new Reservations({
            ...reservationObject,
            userId: req.auth.userId,
        })
        await reservation.save()
        res.status(201).json({ message: 'Réservation enregistrée !' });
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getOneReservation = async (req, res, next) => {
    try {
        const reservation = await Reservations.findOne({ _id: req.params.id })
        if (!reservation) {
            return res.status(400).json({ message: 'Réservation non trouvée' })
        }
        res.status(200).json({ reservation })

    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservations.find()
        res.status(200).json(reservations)
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.deleteReservation = async (req, res, next) => {
    try {
        await Reservations.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Réservation supprimée !' })
    } catch (error) {
        res.status(400).json({ error })
    }
}