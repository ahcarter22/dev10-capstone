
import Vendors from './Vendors';
import Items from './Items';
import AddVendor from './AddVendor';
import AddItem from './AddItem';
import EditVendor from './EditVendor';
import DeleteVendor from './DeleteVendor';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";
import AllErrors from "./AllErrors";
import jwtDecode from 'jwt-decode';
import About from "./About";
import Search from './Search';


import { useEffect, useState } from "react";


function App() {
  //const[foundItems,setFoundItems]=useState([]);

  const [user, setUser] = useState({
    user: null
  });

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if(jwt){
      setUser({user: jwtDecode(jwt)});
    }
  },[]);

   const [errorList, setErrorList] = useState([]);
  return (

    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
      
        <BrowserRouter>
        <Nav />

        < Routes >
        <Route path="/environment" element={<h1>{window.API_URL}</h1>} />
        
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {user?.user ? (
              <>
                <Route path="/items" element={<Items />} />
                <Route path="/addItem" element={<AddItem errorList={errorList} setErrorList={setErrorList}/>} />
                <Route path="/editItem/:itemId" element={<EditItem />} />
                <Route path="/deleteItem/:itemId" element={<DeleteItem />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/addVendor" element={<AddVendor errorList={errorList} setErrorList={setErrorList}/>} />
                <Route path="/editVendor/:vendorId" element={<EditVendor />} />
                <Route path="/deleteVendor/:vendorId" element={<DeleteVendor />} />
                
              </>
          ): (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          
          <Route path="*" element={<NotFound/>} />
        </Routes>

        
      

        </BrowserRouter> 
      </div>
    </AuthContext.Provider>
  );
}

export default App;
