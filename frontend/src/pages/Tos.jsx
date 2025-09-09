import React from 'react';
import Microphone from '../components/Microphone';
import RemoteWorkerSvg from '../assets/undraw_remote-worker_0l91.svg';

function Tos() {
    return (
        <div className="h-screen bg-[#ffffeb] flex items-center justify-center px-4">
            <div className="max-w-7xl w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
                    {/* Left side - SVG Image */}
                    <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#5ea85e]/10 to-[#5ea85e]/5 rounded-3xl transform rotate-3"></div>
                            <img 
                                src={RemoteWorkerSvg} 
                                alt="Student Wellness" 
                                className="relative w-full max-w-lg h-auto drop-shadow-lg"
                            />
                        </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold text-[#000000] leading-tight">
                                Student Wellness
                                <span className="block text-[#5ea85e]">Assessment</span>
                            </h1>
                        </div>
                        
                        {/* Action Section */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-[#5ea85e] to-[#4a944a] rounded-3xl p-6 shadow-xl h-96">
                                <div className="text-center space-y-4 h-full flex flex-col">
                                    {/* Microphone Component */}
                                    <div className="pt-2">
                                        <Microphone />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <p className="text-[#000000]/50 text-xs">
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tos;