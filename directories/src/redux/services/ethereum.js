import Web3 from "web3";

const initWeb3 = () => {
  if(typeof web3 !== 'undefined')
    return new Web3(Web3.currentProvider);
    //return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
};

const subsribeToClaim = (contracts, contractName, contractAddress, data) => {
  return new Promise((resolve, reject) => {
    const web3 = initWeb3();
    const contract = web3.eth.contract(contracts[contractName].abi).at(contractAddress);
    contract.new(contractName, {
      gas: 300000,
      from: web3.eth.accounts[0],
      data: data
    }, (error, contract) => {
      if(!contract.address) {
        resolve(contract);
      } else {
        reject();
      }
    })
  });
};

export default {
  subsribeToClaim
};