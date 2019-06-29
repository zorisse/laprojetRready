const express = require('express');
const User = require('../models/user-model');
const Habilitation = require('../models/habilitations-model')
const router = express.Router();
const habilitation = '/habilitation/';

/* GET home page */
router.get(`${habilitation}list`, (req, res, next) => {
    Habilitation.find({})
        .then(el =>
            res.json(el)
        )
});

router.post(`${habilitation}add`, (req, res, next) => {
    const { titre, tuteurs, taches } = req.body;
    Habilitation.create({
        titre, tuteurs, taches
    })
        .then(Habilitation => {
            res.json(Habilitation)
        })
        .catch(err => console.log(err))
})


module.exports = router;
