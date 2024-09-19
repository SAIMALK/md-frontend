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
          </>
  )
}

export default Footer
