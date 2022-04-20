// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const petFactory = await ethers.getContractFactory("Pet");
  const pet = await petFactory.deploy();

  // wait for to be mined
  await pet.deployed();

  console.log(
    `Pet deployed to: ${pet.address}, Hash: ${pet.deployTransaction.hash}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
