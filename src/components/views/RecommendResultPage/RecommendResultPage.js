import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecommendResultPage.css';
import Modal from 'react-modal';
import { useNavigate  } from 'react-router-dom';

import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { FiSmile } from "react-icons/fi";
import { BiUpArrowAlt } from "react-icons/bi";
import { MdLocalGroceryStore } from "react-icons/md";

// axios.defaults.withCredentials = true;

function RecommendResultPage() {

    const [result, setResult] = useState(['']);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPlantName, setSelectedPlantName] = useState('');
    const [selectedPlants, setSelectedPlants] = useState(['']);
    const [answerPlant, setAnswerPlant]=useState(['']);
    const navigate = useNavigate();

    const openModal = (plantsName) => {
        setSelectedPlantName(plantsName);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setSelectedPlantName('');
        setModalIsOpen(false);
    };

    useEffect(() => {
        //다음 설문조사까지 기존 결과 식물 유지
        const recommendResult = JSON.parse(localStorage.getItem("recommendResult"));
        // const localAnswerPlant=localStorage.getItem("answerPlant");
        const answerPlant=JSON.parse(localStorage.getItem("answerPlant"));
        setAnswerPlant(answerPlant);
        // console.log("recommendResult: "+recommendResult);
        if (recommendResult!=null) {
            // const answerPlant=JSON.parse(localStorage.getItem("answerPlant"));
            // setAnswerPlant(answerPlant);
            setSelectedPlants(recommendResult);
            // 결과 출력후 기록 지우기
            // localStorage.clear();
        } else {
            const plantsData = async () => {
                try {
                    const response = await axios.get("/api/resulting")
                    //백엔드랑 맞춰야 되는 부분
                    setSelectedPlants(response.data);
                    localStorage.setItem("recommendResult", JSON.stringify(response.data));
                    console.log("recommend Result:  "+JSON.parse(localStorage.getItem("recommendResult")));
                } catch (error) {
                    console.error('Error fetching additional data:', error);
                }
            };
        plantsData();
        }
    }, []);

    // 설명
    function getTemperatureText(temperature) {
        return `식물이 좋아하는 온도는 ${temperature}도 입니다.`;
    }
    function getLightText(light) {
        if (light >= 31) {
            return "해를 매우 좋아하는 식물입니다.";
        } else if (light >= 21) {
            return "해를 좋아합니다.";
        } else if (light >= 11) {
            return "직사광선을 좋아하지 않습니다";
        } else {
            return "해가 들지 않아도 잘 자랍니다.";
        }
    }
    function getWaterText(water) {
        if (water >= 31) {
            return "겉흙이 마르면 물을 듬뿍 줘야 합니다.";
        } else if (water >= 21) {
            return "흙을 축축하게 유지해 줘야 합니다.";
        } else if (water >= 11) {
            return "흙을 촉촉하게 유지해 줘야 합니다.";
        } else {
            return "건조에 강합니다. 흙이 바짝 말랐을때 물을 줘야 합니다.";
        }
    }
    function getLevelText(level) {
        if (level >= 28) {
            return "키우기 어려운 식물입니다.";
        } else if (level >= 14) {
            return "초보자는 키우기 어렵습니다.";
        } else {
            return "누구나 키우기 쉽습니다.";
        }
    }


    // 크롤링 연결
    const [searchKeyword, setSearchKeyword] = useState('');
    const [entities, setEntities] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const onSubmit = async (plantsName) => {
        // plantsName.preventDefault();
        //plant type: object
        // const plantsName=plant.plantsName;
        setIsSearching(true); // 검색 중임을 표시
        try {
            axios.post("/api/resultPlantsSelected", plantsName
                ,{
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            )
            .then((response) => {
                console.log('setPlantsSelected +1');
            }).catch((error) => {
                console.error('Error setPlantsSelected', error);
            });
            const response = await axios.post("/api/searchSubmit", plantsName, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setEntities(response.data);
            // console.log("response.data: "+response.data);
            // 식물상점 결과창
            localStorage.setItem("searchResult", JSON.stringify(response.data));
            // const storedData = JSON.parse(localStorage.getItem("searchResult"));
            // console.log("storedData: "+storedData);
            navigate("/CrawlingPage");
        } catch (error) {
            console.error('Error fetching additional data:', error);
        } finally {
            setIsSearching(false); // 검색이 완료되면 검색 중 상태를 해제
        }
    };

    return (
        <div className="recommend">
            <div className="recommendResult">
                <div className="recommendResultHeader1">
                    <span>나의</span>
                    <span className="soulMatePlants">반려식물</span>
                    <span>은?</span>
                </div>
                <div className="resultTitle">

                    <img
                        className="recommendResultImg"
                        src={selectedPlants[0].plantsPic}
                        alt="plantImg"
                    ></img>

                    <ul className="recommendResultul">
                        <div className="mainPlantsName">{selectedPlants[0].plantsName}</div>
                        <li className="recommendResultli">
                            <FaTemperatureThreeQuarters size={22} color="LIGHTBLUE" />
                            온도 : {getTemperatureText(selectedPlants[0].plantsTemperature)}
                        </li>
                        <li className="recommendResultli">
                            <MdSunny size={22} color="LIGHTBLUE" />
                            햇빛 : {getLightText(selectedPlants[0].plantsLight)}
                        </li>
                        <li className="recommendResultli">
                            <MdWaterDrop size={22} color="LIGHTBLUE" />물 :{" "}
                            {getWaterText(selectedPlants[0].plantsWater)}
                        </li>
                        <li className="recommendResultli">
                            <BiUpArrowAlt size={25} color="LIGHTBLUE" />
                            난이도 : {getLevelText(selectedPlants[0].plantsLevel)}
                        </li>
                        <li className="recommendResultli">
                            <FiSmile size={22} color="LIGHTBLUE" />
                            효과 : {getLevelText(selectedPlants[0].plantsEffect)}
                        </li>
                        <li className="recommendResultli">
                            <FiAlertTriangle size={22} color="Red" />
                            주의점 : {getLevelText(selectedPlants[0].plantsNotice)}
                        </li>
                    </ul>
                </div>
                <input
                    className="searchButton"
                    type="submit"
                    onClick={() => onSubmit(selectedPlants[0].plantsName)}
                    // value={plant.plantsName}
                    onChange={handleInputChange}
                    value={isSearching ? "검색 중..." : "판매점 보러가기"}
                    disabled={isSearching}
                />
                <hr/>
                <div className="recommendResultHeader">다른 반려식물이 궁금하다면?</div>
                <div className="moreExplain">
                    식물명을 선택하시면 더 자세한 설명을 볼 수 있습니다
                </div>
                {selectedPlants.slice(1).map((comments, index) => (
                    <div className="recommendResultComments">
                        <div
                            className="recommendResultRanking"
                            key={comments.index}
                            onClick={() => openModal(comments.plantsName)}
                        >
                            {comments.plantsName}
                        </div>
                    </div>
                ))}

                <button
                    className="recommendResultButton"
                    onClick={() => navigate("/RecommendStartPage")}
                >
                    첫페이지로
                </button>
            </div>

            <Modal className="recommendResultModal" isOpen={modalIsOpen}>
                {/* <div>Selected Plant: {selectedPlants.plantsName}</div> */}
                {selectedPlants.map((plant) => {
                    if (plant.plantsName === selectedPlantName) {
                        return (
                            <div className="resultAll" key={plant.id}>
                                <div className="modalPlants">
                                    <img
                                        src={plant.plantsPic}
                                        className="modalImg"
                                        alt="plantImg"
                                    ></img>

                                    <div>
                                        <ul className="recommendResultul">
                                            <li className="mainPlantsName">{plant.plantsName}</li>
                                            <li className="recommendResultli">
                                                <FaTemperatureThreeQuarters
                                                    size={22}
                                                    color="LIGHTBLUE"
                                                />
                                                온도 : {getTemperatureText(plant.plantsTemperature)}
                                            </li>
                                            <li className="recommendResultli">
                                                <MdSunny size={22} color="LIGHTBLUE" />
                                                햇빛 : {getLightText(plant.plantsLight)}
                                            </li>
                                            <li className="recommendResultli">
                                                <MdWaterDrop size={22} color="LIGHTBLUE" />물 :{" "}
                                                {getWaterText(plant.plantsWater)}
                                            </li>
                                            <li className="recommendResultli">
                                                <BiUpArrowAlt size={22} color="LIGHTBLUE" />
                                                난이도 : {getLevelText(plant.plantsLevel)}
                                            </li>
                                            <li className="recommendResultli">
                                                <FiSmile size={22} color="LIGHTBLUE" />
                                                효과 : {plant.plantsEffect}
                                            </li>
                                            <li className="recommendResultli">
                                                <FiAlertTriangle size={22} color="red" />
                                                주의점 : {plant.plantsNotice}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <input
                                    className="searchButton"
                                    type="submit"
                                    onClick={() => onSubmit(plant.plantsName)}
                                    // value={plant.plantsName}
                                    onChange={handleInputChange}
                                    value={isSearching ? "검색 중..." : "판매점 보러가기"}
                                    disabled={isSearching}
                                />
                            </div>
                        );
                    }
                    return null;
                })}

                <button className="recommendResultButton" onClick={closeModal}>
                    닫기
                </button>
            </Modal>
        </div>
    );
}

//     return (
//         <div className='recommend'>
//             <div>
//                 <ul className='recommendResultul'>
//                     <li className='recommendResultli'>온도 : {getTemperatureText(answerPlant.answerTemperature)}</li>
//                     <li className='recommendResultli'>조도 : {getLightText(answerPlant.answerLight)}</li>
//                     <li className='recommendResultli'>물 : {getWaterText(answerPlant.answerWater)}</li>
//                     <li className='recommendResultli'>난이도 : {getLevelText(answerPlant.answerLevel)}</li>
//                 </ul>
//             </div>
//
//             {selectedPlants.map((comments, index) => (
//                 <><div className='recommendResultWi' key={comments.index}>{index+1}위</div>
//                 <div className='recommendResultRanking' key={comments.index} onClick={() => openModal(comments.plantsName)}>{comments.plantsName}</div></>
//             ))}
//             <button className='recommendResultButton' onClick={() => navigate('/RecommendPage')}>질문지로</button>
//
//             <Modal className='recommendResultModal' isOpen={modalIsOpen}>
//                 {selectedPlants.map((plant) => {
//                     if (plant.plantsName === selectedPlantName) {
//                         return (
//                             <div key={plant.id}>
//                             <ul className='plantExplain'>
//                                 <li className='plantExplainTitle'>식물명</li>
//                                 <li>{plant.plantsName}</li>
//                                 <li className='plantExplainTitle'>사진</li>
//                                 <li><img src={plant.plantsPic} width={100} height={100}></img></li>
//                                 <li className='plantExplainTitle'>온도</li>
//                                 <li>{getTemperatureText(plant.plantsTemperature)}</li>
//                                 <li className='plantExplainTitle'>조도</li>
//                                 <li>{getLightText(plant.plantsLight)}</li>
//                                 <li className='plantExplainTitle'>물</li>
//                                 <li>{getWaterText(plant.plantsWater)}</li>
//                                 <li className='plantExplainTitle'>난이도</li>
//                                 <li >{getLevelText(plant.plantsLevel)}</li>
//                                 <li className='plantExplainTitle'>효과</li>
//                                 <li>{plant.plantsEffect}</li>
//                                 <li className='plantExplainTitle'>주의점</li>
//                                 <li>{plant.plantsNotice}</li>
//                                 <li>
//                                     <input
//                                         className='crawlingButton'
//                                         type="submit"
//                                         onClick={()=>onSubmit(plant)}
//                                         // value={plant.plantsName}
//                                         onChange={handleInputChange}
//                                         value={isSearching ? "검색 중..." : "검색"}
//                                         disabled={isSearching}
//                                     />
//                                 </li>
//                             </ul>
//                             </div>
//                         );
//                         }
//                         return null;
//                     })}
//                 <button className='modalCloseButton' onClick={closeModal}>close</button>
//             </Modal>
//         </div>
//     );
// }

export default RecommendResultPage;