const Catway = require('../models/catways.js')

exports.createCatway = async (req, req, next) => {
    try {
        const catwayObject = JSON.parse(req.body.thing)
        delete catwayObject._id
        delete catwayObject._userId
        const catway = new Catway({
            ...catwayObject,
            userId: req.auth.userId,
        })
        await catway.save()
        res.status(201).json({ message: 'Catway enregistré !' });
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getOneCatway = async (req, res, next) => {
    try {
        const catway = await Catway.findOne({ _id: req.params.id })
        if (!catway) {
            return res.status(400).json({ message: 'Catway non trouvé' })
        }
        res.status(200).json({ catway })
        
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllCatways = async (req, res, next) => {
    try {
        const catways = await Catway.find()
        res.status(200).json(catways)
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.updateCatway = async (req, res, next) => {
    try {
        await Catway.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    } catch (error) {
        res.status(400).json({ error })
    }
};
    
exports.deleteCatway = async (req, res, next) => {
    try {
        await Catway.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Catway supprimé !' })
    } catch (error) {
        res.status(400).json({ error })
    }
}