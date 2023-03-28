import React from "react";
import { useState, useEffect } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchInput";

const Dashboard = () => {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  useEffect(() => {
    setInputFile(document.getElementById("input-file"));
  }, []);

  const handleUpload = () => {
    inputFile?.click();
  };
  const handleDisplayFileDetails = () => {
    inputFile?.files && setUploadedFileName(inputFile.files[0].name);
  };

  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Navbar />
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}
          >
            <div className="row">
              <div
                className="col-md-4"
                style={{ borderRight: "1px solid #ccc" }}
              >
                <div className="my-5">
                  <label className="fw-bold">Choose file: </label>
                  <input
                    id="input-file"
                    onChange={handleDisplayFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button
                    onClick={handleUpload}
                    className={`btn btn-sm btn-outline-${
                      uploadedFileName ? "success" : "primary mx-3 "
                    }`}
                  >
                    {uploadedFileName ? uploadedFileName : "Upload"}
                  </button>
                </div>
              </div>
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
                            class="text-danger text-center"
                          >
                            <i class="fas fa-trash"></i>
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
                            class="text-danger text-center"
                          >
                            <i class="fas fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    </CDBTableBody>
                  </CDBTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
