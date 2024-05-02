import React, { useContext, useState } from 'react';
import logo from '/logo2.png';

import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { FaGoogle } from "react-icons/fa";

const SignIn = () => {

    const {signIn,  signInWithGoogle}= useContext(AuthContext)
    const navigate = useNavigate();

    const [seePass, setSeePass]= useState(false)

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate('/dashboard');
            })
            .catch(error => console.error(error))
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate('/dashboard');
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div>
            <div className="rounded-xl mt-8">
                <div className="flex-col">
                    <div className="card w-1/2 bg-gradient-to-b from-[#C2DAFF] to-[#EFF1F0] my-20 px-20 py-14 mx-auto  shadow-2xl  bg-base-100">
                    <div className="text-center flex flex-col items-center">
                        <img className='w-48' src={logo} alt="" />
                    </div>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                        <input type="email" placeholder="Email Address" name='email' className="input border-b-4 border-[#3366CC] w-full" required />
                        </div>
                        <div className="form-control">
                        <div className='relative'>
                            <input type={seePass?"text":"password"} placeholder="Password" name='password' className="input border-b-4 border-[#3366CC] w-full" required />
                            <span className='absolute right-3 top-4' onClick={()=>setSeePass(!seePass)}>{seePass?<FaEyeSlash className='text-[#3366CC]'/>:<FaEye className='text-[#3366CC]' />}</span>
                        </div>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn bg-[#3366CC] text-white">Login</button>
                        </div>
                    </form>
                    <div className="divider text-[#3366CC]">Or, Sign in with:</div>
                        <div className="flex flex-col gap-2 justify-center items-center content-center">
                            <button onClick={handleGoogleSignIn} className="btn btn-ghost border-2 border-[#3366CC]"><span><FaGoogle /></span>Sign In with Google</button>
                        </div>
                        <div className='my-4'>
                            <p className='text-sm text-center'>New to CyberCraft? <Link to="/signup"><a className='text-[#3366CC] font-bold underline'>Sign Up!</a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;