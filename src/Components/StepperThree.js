import React, { useEffect, useState } from "react";

const StepperThree = ({ formik, setShowStepOne }) => {
  const [uploadImg, setUploadImg] = useState("");
  const [uploadDoc, setUploadDoc] = useState("");

  const handleChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      const imgType = ["image/png", "image/jpeg", "image/webp"];
      if (imgType.includes(img.type)) {
        formik.setFieldValue("img_file", img);
        setUploadImg(img);
      } else {
        event.target.value = null;
        console.error("Invalid file type. Please select a valid image file.");
      }
    }
  };

  const handleFileChange = (event) => {
    const docFile = event.target.files[0];
    if (docFile) {
      const docType = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      if (docType.includes(docFile.type)) {
        formik.setFieldValue("doc_file", docFile);
        docFile && setUploadDoc(docFile.name);
      } else {
        console.error("Invalid file type. Please select a valid document file.");
      }
    }
  };

  const handleDeletePhoto = () => {
    formik.setFieldValue("img_file", "");
    setUploadImg(null);
  };

  const handleDeleteFile = () => {
    formik.setFieldValue("doc_file", "");
    setUploadDoc(null);
  };

  useEffect(() => {
    formik.values.img_file && setUploadImg(formik.values.img_file);
    formik.values.doc_file && setUploadDoc(formik.values.doc_file.name);
  }, []);

  return (
    <div className="stepper-one">
      <div className="step-one">
        <div className="form-file-box">
          {uploadDoc ? (
            <div className="upload-doc">
              <span>File Name : {uploadDoc}</span>
              <button
                className="form-btn cancel-btn"
                onClick={handleDeleteFile}
              >
                cancel
              </button>
            </div>
          ) : (
            <div className="upload-doc">
              <span className="material-symbols-outlined">upload</span>
              <p>Upload File</p>
              <input
                className="upload-input"
                name="doc_file"
                type="file"
                accept=".doc,.docx,.txt"
                onChange={handleFileChange}
                onBlur={formik.onBlur}
              />
            </div>
          )}
          {formik.errors.doc_file && formik.touched.doc_file ? (
            <span className="form-error"> {formik.errors.doc_file} </span>
          ) : null}
        </div>

        <div className="form-file-box">
          {uploadImg ? (
            <div className="upload-doc">
              <img
                alt="uploaded_image"
                className="selected_img"
                src={URL.createObjectURL(uploadImg)}
              />
              <button
                className="form-btn cancel-btn"
                onClick={handleDeletePhoto}
              >
                cancel
              </button>
            </div>
          ) : (
            <div className="upload-doc">
              <span className="material-symbols-outlined">upload</span>
              <p>Upload Image</p>
              <input
                className="upload-input"
                name="img_file"
                type="file"
                accept=".jpeg, .jpg, .png,.webp"
                onChange={handleChange}
                onBlur={formik.onBlur}
              />
            </div>
          )}

          {formik.errors.img_file && formik.touched.img_file ? (
            <span className="form-error"> {formik.errors.img_file} </span>
          ) : null}
        </div>

        <div className="btns">
          <button
            type="button"
            className={"form-btn"}
            onClick={() => {
              setShowStepOne(1);
            }}
          >
            {" "}
            Prev Page{" "}
          </button>{" "}
          <button type="submit" className={"form-btn"}>
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepperThree;
