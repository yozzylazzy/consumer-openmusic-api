const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT id, name FROM playlists WHERE id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getSongsFromPlaylist(playlistId) {
    const querySong = {
      text: `SELECT s.id, s.title, s.performer 
      FROM playlists p
      JOIN playlistsongs ps ON (ps.playlist_id = p.id)
      JOIN songs s ON (s.id = ps.song_id)
      WHERE p.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(querySong);
    return result.rows;
  }
}

module.exports = PlaylistsService;
