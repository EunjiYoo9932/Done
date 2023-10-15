import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendStartPage.css";
import { PiPottedPlantDuotone } from "react-icons/pi";
import axios from "axios";
import { useAuth } from "../Header/AuthContext";

function RecommendStartPage() {
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    // useEffect(() => {
    //     // 페이지가 로드될 때 로그인 상태 확인
    //     async function checkLoginStatus() {
    //         try {
    //             // const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"));
    //             // setIsLoggedIn(isLoggedIn);
    //             const response = await axios.get('/PlantsPlanet/loginCheck');
    //             if (response.data = null) {
    //                 navigate("/LoginPage");
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     checkLoginStatus();
    // }, []);

    const onSubmit = async (e) => {
        try {
            // const response = await axios.get('/PlantsPlanet/loginCheck');
            // console.log("loginCheckAPI")
            // if (response.data == null || response.data==="") {
            //     console.log(response.data)
            //     navigate("/LoginPage");
            //     console.log("response.data=null")
            // } else {
            //     console.log(response.data)
            //     console.log("response.data!=null")
            //     navigate("/RecommendPage");
            // }
            if (isLoggedIn==false){
                navigate("/LoginPage");
                console.log("response.data=null")
            } else {
                navigate("/RecommendPage");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="recommendStart">
            <div className="recommendStartMain">
                <div className="recommendIconContainer">
                    {/* 아이콘을 감싸는 요소 */}
                    <PiPottedPlantDuotone size={100} />
                </div>
                <div className='recommendExplain'>
                    <p>간단한 설문을 통해</p>
                    <p>
                        사용자의 주변 환경을 분석하여
                    </p>
                    <p>
                        사용자에게 가장 어울리는 식물을 추천해드립니다!
                    </p>
                </div>
                <button className="recommendStartButton" onClick={onSubmit}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default RecommendStartPage;