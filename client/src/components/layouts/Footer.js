import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <>
   <hr/>
<footer class="footer-main">
  <div class="footer-container">
    <div class="footer-section">
      <div class="footer-content">
        <h4 class="footer-title">World Traveling</h4>
        <h5 class="footer-subtitle">
          Traveling with loved ones, friends, or even fellow adventurers fosters a bond through shared experiences
        </h5>
        <div class="footer-social">
          <button type="button">
            <i class="fab fa-twitter"></i>
          </button>
          <button type="button">
            <i class="fab fa-facebook-square"></i>
          </button>
          <button type="button">
            <i class="fab fa-dribbble"></i>
          </button>
          <button type="button">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-section">
          <span class="footer-heading">Useful Links</span>
          <ul class="footer-list">
            <li>
              <a href="/about" class="footer-link">About Us</a>
            </li>
            <li>
              <a href="/tour" class="footer-link">Tour</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="footer-divider"/>
    <div class="footer-section">
      <div class="footer-content">
        Copyright © <span id="get-current-year" class="footer-year">2024</span>
        <a href="/" target="_blank" class="footer-link"> Origin</a>
        <a href="/" class="footer-link"> 5 kilo</a>.
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer
