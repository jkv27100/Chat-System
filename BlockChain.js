const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index,data,timestamp,previousHash='') {
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + this.nonce + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.hash = this.calculateHash();
            this.nonce++;    
        }
        console.log("Block Mined " + this.hash);
    }

}

class BlockChain {
    constructor() {
        this.chain = [this.createGenisisBlock()]
        this.difficulty = 4;
    }

    createGenisisBlock() {
        return new Block(0,"genisis block",'27/01/2020',"0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty); 
        this.chain.push(newBlock); 
    }

    isChainValid() {
        for(let i=1; i<this.chain.length; i++) {
            if(this.chain[i].hash != this.chain[i].calculateHash()) {
                return false
            }
            if(this.chain[i].previousHash != this.chain[i-1].hash) {
                return false
            }
        }
        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Block = Block;

// let BitCoin = new BlockChain();


// console.log("Mining Block 1 .....")
// BitCoin.addBlock(new Block(2,"genisis block",'27/01/2020'));


// console.log("Chain is valid?" + BitCoin.isChainValid());
// console.log(JSON.stringify(BitCoin,null,4));