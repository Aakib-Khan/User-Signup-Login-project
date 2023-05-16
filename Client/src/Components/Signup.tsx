import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const User = z.object({
  username: z
    .string()
    .nonempty("username is Required")
    .min(3, "Username must be at least 3 characters long")
    .max(20),
  email: z
    .string()
    .nonempty("Email is required field")
    .email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be 6 char Long"),
});

export type SignUpData = z.infer<typeof User>;

const data = async (userData: SignUpData) => {
  console.log({ userData });
  const response = await axios.post(
    "http://localhost:5000/user/signup",
    userData
  );

  return response.data;
  // console.log({response});
};

const SignUp: React.FC = () => {
  const redirect = useNavigate();

  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      redirect("/login");
    }
  }, [auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>({ resolver: zodResolver(User) });

  // const onError=()=>{
  //   console.log(isError);
  //   console.log(error);
  // }
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(data, {
    onSuccess: (res) => {
      console.log(res?.token);
      // localStorage.setItem("user", JSON.stringify(res?.token));
    },
    onError: (error) => {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }
      // console.log(error?.response?.data?.message);
    },
  });
  console.log({ isError });
  console.log({ isSuccess });
  const onSubmit = handleSubmit((data: SignUpData) => {
    const newData = { ...data };
    console.log({ ...data });
    mutate(newData);
  });
  const toLogin=()=>{

redirect("/login")
  }
  return (
    <div className="flex flex-col h-100 mt-[8rem] justify-center items-center ">
        <button className="ml-[900px] font-mono text-xl bg-blue-500 text-white px-4 py-2 rounded-xl " onClick={toLogin} >LogIn</button>
      {/* <div className="mb-7 flex flex-row " > */}
        <h3 className="font-bold font-mono text-[25px] my-[1rem] ">Register</h3>
      {/* </div> */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          {...register("username")}
          placeholder="Enter Your Name"
          className="border border-gray-600   font-mono px-5"
        />
        {errors.username && (
          <p className="font-mono text-red-600">{errors.username?.message}</p>
        )}

        <input
          type="email"
          {...register("email")}
          placeholder="Enter Your Email"
          className="border border-gray-600  font-mono px-5"
        />
        {/* <input type="file" placeholder='Enter Product Name' value={image}   className='border border-gray-600   font-mono px-5' /> */}
        {errors.email && (
          <p className="font-mono text-red-600">{errors.email?.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Enter Your Password"
          className="border border-gray-600 font-mono px-5"
        />
        {errors.password && (
          <p className="font-mono text-red-600">{errors.password?.message}</p>
        )}

        <button
          className="bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 "
          onClick={onSubmit}
        >
          {/* Sign Up */}
          {isLoading ? "Loading..." : "Signup"}
        </button>
        {isError && (
          <span className="font-mono">{error?.response?.data?.message}</span>
        )}
      </div>
    </div>
  );
};

export default SignUp;
