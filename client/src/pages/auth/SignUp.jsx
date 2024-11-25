import CommonForm from "@/components/in_common/form/CommonForm";
import { registerFormControls } from "@/utils/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="w-full h-full m-auto flex justify-center items-center mx-4">
      <div className="max-w-[500px] w-full bg-gray-100 border-2 border-gray-200/50 m-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-xl py-8">Create new account</h1>
        <div className="w-full h-full">
          <CommonForm
            formControls={registerFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Register"}
          />
        </div>
        <p className="py-8 text-center capitalize">
          Already have an account{" "}
          <Link to="/auth/signin" className="underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
