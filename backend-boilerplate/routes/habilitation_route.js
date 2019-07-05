const express = require('express');
const User = require('../models/user-model');
const Habilitation = require('../models/habilitations-model')
const HabilitationSuccess = require('../models/habilitations-sucess')
const router = express.Router();
const habilitation = '/habilitation/';
const habilitationSuccess = '/habilitationSucess/';

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

// va cherhcer une habilitation 
router.get(`${habilitation}:id`, (req, res, next) => {
    Habilitation.findOne({ _id: req.params.id })
        .then(el => {
            console.log('habilitaion => ', el)
            return res.json(el)
        })
        .catch(err => console.log(err));
});

router.get(`${habilitationSuccess}list`, (req, res, next) => {
    HabilitationSuccess.find({})
        .populate('User')
        .populate('Habilitation')
        .then(el => {
            console.log('habSucess:=>', el)
            return res.json(el)
        })
        .catch(err => console.log(err));
});


// Lancer la validation 
router.post(`${habilitationSuccess}`, (req, res, next) => {
    const { user, habilitation, taches } = req.body;

    HabilitationSuccess.create({ user, habilitation, taches })
        .then(el => {
            return res.json(el)
        })
        .catch(err => console.log(err));
});


///////////////////////////////////////////

// //Update 
// router.get('/module/:id/edit', (req, res, next) => {
//     Module.findOne({ _id: req.params.id })
//       .then(module => {
//         res.render('module/module_update_form.hbs', { module })
//       })
//       .catch(err => console.log(err))
//   })

//   router.post('/module/:id', (req, res, next) => {
//     const { title, image, media_url } = req.body
//     const id = req.params.id
//     Module.update({ _id: id }, { $set: { title, image, media_url } })
//       .then(module => {
//         console.log(' Module modifié', module)
//         res.redirect(`/module`)
//       })
//       .catch(err => console.log(err))
//   })





module.exports = router;
