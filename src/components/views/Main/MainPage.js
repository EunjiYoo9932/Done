import React, { useState } from "react";
import { PiPlant } from "react-icons/pi";
import { BsArrowRightCircle } from "react-icons/bs";

import "./MainPage.css";
function MainPage() {
  const [pollens, setPollens] = useState([]);

  // const generatePollen = (event) => {
  //   const { clientX, clientY } = event;
  //   const pollen = document.createElement("div");
  //   pollen.className = "flower-pollen";
  //   pollen.style.left = `${clientX}px`;
  //   pollen.style.top = `${clientY}px`;
  //   document.body.appendChild(pollen);

  //   setTimeout(() => {
  //     document.body.removeChild(pollen);
  //   }, 10000);
  // };
  const generatePollen = (event) => {
    const { clientX, clientY } = event;
    
    const pollenColors = ['#ffcc00', '#ff6699', '#99ccff', '#ff9966', '#cc99ff'];
    const randomColor = pollenColors[Math.floor(Math.random() * pollenColors.length)];
  
    const pollen = document.createElement("div");
    pollen.className = "flower-pollen";
    pollen.style.left = `${clientX}px`;
    pollen.style.top = `${clientY}px`;
    pollen.style.backgroundColor = randomColor;
    document.body.appendChild(pollen);
  
    setTimeout(() => {
      document.body.removeChild(pollen);
    }, 1000);
  };
  
  return (
    <div className="mainPageOption">
      <img className="mainImg" alt="mainImg" src="image/main.png" />

      <div className="bigString">ABOUT</div>
      <div className="mainExplain">
        <p>몇가지 응답을 통해</p>
        <p>당신의 생활환경과 관심사에 맞춰 최적화된 식물을 찾아드립니다 </p>
        <p>반려식물을 통해 집안이나 사무실 분위기를 더 활기차게 바뀌며</p>
        <p>일상에 건강하고 긍정적인 영향을 받을 수 있습니다</p>
        <p>이제 당신에게 알맞는 새로운 반려식물을 추천해드리겠습니다</p>
        <div onMouseEnter={(event) => generatePollen(event)}>
          <PiPlant size={50} color="3E4A3D" />
        </div>
      </div>

      <div className="mainRecommend">
        <p className="bigString">
          <p>Plant</p>
          <p>Recommendation</p>
        </p>
        <ul>
          <li>
            <p className="mainTheme">질문지 응답</p>
            <p className="ThemeExplain">
              몇 가지 질문을 통해 식물 선택에 필요한 정보를 수집
            </p>
            
          </li>
          <BsArrowRightCircle color="#1E697A" size={150} />

          <li>
            <p className="mainTheme">개인별 환경설정</p>
            <p className="ThemeExplain">
              제공한 정보를 
            </p>
            <p className="ThemeExplain">
              기반으로 개인별
            </p>
            <p className="ThemeExplain">
              환경설정을 수행
            </p>
            
          </li>
          <BsArrowRightCircle color="#1E697A" size={150} />

          <li>
            <p className="mainTheme">식물 매칭</p>
            <p className="ThemeExplain">
              개인별 환경설정을
            </p>
            <p className="ThemeExplain">
            기반으로 적합한
            </p>
            <p className="ThemeExplain">
            식물을 매칭
            </p>
          </li>
          <BsArrowRightCircle color="#1E697A" size={150} />

          <li>
            <p className="mainTheme">식물 추천 완료</p>
            <p className="ThemeExplain">식물에 관한</p>
            
            <p className="ThemeExplain">정보 제공</p>
          </li>
          <BsArrowRightCircle color="#1E697A" size={150} />

          <li>
            <p className="mainTheme">사이트 연결</p>
            <p className="ThemeExplain">
              크롤링을 통한
            </p>
            <p className="ThemeExplain">
              판매점 연결
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
