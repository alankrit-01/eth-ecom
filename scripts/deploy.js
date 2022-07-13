const {ethers} = require("hardhat");

async function main() {
  const [admin,seller,user ]=await ethers.getSigners();
  const Ecommerce = await ethers.getContractFactory("Ecommerce");
  const ecommerce = await Ecommerce.deploy();

  await ecommerce.deployed();

  console.log("Ecommerce deployed to:", ecommerce.address);

  // await ecommerce.uploadItem(0,10,seller.address,2,"T-shirt","White plane and soft","ipfs://1f1cbee4914c60b8ca60c2383184ce43532f22245a1023d0d35b14ac22bd1b61/");
  
  // console.log(await ecommerce.getItemCounter());
  // console.log(await ecommerce.getItem(0));

  // await ecommerce.connect(user).buyItem(0,10,{value:30});
  // console.log(await ecommerce.getItem(0));
  // console.log(await ecommerce.fundsCollected());
  
  // await ecommerce.payToSeller(0);
  // console.log(await ecommerce.getItem(0));
  // console.log(await ecommerce.fundsCollected());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
