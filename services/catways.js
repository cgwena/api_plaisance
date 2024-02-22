const Catway = require('../models/catways')

exports.createCatway = async (req, res, next) => {
    try {
        const catwayObject = req.body.catway
        delete catwayObject._id
        delete catwayObject._userId
        const catway = new Catway({
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState,
        })
        await catway.save()
        res.status(201).redirect('/catways');
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
        res.status(200).render('catway_detail', {catway : catway})
        
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllCatways = async (req, res, next) => {
    try {
        const catways = await Catway.find()
        res.status(200).render('catways', { catways: catways })
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.updateCatway = async (req, res, next) => {     
    try {
        await Catway.updateOne({ _id: req.params.id }, {
            _id: req.params.id,
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState,
            
        })
        return res.status(200).json('Catway modifié')
            //redirect('/catways', { catway: catway })
        
        //res.status(404).json('catway not found')
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