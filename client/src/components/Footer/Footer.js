import React from "react";

// Team Footer for website - Zo
function Footer() 
{
    return (
        <div >
            <br />

            {/* Team footer for food app - Zo */}
            <div style={{ textAlign: "center", color:"white" }}>
                {/* Added Google blue hex styling for footer */}
                <div className="card-body" style={{backgroundColor:"#251351"}}>
                    <p className="card-title" >© 2021 <span className="title">Wait!</span> There's Food at Home! </p> Team 4, Project 3 😎
               </div>
            </div>

        </div>
    );
}

export default Footer;