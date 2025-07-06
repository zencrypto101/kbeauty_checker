import React from 'react';
import './Page.css'; // 공통 스타일을 위해 Page.css 사용

function Contact() {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-content">
        Have questions, feedback, or suggestions? We'd love to hear from you!
        Please feel free to reach out to us through the following channels:
      </p>
      <div className="contact-info">
        <p><strong>Email:</strong> support@kbeautychecker.com</p>
        <p><strong>Phone:</strong> +82 10-1234-5678</p>
        <p><strong>Address:</strong> 123 K-Beauty Road, Seoul, South Korea</p>
      </div>
      <p className="page-content">
        You can also follow us on our social media channels for the latest updates and news:
      </p>
      <div className="social-links">
        <p><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></p>
        <p><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></p>
        <p><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></p>
      </div>
      <p className="page-content">
        We aim to respond to all inquiries within 24-48 business hours.
      </p>
    </div>
  );
}

export default Contact;