
import Vendors from './Vendors';
import Items from './Items';
import AddVendor from './AddVendor';
import AddItem from './AddItem';
import EditVendor from './EditVendor';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";

import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />

      < Routes >
         <Route path="/" element={<Home />} />
         <Route path="/items" element={<Items />} />
         <Route path="/addItem" element={<AddItem />} />
         <Route path="/vendors" element={<Vendors />} />
         <Route path="/addVendor" element={<AddVendor />} />
         <Route path="/editVendor/:id" element={<EditVendor />} />
         <Route path="*" element={<NotFound/>} />
      </Routes>

      </BrowserRouter> 
    </div>
    
  );
}

export default App;
