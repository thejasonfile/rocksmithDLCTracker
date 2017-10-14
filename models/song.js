const mongoose = require('mongoose');

//song schema
const songSchema = mongoose.Schema({
  title: {
    type: String
  },
  artist: {
    type: String
  },
  song_release_date: {
    type: Date
  },
  tuning: {
    type: String
  },
  pack_name: {
    type: String
  },
  dlc_release_date: {
    type: Date
  },
  rr_guitar_link: {
    type: String
  },
  rr_bass_link: {
    type: String
  },
  steam_purchase_link: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;

//add song
module.exports.addSong = (song, callback) => {
  Song.create(song, callback);
}

//get all songs
module.exports.getSongs = (callback, limit) => {
  Song.find(callback).limit(limit).sort([['title', 'ascending']]);
}

//get one song
module.exports.getSongById = (id, callback) => {
  Song.findById(id, callback);
}
