"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { assets } from '@/Assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState('');

  const handleFunction = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/email', { email });
      console.log(response.data); // Log response for verification
      setEmail(''); 
      if(response.data.success)
      toast.success(response.data.msg);// Clear the email input after successful submission
    } catch (error) {
      console.error('Failed to submit:', error);
     
      toast.error("Error occured")
      // Handle error states or display an error message to the user
    }
  };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get Started<Image src={assets.arrow}/></button>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis ducimus tenetur corrupti repellendus, temporibus deserunt nam ab excepturi sit dicta sequi sint aperiam corporis, minima accusamus illo ex esse fugiat.</p>
        <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' onSubmit={handleSubmit}>
          <input type="email" placeholder='Enter your email' className='pl-4 outline-none' value={email} onChange={handleFunction}/>
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
