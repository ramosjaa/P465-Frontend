import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    // <footer className="footer mt-auto py-3" style={{ backgroundColor: '#f5f5dc' }}>
    //   <Container>
    //     <Row>
    //       <Col md={4} className="text-center text-md-left">
    //         <img
    //           src="/icon.png"
    //           alt="Your Logo"
    //           className="footer-logo"
    //           style={{ width: '50px', height: 'auto' }}
    //         />
    //       </Col>
    //       <Col md={4} className="text-center">
    //         <p style={{ color: 'black' }}>&copy; 2024 Rythm Reserve. All rights reserved.</p>
    //       </Col>
    //       <Col md={4} className="text-center text-md-right">
    //         <p style={{ color: 'black' }}>Made with love for love of music!</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </footer>
    <div style={{ position: "relative" }}>
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  About Us
                </h6>
                <p>
                  We're a ticket distribution company established by music enthusiasts and concert attendees.
                  Our mission is to offer opportunities for emerging artists to gain exposure and cultivate
                  their fan bases.
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                <p>
                  <a className="text-white">Events</a>
                </p>
                <p>
                  <a className="text-white">Venues</a>
                </p>
                <p>
                  <a className="text-white">Live</a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p><i className="fas fa-home"></i> Bloomington, IN 47408, US</p>
                <p><i className="fas fa-envelope"></i> rhythmreserve@gmail.com</p>
                <p><i className="fas fa-phone"></i> +1 930 548 2814</p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }}
                  href="#" role="button">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>

                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }}
                  href="#" role="button">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>

                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39' }}
                  href="#" role="button">
                  <FontAwesomeIcon icon={faGoogle} />
                </a>

                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }}
                  href="#" role="button">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>

                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }}
                  href="#" role="button">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>

                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }}
                  href="#" role="button">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </section>
        </div>
        <div className="text-center p-3">
          © 2024 Copyright:
          <a className="text-white" href="#">rhythmreserve.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;