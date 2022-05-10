import { useState, useEffect } from "react";
import Vendor from "./Vendor";


function Vendors() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/vendor",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
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
        <div className="vendor">
            <div className="vendor-page">
                <h1 className="vendor-bg-text">Vendors</h1></div>
                <div className="vendorcards container row">  {vendorFactory()}</div>

           
        </div>
    )
}

export default Vendors;