import Header from "./Header";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Link, useLocation } from "wouter";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import { getDeviceDetails } from "../utils/browser";
import config from "../config";
import { saveState } from "../utils/browser";
import { withProtectedAccess } from "./Auth";

const SignIn = withProtectedAccess(
  () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const [_, navigate] = useLocation();
    const { mutate, isLoading, reset } = useMutation({
      mutationFn: createFetcher({
        url: `${endpoints.login}?device=${getDeviceDetails()}`,
        method: "POST",
        formEncoded: true,
      }),

      mutationKey: [endpoints.login, "POST"],

      onSuccess: (data) => {
        saveState("local", config.browserStorageKeys.accessToken, {
          accessToken: data.access_token,
          tokenType: data.bearer,
        });

        toast.success("Login successful, welcome!");

        const url = "/predict";
        navigate(url);
      },

      onError: (error) => {
        reset();
        console.log("Error: ", error);
        toast.error(error.message);
      },
    });

    function handleSubmit(values) {
      if (isLoading) return;

      mutate({
        username: values.email,
        password: values.password,
      });
    }

    return (
      <div className="w-[80%] mx-auto pt-[10vh]">
        <Header />

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password too short")
              .max(20, "Password too long")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => {
            return (
              <Form className="max-w-md space-y-4 mx-auto">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border border-green-600 rounded-2xl w-full px-4 py-3 "
                />
                <div className="text-red-600 text-xs  font-medium">
                  <ErrorMessage name="email" />
                </div>
                <div className="w-full relative">
                  <Field
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="border border-green-600 rounded-2xl w-full px-4 py-3 "
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute cursor-pointer z-20 top-1/2 -translate-y-1/2 right-4"
                  >
                    {passwordVisible ? <BsEye /> : <BsEyeSlash />}
                  </span>
                </div>
                <div className="text-red-600 text-xs  font-medium">
                  <ErrorMessage name="password" />
                </div>

                <p className="text-sm hidden text-black/80 text-right">
                  Forgot password?{" "}
                  <Link
                    to="/forgot-password"
                    className="font-medium hover:underline"
                  >
                    Reset
                  </Link>
                </p>

                <div className="w-full pt-4">
                  <button
                    disabled={!isValid || isLoading}
                    type="submit"
                    className="bg-green-600 text-white my-2 py-4 rounded-xl w-full disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {isLoading ? <Loader inverted /> : "Log In"}
                  </button>
                </div>

                <p className="text-sm text-green-600">
                  Don't have an account?{" "}
                  <Link className="font-medium hover:underline" to="/register">
                    Register
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  },
  true,
  false
);

export default SignIn;
