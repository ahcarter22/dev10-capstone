function AllErrors({errorList}){
   
   return(
       <>
       {errorList.map((error) => <div> {error} </div>)}
       </>
   )
}
export default AllErrors;

// function AllErrors({messages, setShowMessages}){
//     function parseMessages(){
//         return messages.map((message,index) => <div key={index}> {message} </div>);
//     }
//     return(
//         <div className="alert alert-warning alert-dismissible fade show" role="alert">
//         <ul>
//             {parseMessages()}
          
//         </ul>
//         <button onClick={() => setShowMessages(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//     </div>
//     )
//  }
//  export default AllErrors;

// function Alert({messages,setShowMessages}){
//     function parseMessages(){
//        return messages.map(message)
//     }
// }