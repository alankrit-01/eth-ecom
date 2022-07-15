import './App.css';
import  MyNavbar from './Components/Navbar.js';
import  ItemCard from './Components/ItemCard.js';
import React, { useEffect, useState } from 'react';
import EcomAbiJson from './artifacts/contracts/Ecommerce.sol/Ecommerce.json';
import { ethers } from "ethers";
let contractAddress="0xe56e9016e9522eE541128C12d9f08339a8D075C1";

// let object;
function App() {
  const [account, setaccount] = useState(()=>{
    const account = localStorage.getItem("ECOM_ACCOUNT");
    if(account ==undefined) return "0x0";
    const initialValue = JSON.parse(account);
    return initialValue || "0x0";
  });
  const [provider, setprovider] = useState('');
  const [signer, setsigner] = useState('');
  const [contract, setcontract] = useState('');
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (!window.ethereum) {
        // Nothing to do here... no ethereum provider found
        return;
    }
    const accountWasChanged = (accounts) => {
        setaccount(accounts[0]);
        localStorage.setItem("ECOM_ACCOUNT", JSON.stringify(accounts[0]));
        console.log('accountWasChanged');
    }
    const getAndSetAccount = async () => {
        const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccount(changedAccounts[0]);
        localStorage.setItem("ECOM_ACCOUNT", JSON.stringify(changedAccounts[0]));
        console.log('getAndSetAccount');
    }
    const clearAccount = () => {
        setaccount('0x0');
        localStorage.setItem("ECOM_ACCOUNT", JSON.stringify('0x0'));
        console.log('clearAccount');
    };
    window.ethereum.on('accountsChanged', accountWasChanged);
    window.ethereum.on('connect', getAndSetAccount);
    window.ethereum.on('disconnect', clearAccount);
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        console.log('accounts', accounts);
        // No need to set account here, it will be set by the event listener
    }, error => {
        // Handle any UI for errors here, e.g. network error, rejected request, etc.
        // Set state as needed 
    })
    updateEthers();
    return () => {
        // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
        window.ethereum.removeListener('accountsChanged', accountWasChanged);
        window.ethereum.removeListener('connect', getAndSetAccount);
        window.ethereum.removeListener('disconnect', clearAccount);
    }
    }, [/* empty array to avoid re-request on every render, but if you have state related to a connect button, put here */]);

    const updateEthers = async () => {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		setprovider(provider);

		let signer = provider.getSigner();
		setsigner(signer);

		let contract = new ethers.Contract(contractAddress, EcomAbiJson.abi, signer);
		setcontract(contract);
    let counter 
    counter= (await contract.getItemCounter()).toNumber(); 
    console.log(counter);
    let _items=[]
    for(let i=0; i<counter; i++){
      const item =await contract.getItem(i);
      _items.push(item);
    }
    setitems(_items);
    setloading(false);
	}

  return (
    <>
    <div className="App">
        <MyNavbar account={account}/><br></br>
        { loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          :
          <div className="Center">{
          items.length > 0 ? 
          items.map((item)=>(
            // console.log(item.name)
            item.ItemState ==0 ?
            <>
            <ItemCard 
              id= {item.id}
              name= {item.name}
              description= {item.description} 
              image= {item.image}
              quantityLeft= {item.quantityLeft.toNumber()}
              weiPerItem= {item.weiPerItem.toNumber()}
              ItemCategory= {item.ItemCategory.toNumber()}
              contract={contract}
              />
            <br></br> 

            </>
            : ""
          ))  : <h2>No Items Found</h2>
        }
          </div>
        }
        
    </div>
    </>
  );
}

export default App;
