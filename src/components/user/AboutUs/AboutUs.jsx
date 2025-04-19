import React from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import "./about.css";

function AboutUs() {
  return (
    <div className="aboutMianDiv">
      {/* Left Section */}
      <div className="about">
        <h1>About Us</h1>
        <div className="descrpt">
          <h1>Why We Stand Out</h1>
          <span>For Gamers by Gamers</span>
          <p>
            We specialize in creating high-performance custom PCs tailored to
            your needs. Our team of experts ensures top-quality components and
            exceptional craftsmanship to deliver the ultimate gaming and
            workstation experience.
          </p>
        </div>
        <button className="team-button-s">
          <IoArrowForwardCircleSharp className="iconsbtn-team" />
          <span className="Team">Team Neo Tokyo</span>
        </button>
        <div className="misson">
          <h1>The Tech Mission & Core</h1>
          <p>
            At our company, we pride ourselves on providing personalized
            service, expert advice, and after-sales support. With our team of
            experienced professionals, we ensure that every custom PC we build
            meets the unique needs and preferences of our customers. Whether
            you're a gamer, a content creator, or a professional in need of a
            powerful workstation, we have the expertise to deliver the perfect
            solution.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="imageDiv">
        <div></div>
      </div>
    </div>
  );
}

export default AboutUs;
