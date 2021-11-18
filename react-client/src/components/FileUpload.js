import React, {useEffect, useState} from "react";
import axios from "axios";

// API - api.js

const http = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

const uploadFile = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  return http.post("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/images");
};




const FileUpload = () => {
  const [files, setFiles] = useState({});
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  }

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  }

  const handleFiles = (files) => {
    for(let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setFiles(obj => ({ ...obj, [files[i].name]: files[i] }));
      } else {
        files[i]['invalid'] = true;
        setFiles(obj => ({ ...obj, [files[i].name]: files[i] }));
        setError('File type not permitted');
      }
    }
  }

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  // useEffect that uploads the file to the server when the file is dropped
  useEffect(() => {
    if (Object.keys(files).length) {
      for (let i in files) {
        uploadFile(files[i], (progress) => {
          setProgress(Math.round((progress.loaded / progress.total) * 100));
        })
        .then(() => {
          setFiles(obj => delete obj[i]);
          setProgress(0);
        })
        .catch((err) => {
          setError(err);
        });
      }
    }
  }, [files]);

  return (
    <>
      { progress === 0 &&
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
             onDragOver={dragOver}
             onDragEnter={dragEnter}
             onDragLeave={dragLeave}
             onDrop={fileDrop}
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      }
      { progress > 0 &&
        <div>
          {
            Object.values(files).map((data, i) =>
              <div key={i}>
                <h4 className="sr-only">Status</h4>
                <p className="text-sm font-medium text-gray-900">Uploading {data.name} ...</p>
                <div className="mt-6" aria-hidden="true">
                  <div className="bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="hidden sm:grid grid-cols-2 text-sm font-medium text-gray-600 mt-6">
                    <div>File Type: { fileType(data.name) }</div>
                    <div className="text-right">File Size: {fileSize(data.size)}</div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      }
    </>
  )
}

export default FileUpload;