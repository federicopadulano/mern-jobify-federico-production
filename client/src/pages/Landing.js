import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
            consequuntur accusantium quisquam minus ex. Alias blanditiis
            reprehenderit vel aliquid explicabo sit necessitatibus a quam
            obcaecati! Deleniti quae enim dicta vitae repudiandae. Pariatur
            maiores molestiae sint?
          </p>
          <Link to="/register" className="btn btn-">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
