import React from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Microphone from '../components/Microphone';
import { ToastContainer } from 'react-toastify';

function Tos() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <TopBar />
            <div className="pt-32 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-600 mb-12">
                            Please review and accept our Terms of Service. You can also complete your emotional intelligence assessment with voice interaction below.
                        </p>
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <Microphone />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Tos;