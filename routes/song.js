const express = require('express');
const router = express.Router();

const Song = require('../models/song');

router.get('/:id', (req, res, next) => {
  Song.getSongById(req.params.id, (err, song) => {
    if(err) throw err;
    res.render('song/song', {title: 'One Song', song});
  })
})

module.exports = router;
