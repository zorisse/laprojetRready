const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const HabilitationSchema = new Schema({
    titre: String,
    tuteurs: [
        // {
        //     user: { type: ObjectId, ref: 'User' },
        //     date: Date,
        // }
    ],
    taches: [],

}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Habilitation = mongoose.model('Habilitation', HabilitationSchema);
module.exports = Habilitation;
