import React, { useEffect, useRef, useState } from "react";

const StepperThree = ({ formik, setShowStepOne }) => {
  const [uploadImg, setUploadImg] = useState("");
  const [uploadDoc, setUploadDoc] = useState("");
  const [keywords, setKeywords] = useState("");
  const keywordRef = useRef(null);
  const [checkKeywords, setCheckKeywords] = useState(false);

  const handleChange = (event) => {
    const img = event.target.files;

    if (Object.keys(img).length <= 5) {
      // formik.setFieldValue("img_file", img);
      setUploadImg(Object.values(img).map((item) => item));
    } else {
      console.error("only accept 5 images");
      event.target.value = null;
    }
  };

  const handleMore = (event) => {
    const img = event.target.files[0];
    setUploadImg([...uploadImg, img]);

    // formik.setFieldValue("img_file", {...formik.values.img_file,});
  };

  // };  const handleChange = (event) => {
  //   const img = event.target.files[0];
  //   console.log(typeof(event.target.files));
  //   if (img) {
  //     const imgType = ["image/png", "image/jpeg", "image/webp"];
  //     if (imgType.includes(img.type)) {
  //       formik.setFieldValue("img_file", img);
  //       setUploadImg(img);
  //     } else {
  //       event.target.value = null;
  //       console.error("Invalid file type. Please select a valid image file.");
  //     }
  //   }
  // };

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
      }
      // else {
      //   console.error(
      //     "Invalid file type. Please select a valid document file."
      //   );
      // }
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

  const handleRemoveImageClick = (items) => {
    if (Object.values(uploadImg).length === 1) {
      handleDeletePhoto();
      return;
    }

    setUploadImg(uploadImg.filter((item) => item !== items));
  };

  const handleKeywordChange = (event) => {
    const value = keywordRef.current.value.trim();
    if (!value || keywords.includes(value)) return;

    setKeywords([...keywords, value]);
    keywordRef.current.value = "";
    // formik.setFieldValue("keywords",keywords);
    setCheckKeywords(false);
  };

  const handleDeleteKeyword = (index) => {
    setKeywords(keywords.filter((item) => item !== keywords[index]));
    if (keywords.length === 1) setKeywords("");
  };

  const check = () => {
    formik.setFieldValue("img_file", uploadImg);
  };

  const handleExtraKeys = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleKeywordChange();
    }
    if (e.code === "Backspace" && !e.target.value) {
      if (keywords.length <= 1) {
        setKeywords("");
        return;
      }
      setKeywords(
        keywords.filter((key) => key !== keywords[keywords.length - 1])
      );
    }
  };

  useEffect(() => {
    formik.values.img_file && setUploadImg(formik.values.img_file);
    formik.values.doc_file && setUploadDoc(formik.values.doc_file.name);
    formik.values.keywords && setKeywords(formik.values.keywords);
  }, []);

  useEffect(() => {
    formik.setFieldValue("img_file", uploadImg);
  }, [uploadImg]);

  useEffect(() => {
    formik.setFieldValue("keywords", keywords);
  }, [keywords]);

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
              <div className="img_box">
                {uploadImg.map((items, index) => {
                  return (
                    <div key={index} className="img_wrapper">
                      <img
                        alt="uploaded_image"
                        className="selected_img"
                        src={URL.createObjectURL(items)}
                      />
                      <button
                        type="button"
                        id="delete_img"
                        onClick={() => handleRemoveImageClick(items)}
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="btnCollection">
                {uploadImg.length < 5 && (
                  <div className="addMore">
                    <input
                      type="file"
                      className="addMoreInput"
                      onChange={handleMore}
                      accept=".jpeg, .jpg, .png,.webp"
                    />
                    <button type="button" className="form-btn cancel-btn">
                      add More
                    </button>
                  </div>
                )}

                {uploadImg.length > 1 && (
                  <button
                    type="button"
                    className="form-btn cancel-btn"
                    onClick={handleDeletePhoto}
                  >
                    clear all
                  </button>
                )}
              </div>
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
                multiple
              />
            </div>
          )}

          {formik.errors.img_file && formik.touched.img_file ? (
            <span className="form-error"> {formik.errors.img_file} </span>
          ) : null}
        </div>

        <div className="keyword-box">
          <div className="form-input-box">
            <input
              type="text"
              className="form-input"
              id="keyword-input"
              ref={keywordRef}
              name="keywords"
              onChange={(e) => {
                e.target.value
                  ? setCheckKeywords(true)
                  : setCheckKeywords(false);
              }}
              onKeyDown={handleExtraKeys}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="keywords"
              className={checkKeywords ? "valid-input label" : "label"}
            >
              Keywords
            </label>
            {formik.errors.keywords && formik.touched.keywords && (
              <span className="form-error">{formik.errors.keywords}</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleKeywordChange}
            className={"form-btn"}
          >
            Add
          </button>
        </div>

        <div className="show-keywords">
          {keywords &&
            keywords.map((item, index) => {
              return (
                <div
                  key={index}
                  className="show-keyword-span"
                  onClick={() => handleDeleteKeyword(index)}
                >
                  <span>{item}</span>
                  <span className="material-symbols-outlined">close</span>
                </div>
              );
            })}
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
          <button onClick={check} type="submit" className={"form-btn"}>
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepperThree;
