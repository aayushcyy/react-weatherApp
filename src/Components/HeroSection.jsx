import React from "react";
import rainCloud from "../assets/rainy-day.png";

function HeroSection() {
  return (
    <div className="w-full flex bg-[#2C284B] rounded-lg px-10 py-10 justify-between">
      <div className="flex flex-col gap-5">
        <p>13C</p>
        <p>Raipur</p>
      </div>
      <div>
        <img className="w-32" src={rainCloud} alt="" />
      </div>
      <div className="flex flex-col gap-5">
        <p>Time</p>
        <p>Date</p>
      </div>
    </div>
  );
}

export default HeroSection;
