import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "./AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import {useState, useEffect} from "react";
import axios from "axios";

const Header = () => {
    const {isLoggedIn, setIsLoggedIn, loggedInEmail} = useAuth();
    // const [loggedInEmail, setLoggedInEmail]=useState(['']);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(isLoggedIn);
    }, []);
    // useEffect(() => {
    //     // 페이지가 로드될 때 로그인 상태 확인
    //     async function checkLoginStatus() {
    //         try {
    //             // const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"));
    //             // setIsLoggedIn(isLoggedIn);
    //             // console.log("header isLoggedIn: "+isLoggedIn);
    //             const response = await axios.get('/PlantsPlanet/loginCheck');
    //             console.log(response);
    //             // if (response.data!=null) {
    //             if (response.data.includes('@')){
    //                 // setIsLoggedIn(true);
    //                 setLoggedInEmail(response.data);
    //                 // console.log("header isLoggedIn: "+isLoggedIn);
    //                 console.log("reponse.data!=null")
    //             } else {
    //                 setIsLoggedIn(false);
    //                 console.log("reponse.data=null")
    //                 // console.log("header isLoggedIn: "+isLoggedIn);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             setIsLoggedIn(false);
    //             // console.log("header isLoggedIn: "+isLoggedIn);
    //         }
    //     }
    //     // console.log("header isLoggedIn: "+isLoggedIn);
    //     checkLoginStatus();
    // }, []);

    const onSubmit = async () => {
        await axios.post("/PlantsPlanet/logout");
        setIsLoggedIn(false);
        localStorage.removeItem("searchResult")
        navigate('/');
    }

    return (
        <header className="header">
            <Link to="/">
                <img className="headerGrupImg" alt="grupImg" src="image/logo.jpg" />
            </Link>
            <div className="header-button">
                {isLoggedIn ? ( // 로그인 상태
                    <div>
                        {loggedInEmail}
                        <Link to="/">
                            <button className="header-button-logout" onClick={onSubmit}>로그아웃</button>
                        </Link>
                    </div>
                ) : (
                    // 비로그인 상태
                    <>
                        <Link to="/LoginPage">
                            <button className="header-button-login">로그인</button>
                        </Link>
                        <Link to="/SignInPage">
                            <button className="header-button-sign-in">회원가입</button>
                        </Link>
                    </>
                )}
            </div>
        </header>

        // <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        //     <Container>
        //         <Navbar.Brand style={{ fontSize: '22px' }} as={Link} to="/">
        //             <img className="headerGrupImg" alt="grupImg" src="image/GRUP.png" /></Navbar.Brand>

        //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //         <Navbar.Collapse id="responsive-navbar-nav" >
        //             <Nav className="me-auto mx-auto">
        //                 <Nav.Link style={{ fontSize: '20px', color:'black'}}href="/">HOME</Nav.Link>
        //                 <Nav.Link style={{ fontSize: '20px', color:'black' }}as={Link} to="/RecommendStartPage">식물추천</Nav.Link>
        //                 <Nav.Link style={{ fontSize: '20px', color:'black' }}as={Link} to="/IntroducePage">팀원소개</Nav.Link>
        //                 <Nav.Link style={{ fontSize: '20px', color:'black' }}as={Link} to="/CrawlingPage">식물상점</Nav.Link>
        //                 <NavDropdown title={<span style={{ fontSize: '20px', color: '#c0eb75' }}>게시판</span>} id="collasible-nav-dropdown">
        //                     <NavDropdown.Item style={{ color: 'black' }} href="#action/3.1">고민게시판</NavDropdown.Item>
        //                     <NavDropdown.Item style={{ color: 'black' }} href="#action/3.2">
        //                         Another action
        //                     </NavDropdown.Item>
        //                     <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/Introduce">Introduce</NavDropdown.Item>
        //                     <NavDropdown.Divider />
        //                     <NavDropdown.Item style={{ color: 'black' }} href="#action/3.4">
        //                         Separated link
        //                     </NavDropdown.Item>
        //                 </NavDropdown>
        //             </Nav>
        //             <Nav>
        //                 <Nav.Link as={Link} to="/Login">로그인</Nav.Link>
        //                 <Nav.Link eventKey={2} as={Link} to="/SignIn">
        //                 회원가입
        //                 </Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    );
};

export default Header;