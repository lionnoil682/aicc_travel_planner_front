import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const loginPage = useSelector((state) => state.auth.authData);

  const handleLoginPage = (e) => {
    if (!loginPage) {
      e.preventDefault();
      const userConfirmed = window.confirm(
        '로그인이 필요한 페이지입니다. 로그인 하시겠습니까?'
      );
      if (userConfirmed) {
        navigate('/login'); // 로그인 페이지로 리디렉션
      } else {
        navigate('/'); // 루트 페이지로 리디렉션
      }
    }
  };

  return (
    <div className="Sidebar_container  lg:w-2/5 mr-1 flex flex-col justify-evenly ">
      <div className="Introduce p-1 h-1/3 ">
        <p className="Introduce_wrapper text-center border-2 border-white lg:m-1 p-3 flex flex-col gap">
          <span className="Introduce_title lg:text-7xl i13:text-3xl border-2 border-white p-1 font-bold font-gothicA1">
            My Travel Planner
          </span>
          <br />
          <span className="Introduce_text lg:text-2xl i13:text-base border-2 text-center border-white  lg:mt-2 p-1  font-gothicA1 font-semibold ">
            당신의 꿈을 현실로 만드는 특별한 계획,
            <br /> 지금 시작하세요!
          </span>
        </p>
      </div>
      <div className="Sub_link_container m-1  h-1/3 flex flex-col items-center ">
        <div className="Sub_link_wrapper flex flex-col justify-center items-center lg:space-y-8 i13:space-y-2 lg:w-2/3 i13:w-5/6">
          <div className="map lg:p-3 i13:p-1 text-xl w-full text-center bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 ">
            <Link
              to="/map"
              className="w-full block h-full text-inherit no-underline text-white"
              onClick={handleLoginPage}
            >
              여행 지도
            </Link>
          </div>
          <div className="planner lg:p-3 i13:p-1 text-xl w-full text-center bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <Link
              to="/calendarpage"
              className="w-full block h-full text-inherit no-underline text-white"
              onClick={handleLoginPage}
            >
              여행 계획하기
            </Link>
          </div>
          <div className="project lg:p-3 i13:p-1 text-xl w-full text-center bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <Link
              to="/travelproject"
              className="w-full block h-full text-inherit no-underline text-white"
              onClick={handleLoginPage}
            >
              여행 목록 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
