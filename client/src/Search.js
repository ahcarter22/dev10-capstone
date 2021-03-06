import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Item from "./Item";

function Search({setItems}){

    const [ searchTerm, setSearchTerm ] = useState({});
    const { register, handleSubmit } = useForm();
    const [foundItems, setFoundItems] = useState([]);
    const onSubmit = term =>  {
        setSearchTerm(term);
    }
    const apiUrl=window.API_URL;

    useEffect(() => {
        if (searchTerm.searchTerm) {
            getSearchResults();
        }
    }, [searchTerm])

    function getSearchResults() {
        fetch(apiUrl + "api/item/search?name=" + searchTerm.searchTerm,
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
        .then(itemData => setItems(itemData))
      
        .catch(errors => {
            console.log("error: ", errors);
        });   
    }
  

   

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex">
                <input className="searchselect form-control me-2" type="search" placeholder="Search Item Name" aria-label="Search" {...register("searchTerm")} />
                <button className="cardbtn1 btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
        
    )
}
export default Search;