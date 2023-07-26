class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      let playlist = await this._playlistService.getPlaylistById(playlistId);
      const songs = await this._playlistService.getSongsFromPlaylist(playlistId);
      playlist = Object.assign({}, playlist, { songs });
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
