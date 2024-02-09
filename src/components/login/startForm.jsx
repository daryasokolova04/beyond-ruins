import React, { useState } from "react";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const StartForm = () => {
  const id = uuidv4();
  const type = useParams().type;
  const navigate = useNavigate();
  const [formType, setFormType] = useState(type);
  console.log(formType);

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
    navigate(`/start/${formType}`);
  };

  return (
    <div className="shadow m-4 p-4">
      {formType === "register" ? (
        <>
          <RegisterForm id={id} />{" "}
          <p>
            Already have account?{" "}
            <a role="button" onClick={toggleFormType}>
              Sign in
            </a>
          </p>
        </>
      ) : (
        <>
          <LoginForm />{" "}
          <p>
            Doesn&apos;t have account?{" "}
            <a role="button" onClick={toggleFormType}>
              Sign up
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default StartForm;
