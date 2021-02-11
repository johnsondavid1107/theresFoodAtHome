import React from "react";
import "./style.css"
import "./script"

function NavBar() 
{
  return (
    <div >
      {/* There's Food logo - Zo*/}
      <img className = "cooking-logo"src="https://media3.giphy.com/media/3o6ZsZY8H2dqtq81Ko/source.gif"/>
      
      <br/>

      {/* Title of Team App */}
      <h2 className="title is-2"><span>Wait!</span> There's Food </h2>

      {/* Search Bar - Zo */}
      <div class="topnav">
  <input type="text" placeholder="Search food...😋"/>
      </div>

      <br/>

      {/* Bulma Dropdown Menu code - Zo*/}
      <div className="dropdown container">
  <div className="dropdown-trigger">
    <button className="button is-arrowless" style={{backgroundColor:"hsl(204, 86%, 53%)"}} aria-haspopup="true" aria-controls="dropdown-menu">
      <span style={{color:"white"}} >Menu</span>
      <span className="icon">
        <i className="fas  is-arrowless" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      <a href="#" className="dropdown-item">
       <i className="fas fa-user"> Zo's Account</i>
      </a>
      <a href="#" className="dropdown-item" style = {{color:"hsl(204, 86%, 53%)"}}>
        <p style = {{fontWeight:"bold"}}>Possible Recipes</p>
      </a>
      <a href="#" className="dropdown-item" style = {{color:"#0F9D58"}}>
        <p style = {{fontWeight:"bold"}}>Trendy Recipes</p>
      </a>
      <hr className="dropdown-divider"/>
      <a href="#" className="dropdown-item">
      <span className = "is-$Danger" style = {{fontWeight:"bold"}}>Expiring Food</span>
      </a>
    </div>
  </div>
</div>

{/* Navbar section - Zo */}
 <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/pantry">
     <i class="fas fa-shopping-basket" > My Pantry </i>
      </a>
            <a className="navbar-brand" href="/hot">
              🍕 Hot 
             </a>

             <a className="navbar-brand" href="/cold">
             🍦 Cold
             </a>
  </nav>


{/* Ending div for component - Zo was here */}
</div>
  );
}

export default NavBar;

