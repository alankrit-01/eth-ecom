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
