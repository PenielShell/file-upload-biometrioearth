import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/login");
  }
  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#053921">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            biometrioearth
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/"  className={({isActive}) => isActive ? 'link activeClicked' : 'link'}>
              <CDBSidebarMenuItem icon="columns">Files</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/users" className={({isActive}) => isActive ? 'link activeClicked' : 'link'}>
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            
          </CDBSidebarMenu>
          <CDBSidebarMenu></CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
           <button onClick={()=>{logout()}}  className="text-decoration-none text-white sidebar-btn-wrapper"
            style={{
              padding: "20px 5px",
              background: "transparent",
              border: "none"
            }}>
             Log Out
            </button>
        </CDBSidebarFooter>

      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
