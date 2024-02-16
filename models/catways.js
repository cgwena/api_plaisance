const mongoose = require('mongoose')

const catwaySchema = mongoose.Schema({
    catwayNumber: { type: Number, required: true },
    type: {
        type: String, required: true, validate: {
            validator: function (value) {
                return ['short', 'long'].includes(value); // Remplacez value1 et value2 par les valeurs autorisées
            },
            message: 'Le champ type doit être soit short soit long'
        } },
    catwayState: { type: String, reuired: true }
})

module.exports = mongoose.model('Catway', catwaySchema)