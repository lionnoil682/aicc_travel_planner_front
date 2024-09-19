import React from 'react';

const AdSection = () => {
  const ads = [
    {
      src: require('../assets/AdImg1.jpg'),
      text: 'planner 회원 특별 할인 이벤트',
    },
    { src: require('../assets/AdImg2.jpg'), text: '항공권 예약' },
    { src: require('../assets/AdImg3.jpg'), text: '호텔 예약' },
  ];

  const longAd = {
    src: require('../assets/AdImg5.jpg'),
    text: '당신만의 완벽한 여행 플랜',
    subText: 'My Travel Planner',
  };

  const imageWidth = 450; // 넓어진 이미지 너비
  const imageHeight = 270; // 이미지 높이
  const longImageWidth = 1540; // 긴 이미지 너비 (3개의 이미지 너비를 더한 값에서 마진을 뺀 값)
  const longImageHeight = 400; // 긴 이미지 높이

  return (
    <div className="AdSection_wrapper flex flex-col justify-center items-center lg:mt-10 i13:mt-4 bg-white p-4 ">
      <div className="AdSection_container p-1 flex i13:flex-wrap   justify-evenly gap-2">
        {ads.map((ad, index) => (
          <div key={index} className="adimg_container p-1 relative  mx-10 my-1">
            <img
              src={ad.src}
              alt={`Ad ${index + 1}`}
              className="adimg_box rounded-md shadow-lg transition-all duration-300 "
              style={{
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,

                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                margin: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '3px',
                padding: '10px 20px',
                cursor: 'pointer',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
              className="hover:bg-opacity-75 transition-opacity"
            >
              {ad.text}
            </div>
          </div>
        ))}
      </div>
      <div className="lg:mt-10 i13:mt-4 p-1 relative ">
        <img
          src={longAd.src}
          alt="Long Ad"
          className="adimg_box rounded-md shadow-lg"
          style={{
            width: `${longImageWidth}px`,
            height: `${longImageHeight}px`,
            objectFit: 'cover',
            objectPosition: 'center 90%',
          }}
        />
        <div className="absolute top-7 left-2 text-white font mx-1 rounded-sm px-2 py-5 cursor-pointer text-left hover:bg-opacity-75 transition-opacity lg:text-3xl i13:text-xs ">
          {longAd.text}
        </div>
        <div className="mt-1 text-left text-white ml-1 ">{longAd.subText}</div>
      </div>
    </div>
  );
};

export default AdSection;
