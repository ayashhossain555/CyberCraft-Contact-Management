import React from 'react';
import logo from '/logo2.png';
import { Link } from 'react-router-dom';


const Logout = () => {
    return (
        <div>
            <div className="rounded-xl mt-8">
                <div className="flex-col">
                    <div className="card w-1/2 bg-gradient-to-b from-[#C2DAFF] to-[#EFF1F0] my-20 px-20 py-14 mx-auto  shadow-2xl  bg-base-100">
                        <div className="text-center flex flex-col items-center">
                            <img className='w-48' src={logo} alt="" />
                        </div>
                        <p className='text-center mb-3 mt-10'>The password has been send to your registered email address. Kindly check your email inbox and spam folder.</p>
                        <div className='my-4'>
                             <Link to="/login"><button className='btn text-white bg-[#3366CC] w-full'><a className='text-white font-bold'>Login Page</a></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;