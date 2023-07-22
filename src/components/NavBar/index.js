import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { ClockIcon } from "../../icons";
import "./style.scss";

const navLinks = [
  {
    navigateTo: "/timers",
    text: "Simple timers",
  },
  {
    navigateTo: "/advancedTimers",
    text: "Advanced timers",
  },
];

export const NavBar = () => {
  const [currentPath, setCurrentPath] = useState("/timers");
  const navigate = useNavigate();

  const renderNavLinks = () =>
    navLinks.map(({ navigateTo, text }) => (
      <Nav.Link
        className={navigateTo === currentPath ? "link-selected" : ""}
        onClick={(e) => {
          e.preventDefault();
          setCurrentPath(navigateTo);
          navigate(navigateTo);
        }}
      >
        {text}
      </Nav.Link>
    ));

  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand href="/timers">
          <div className="logo">
            <ClockIcon />
            <h3 className="title">Time Tracker</h3>
          </div>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
        >
          <Nav>{renderNavLinks()}</Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
