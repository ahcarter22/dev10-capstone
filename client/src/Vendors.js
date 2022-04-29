import { useState, useEffect } from "react";
import Vendor from "./Vendor";


function Vendors() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/vendor",
        {
            headers: {
            //     Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching...");
            }
            })
        .then(vendorData => setVendors(vendorData))
        .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
        }, []);
        console.log(vendors)
  

    function removeVendorFromState(vendorId) {
        setVendors(vendors.filter(vendorObj => vendorObj.vendorId !== vendorId));
    }

    function vendorFactory() {
        return vendors.map(vendorObj => (
            <Vendor 
                key={vendorObj.vendorId} 
                vendorObj={vendorObj} 
                vendors={vendors}
                removeFromState={removeVendorFromState}
            />
        ))
    }

    return (
        <>
            {vendorFactory()}
        </>
    )
}

export default Vendors;