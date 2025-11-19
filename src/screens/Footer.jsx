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
<!-- Start of HubSpot Embed Code -->
  <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/20570446.js"></script>
<!-- End of HubSpot Embed Code -->
export default Footer
