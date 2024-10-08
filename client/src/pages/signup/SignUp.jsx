import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-white'>
                SignUp
                <span className='text-pink-800 font-bold'> chatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
              <label className='label p-2 mt-5'>
                        <span className='text-white text-base label-text '> Full Name </span>
                    </label>
                    <input type='text' placeholder='Enter your Full Name ' className='w-full input input-bordered h-10'
                    value={inputs.fullName}
                    onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                    />
              </div>

              <div>
              <label className='label p-2'>
                        <span className='text-white text-base label-text'> Username </span>
                    </label>
                    <input type='text' placeholder='Enter your Username ' className='w-full input input-bordered h-10'
                     value={inputs.userName}
                     onChange={(e) => setInputs({...inputs, userName: e.target.value})}
                     />
              </div>

              <div>
              <label className='label p-2'>
                        <span className='text-white text-base label-text'> Password </span>
                    </label>
                    <input type='password' placeholder='Enter your Password ' className='w-full input input-bordered h-10'
                     value={inputs.password}
                     onChange={(e) => setInputs({...inputs, password: e.target.value})}
                    />
              </div>

              <div>
              <label className='label p-2'>
                        <span className='text-white text-base label-text'> Confirm Password </span>
                    </label>
                    <input type='password' placeholder='Confirm your Password ' className='w-full input input-bordered h-10'
                     value={inputs.confirmPassword}
                     onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                    />
              </div>
              
              <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender = {inputs.gender}/>

              <Link to='/login' className='text-white text-sm hover:underline hover:text-white mt-2 inline-block'>
                    Already have an Account?
              </Link>

              <div>
              <button className='btn btn-block btn-sm mt-2'> SignUp </button>
              </div>

            </form>

      </div>

    </div>
  )
}

export default SignUp