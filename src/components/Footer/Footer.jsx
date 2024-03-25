import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3" style={{ backgroundColor: '#f5f5dc' }}>
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <img
              src="/icon.png"
              alt="Your Logo"
              className="footer-logo"
              style={{ width: '50px', height: 'auto' }}
            />
          </Col>
          <Col md={4} className="text-center">
            <p style={{ color: 'black' }}>&copy; 2024 Rythm Reserve. All rights reserved.</p>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <p style={{ color: 'black' }}>Made with love for love of music!</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;