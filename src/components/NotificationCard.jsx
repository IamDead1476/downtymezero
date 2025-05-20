import React from "react";

export default function NotificationCard() {
  return (
    <div className="w-full bg-white py-20 px-4">
      <div className="relative group transform transition-transform duration-300 hover:scale-105 cursor-pointer max-w-7xl mx-auto">
        {/* Background tilted cards */}
        <div className="absolute top-1 left-1 w-full h-full bg-purple-200 transform -rotate-2 rounded-lg z-0"></div>
        <div className="absolute top-2 left-2 w-full h-full bg-purple-300 transform rotate-1 rounded-lg z-0"></div>

        {/* Main card */}
        <div className="relative bg-[#ccc5d8] text-black p-10 rounded-lg z-10 shadow-lg w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="py-8">
              <h2 className="text-3xl pb-4 md:text-4xl font-medium mb-2">Get Notified Instantly</h2>
              <p className="text-lg">
                Monitor your website's uptime and receive email alerts whenever it goes down.
              </p>
            </div>
            <button className="bg-[#eb2556] text-white px-6 py-3 rounded hover:bg-[#c91d47] transition-colors self-start md:self-center">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
