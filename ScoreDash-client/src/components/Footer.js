import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { AiFillLinkedin } from "react-icons/ai";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-icon">
        <GoMarkGithub size={25} />
      </div>
      <div className="footer-icon">
        <AiFillLinkedin size={25} />
      </div>
      <div className="footer-icon">
        <SiGmail size={25} />
      </div>
    </div>
  );
}
