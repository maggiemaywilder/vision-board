/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { fbapp, fileUpload } from '../utils/firebase';
import { Row, Button } from 'react-materialize';
import M from 'materialize-css';

function MyDropzone(props) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const handleUpload = (e) => {
    e.stopPropagation();
    if (files) {
      files.forEach((file) => {
        fileUpload(file, props.bid);
      });
      M.toast({ html: `File(s) saved to ${props.boardName} successfully!` });
      setFiles([]);
    } else {
      M.toast({ html: "Please drag and drop or select a file to upload." });
    }
  }

  return (
    <section className="container">
      <div id="dropzone" {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        <Row>
          <p>Files:</p>
          <ul>
            {files.map(file => (
              <li>
                {file.path}
              </li>
            ))}
          </ul>
        </Row>
        <Button className="orange darken-3" onClick={handleUpload}>Upload</Button>
      </div>
    </section>
  );
}

export default MyDropzone;