import React from 'react';
import { CDBTable,
  CDBTableHeader,
  CDBTableBody, } from "cdbreact";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const Users = () => {
   return (
		<div className="d-flex profile">
			<div>
      	<Sidebar/>
			</div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
      	<Navbar/>
      	<div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(1, minmax(200px, 700px))"}}>
              <div className="mt-5">
                <h4 className="font-weight-bold mb-3">All Users list</h4>
                <CDBTable responsive>
                  <CDBTableHeader>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email Address</th>
                      <th>Phone number</th>
                      <th>Actions</th>
                    </tr>
                  </CDBTableHeader>
                  <CDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Name</td>
                      <td>Name</td>
					            <td>Name</td>
                      <td>   
                      <a href="#deleteEmployeeModal" class="text-danger text-center">
                        <i class="fas fa-trash" ></i>
                       </a>
                       </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Name</td>
                      <td>Name</td>
                      <td>Name</td>
                    </tr>
                  </CDBTableBody>
                </CDBTable>
              </div>
            </div>
          </div>
        </div>
			</div>
		</div>

	);;
};

export default Users;
