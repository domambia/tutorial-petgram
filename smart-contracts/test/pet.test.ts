import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";

describe("Pet Contract", function () {
  let signer: SignerWithAddress[];
  let pet: Contract;
  let petFactory: ContractFactory;

  beforeEach(async () => {
    petFactory = await ethers.getContractFactory("Pet");
    signer = await ethers.getSigners();
    pet = await petFactory.deploy();
    // awiat for the transaction to be mined
    await pet.deployed();
  });
  it("should deploy successfully and assigns the owner of the contract", async () => {
    expect(pet.address).to.exist;
    expect(await pet.owner()).to.equal(signer[0].address);
  });

  it("should be able to mint a token", async () => {
    const tokenId = 1;
    const tokenURI =
      "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
    await pet.mintPetNFT(
      tokenURI,
      "EXAMPLE NAME",
      1,
      "Germeny ",
      signer[0].address
    );
    expect(await pet.tokenURI(tokenId)).to.equal(tokenURI);
  });
});
