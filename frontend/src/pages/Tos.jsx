import React from 'react';
import Microphone from '../components/Microphone';
import RemoteWorkerSvg from '../assets/undraw_remote-worker_0l91.svg';

function Tos() {
    return (
        <div className="h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f4f8ff' }}>
            <div className="max-w-7xl w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
                    {/* Left side - SVG Image */}
                    <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative">
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
                                <span className="block" style={{ color: '#ff3f74' }}>Assessment</span>
                            </h1>
                        </div>
                        
                        {/* Action Section */}
                        <div className="space-y-6">
                            <div className="rounded-3xl p-6 shadow-xl h-96" style={{ background: 'linear-gradient(135deg, #ff3f74, #e73568)' }}>
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