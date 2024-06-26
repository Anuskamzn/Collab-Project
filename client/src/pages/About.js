import React from "react";
import { Link } from "react-router-dom";
import bg from "../imag/Aboutus.jpg";
import Layout from "./../components/Layout/Layout";

import SubBanner from "./SubBanner";
import Footer from "../components/Layout/Footer.js";
import Top from "./AboutUs/Top";
import Testimonials from "./Testimonial";
import Choosing from "./ChoosingUs";
// import Card from "./CaseStudy";

const About = () => {
  return (
    <Layout>
=======
      {/* Banner Section  */}
      <section>
        <SubBanner heading="About Us" subHeading="Home /About Us" img={bg} />
      </section>

      {/* Top Section  */}
      <section>
        <Top />
      </section>
      <section>
        <div
          className="text-center pt-5 pb-5 pl-5 container "
          data-aos="slide-up"
          data-aos-offset="100"
        >
          <Choosing />
        </div>
      </section>
      {/* Middle Section  */}

      <section>
        <Testimonials />
      </section>
      {/* Bottom Section  */}
      {/* <section>
        <Card />
      </section> */}

      {/* Footer Section  */}
    </Layout>
  );
};

export default About;
