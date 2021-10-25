
const Auction = require('../models/pennyAuction');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('increasePrice', async ({ id }) => {
      await Auction.increasePrice(id);
      const auction = await Auction.getById(id);
      io.emit('refreshPrice', auction);
    });
  });
};