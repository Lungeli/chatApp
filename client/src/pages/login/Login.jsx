import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-white'>
                Login
                <span className='text-pink-800 font-bold'> chatApp</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2 mt-5'>
                        <span className='text-white text-base label-text'> Username </span>
                    </label>
                    <input type='text' placeholder='Enter UserName' className='w-full input input-bordered h-10'/>
                </div>
                <div>
                <label className='label p-2'>
                        <span className='text-white text-base label-text'> Password </span>
                    </label>
                    <input type='text' placeholder='Enter Password' className='w-full input input-bordered h-10'/>
                </div>
                <Link to='/signup' className='text-white text-sm hover:underline hover:text-white mt-2 inline-block'>
                    {"Don't"} have an Account?
                </Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2'> Login </button>
                </div>

            </form>
        </div>

    </div>
  )
}

export default Login;