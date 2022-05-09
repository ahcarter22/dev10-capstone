import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
    function handleNotFound(){
        navigate("/");
    }

  return (

    <div className="notfound-bg">
      <div className="notfoundbtn"> <button onClick={handleNotFound} className="goback-btn">GO TO HOMEPAGE</button></div>

    </div>

  );
}

export default NotFound;