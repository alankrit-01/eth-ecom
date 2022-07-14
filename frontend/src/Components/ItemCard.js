import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css';
function ItemCard(props) {
  let category;
  if (props.ItemCategory ==0){
    category="Men";
  }else if (props.ItemCategory ==1){
    category="Women";
  }else if (props.ItemCategory ==2){
    category="Children";
  }
  const buyItemHandler = async (event) =>{
    event.preventDefault();
    // console.log(event.target.quantity.value);
    // console.log(event.target.itemId.value);
    // console.log(props.contract);
    try {
      await (props.contract).buyItem(event.target.itemId.value,event.target.quantity.value,{value:((props.weiPerItem)*event.target.quantity.value)});
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
    event.target.quantity.value =undefined;
  }
  return (
    <>
      <div className="parent">
        <div className="left-child" > 
        <div className="fadein"><img src={props.image} /></div>
        </div>
      <div className="right-child" >
          <span className="title">{props.name}</span><br></br>
          <div className="description">{props.description} </div><br></br>
          Category : {category} <br></br>
          Only {props.quantityLeft} items left !  <br></br>
          Price : {props.weiPerItem} Wei per item <br></br><br></br>
          <form onSubmit={buyItemHandler}>
            <input id="itemId" type="hidden" name="itemId" value={props.id} />
            <input id="quantity" type="number" placeholder ="quantity" name="quantity" />
            <input type={"submit"} value="BUY" />
          </form>
        
        </div>
      </div>
      <br></br>
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
  );
}

export default ItemCard;