import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { TfiWrite } from 'react-icons/tfi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ handleSave }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const { modalType, task } = useSelector((state) => state.modal);
  const { project_idx } = useParams();
  const navigate = useNavigate();

  const [planner_data, setPlanner_data] = useState({
    project_idx: task?.project_idx || project_idx,
    planner_date: task?.planner_date || new Date().toISOString().slice(0, 16),
    planner_title: task?.planner_title || '',
    planner_description: task?.planner_description || '',
    planner_img: task?.planner_img || '',
  });

  const [imagePreview, setImagePreview] = useState(
    task?.planner_img ? `${task.planner_img}` : null
  );

  useEffect(() => {
    if (modalType === 'update' && task) {
      setPlanner_data({
        project_idx: task.project_idx || project_idx,
        planner_date:
          task.planner_date || new Date().toISOString().slice(0, 16),
        planner_title: task.planner_title || '',
        planner_description: task.planner_description || '',
        planner_img: task.planner_img || '',
      });
      setImagePreview(task.planner_img ? `${task.planner_img}` : null);
    } else {
      setPlanner_data({
        project_idx: project_idx,
        planner_date: new Date().toISOString().slice(0, 16),
        planner_title: '',
        planner_description: '',
        planner_img: '',
      });
      setImagePreview(null);
    }
  }, [modalType, task, project_idx]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handlePlanner_dateChange = (event) => {
    setPlanner_data({
      ...planner_data,
      planner_date: event.target.value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlanner_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPlanner_data({
        ...planner_data,
        planner_img: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!planner_data.planner_title) {
      // 제목이 비어 있을 때 토스트 알림 표시
      toast.error('프로젝트 제목을 입력해주세요!', {
        position: 'top-center',
        autoClose: 3000, // 3초 후 자동 닫힘
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // 제목이 비어있으면 함수 종료
    }

    try {
      const formData = new FormData();
      formData.append('project_idx', planner_data.project_idx);
      formData.append('planner_date', planner_data.planner_date);
      formData.append('planner_title', planner_data.planner_title);
      formData.append('planner_description', planner_data.planner_description);
      formData.append('planner_img', planner_data.planner_img);

      const response = await axios.patch(
        `https://travel-planner-back.aicclionnoil.co.kr/patch_travel_data/${project_idx}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const savedData = {
          ...planner_data,
          planner_img: response.data.planner_img, // 서버에서 반환된 이미지 URL로 업데이트
        };
        handleSave(savedData); // PlannerBar로 데이터 전달
        handleCloseModal(); // 모달 닫기
      } else {
        console.error('데이터 저장 오류:', response.status);
      }
    } catch (error) {
      console.error('데이터 저장 오류:', error);
    }
  };

  if (!isOpen) return null;

  const handleMain = () => {
    handleCloseModal();
  };

  return (
    <>
      <div className="Modal_page fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
        <div className="Modal_wrapper w-[55%] h-[70%] bg-gray-100 rounded-md shadow-lg border border-gray-700 flex flex-col">
          <div className="flex w-full">
            <div className="Modal_container w-full flex flex-col px-3 ">
              <div className="top w-full text-center p-4 font-bold text-4xl flex justify-between">
                <div className="flex items-center rounded-md">
                  <TfiWrite className="mr-2" />
                  <p>My Travel Planner</p> {/* 타이틀 */}
                </div>
                <button
                  onClick={handleMain} // 버튼 클릭 시 메인 페이지로 이동
                  type="button"
                >
                  <MdClose className="Logo_image_svg hover:bg-slate-300 rounded-md" />
                </button>
              </div>
              <div className="location border rounded-md border-gray-400 bg-white mb-4 p-4 w-full h-1/6 flex justify-center items-center">
                <div className="input-control  w-full h-full ">
                  <label htmlFor="planner_title" className="w-full h-full">
                    <input
                      type="text"
                      id="planner_title"
                      name="planner_title"
                      placeholder="프로젝트 제목을 입력해주세요..."
                      className="w-full h-full rounded bg-white p-2"
                      value={planner_data.planner_title}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="content  h-1/2 mb-10 flex gap-2">
                <div className="photo_wrapper border rounded-md border-gray-400 bg-white w-1/2 h-80 flex items-center justify-center relative overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500">사진 넣기</span>
                  )}
                  <input
                    type="file"
                    id="planner_img"
                    name="planner_img"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="text border rounded-md border-gray-400  w-1/2 h-80 flex justify-center items-center ">
                  <div className="input-control w-full h-full ">
                    <label
                      htmlFor="planner_description"
                      className="w-full h-full"
                    >
                      <textarea
                        type="text"
                        id="planner_description"
                        name="planner_description"
                        placeholder="내용을 입력해주세요..."
                        className="w-full h-full bg-white rounded px-2 resize-none"
                        value={planner_data.planner_description}
                        onChange={handleChange}
                        maxLength="300"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="date border rounded-md border-gray-400 w-full h-16 flex justify-center items-center">
                <div className="input-control w-full h-full flex items-center justify-center">
                  <input
                    type="datetime-local"
                    id="planner_date"
                    name="planner_date"
                    className="w-full h-full bg-white rounded-md p-2"
                    value={planner_data.planner_date}
                    onChange={handlePlanner_dateChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="Save_button_container flex items-end justify-end p-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="Sign_up rounded-md shadow-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:opacity-90 text-xl py-2 px-4 mr-1"
            >
              {modalType === 'update' ? '수정완료' : '할일 추가하기'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        className="text-sm" // 전체 컨테이너에 작은 텍스트 적용
        bodyClassName="text-sm" // 본문 텍스트 크기 조정
      />
    </>
  );
};

export default Modal;
