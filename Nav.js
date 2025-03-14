import { Link,useNavigate } from "react-router-dom";
import React from "react";
import '../App.css';
const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <div>
           { auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link onClick={logout} to="signup">Logout({JSON.parse(auth).name})</Link></li>
                {/* <li>{auth ? <Link onClick={logout} to="/signup">Logout</Link>:<Link to="/signup">Signup</Link>}</li> */}
            
            </ul> : <ul className="nav-ul nav-right">
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
                </ul>} 
        </div>
    );
};

export default Nav;
