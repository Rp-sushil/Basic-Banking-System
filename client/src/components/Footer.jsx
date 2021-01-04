import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-dark py-5">
      <div className="container grid grid-3">
        <div className="social">
          <a href="https://github.com/Rp-sushil/Basic-Banking-System">
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100008683154130">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com/in/sushil-kumar-805b3a177/">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
        <div>
          <p>Copyright &copy;</p>
        </div>
        <div>
          <p>
            This Basic Banking System App project is devoloped under the GRIP
            (The spark foundation) as Task by <strong>Sushil Kumar</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
