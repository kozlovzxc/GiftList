const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main(name) {
  // TODO: how do we prove to the server we're on the nice list? 

  const tree = new MerkleTree(niceList)
  const leafIndex = niceList.findIndex(leaf => leaf === name)
  const proof = tree.getProof(leafIndex)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    data: name,
    proof: proof,
  });

  console.log({ gift });
}

main(niceList[Math.trunc(Math.random() * niceList.length)]);
main('qweqwe')