const { connection } = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const auctions = await db.collection('penniesAuction').find({}).toArray();
  return auctions;
};

const getById = async (id) => {
  const db = await connection();
  const auction = await db.collection('penniesAuction').findOne({ _id: ObjectId(id) });
  return auction;
};

const increasePrice = async (id) => {
  const db = await connection();
  db.collection('penniesAuction').updateOne(
    { _id: ObjectId(id) },
    { $inc: { preco: 5 } }
  );
};

module.exports = {
  getAll,
  getById,
  increasePrice
};