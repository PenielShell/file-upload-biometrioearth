import React from "react";
import { useState, useEffect } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";
import SearchBar from "../components/SearchInput";


const Files = () => {
 

  return (
    <div className="col-md-8 pr-4">
                <div className="mt-5">
                  <h4 className="fw-bold fs-5 mb-3">Uploaded Files list</h4>
                  <SearchBar />
                  <CDBTable responsive>
                    <CDBTableHeader>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Size</th>
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
                          <a
                            href="#deleteEmployeeModal"
                            className="text-danger text-center"
                          >
                            <i className="fas fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Name</td>
                        <td>Name</td>
                        <td>Name</td>
                        <td>
                          <a
                            href="#deleteEmployeeModal"
                            className="text-danger text-center"
                          >
                            <i className="fas fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    </CDBTableBody>
                  </CDBTable>
                </div>
              </div>
  );
};
export default Files;
