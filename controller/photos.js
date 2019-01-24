const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const Photo = require('../models/photosSchema')

router.get('/', (req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if (err) {
            res.send(err)
        } else {
            res.render('photos/index.ejs', {
                photos: allPhotos
            })
        }
    })
})

// New Route
router.get('/new', (req, res) => {
    User.find({}, (err, allUsers) => {
        res.render('photos/new.ejs', {
            users: allUsers
        })
    })
})


// Create Route
router.post('/', (req, res) => {
    User.findById(req.body.userId, (err, postedUser) => {
        Photo.create(req.body, (err, newPhoto) => {
            if (err) {
                res.send(err)
            } else {
                postedUser.photos.push(newPhoto);
                postedUser.save((err, data) => {
                    res.redirect('/photos')
                })
            }
        })
    })
})

// Show Route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, showPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, shownUser) => {
            if (err) {
                res.send(err)
            } else {
                res.render('photos/show.ejs', {
                    photo: showPhoto,
                    user: shownUser
                })
            }
        })
        
    })
})


// Edit Route
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, editPhoto) => {
        User.find({}, (err, allUsers) => {
            User.findOne({'photos._id': req.params.id}, (err, articleUser) => {
                if (err) {
                    res.send(err)
                } else {
                    res.render('photos/edit.ejs', {
                        photo: editPhoto,
                        users: allUsers,
                        articleUser: articleUser
                    })
                }
            })
        })
    })
})


// Update Route
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, updatePhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            if(foundUser._id.toString() !== req.body.userId.toString()){
                foundUser.photos.id(req.params.id).remove();
                foundUser.save((err, savedUser) =>{
                    User.findById(req.body.userId, (err, newUser) => {
                        newUser.photos.push(updatePhoto);
                        newUser.save((err, savedNewUser) => {
                            res.redirect('/photos')
                        })
                    })
                })
            } else{
                foundUser.photos.id(req.params.id).remove();
                foundUser.photos.push(updatePhoto);
                foundUser.save((err, data) => {
                    res.redirect('/photos')
                })
            }
        })
    })
})




router.delete('/:id', (req, res) => {
    Photo.findByIdAndRemove(req.params.id, (err, deleted) => {
        User.findOne({'photos._id': req.params.id}, (err, deletedUser) => {
            deletedUser.photos.id(req.params.id).remove();
            deletedUser.save((err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/photos')
                }
            })
        })
    })
})







module.exports = router;