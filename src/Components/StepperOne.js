import React, { useEffect, useState } from "react";



const StepperOne = ({
  formik,
  setShowStepOne,
}) => {
  useEffect(() => {
    formik.values.name &&
    formik.values.email &&
    formik.values.phone &&
    formik.values.birthdate &&
    !formik.errors.name &&
    !formik.errors.email &&
    !formik.errors.phone &&
    !formik.errors.birthdate
      ? setStepOne(true)
      : setStepOne(false);
  });
  const [stepOne, setStepOne] = useState(false);
  
  
  return (
    <div className="stepper-one">
      
          <div className="step-one">
            <div className="form-input-box">
              <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={formik.values.name ? "label valid-input" : "label"}
              >
                Name
              </label>{" "}
              {formik.errors.name && formik.touched.name ? (
                <span className="form-error"> {formik.errors.name} </span>
              ) : null}
            </div>{" "}
            <div className="form-input-box">
              <input
                type="text"
                name="email"
                id="email"
                className="form-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className={formik.values.email ? "label valid-input" : "label"}
              >
                Email
              </label>
              {formik.errors.email && formik.touched.email ? (
                <span className="form-error"> {formik.errors.email} </span>
              ) : null}
            </div>{" "}
            <div className="form-input-box">
              <input
                type="number"
                name="phone"
                id="phone"
                className="form-input"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={e=>{
                    if(e.key === 'e' || e.key === '+' || e.key === '-'){
                        e.preventDefault();
                    }
                }}
              />
              <label
                htmlFor="name"
                className={formik.values.phone ? "label valid-input" : "label"}
              >
                Phone
              </label>
              {formik.errors.phone && formik.touched.phone ? (
                <span className="form-error"> {formik.errors.phone} </span>
              ) : null}
            </div>
            <div className="form-input-box">
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                className="form-input"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="name" className={"label valid-input"}>
                Birthdate
              </label>
              {formik.errors.birthdate && formik.touched.birthdate ? (
                <span className="form-error"> {formik.errors.birthdate} </span>
              ) : null}
            </div>
            <button
              type="button"
              className={stepOne ? "form-btn" : ""}
              disabled={!stepOne}
              onClick={() => {
                setShowStepOne(1)
              }}
            >
              {" "}
              Next Page{" "}
            </button>
          </div>

    </div>
  );
};

export default StepperOne;
