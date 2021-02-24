import React from "react";
// Zo's Navbar CSS
import "./style.css";
// Importing food-promo video - Zo
import Video from "../../images/food-demo.mp4";


function NavBar() {
  return (
    <div container="true" style={{ backgroundColor: "#BA324F" }}>

      {/* There's Food video demo - Zo*/}
      <video style={{ backgroundColor: "#BA324F" }} width="100%" height="240" muted autostart="true" loop autoPlay src={Video} type="video/mp4" className="video-Zo" />

      <br />

      {/* Title of Team App */}
      <h2 style={{ backgroundColor: "#BA324F" }}><span className="title">Wait!</span> There's Food at Home!</h2>

      <br />

      {/* Navbar section - refer to styling regarding this section or ask Zo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/pantry">

          {/* Icon for Pantry - Zo*/}
          {/* Added correct react synthax to correct errors during build - Zo */}
          <span role="img" aria-label="Pantry" style={{ backgroundColor: "#EB6864" }}>🧺 My Pantry</span>
        </a>
        {/* Added Emoji for Recipe icon - Zo*/}
        <a className="navbar-brand" href="/recipes">
          {/* Added correct react synthax to correct errors during build - Zo */}
          <span style={{ backgroundColor: "#EB6864" }} role="img" aria-label="Logout">📖 Recipes</span>
        </a>
        {/*  Added Logout Emoji for logout - Zo*/}

        <a className="navbar-brand" href="/logout">
          {/* Added correct react synthax to correct errors during build - Zo */}
          <span role="img" aria-label="Logout" style={{ backgroundColor: "#EB6864" }}>➡️ Logout</span>
        </a>
      </nav>


      {/* Ending div for component - Zo */}
    </div >
  );
}

export default NavBar;

