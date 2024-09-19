import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
// import Sidebar from '../Sidebar';
import PlannerBar from '../PlannerBar';

const index = () => {
  return (
    <div className="Planner_wrapper flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex p-4">
        <PlannerBar />
      </div>
      <Footer />
    </div>
  );
};

export default index;
