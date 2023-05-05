import React, { useState } from "react";
import "./OTP.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""))


  const handleOpen = () => {
    setOpen(!open);
  };


const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp(
      otp.map((d, idx) => (idx === index ? element.value : d))
    );

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && !otp[index] && index !== 0) {
      e.preventDefault();
      const prevInput = e.target.previousSibling;
      prevInput.focus();
    } else if (e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
      const inputs = document.getElementsByName("otp");
      if (e.keyCode === 37 || e.keyCode === 38) {
        const prevInput = inputs[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        const nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const pastedOtp = pastedData.slice(0, 6).split("");
    setOtp(pastedOtp.concat(new Array(6 - pastedOtp.length).fill("")));
  };

  return (
    <div className="App">
      <button onClick={handleOpen}>Open popup</button>
      {open && (
        <div className="App">
          <div className="popup">
            <div className="popup-header">
              <h1>Phone Verification</h1>
            </div>

            <div>
              <h1>Enter Your OTP</h1>
            </div>
            {
              otp.map((data, index) => {
                return <input 
                className="otp-field"
                type="text" 
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target,index)}
                onFocus={e => e.target.select()}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                />
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
