import React, { useState } from "react";
import Navbar from './Navbar';
import banner from '/banner.jpg';
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Simple() {
    const currentUrl = window.location.href;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleContact = (event) => {
        event.preventDefault();
        console.log('Sending', formData);

        fetch('http://localhost:5000/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setFormData({name: '', phone: '', email: '', message: ''}); // Reset form on successful post
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <Navbar />
            <div className='flex mt-10'>
                <div className="w-1/2 rounded-xl">
                    <div className="flex-col p-16">
                        <div className="w-full max-w-sm bg-base-100 space-y-6">
                            <h1 className="text-5xl text-[#3366CC] font-semibold">Contact Us</h1>
                            <form onSubmit={handleContact} className="space-y-4">
                                <div className="form-control relative">
                                    <FaUser className='absolute text-lg left-4 top-4 text-blue-900'/>
                                    <input type="text" placeholder="Name" name="name" className="pl-10  input text-xl input-bordered rounded-full bg-base-200" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-control relative">
                                    <FaPhone className='absolute text-lg left-4 top-4 text-blue-900'/>
                                    <input type="text" placeholder="Phone Number" name="phone" className="pl-10 input text-xl input-bordered rounded-full bg-base-200" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className="form-control relative">
                                    <MdEmail className='absolute text-xl left-4 top-4 text-blue-900'/>
                                    <input type="email" placeholder="Email" name="email" className="pl-10 input text-xl input-bordered rounded-full bg-base-200" value={formData.email} onChange={handleChange} required />
                                </div>
                                <textarea className="textarea text-xl textarea-bordered w-full rounded-3xl bg-base-200" placeholder="Message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                                <div className="form-control mt-6">
                                    <button className="btn w-full rounded-full text-white bg-[#3366CC]">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img className='w-3/4' src={banner} alt="" />
                </div>
            </div>
            <div className="pl-16">
            <h3 className="text-xl font-semibold text-[#3366CC] mb-4">Share This Page:</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                {/* Facebook Share Button */}
                <FacebookShareButton url={currentUrl} quote="Check out this amazing page!">
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                {/* Twitter Share Button */}
                <TwitterShareButton url={currentUrl} title="Check out this amazing page!">
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                {/* Email Share Button */}
                <EmailShareButton url={currentUrl} subject="Amazing Page" body="Check out this site: ">
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>

                {/* Copy URL Button */}
                <CopyToClipboard text={currentUrl}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        📋
                    </button>
                </CopyToClipboard>
            </div>
        </div>
        </div>
    );
}
