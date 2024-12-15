import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 
 const[name,setName]=useState([]);
 const[rate,setRate]=useState(.1);
 const[qty,setQty]=useState(.1);
 const [editId, setEditId] = useState(null);
 const[vegetables,setVegetables]=useState([])
 const [isFormVisible, setIsFormVisible] = useState(false);

 function handleName(event){
  setName(event.target.value);
 }
 function handleRate(event){
  setRate(event.target.value);
 }
 function handleQty(event){
  setQty(event.target.value);
 }

 function handleAdd(){
  //incase of editing when user re submits values
  if (editId !== null) {
  
    setVegetables((prev) => 
      prev.map((item) => 
        item.id === editId ? { ...item, name, rate: parseFloat(rate), qty: parseFloat(qty) } : item
      )
    );
    setEditId(null); 
  } else {
    //incase of adding new veg
    setVegetables(prev => [
      ...prev, 
      { id: prev.length + 1, name, rate: parseFloat(rate), qty: parseFloat(qty) }
    ]);
  }
//reseting input feilds
setName("")
setQty('0.1')
setRate('0.1')
setIsFormVisible(false)


 }
 //edit button function
 function handleEdit(id){
  const veg=vegetables.find(item =>item.id===id);
  if(veg){
    setName(veg.name)
    setQty(veg.qty)
    setRate(veg.rate)
    setEditId(veg.id)
    setIsFormVisible(true)
  }

 }
 function handleDelete(id) {
  setVegetables((prev) => {
    // Filter out the vegetable to be deleted
    const updatedVegetables = prev.filter((item) => item.id !== id);
    
    // Reassign the ids starting from 1
    return updatedVegetables.map((item, index) => ({...item, id: index + 1 
    }));
  });

}
let total=0;


  return (


    <div className="container mt-5 ">
          <button className="btn btn-dark mb-3 mx-auto d-block " onClick={() => setIsFormVisible(true)}     >
    Add Vegetable</button>
  {isFormVisible && (
      
      <div className="formControl  mx-auto mt-5 mb-5">
<h1 className="mt-5 mb-5 text-center">Add Veggies</h1>  
<div className="d-flex">
<div className="flex-fill"></div>
<div className="flex-fill">
  <div className="flex-fill"></div>
 <label className="form-label">Name:</label> <input className="form-control" type="text" value={name} aria-label="Name" onChange={handleName}></input>
   <label className="form-label">Rate:</label> <input className="form-control" type="number" step={0.1} value={rate} onChange={handleRate} aria-label="Rate(PKR)" ></input>
   <label className="form-label">Qty:</label> <input className="form-control" type="number"step={0.1} value={qty}onChange={handleQty} aria-label="Qty(kg)" ></input>
    <input type="Button" className=" mt-2 btn btn-success form-control"  value="Add" onClick={handleAdd}></input>  
    </div>
    <div className="flex-fill"></div>
    </div>
    </div>)}
    <h3 className="mt-5 mb-5 text-center">Vegetable List</h3>

    <table className=" container mb-5 " >
<tr> <th>ID</th><th>Name</th><th>Rate</th><th>Qty</th> </tr>
        
      {
       vegetables.map((item)=>{
        total += item.rate * item.qty;   
   return <tr><td>{item.id}</td> <td> {item.name}</td> <td> {item.qty}</td> <td> {item.rate}</td><td><button onClick={() => handleEdit(item.id)} className="btn btn-primary">Edit</button><button onClick={()=>handleDelete(item.id)} className="btn btn-danger">Delete</button></td></tr>
       })
     }
    </table>
    <h1 >Total:{total.toFixed(2)}</h1>
    </div >
   
  );
}

export default App;
