import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { fbapp, fileUpload } from '../utils/firebase';
import { Button } from 'react-materialize';

function MyDropzone() {
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
    fileUpload(files[0])
  }

  const fileList = files.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        <aside>
          <h4>Files</h4>
          <ul>{fileList[0]}</ul>
        </aside>
        <Button className="orange darken-3" onClick={handleUpload}>Upload</Button>
      </div>
    </section>
  );
}

export default MyDropzone;