import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Item from "./Item";

function SearchVendor({setVendors}){

    const [ searchTerm, setSearchTerm ] = useState({});
    const { register, handleSubmit } = useForm();
    const [foundItems, setFoundItems] = useState([]);
    const onSubmit = term =>  {
        setSearchTerm(term);
    }

    useEffect(() => {
        if (searchTerm.searchTerm) {
            getSearchResults();
        }
    }, [searchTerm])

    function getSearchResults() {
        fetch("http://localhost:8080/api/vendor/search?name=" + searchTerm.searchTerm,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        )
        .then(response => {
            if (response.status === 200) {
               return response.json();
            } else {
                console.log("error");
            }
        })
        .then(itemData => setVendors(itemData))
      
        .catch(errors => {
            console.log("error: ", errors);
        });   
    }
  

   

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex">
                <input className="searchselect form-control me-2" type="search" placeholder="Search Vendor Name" aria-label="Search" {...register("searchTerm")} />
                <button className="cardbtn1 btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
        
    )
}
export default SearchVendor;