import React from "react";
import { useState, useEffect } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";
import SearchBar from "../components/SearchInput";
import { gql } from 'graphql-tag';
import { useQuery } from '@apollo/client';

const Files = () => {
    const initialFormData = Object.freeze({
        name: "",
      });
    
      const [formData, updateFormData] = useState(initialFormData);
    
    
      const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      };
    
    const FETCH_FILES_QUERY = gql`
    query FetchFiles($search: String) {
      allFiles(search: $search) {
        items {
            id
        name
        mimeType
        fileMetadata
        createdAt
        }
      }
    }
  `;
  
  // Inside your component or function
  const { loading, error, data } = useQuery(FETCH_FILES_QUERY, {
    variables: { search: formData.name},
  });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

 // const { totalCount, files } = data.allFiles;

  return (
    <div className="col-md-8 pr-4">
                <div className="mt-5">
                  <h4 className="fw-bold fs-5 mb-3">Uploaded Files list</h4>
                  <div className="col-md-4 w-100 py-0 my-3">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search File..."
                        name="name"
                        id="name"
                        onChange={handleChange}
                    />
                    </div>
                  <CDBTable responsive>
                    <CDBTableHeader>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>MimeType</th>
                        <th>File Metadata</th>
                        <th>created At</th>
						<th>Actions</th>
                      </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                    {/* {data.map(file => (
                         <tr key={file.name}>
                            <td>{file.id}</td>
                            <td>{file.name}</td>
                            <td>{file.mimeType}</td>
                            <td>{JSON.stringify(file.fileMetadata)}</td>
                            <td>{file.createdAt}</td>
                            <td>
                            <a
                                href="#deleteEmployeeModal"
                                className="text-danger text-center"
                            >
                                <i className="fas fa-trash"></i>
                            </a>
                            </td>
                        </tr>
                    ))} */}
                    </CDBTableBody>
                  </CDBTable>
                </div>
              </div>
  );
};
export default Files;
