import React from 'react';
import './Page.css'; // 공통 스타일을 위해 Page.css 사용

function AboutUs() {
  return (
    <div className="page-container">
      <h1 className="page-title">About K-Beauty Popularity Checker</h1>
      <p className="page-content">
        Welcome to K-Beauty Popularity Checker, your go-to platform for discovering the true popularity of K-Beauty products in Korea.
        Our mission is to provide transparent and reliable information, helping beauty enthusiasts worldwide make informed decisions.
      </p>
      <p className="page-content">
        We understand the challenges of navigating the vast and dynamic K-Beauty market. That's why we aggregate data from key Korean beauty platforms,
        including Olive Young (Korea's largest health & beauty store) and Hwahae (a leading beauty app known for its detailed product reviews and rankings).
      </p>
      <p className="page-content">
        Our data includes product availability at Olive Young, rankings on Hwahae, and various sales data points,
        giving you a comprehensive overview of a product's standing in the Korean market.
        Whether you're a seasoned K-Beauty lover or just starting your journey, our checker is designed to be your trusted companion.
      </p>
      <p className="page-content">
        Thank you for choosing K-Beauty Popularity Checker. We are continuously working to expand our database and enhance your experience.
      </p>
    </div>
  );
}

export default AboutUs;