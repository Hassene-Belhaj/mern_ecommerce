import CommonForm from "@/components/in_common/form/CommonForm";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/redux/slices/auth_slice/authSlice";
import { loginFormControls } from "@/utils/config/Util";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
          description: "",
        });
      } else {
        toast({
          title: data?.payload?.message || "Uh oh! Something went wrong.",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <div className="w-full h-full m-auto flex justify-center items-center mx-4">
      <div className="max-w-[500px] w-full bg-gray-100 border-2 border-gray-200/50 m-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-center font-semibold text-xl py-8">
          Welcome Again
        </h1>
        <div className="w-full h-full">
          <CommonForm
            formControls={loginFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Login"}
            onSubmit={handleSubmitLogin}
          />
        </div>
        <p className="py-8 text-center capitalize">
          Don't have an account Yet ?{" "}
          <Link to="/auth/signup" className="ml-2 underline underline-offset-4">
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
