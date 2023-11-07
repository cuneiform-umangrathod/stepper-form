import React, { useEffect, useState } from "react";

const StepperTwo = ({
  formik,
  setShowStepOne,
}) => {
  useEffect(() => {
    !formik.errors.address &&
    !formik.errors.pincode &&
    !formik.errors.city &&
    !formik.errors.country &&
    !formik.errors.state &&
    !formik.errors.message
      ? setStepTwo(true)
      : setStepTwo(false);
  });

  const [stepTwo, setStepTwo] = useState(false);


  return (
    <div className="stepper-one">
          <div className="step-one">
            <div className="form-input-box">
              <input
                type="text"
                name="address"
                id="address"
                className="form-input"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="address"
                className={
                  formik.values.address ? "label valid-input" : "label"
                }
              >
                Address
              </label>{" "}
              {formik.errors.address && formik.touched.address ? (
                <span className="form-error"> {formik.errors.address} </span>
              ) : null}
            </div>{" "}
            <div className="form-input-box">
              <input
                type="text"
                name="pincode"
                id="pincode"
                className="form-input"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={
                  formik.values.pincode ? "label valid-input" : "label"
                }
              >
                Pincode
              </label>
              {formik.errors.pincode && formik.touched.pincode ? (
                <span className="form-error"> {formik.errors.pincode} </span>
              ) : null}
            </div>{" "}
            <div className="form-input-box">
              <input
                type="text"
                name="city"
                id="city"
                className="form-input"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={formik.values.city ? "label valid-input" : "label"}
              >
                City
              </label>
              {formik.errors.city && formik.touched.city ? (
                <span className="form-error"> {formik.errors.city} </span>
              ) : null}
            </div>
            <div className="form-input-box">
              <input
                type="text"
                name="state"
                id="state"
                className="form-input"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={formik.values.state ? "label valid-input" : "label"}
              >
                State
              </label>
              {formik.errors.state && formik.touched.state ? (
                <span className="form-error"> {formik.errors.state} </span>
              ) : null}
            </div>
            <div className="form-input-box">
              <input
                type="text"
                name="country"
                id="country"
                className="form-input"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={
                  formik.values.country ? "label valid-input" : "label"
                }
              >
                Country
              </label>
              {formik.errors.country && formik.touched.country ? (
                <span className="form-error"> {formik.errors.country} </span>
              ) : null}
            </div>
            <div className="form-input-box">
              <textarea
                name="message"
                id="message"
                className="form-input"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={
                  formik.values.message ? "label valid-input" : "label"
                }
              >
                Message
              </label>
              {formik.errors.message && formik.touched.message ? (
                <span className="form-error"> {formik.errors.message} </span>
              ) : null}
            </div>
           
           <div className="btns">


            <button
              type="button"
              className={ "form-btn"}
              onClick={() => {
                  setShowStepOne(0);
            }}
            >
              {" "}
        Prev Page{" "}
            </button>{" "}
            <button
              type="button"
              className={stepTwo ? "form-btn" : ""}
              disabled={!stepTwo}
              onClick={() => {
                  setShowStepOne(2);
                  
                }}
                >
              {" "}
              Next Page{" "}
            </button>
                </div>
          </div>
    </div>
  );
};

export default StepperTwo;
