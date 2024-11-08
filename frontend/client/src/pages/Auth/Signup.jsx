import React, { useEffect } from 'react';
import "../../css/Login.css" 
import 'boxicons/css/boxicons.min.css';
import rom1 from '../../assets/room.gif';
import rom2 from '../../assets/room.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from './FormInput';
import {ToastContainer, toast } from 'react-toastify';
import { register, reset } from '../../redux/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/ReactToastify.min.css';
const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password } = values;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isSuccess, isError, message } = useSelector((state) => state.auth);
  
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      pattern: "^[\\w\\s]{3,}$",
      errormessage: "Username should be atleast 3 characters",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errormessage: "It should be a valid email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Password should be atleast 6 characters",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      pattern: values.password,
      errormessage: "Passwords do not match",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };

    dispatch(register(userData));
  };

  useEffect(() => {
    if(isError){
      toast.error(message);
    }else if(isSuccess){
      toast.success("User Registered Successfully");
      setTimeout(() => {
        navigate("/login");
      },3000);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);
  
  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {/*Container*/}
      <div className='h-screen flex flex-col md:flex-row justify-center items-center gap-x-7 loginPage'>
        {/*Login */}
        <div className='flex flex-col gap-y-7 w-full max-w-[300px]'>
          {/*Heading */}
          <h2 className='text-2xl font-semibold text-gray-700'>Sign Up</h2>
          <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
          />
          {/*Login Form */}
          <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button type="submit" className="login-button bg-slate-700 text-white tracking-wider p-2 rounded-2xl hove:bg-slate-800">
              Signup
            </button>
          </form>
          <div className='flex flex-col items-start gap-y-3'>
            <p className='text-sm text-gray-500'>If you Already have an Account?</p>
            <Link to="/login" className='bg-red-400 text-white px-4 py-1 rounded-2xl text-sm tracking-wider hover:bg-red-500 transition'>Login</Link>
          </div>
        </div>

        <div className='relative w-full max-w-[600px] grid place-items-center'>
           <img  src={rom2} alt ="Gif" className='absolute rounded-2xl hidden md:block'/>
           <img  src={rom1} alt="JPEG" className='absolute rounded-2xl animImg hidden md:block'/>
        </div>
      </div>
    </div>
  )
}

export default Signup
