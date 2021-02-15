import React from "react";

// Footer for website - no idea why it's not linking with App.js as a seperate component
// Team will help me figure it out - for now I put in all the pages which is not what I want - Zo
function Footer() 
{
    return (
        <div>
                <br />
            {/* Team footer for food app - Zo */}
            <div className="card" style={{ textAlign: "center" }}>
                <div className="card-body">
                    <p className="card-title">© 2021 <span className="title">Wait!</span> There's Food </p> Team 4, Project 3 😎
               </div>
            </div>

        </div>
    );
}

export default Footer;