const express = require('express');
const router = express.Router();

const Song = require('../models/song')

router.get('/', (req, res, next) => {
  Song.getSongs((err, songs) => {
    if(err) throw err;
    res.render('songs/songs', {title: "All Songs", songs});
  });
});

router.get('/new', (req, res, next) => {
  res.render('songs/new_song')
})

router.post('/', (req, res, next) => {
  let song = new Song();
  song.title = req.body.title;
  song.artist = req.body.artist;
  song.release_date = req.body.release_date;
  song.tuning = req.body.tuning;
  song.pack_name = req.body.pack_name;
  song.dlc_release_date = req.body.dlc_release_date;
  song.rr_guitar_link = req.body.rr_guitar_link;
  song.rr_bass_link = req.body.rr_bass_link;
  song.steam_purchase_link = req.body.steam_purchase_link;

  Song.addSong(song, (err, song) => {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/songs');
    }
  });
});

module.exports = router;
