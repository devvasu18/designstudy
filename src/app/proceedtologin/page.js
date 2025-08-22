"use client";
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const descriptions = [
  { main: "Watch your following's stories secretly", sub: "Download stories" },
  { main: "Watch who are the secret viewers on your profile", sub: "See who's watching" },
  { main: "Increase real followers", sub: "Get more engagement in free" },
];

const ProceedToLogin = () => {
  const [index, setIndex] = useState(0);

  const handleLogin = () => {
    window.location.href = "https://www.instagram.com/accounts/login/#";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % descriptions.length);
    }, 4000); // switch every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm flex items-center justify-center">
        {/* Main Login Card */}
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl w-full flex flex-col justify-between" style={{ minHeight: '85vh', maxHeight: '90vh' }}>
          {/* Top Section */}
          <div>
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <Eye className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">InStalker</h1>
            </div>

          {/* Profile Pictures Circle - Much Slower Rotation */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Rotating container - Slowed down to 60 seconds */}
            <div
              className="absolute inset-0 animate-spin"
              style={{ 
                animationDuration: "60s",
                animationTimingFunction: "linear"
              }}
            >
              {/* Attractive profiles positioned around the circle */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute top-8 right-6 w-14 h-14">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-12 h-12">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute bottom-8 right-6 w-16 h-16">
                <img
                  src="https://randomuser.me/api/portraits/men/29.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute bottom-8 left-6 w-14 h-14">
                <img
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-13 h-13">
                <img
                  src="https://randomuser.me/api/portraits/women/55.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute top-8 left-6 w-15 h-15">
                <img
                  src="https://randomuser.me/api/portraits/men/41.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Center profile - Static, doesn't rotate */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
              <img
                src="https://randomuser.me/api/portraits/women/21.jpg"
                alt="Center Profile"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>           
          
           
            </div>
          <div>{/* Auto-swiping Descriptions with Swiper */}
            <div className="mb-6 w-full overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {descriptions.map((desc, i) => (
                  <div key={i} className="w-full flex-shrink-0 text-center px-2">
                    <p className="text-gray-600 font-medium mb-1 text-base">
                      {desc.main}
                    </p>
                    <p className="text-gray-500 text-sm">{desc.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading dots as swiper indicators */}
            <div className="flex justify-center mb-6 space-x-2">
              {descriptions.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === index ? "bg-gray-600 w-4" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div></div>
          {/* Login Button at Bottom */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center space-x-2 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
           <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center mr-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-4 h-4 text-pink-600"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.5-.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5z" />
  </svg>
</div>

            <span>Login with Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedToLogin;