const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Habilitation_success_Schema = new Schema({
    // explicationde la Habilitation
    user: { type: ObjectId, ref: 'User', unique: true },
    // identification de l'habilitattions
    Habilitation: { type: ObjectId, ref: 'Habilitation' },
    // les taches réalisées {taches: titre, isDone: false}
    taches: []
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Habilitation_success = mongoose.model('Habilitation_success', Habilitation_success_Schema);
module.exports = Habilitation_success;
