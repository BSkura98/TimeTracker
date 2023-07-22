import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { ClockIcon } from "../../icons";
import "./style.scss";

export const Navbar = () => {
  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand href="/timers">
          <div className="logo">
            <ClockIcon />
            <h3 className="title">Time Tracker</h3>
          </div>
        </BootstrapNavbar.Brand>
      </Container>
    </BootstrapNavbar>
  );
};
