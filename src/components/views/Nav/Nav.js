import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdRecommend } from 'react-icons/md';
import { MdLocalGroceryStore } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
// import axios from "axios";
function Nav() {

    // const navigate = useNavigate();

    // const onSubmit = async () => {
        // localStorage.removeItem('searchResult');
        // console.log('localStorage searchResult removed');
        // navigate("/CrawlingPage");
    // }

    return (
        <nav id="nav">
            <Link to="/" className="link-style">
                <button className="nav-button">
                    <div className="NavIconContainer">
                        {/* 아이콘을 감싸는 요소 */}
                        <GoHomeFill size={22} />
                    </div>
                    <li>Home</li>
                </button>
            </Link>

            <Link to="/RecommendStartPage" className="link-style">
                <button className="nav-button">
                    <div className="NavIconContainer">
                        {/* 아이콘을 감싸는 요소 */}
                        <MdRecommend size={30} />
                    </div>

                    <li>추천시스템</li>
                </button>
            </Link>

            <Link to="/CrawlingPage" className="link-style">
                <button className="nav-button">
                    <div className="NavIconContainer">
                        {/* 아이콘을 감싸는 요소 */}
                        <MdLocalGroceryStore size={25} />
                    </div>
                    <li>식물상점</li>
                </button>
            </Link>

            <Link to="/IntroducePage" className="link-style">
                <button className="nav-button">
                    <div className="NavIconContainer">
                        {/* 아이콘을 감싸는 요소 */}
                        <BsFillPersonFill size={25} />
                    </div>
                    <li>팀원소개</li>
                </button>
            </Link>
        </nav>
    );
}

export default Nav;