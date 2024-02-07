import React, { useState } from "react";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const id = uuidv4();
  const { type } = useParams();
  //   console.log(type);
  const [formType, setFormType] = useState(type === "register" ? type : "");
  console.log(formType);

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === "register" ? "" : "register"));
  };

  return (
    <div>
      {formType === "register" ? (
        <div className="m-4 p-4 shadow">
          <RegisterForm id={id} />
          <p>
            Already have account?{" "}
            <a role="button" onClick={toggleFormType}>
              Sign in
            </a>
          </p>
        </div>
      ) : (
        <div className="m-4 p-4 shadow">
          <LoginForm />
          <p>
            Doesn&apos;t have account?{" "}
            <a role="button" onClick={toggleFormType}>
              Sign up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
