import React, { useContext } from 'react'
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {user, setUser, saveUser, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        try {
            setLoading(true);
        e.preventDefault();
        const response = await fetch(
            "http://localhost:8000/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            },
        );

        const data = await response.json();
        if(data.user){
            saveUser(data.user);
            navigate("/");
            let message = loading ? <ClipLoader color='#3B82F6' size={50} /> : 'Login Successfull'
            toast.success(message);
            setLoading(false);
        }

        console.log(user)

        if(response.error){
            toast.error(response.error);
            setLoading(false);
            return;
        }

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
            <Toaster />
            <form className='w-fit px-5 h-fit bg-white py-8 drop-shadow-2xl rounded-lg flex flex-col justify-center items-center space-y-5' onSubmit={handleLogin}>
                <div className='w-full flex items-center justify-center'>
                    <p className='text-3xl font-extrabold'>{
                        loading ? <ClipLoader color='#3B82F6' size={50} /> : 'Login'
                    }</p>
                </div>
                <input className='p-3  outline-none focus:ring-2 focus:ring-blue-500 rounded-lg duration-200 bg-gray-100' value={email} onChange={
                    (e) => setEmail(e.target.value)
                } type="email" placeholder='Email' />
                <input className='p-3  outline-none focus:ring-2 focus:ring-blue-500 rounded-lg duration-200 bg-gray-100' onChange={
                    (e) => {
                        setPassword(e.target.value);
                    }} value={password} type="password" placeholder='Password' />
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg text-lg font-bold' type="submit">Submit</button>

                <p>
                    Don't have an account? <span onClick={() => navigate('/register')} className='text-blue-500 cursor-pointer underline'>Register</span>
                </p>
            </form>
        </div>
    )
}

export default Login;