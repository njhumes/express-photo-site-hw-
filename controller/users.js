const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const Photo = require('../models/photosSchema')

// INdex Route
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err){
            res.send(err)
        } else {
            res.render('users/index.ejs', {
                users: allUsers
            })
        }
    })
})

// New Route
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// Create Route
router.post('/', (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err){
            res.send(err)
        } else {
            res.redirect('/users')
        }
    })
})

// Show Route
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, showUser) => {
        if(err){
            res.send(err)
        } else {
            res.render('users/show.ejs', {
                user: showUser
            })
        }
    })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, editUser) => {
        if(err){
            res.send(err)
        } else {
            res.render('users/edit.ejs', {
                user: editUser
            })
        }
    })
})

// Update Route
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updateUser) => {
        if(err){
            res.send(err)
        } else {
            res.redirect('/users')
        }
    })
})

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deleted) => {
        if(err){
            res.send(err)
        } else {
            res.redirect('/users')
        }
    })
})

module.exports = router;