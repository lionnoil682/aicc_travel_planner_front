import React from 'react';
import Calendar from '../Calendar';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Footer from '../Footer';

const index = () => {
  return (
    <div className="Page_Wrapper flex flex-col bg-white">
      <Navbar />
      <div className="Page_container h-full flex flex-col">
        <div className="flex items-start justify-center lg:mt-32 mb-12">
          <div className="calender_page_middle w-full flex h-full ">
            <Sidebar />
            <Calendar />
          </div>
        </div>
      </div>
      <div className="lg:fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default index;
