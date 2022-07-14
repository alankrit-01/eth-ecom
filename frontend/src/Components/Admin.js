import '../App.css';
import  MyNavbar from './Navbar.js';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import EcomAbiJson from '../artifacts/contracts/Ecommerce.sol/Ecommerce.json';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";
let contractAddress="0x9E78ff30Bdab7f4B780930167670aB9aAC2BC6eB";

export const Admin = () => {
    const [account, setaccount] = useState('0x0');
    const [provider, setprovider] = useState('');
    const [signer, setsigner] = useState('');
    const [contract, setcontract] = useState('');
    const [tobepaid, settobepaid] = useState(0);
    const [seller, setseller] = useState(0);
    useEffect(() => {
        if (!window.ethereum) {
            // Nothing to do here... no ethereum provider found
            return;
        }
        const accountWasChanged = (accounts) => {
            setaccount(accounts[0]);
            console.log('accountWasChanged');
        }
        const getAndSetAccount = async () => {
            const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setaccount(changedAccounts[0]);
            console.log('getAndSetAccount');
        }
        const clearAccount = () => {
            setaccount('0x0');
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
    }
    const uploadItemHandler =async (event)=>{
        event.preventDefault();
        // console.log(event.target.category.value);
        // console.log(event.target.quantity.value);
        // console.log(event.target.seller.value);
        // console.log(event.target.weiPerItem.value);
        // console.log(event.target.name.value);
        // console.log(event.target.description.value);
        // console.log(event.target.image.value);
        try {
            await contract.uploadItem(
                event.target.category.value,
                event.target.quantity.value,
                event.target.seller.value,
                event.target.weiPerItem.value,
                event.target.name.value,
                event.target.description.value,
                event.target.image.value
            )            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        event.target.category.value =undefined
        event.target.quantity.value=undefined
        event.target.seller.value=""
        event.target.weiPerItem.value=undefined
        event.target.name.value=""
        event.target.description.value=""
        event.target.image.value=""
    }
    const payToSeller=async(event)=>{
        event.preventDefault();
        try {
            await contract.payToSeller(event.target.itemId.value);
        } catch (error) {
            console.log(error.message)
            console.log(error.message)
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        event.target.itemId.value =undefined
    }
    const viewFunds=async(event)=>{
        event.preventDefault();
        try {
            const data =await contract.getItem(event.target.itemId.value);
            settobepaid(data.tobepaid.toNumber());
            setseller(data.seller);
        } catch (error) {
            console.log(error.message)
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        event.target.itemId.value =undefined
    }
    const notify = () => toast("Wow so easy!");
  return (
    <>
    <div className="App">
        <MyNavbar account={account}/><br></br>
          <div className="Center">  
            <>
            <div className="parent-admin">
                <div className="left-child-admin" > 
                    <h5>Pay to Seller</h5> <br></br><br></br>
                    <form onSubmit={viewFunds}>
                        <input id="itemId" type="number" placeholder ="itemId" name="itemId" /><br></br><br></br>
                        <input type={"submit"} value="HOW MUCH TO PAY" />
                    </form>
                    You have to pay {tobepaid} Wei to {seller}
                    <form onSubmit={payToSeller}>
                        <input id="itemId" type="number" placeholder ="itemId" name="itemId" /><br></br><br></br>
                        <input type={"submit"} value="PAY" />
                    </form>

                </div>
                <div className="right-child-admin" >
                    <h5>Add a new Item </h5><br></br><br></br>
                    <form onSubmit={uploadItemHandler}>
                        <input id="category" type="number" placeholder ="category(0/1/2)" name="category" />
                        <input id="quantity" type="number" placeholder ="quantity" name="quantity" />
                        <input id="seller" type="text" placeholder ="seller eth address" name="seller" />
                        <input id="weiPerItem" type="number" placeholder ="price per item" name="weiPerItem" />
                        <input id="name" type="text" placeholder ="title" name="name" />
                        <input id="description" type="text" placeholder ="description" name="description" />
                        <input id="image" type="text" placeholder ="image URL" name="image" /><br></br><br></br>
                        <input type={"submit"} value="UPLOAD ITEM" />
                    </form>
                </div>
            </div>
            <br></br>
            </>
          </div>
    </div>
    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    </>
  )
}
