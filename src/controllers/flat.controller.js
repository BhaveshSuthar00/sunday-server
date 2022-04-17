const express = require("express");
const Flat = require("../model/flat.model");

const router = express.Router();
const Resident = require('../model/resident.model')
router.post("/post", async (req, res) => {
  try {
    const playlist = await Flat.create(req.body);
    return res.status(200).send(playlist);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.get('/all', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 15;
    const flat = await Flat.find().skip((page - 1) * size) // page 1 first 15 documents
    .limit(size)
    .lean()
    .exec();
    const totalPages = Math.ceil(
      (await Flat.find().countDocuments()) / size
    );
    return res.status(200).send({flat, totalPages})
  }
  catch(err) {
    return res.status(400).send(err.message);
  }
})
router.get("/:id", async (req, res) => {
  try {
    const userPlaylist = await Flat.findById(req.params.id).lean().exec();
    return res.status(200).send(userPlaylist);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();
    return res.status(200).send(flat);
  }
  catch(err) {
    return res.status(400).send(err.message)
  }
})
module.exports = router;
