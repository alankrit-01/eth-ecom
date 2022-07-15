# Decentralised E-Commerce website made on Ethereum

## Functionalities
- Customer can buy an item by paying the amount in ether(or wei)
- Admin can upload a new item by pasing the details (category, seller address, quantity ..etc)
- Admin can view how much to pay to the seller of a pariculater item ID.
- Admin can pay to the seller of a pariculater item ID.

## Note
- Arguments to `upload a new item` (by Admin) are -
```
      uint category -> 0 for Men, 1 for Women, 2 for Children 
      uint quantity -> Number of items
      address seller -> Ethereum address of the seller
      uint weiPerItem -> price (wei) per item
      string memory name -> Name of the item
      string memory description -> Description about the item
      string memory image -> URL of the item image
```
## How To Run
1. Clone this repository
2. `npm install`
3. `touch .env`
4. Put your accounts private key (this account will be the admin) and your infura ribkeby url in the .env file (format given in env.copy file) 
5. `cd ./frontend`
6. `npm install`
7. `cd ..`
8. Run the hardhat script that will deploy the contract using the command `npx hardhat run --network rinkeby ./scripts/deploy.js`
9. The script will return the address of the deployed contract, copy that!
10. Paste the contract address in the files `frontend/src/App.js` and `frontend/src/Components/Admin.js` in the variable `contractAddress`
11. `cd ./frontend`
12. `npm start`
