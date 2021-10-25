const express = require('express');
const cors = require('cors');
const app = express();
const portFront = 3002;
const portBack = 3001;
const server = require('http').createServer(app);
const Auction = require('./models/pennyAuction');

let corsOptions = {
  origin: `http://localhost:${portFront}`,
  methods: ['GET', 'POST'],
};

const io = require('socket.io')(server, {
  cors: corsOptions,
});

require('./sockets/auctionBidSockets')(io);

app.use(cors(corsOptions));

app.get('/auctions', async (_req, res) => {
  try {
    const data = await Auction.getAll();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
server.listen(portBack, () => console.log(`Example app listening on port port!`));