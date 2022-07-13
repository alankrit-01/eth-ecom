// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ecommerce is Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    enum ItemState{ uploaded, completetlyBought}
    enum ItemCategory{ male, female, kids}
    struct Item{
        uint id;
        uint ItemState;
        uint ItemCategory;
        uint quantity;
        uint quantityLeft;
        address seller;
        uint tobepaid;
        uint weiPerItem;
        string name;
        string description;
        string image;
    }

    mapping(uint =>Item) private Items;

    event ItemUpladed(uint id);
    event ItemBought(uint id);
    event PaidToSeller(uint id);

    function uploadItem(
        uint _category, 
        uint _quantity,  
        address _seller,
        uint _weiPerItem,
        string memory _name,
        string memory _description,
        string memory _image
    ) public onlyOwner{
        uint currentItem =_itemIds.current();
        Item memory _item = Item({
            id:currentItem,
            ItemState:0,
            ItemCategory:_category,
            quantity:_quantity,
            quantityLeft:_quantity,
            seller:_seller,
            tobepaid:0,
            weiPerItem:_weiPerItem,
            name:_name,
            description:_description,
            image:_image
        });
        Items[currentItem] =_item;
        _itemIds.increment();
        emit ItemUpladed(currentItem);
    } 
    function buyItem(uint _itemId, uint _amount) public payable{
        Item memory _item =getItem(_itemId);
        require(_item.ItemState!=1,"Item sold completely");
        require(_item.quantityLeft >=_amount,"Not enought of the quantity left for this item");
        require((_item.weiPerItem*_amount)<=msg.value,"Please send enough ether for this transaction to be successful");
        (bool success, )= (msg.sender).call{value:(msg.value-(_item.weiPerItem*_amount))}("");
        require(success,"Failed to refund extra ethers");
        _item.quantityLeft -=_amount;
        _item.tobepaid += (_item.weiPerItem*_amount);
        if(_item.quantityLeft ==0){ _item.ItemState=1; }
        Items[_itemId] =_item;
        emit ItemBought(_itemId);      
    }  
    function payToSeller(uint _itemId) public onlyOwner{
        Item memory _item =getItem(_itemId);
        require(_item.tobepaid!=0, "No pending amount");
        (bool success, )= (_item.seller).call{value:_item.tobepaid}("");
        require(success,"Failed to send ethers");
        _item.tobepaid=0;
        Items[_itemId] =_item;
        emit PaidToSeller(_itemId);      
    }  
    
    function getItemCounter() public view returns(uint256){
        return _itemIds.current();
    }

    function getItem(uint _itemId) public view returns(Item memory){
        uint counter =getItemCounter();
        require(counter>_itemId,"Invalid item id");
        return Items[_itemId];
    }

    function fundsCollected() public view returns(uint){
        return address(this).balance;
    }
}
