import Header from "./Header";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { createFetcher, endpoints } from "../utils/fetchhelpers";

import { Field, ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [_, navigate] = useLocation();

  const { mutate, isLoading, reset } = useMutation({
    mutationFn: createFetcher({
      url: endpoints.register,
      method: "POST",
    }),

    mutationKey: [endpoints.signUp, "POST"],

    onSuccess: (data) => {
      toast.success("Registration successful, proceed to verify your email. ");

      const url = `/email/${data.acuid}/${data.rid}`;
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
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="w-[80%] mx-auto pt-[10vh]">
      <Header />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .min(2, "Too Short!")
            .max(15, "Too Long!")
            .required("Required"),
          lastName: Yup.string()
            .min(2, "Too Short!")
            .max(20, "Too Long!")
            .required("Required"),
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
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                className="border border-green-600 rounded-2xl w-full px-4 py-3 "
              />

              <div className="text-red-600 text-xs  font-medium">
                <ErrorMessage name="firstName" />
              </div>

              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="border border-green-600 rounded-2xl w-full px-4 py-3 "
              />

              <div className="text-red-600 text-xs  font-medium">
                <ErrorMessage name="lastName" />
              </div>

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

              <div className="w-full pt-4">
                <button
                  disabled={!isValid || isLoading}
                  type="submit"
                  className="bg-green-600 text-white my-2 py-4 rounded-xl w-full disabled:opacity-40 disabled:pointer-events-none"
                >
                  {isLoading ? <Loader /> : "Register"}
                </button>
              </div>

              <p className="text-sm text-green-600">
                Have an account already?{" "}
                <Link className="font-medium hover:underline" to="/login">
                  Log in
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUp;
