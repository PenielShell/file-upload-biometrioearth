import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar } from "cdbreact";

const Navbar = () => {

	return (
        <Header style={{background:"#053921", color:"#fff"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
          </CDBNavbar>
        </Header>
	);
}

export default Navbar;
