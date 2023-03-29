import React from "react";
import { useState, useEffect } from "react";
import Ajv from 'ajv';
import metadataSchema from '../metadata-schema.json';

const Upload = () => {
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
    console.log(inputFile,'inputFile')
    console.log(inputFile.files[0],'inputFile.files[0].name')



    createFile()
  };

  //Validate File
  const validateMetadata = (metadata) => {
    const ajv = new Ajv();
    const validate = ajv.compile(metadataSchema);
    const valid = validate(metadata);
    return valid ? null : validate.errors;
  };
  
  // usage:
  
  
  const createFile = async () =>{
      const dummydata = {
          name: 'medium',
          type: 'application/pdf',
          size: 5767168,
          lastModified: '2021-08-28 16:10:00.000000-0600',

        };
        const metadata = inputFile == null? dummydata : inputFile.files[0];
        const fileMeta = {
          name: metadata.name,
          type: metadata.type,
          size: metadata.size,
          lastModified: metadata.lastModified,
          Gain: 'medium',
  Battery: '4.4V',
  Datetime: new Date().toLocaleString(),
  FileSize: metadata.size,
        };
    const errors = validateMetadata(inputFile == null? dummydata : fileMeta);
  

    if (errors) {
        console.error(errors);
      } else {
        console.log('Metadata is valid');
        try {
            let response = await fetch("http://localhost:7070/graphql/",{
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "query": `
                    mutation {
                      createFile(
                        name: "${inputFile.files[0].name}", 
                        mimeType: "${inputFile.files[0].type}",
                        fileMetadata: "${JSON.stringify(fileMeta)}",
                        file: "${inputFile.files[0]}"
                        )
                        {
                        payload
                      }
                  }
                `
              })
            })
            let refreshTokens = await response.json();
            console.log({refreshTokens})
            localStorage.setItem("refresh_token", refreshTokens.data.refreshToken.token);
          } catch (error) {
            console.log({error})
          }
      }

   
  }

  return (
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
  );
};
export default Upload;
