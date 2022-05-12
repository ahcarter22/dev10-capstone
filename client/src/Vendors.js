import { useState, useEffect } from "react";
import Vendor from "./Vendor";
import SearchVendor from "./SearchVendor";


function Vendors() {
    const [vendors, setVendors] = useState([]);
    const apiUrl=window.API_URL;

    useEffect(() => {
        fetch(apiUrl + "api/vendor",
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

    function changeSorting() {
        var sortBy = document.getElementById("select-sorting").value;
        let sortedVendors = [...vendors];
        if (sortBy == "name") {
            sortedVendors.sort((a, b) => a.name.localeCompare(b.name))
        } else {
            sortedVendors=vendors;
        }
        setVendors(sortedVendors);
      
        return sortedVendors.map(vendorObj => (
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

                <div className= "row sv">
                    <div className="col-md-6 sortitem">
                        <p className="sort-label">SORT BY: &emsp;
                            <select className="sortselect" id="select-sorting" onChange={changeSorting}>
                                <option value="random">Please Select</option>
                                <option value="name">NAME</option>
                            </select></p></div>
                            <div className="col-md-6 searchbar">
                        <SearchVendor setVendors={setVendors} />
                    </div></div>

                <div className="vendorcards container row"> 
                 {vendorFactory()}</div>

           
        </div>
    )
}

export default Vendors;