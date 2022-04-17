const express = require("express");
const Resident = require("../model/resident.model");

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const playlist = await Resident.create(req.body);
    return res.status(200).send(playlist);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.get('/all', async (req, res) => {
  try {
    const residentData = await Resident.find().populate([{path : 'userId'}, {path : "flatId"}]).lean().exec();
    return res.status(200).send(residentData);
  }
  catch(err) {
    return res.status(400).send(err.message);
    
  }
})
router.get("/:id", async (req, res) => {
  try {
    const flatID = req.params.id;
    const userPlaylist = await Resident.find({flatId : flatID}).populate([{path : 'userId', select : ["firstName", "lastName", "type"]}]).select({flatId : 0}).lean().exec();
    return res.status(200).send(userPlaylist);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();
    return res.status(200).send(resident);
  }
  catch(err) {
    return res.status(400).send(err.message)
  }
})
module.exports = router;
