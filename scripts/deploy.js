const {ethers} = require("hardhat");

async function main() {
  const [admin,seller,user ]=await ethers.getSigners();
  // const Ecommerce = await ethers.getContractFactory("Ecommerce");
  // const ecommerce = await Ecommerce.deploy();

  // await ecommerce.deployed();

  // console.log("Ecommerce deployed to:", ecommerce.address);
  const ecommerce =await ethers.getContractAt("Ecommerce","0x9E78ff30Bdab7f4B780930167670aB9aAC2BC6eB");

  // await ecommerce.uploadItem(0,100,seller.address,2,"T-shirt","Mast Harbour Men Mustard Yellow Printed Round Neck Pure Cotton T-shirt","https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10940528/2020/2/13/3e484090-d487-4252-9f30-beab10ce1f0a1581594832846-Roadster-Men-Tshirts-4501581594830605-1.jpg");
  await ecommerce.uploadItem(1,120,seller.address,5,"Jeans","Women Blue Skinny Fit High-Rise Light Fade Stretchable Jeans","https://assets.ajio.com/medias/sys_master/root/h09/hcd/12085139111966/-1117Wx1400H-440794191-mediumblue-MODEL.jpg");
  // await ecommerce.uploadItem(1,90,seller.address,50,"T-shirt","Plain polo style t-shirts","ipfs://1f1cbee4914c60b8ca60c2383184ce43532f22245a1023d0d35b14ac22bd1b61/");
  // await ecommerce.uploadItem(0,150,seller.address,1,"T-shirt","Soft fabric and fresh","ipfs://1f1cbee4914c60b8ca60c2383184ce43532f22245a1023d0d35b14ac22bd1b61/");
  // await ecommerce.uploadItem(1,130,seller.address,8,"Jeans","Modren style, party wear","ipfs://1f1cbee4914c60b8ca60c2383184ce43532f22245a1023d0d35b14ac22bd1b61/");
  
  // console.log(await ecommerce.getItemCounter());
  // console.log(await ecommerce.getItems());
  // console.log(await ecommerce.getItem(1));
  // console.log(await ecommerce.getItem(2));
  // console.log(await ecommerce.getItem(5));

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
