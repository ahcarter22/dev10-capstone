import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    function handleAbout(){
        navigate("/about");
    }
    return(
        // <>Home Placeholder</>
        <home>
        <div className="home-page">
            <div className="header"> Distribution, Storage, Warehousing & Fulfillment </div>
            <div className="header1">Your solution for first class warehousing services for the goods, food, grocery, pharmaceutical and general commodity industries.</div>
            <button onClick={handleAbout} className="learn-button">Learn More</button>
          
          
        </div>

        </home>
       
    );
}

export default Home;