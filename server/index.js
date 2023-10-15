const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree')

const port = 1225;

const app = express();
app.use(express.json());

const tree = new MerkleTree(niceList)
const MERKLE_ROOT = tree.getRoot();

app.post('/gift', (req, res) => {
  const body = req.body;
  const { data, proof } = body

  const isInTheList = verifyProof(proof, data, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
