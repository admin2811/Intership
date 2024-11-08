import React, { useState,useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import {forgotPassword, reset} from '../../redux/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isSuccess, isError, message } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const input = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errormessage: "It should be a valid email",
    }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({email}));
  }
  return (
    <div id='content' role = 'main' className='w-full max-w-md mx-auto p-6'>
      <div className='mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300'>
        <div className='p-4 sm:p-7'>
            <div className='text-center'>
              <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Forgot Password?</h1>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                Remember your password?
                <Link to='/login' className='text-blue-600 decoration-2 hover:underline font-medium'> Login Here</Link>
              </p>
            </div>
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
            <div className='mt-5'>
              <form onSubmit={handleSubmit}>
                <div className='grid gap-y-4'>
                  <div>
                    <label className='block text-sm font-bold ml-1 mb-2 dark:text-white'>Email Address</label>
                    {input.map((input) => (
                      <FormInput
                        key = {input.id}
                        {...input}
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        className ="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      />
                    ))}
                    <p className='hidden text-xs text-red-600 mt-2'>Please include a valid email address so we can get back to you</p>
                  </div>
                  <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
                  </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
