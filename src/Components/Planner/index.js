import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
// import Sidebar from '../Sidebar';
import PlannerBar from '../PlannerBar';

const index = () => {
  return (
    <div className="Planner_wrapper flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex p-4 h-full">
        <PlannerBar />
      </div>
      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default index;
