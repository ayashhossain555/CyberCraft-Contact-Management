import logo from '/logo2.png';
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const {createUser} = useContext(AuthContext)

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [seePass, setSeePass]= useState(false)

    const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, email, password);
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one upper case characters.')
            return;
        }

        createUser(email, password)
            .then(result => {
                setSuccess('Account Created Successfully.')
                console.log(result.user)
            })
            .catch(error => {
                setRegisterError(error.message);
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
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                        <input type="text" placeholder="Full Name" name='name' className="input border-b-4 border-[#3366CC] w-full" required />
                        </div>
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
                        <button className="btn bg-[#3366CC] text-white">Sign Up</button>
                        </div>
                    </form>
                    {
                        registerError && <p className="text-red-700 text-sm text-center font-semibold">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-600 text-sm text-center font-semibold">{success}</p>
                    }
                        <div className='my-4'>
                            <p className='text-sm text-center'>Already have an account? <Link to="/login"><a className='text-[#3366CC] font-bold underline'>Login</a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;