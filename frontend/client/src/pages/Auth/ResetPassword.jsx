import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/auth/authSlice';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { toast ,ToastContainer} from 'react-toastify';
import { reset } from '../../redux/auth/authSlice';
const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  })

  const {password} = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const resetToken = location.pathname.split("/")[2];

  const { isSuccess, isError, message } = useSelector((state) => state.auth);
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
  
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Password should be atleast 6 characters",
    },
    {
      id: 2,
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
    dispatch(resetPassword({ password, resetToken }));
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div id='content' role = 'main' className='w-full max-w-md mx-auto p-6'>
      <div className='mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300'>
        <div className='p-4 sm:p-7'>
            <div className='text-center'>
              <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Reset Password?</h1>
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
                    {inputs.map((input) => (
                      <FormInput
                        key = {input.id}
                        {...input}
                        value = {values[input.name]}
                        onChange = {onChange}
                        
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

export default ResetPassword
