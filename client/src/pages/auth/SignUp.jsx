import CommonForm from "@/components/in_common/form/CommonForm";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/redux/slices/auth_slice/authSlice";
import { registerFormControls } from "@/utils/config/Util";
import { ToastAction } from "@radix-ui/react-toast";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { toast } = useToast();
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
          description: "",
        });
        navigate("/auth/signin");
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
      <div className="max-w-[500px] w-full bg-gray-200 border-2 border-gray-200/50 m-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-center font-semibold text-xl py-8">
          Create new account
        </h1>
        <div className="w-full h-full">
          <CommonForm
            formControls={registerFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Register"}
            onSubmit={handleSubmitRegister}
          />
        </div>
        <p className="py-8 text-center capitalize">
          Already have an account ?{" "}
          <Link to="/auth/signin" className="ml-2 underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
