import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
   <hr className="footer-separator"></hr>
   

          <div className="text-center">
            Powered by{" "}
            <strong>
              <Link to="/">Saim Ali</Link>
            </strong>{" "}
            <p>
              Made by{" "}
              <Link to="/">
                <strong>Saim Burhan Salman</strong>
              </Link>
            </p>
          </div>
          <p style={{position :"absolute" ,marginLeft:"10%" , marginTop:"-30px"}}>About Us</p>

          <p style={{position :"absolute" ,marginLeft:"80%" , marginTop:"-30px"}}>Contact Us</p>
          </>
  )
}

export default Footer