import "./App.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StepperOne from "./Components/StepperOne";
import StepperTwo from "./Components/StepperTwo";
import StepperThree from "./Components/StepperThree";
function App() {
  
  const [pop_up, setPop_up] = useState(false);

  const [statusLine, setStatusLine] = useState({
    stageOne: true,
    stageTwo: false,
    stageThree: false,
  });


  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);


  const [showStepOne, setShowStepOne] = useState('firstForm');


  const initialValues = {
    
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    message: "",
    doc_file: "",
    img_file: "",

  };

  const validationSchema = yup.object({
    name: yup.string().required().min(3, "name must be 3 characters long"),
    email: yup
      .string()
      .required()
      .matches(
        /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        "please enter a valid email"
      ),
    phone: yup
      .string()
      .required()
      .matches(/^[789]\d{9}$/, "Please enter valid number"),
    birthdate: yup.date().required(),
    address: yup.string().required().min(3, "please enter a valid address"),
    pincode: yup.string().required().min(6, "please enter a valid pincode"),
    city: yup.string().required().min(2, "please enter valid city name"),
    state: yup.string().required().min(2, "please enter valid state"),
    country: yup.string().required().min(2, "please enter valid country"),
    message: yup
      .string()
      .required()
      .max(150)
      .min(2, "please enter valid message"),
    doc_file: yup.mixed().required("please select document file"),
    img_file: yup.mixed().required("please select image file"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (state, { resetForm }) => {
      console.log(state); 
      resetForm();
      setShowStepOne('firstForm');
      setStepTwo(false);
      setPop_up(false);
    },
  });

  return (
    <div className="App">
      <main>
        {!pop_up && (
          <button className="open_popup" onClick={() => setPop_up(!pop_up)}>
            <span className="material-symbols-outlined">app_registration</span>
          </button>
        )}

        {pop_up && (
          <div className="pop-up">
            <div className="form-container">
              <div className="count-steps">
                <div
                  className="user-details"
                  onClick={() => {
                    if (stepOne) setShowStepOne('firstForm');
                  }}
                >
                  <span className={statusLine.stageOne ? "active" : ""}></span>
                  <span>User Details</span>
                </div>

                <span
                  className={statusLine.stageTwo ? "line line-bg" : "line"}
                ></span>
                <span
                  className={statusLine.stageThree ? "line2 line-bg" : "line2"}
                ></span>

                <div
                  className="address"
                  onClick={() => {
                    if (stepOne) setShowStepOne('secondForm');
                    
                  }}
                >
                  <span className={statusLine.stageTwo ? "active" : ""}></span>
                  <span>User Address</span>
                </div>

                <div
                  className="photo"
                  onClick={() => {
                    if (stepTwo) setShowStepOne('thirdForm');
                  }}
                >
                  <span
                    className={statusLine.stageThree ? "active" : ""}
                  ></span>
                  <span>Upload Photo</span>
                </div>
              </div>

              <div className="form-section">
                <form
                  className="login-form-main"
                  onSubmit={formik.handleSubmit}
                >
                  {showStepOne === 'firstForm' && (
                    <StepperOne
                      formik={formik}
                      stepOne={stepOne}
                      setStepOne={setStepOne}
                      setShowStepOne={setShowStepOne}
                      setStatusLine={setStatusLine}
                      statusLine={statusLine}
                    />
                  )}

                  {showStepOne === 'secondForm' && (
                    <StepperTwo
                      formik={formik}
                      stepTwo={stepTwo}
                      setStepTwo={setStepTwo}
                      setShowStepOne={setShowStepOne}
                      setStatusLine={setStatusLine}
                      statusLine={statusLine}
                    />
                  )}

                  {showStepOne === 'thirdForm' && (
                    <StepperThree
                      formik={formik}
                      setShowStepOne={setShowStepOne}
                      setStatusLine={setStatusLine}
                    />
                  )}
                </form>
              </div>
              <button
                className="close_popup"
                onClick={() => setPop_up(!pop_up)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
