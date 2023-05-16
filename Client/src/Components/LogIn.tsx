import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = z.object({
  // username: z.string().nonempty("username is Required").min(3,'Username must be at least 3 characters long').max(20) ,
  email: z
    .string()
    .nonempty("Email is required field")
    .email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be 6 char Long"),
});
type SignUpData = z.infer<typeof User>;

const LogIn: React.FC = () => {
  const redirect = useNavigate()

  const data = async (userData: SignUpData) => {
    console.log({ userData });
    const response = await axios.post(
      "http://localhost:5000/user/login",
      userData
    );

    return response.data;
    // console.log({response});
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>({ resolver: zodResolver(User) });

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(data, {
    onSuccess: (res) => {
      console.log({ res });
      redirect("/home")
      localStorage.setItem('user', JSON.stringify(res))
    },
    onError: (error) => {
      // alert(error?.response?.data?.message)
      console.log(error);
    },
  });
  const onSubmit = handleSubmit((data: SignUpData) => {
    console.log({ data });
    const newData = { ...data };
    mutate(newData);
  });
  const auth = localStorage.getItem("user");

  const toSignup=()=>{
    redirect("/")
  }
  return (
    <div className="flex flex-col h-100 mt-[8rem] justify-center items-center ">
      {
!auth && 
      <button className="ml-[900px] font-mono text-xl bg-blue-500 text-white px-4 py-2 rounded-xl " onClick={toSignup} >Signup</button>
      }
      <h3 className="font-bold font-mono text-[25px] my-[1rem] hover:font-serif ">
        Login
      </h3>

      <div className="flex flex-col gap-3">
        <input
          type="email"
          {...register("email")}
          placeholder="Enter Your Email"
          className="border border-gray-600  font-mono px-5"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Enter Your Password"
          className="border border-gray-600 font-mono px-5"
        />
        <button
          className="bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 "
          onClick={onSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LogIn;
