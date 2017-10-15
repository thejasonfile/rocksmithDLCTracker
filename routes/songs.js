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
  song.song_release_year = req.body.song_release_year;
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

router.get('/:id', (req, res, next) => {
  Song.getSongById(req.params.id, (err, song) => {
    if(err) throw err;
    res.render('songs/song', {title: 'One Song', song});
  });
});

router.get('/:id/edit', (req, res, next) => {
  Song.getSongById(req.params.id, (err, song) => {
    if(err) throw err;
    res.render('songs/edit_song', {title: 'Edit Song', song});
  });
});

router.put('/:id', (req, res, next) => {
  let song = {};
  song.title = req.body.title;
  song.artist = req.body.artist;
  song.song_release_year = req.body.song_release_year;
  song.tuning = req.body.tuning;
  song.pack_name = req.body.pack_name;
  song.dlc_release_date = req.body.dlc_release_date;
  song.rr_guitar_link = req.body.rr_guitar_link;
  song.rr_bass_link = req.body.rr_bass_link;
  song.steam_purchase_link = req.body.steam_purchase_link;

  Song.updateSong(req.params.id, song, (err, song) => {
    if(err) throw err;
    res.redirect(`/songs/${req.params.id}`);
  });
});

router.delete('/:id', (req, res, next) => {
  Song.remove(req.params.id, (err) => {
    if(err) throw err;
    res.redirect('/');
  })
})

module.exports = router;
