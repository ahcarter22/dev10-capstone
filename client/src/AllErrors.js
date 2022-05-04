function AllErrors({errorList}){
   return(
       <>
       {errorList.map((error) => <div> {error} </div>)}
       </>
   )
}
export default AllErrors;