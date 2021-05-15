import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

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
          <ul>{fileList}</ul>
        </aside>
      </div>
    </section>
  );
}

export default MyDropzone;