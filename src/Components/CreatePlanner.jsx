import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { TfiWrite } from 'react-icons/tfi';
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify'; // Toast 기능을 추가
import 'react-toastify/dist/ReactToastify.css'; // Toast 스타일을 추가

const Createplanner = () => {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.authData);
  const [projectTitle, setProjectTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectIdx, setProjectIdx] = useState('');
  const { project_idx } = useParams();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(
          `https://travel-planner-back.aicclionnoil.co.kr/get_calendar_date/${authData.user_idx}`
        );
        if (response.data && response.data.length > 0) {
          const { project_idx, start_date, end_date } = response.data[0];
          setProjectIdx(project_idx);
          setStartDate(subtractOneDay(start_date) || '');
          setEndDate(subtractOneDay(end_date) || '');
        }
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchCalendarData();
  }, [authData.user_idx]);

  const subtractOneDay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0];
  };

  const handleSave = async () => {
    if (!projectTitle) {
      // 제목이 비어있을 때 Toast 알림 표시
      toast.error('제목을 입력해주세요!', {
        position: 'top-center',
        autoClose: 3000, // 3초 후에 자동 닫힘
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!projectIdx) {
      console.error('프로젝트가 생성되지 않았습니다');
      return;
    }

    try {
      await axios.patch(
        'https://travel-planner-back.aicclionnoil.co.kr/update_planner_title',
        {
          project_idx: projectIdx,
          project_title: projectTitle,
          start_date: startDate,
          end_date: endDate,
        }
      );
      navigate(`/planner/${projectIdx}`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const handleMain = async (item) => {
    if (handleMain)
      try {
        await axios.delete(
          `https://travel-planner-back.aicclionnoil.co.kr/delete_travel_data/${authData.user_idx}/${projectIdx}`
        );

        navigate('/');
      } catch (error) {
        console.error('데이터 삭제 중 오류 발생:', error);
      }
  };

  return (
    <div className="Page_Wrapper flex flex-col h-screen bg-gray-900">
      <div className="Page_container flex flex-col h-full relative">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="fixed inset-0 bg-white bg-opacity-100 z-999 "></div>
          <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50 i13:h-[69%] lg:h-full">
            <div className="createplanner_wrapper w-[45%] h-[60%] bg-white rounded-3xl shadow-lg border border-gray-700">
              <div className="input-wrapper bg-gray-100 shadow-lg rounded-3xl flex flex-col w-full lg:h-full items-center gap-1 ">
                <div className="flex w-[90%]">
                  <div className="planner_top w-full p-2 font-bold text-4xl flex justify-between mt-6 ">
                    <div className="flex items-center rounded-md">
                      <TfiWrite className="mr-2" />
                      <p>My Travel Planner</p>
                    </div>
                    <button onClick={handleMain} type="button">
                      <MdClose className="Logo_image_svg hover:bg-slate-300 rounded-md" />
                    </button>
                  </div>
                </div>

                <div className="planner_middle h-full flex w-full justify-center items-center">
                  <div className="planner_middle_wrapper w-full flex lg:gap-7 i13:gap-2 items-center justify-center h-full ">
                    <div className="flex flex-col items-start i13:space-y-4 lg:space-y-11 ">
                      <div className=" w-[100%] rounded-md lg:text-2xl lg:font-bold i13:text-sm text-right p-3">
                        제목
                      </div>
                      <div className=" w-[100%] rounded-md lg:text-2xl lg:font-bold i13:text-sm text-right p-3">
                        시작 날짜
                      </div>
                      <div className=" w-[100%] rounded-md lg:text-2xl lg:font-bold i13:text-sm text-right p-3">
                        마지막 날짜
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[65%] lg:space-y-10 i13:space-y-3 ">
                      <input
                        type="text"
                        id="projectTitle"
                        name="projectTitle"
                        placeholder="제목을 입력해주세요."
                        value={projectTitle}
                        onChange={handleChange}
                        className="Logo_text bg-white lg:w-full lg:h-auto i13:w-[100%] i13:h-12 rounded-md text-gray-600 input-placeholder p-3 border border-slate-300 "
                      />
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={handleDateChange}
                        className="Logo_text bg-white lg:w-full lg:h-auto i13:w-[100%] i13:h-12 rounded-md p-3 border border-slate-300"
                      />
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={handleDateChange}
                        className="Logo_text bg-white lg:w-full lg:h-auto i13:w-[100%] i13:h-12 rounded-md p-3 border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
                <form className="w-full h-1/6 Logo_text flex flex-col justify-between ">
                  <div className="sub-btn h-full flex justify-end lg:pt-4 p-6 lg:mr-6 ">
                    <button
                      onClick={handleSave}
                      type="button"
                      className="flex justify-end Sign_up rounded-md shadow-md bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:opacity-90"
                    >
                      여행 플래너 생성
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Createplanner;
