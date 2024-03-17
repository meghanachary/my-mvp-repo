// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="title">Best Rest</div>
      <a
        href="https://health.gov/myhealthfinder"
        title="MyHealthfinder"
        target="blank"
      >
        <div className="disclaimer-tag">
          All health information provided by:
          <img
            src="https://health.gov/themes/custom/healthfinder/images/MyHF.svg"
            alt="MyHealthfinder"
          />
        </div>
      </a>
    </>
  );
}

export default App;
