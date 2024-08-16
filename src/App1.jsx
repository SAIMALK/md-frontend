import Header from './components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './screens/Footer';
const App1 = () => {
  const [backgroundBlurred, setBackgroundBlurred] = React.useState(false);

  const handleBackgroundBlur = (value) => {
    setBackgroundBlurred(value);
  };

  const bodyStyling = {
    // maxWidth: "900px",
    margin: "0 auto 20px auto",
    padding: "20px",
    marginTop: "0",
    paddingTop: "0",
  };

  const bodyStylingBlurred = {
    // maxWidth: "900px",
    margin: "0 auto 20px auto",
    padding: "20px",
    filter: "blur(5px)",
    marginTop: "0",
    paddingTop: "0",
  };

  return (
    <>
      <Header handleBackgroundBlur={handleBackgroundBlur} />
      <div
        // className="row"
        style={backgroundBlurred ? bodyStylingBlurred : bodyStyling}
      >
      <main>
        <div className="row" style={{ maxWidth: '900px', margin: '0 auto 20px', padding: '0 20px 20px' }}>
          <Outlet />
        </div>
      </main>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App1;
