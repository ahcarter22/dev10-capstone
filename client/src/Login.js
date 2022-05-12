import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "./AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function submitHandler(event) {
        event.preventDefault()
        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert("Something bad");
                }
            })
            .then(tokenContainer => {
                console.log("tokenContainer: ", tokenContainer)
                const { jwt_token } = tokenContainer;
                console.log("jwt_token: ", jwt_token)
                localStorage.setItem("token", jwt_token);
                setUser({ user: jwtDecode(jwt_token) });
                navigate("/");
            })
            .catch(rejection => alert(rejection))
    }

    return (
        <div className="login-bg">
        <div className="row login-form container">
            
            <div class="col-md-6 login-left">
            <img className="loginimg" src="https://o.remove.bg/downloads/d7028fef-8a1c-48ca-878f-3b9dd2fe5d7e/login-removebg-preview.png"></img>
            </div>
            <div class="col-md-6 login-right">
                <form className="formInfo" onSubmit={submitHandler}>
                    <label className="login-label">Username:</label><br />
                    <input className="login-input" onChange={event => setUsername(event.target.value)} placeholder="Enter Username"></input><br /><br />
                    <label className="login-label">Password:</label><br />
                    <input className="login-input" type="password" onChange={event => setPassword(event.target.value)} placeholder="Enter Password"></input><br /><br />
                    <button className="login-button">Login</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;