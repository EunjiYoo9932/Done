import React, { useState } from "react";
import qnaList from "../../Data/Data";
import axios from "axios";
import "./RecommendPage.css";
import { useNavigate } from "react-router-dom";
import { PiPottedPlantDuotone } from "react-icons/pi";
import { TbLeaf } from "react-icons/tb";

function RecommendPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const currentQuestion = qnaList[currentQuestionIndex].q;
  const currentAnswers = qnaList[currentQuestionIndex].a;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAnswer, setTotalAnswer] = useState({
    answerLevel: 0,
    answerLight: 0,
    answerTemperature: 0,
    answerWater: 0,
  });

  const Modal = () => {
    const navigateModal = () => {
      setIsModalOpen(false);
      navigate("/RecommendResultPage");
    };

    return (
      <div className="recommendModal">
        <div className="modalContent">
          <div className="recommendIconContainer">
            {/* 아이콘을 감싸는 요소 */}
            <PiPottedPlantDuotone size={100} />
          </div>
          <h2>내 반려식물은?</h2>
          <button className="submitButton2" onClick={navigateModal}>결과 보기</button>
        </div>
      </div>
    );
  };

  const handleAnswerSelection = (answer) => {
    const updatedAnswer = {
      answerLevel: totalAnswer.answerLevel + (answer.answerLevel || 0),
      answerLight: totalAnswer.answerLight + (answer.answerLight || 0),
      answerTemperature:
        totalAnswer.answerTemperature + (answer.answerTemperature || 0),
      answerWater: totalAnswer.answerWater + (answer.answerWater || 0),
    };

    setTotalAnswer(updatedAnswer);

    if (currentQuestionIndex < qnaList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("No more questions");
      sendResultsToBackend(updatedAnswer);
      setIsModalOpen(true);
    }
  };

  const sendResultsToBackend = (answer) => {
    console.log(answer);
    // 결과식물 123위 초기화
    localStorage.removeItem("recommendResult");
    // 답변식물 초기화
    localStorage.removeItem("answerPlant");
    axios
      .post("/api/question", answer)
      .then((response) => {
        // 답변 저장
        localStorage.setItem("answerPlant", JSON.stringify(answer));
        // console.log('answerPlant localStorage: '+localStorage.getItem("answerPlant"))
        console.log("Server response:", response.data);
        // console.log('localStorage answerPlant: ', JSON.parse(localStorage.getItem("answerPlant")));
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  return (
    <div className="recommend">
      <div className="recommendMain">
        <div className="questionNumber"> Q.{currentQuestionIndex + 1}</div>
        <div className="questionState">
          <div className="NavIconContainer">
            {[...Array(10)].map((_, index) => (
              <TbLeaf
                key={index}
                size={35}
                style={{
                  color:
                    index <= currentQuestionIndex
                      ? "green" // 현재 질문 인덱스까지는 그린색으로 표시
                      : "#bab9b9",
                }}
              />
            ))}
          </div>
        </div>
        <div className="recommendQuestion">{currentQuestion}</div>

        <ul className="recommendAnswerList">
          {currentAnswers.map((answer, index) => (
            <li className="recommendAnswer" key={index}>
              <button
                className="answerButton"
                onClick={() => handleAnswerSelection(answer)}
              >
                {answer.answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && <Modal />}
      
    </div>
  );
}

export default RecommendPage;
