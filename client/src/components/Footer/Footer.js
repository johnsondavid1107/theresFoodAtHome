import React from "react";

// Footer for website - no idea why it's not linking with App.js as a seperate component
// Team will help me figure it out - for now I put in all the pages which is not what I want - Zo
function Footer()
{
    return(
        <div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>© 2021 <span>Wait! </span>There's Food</strong> by 
                        <a href="https://github.com/johnsondavid1107/theresFoodAtHome"> Team 4 😎</a>
                      
    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;