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

    useEffect(() => {
        if (searchTerm.searchTerm) {
            getSearchResults();
        }
    }, [searchTerm])

    function getSearchResults() {
        fetch("http://localhost:8080/api/item/search?name=" + searchTerm.searchTerm)
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
    console.log(foundItems);

    // function foundItemFactory(){
    //     return foundItems.map(itemObj => (
    //         <Item
    //             key={itemObj.itemId}
    //             itemObj={itemObj}
    //             foundItems={foundItems}
    //         />
    //     ))
    // }

   

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex">
                <input className="add-input form-control me-2" type="search" placeholder="Search" aria-label="Search" {...register("searchTerm")} />
                <button className="cardbtn1 btn btn-outline-success" type="submit">Search</button>
            </form>
            {/* {foundItemFactory} */}
        </>
        
    )
}
export default Search;