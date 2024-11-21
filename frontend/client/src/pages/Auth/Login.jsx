import React, { useEffect, useState } from 'react';
import rom1 from '../../assets/room.gif';
import rom2 from '../../assets/room.jpeg';
import { Link, useNavigate} from 'react-router-dom';
import Loading from '../Loading/Loading';
import FormInput from './FormInput';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../redux/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css';
import "../../css/Login.css"; 
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { username, password } = values;
  const [background, setBackground] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading , setIsLoading] = useState(false);

  const { isSuccess, isLogoutSuccess, isError, message} = useSelector(
    (state) => state.auth
  );
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("User Login Successful"); 
       setTimeout(() => {
        localStorage.setItem('username',username);
        localStorage.setItem('user',JSON.stringify(user))
        navigate("/dashboard", {replace: true});
        window.location.reload();
      }, 2000);
      clearTimeout(); 
    } else if (isLogoutSuccess) {
      toast.success("User Logout Successful");
      setBackground('white');
    }
    dispatch(reset());
  }, [isSuccess, isLogoutSuccess, navigate]);

  const handleNavigationClick = (path) => (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 2000);
    return () => clearTimeout()
  };

  const handleSignUpClick = handleNavigationClick('/signup');
  const handleForgotPasswordClick = handleNavigationClick('/forgotPassword');
  const handleBackClick = handleNavigationClick('/');
  if(isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
          <Loading/>
      </div>
    )
  }

  const input = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      required: true,
      pattern: "^[\\w\\s]{3,}$",
      errormessage: "Invalid Username",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Invalid Password",
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };
  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div style={{background}}>
      {/*Container*/}
      <div className='h-screen flex flex-col md:flex-row justify-center items-center gap-x-7 loginPage'>
        {/*Login */}
        <div className='flex flex-col gap-y-1.5 w-full max-w-[300px]'>
          {/*Heading */}
          <h2 className='text-2xl font-semibold text-gray-700'>Login</h2>

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
          {/*Login Form */}`
          <form className='flex flex-col gap-y-3' onSubmit = {handleSubmit}>
            {input.map((input) => (
              <FormInput key={input.id} 
              {...input} 
              onChange={onChange} 
              value={values[input.name]}
              />
            ))}
            {/*Login Button */}
            <button type="submit" className="login-button bg-slate-700 text-white tracking-wider p-2 rounded-2xl hove:bg-slate-800">
              Login
            </button>
          </form> 
          <span className='border-t-2 w-full text-center'>OR</span>
          {/*Google Button */}
          <button className='bg-slate-400 p-2 rounded-2xl flex justify-center items-center gap-x-3 hover:bg-slate-500 transition'>
            <i className='bx bxl-google text-yellow-400 text-xl'></i>
            <span className='text-sm text-white tracking-wider'>Login with Google</span> 
          </button>

          <Link to='/forgotPassword' onClick = {handleForgotPasswordClick} className='text-blue-400 text-xs font-semibold underline'>Forgot my Password</Link>

          <div className='flex flex-col items-start gap-y-3'>
            <p className='text-sm text-gray-500'>If you do not have An Account. Create</p>
            <div className='flex gap-3'>
                <Link to='/signup' onClick={handleSignUpClick} className='bg-red-400 text-white px-4 py-1 rounded-2xl text-sm tracking-wider hover:bg-red-500 transition'>Register</Link>
                <Link to='/' onClick={handleBackClick} className='bg-yellow-400 text-white px-4 py-1 rounded-2xl text-sm tracking-wider hover:bg-red-500 transition'>Go back</Link>
            </div>
           
          </div>
        </div>
        <div className='relative w-full max-w-[600px] grid place-items-center'>
           <img  src={rom1} alt ="Gif" className='absolute rounded-2xl hidden md:block'/>
           <img  src={rom2} alt="JPEG" className='absolute rounded-2xl animImg hidden md:block'/>
        </div>
      </div>

    </div>
  )
}

export default Login
