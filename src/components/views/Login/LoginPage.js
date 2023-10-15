import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Header/AuthContext";
import { PiWarningCircleLight } from "react-icons/pi";

function LoginPage() {
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState(""); // 이메일 상태 추가
  const [memberPassword, setMemberPassword] = useState(""); // 비밀번호 상태 추가
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { loggedInEmail, setLoggedInEmail } = useAuth([""]);
  const [loggedInSuccess, setLoggedInSuccess] = useState();

  const onSubmit = async () => {
    try {
      // 로그인할때
      const response = await axios.post("/PlantsPlanet/login", {
        memberEmail: memberEmail, // memberEmail 상태를 서버에 전달
        memberPassword: memberPassword, // memberPassword 상태를 서버에 전달
      });
      // 서버로부터의 응답 처리

      // 로그인 실패시
      if (response.data.startsWith("login")) {
        setMemberEmail(memberEmail);
        console.log(response.data);
        setIsLoggedIn(false);
        setLoggedInSuccess(false);
        // openModal()
      } else {
        // 로그인 성공
        setMemberEmail(response.data);
        setLoggedInEmail(response.data);
        console.log(response.data);
        setIsLoggedIn(true);
        navigate("/");
      }
      // const response1 = await axios.get(`/PlantsPlanet/loginCheck`);
      // console.log(response1);
      //
      // // 세션에 계정 정보가 있으면 success, 그 외 값은 전부 로그인 실패
      // if (response1.data == memberEmail) {
      //     setIsLoggedIn(true);
      //     // console.log("loginPage setIsLoggedIn: "+isLoggedIn);
      //     // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      //     // console.log("loginPage isLoggedIn: "+JSON.stringify(localStorage.getItem("isLoggedIn")))
      //     navigate('/');
      //     // 사용자 정보가 맞다면 홈으로 이동
      // } else {
      //     // 사용자 정보가 틀리다면 실패 메시지 처리
      //     console.error("로그인 실패");
      //     setIsLoggedIn(false);
      //     // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      //     // console.log("loginPage isLoggedIn: "+JSON.stringify(localStorage.getItem("isLoggedIn")))
      // }
    } catch (error) {
      console.error(error);
      // setIsLoggedIn(false);
      // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      // console.log("loginPage isLoggedIn: "+JSON.stringify(localStorage.getItem("isLoggedIn")))
    }
  };

  const formSchema = yup.object({
    memberEmail: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    memberPassword: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <img className="loginGrupImg" alt="grupImg" src="image/logo.jpg" />
        <input
          name="memberEmail"
          placeholder="이메일"
          {...register("memberEmail")}
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)} // 이메일 입력 상태 업데이트
        />
        {errors.memberEmail && <p>{errors.memberEmail.message}</p>}
        <input
          name="memberPassword"
          type="password"
          placeholder="비밀번호"
          {...register("memberPassword")}
          value={memberPassword}
          onChange={(e) => setMemberPassword(e.target.value)} // 비밀번호 입력 상태 업데이트
        />
        {errors.memberPassword && <p>{errors.memberPassword.message}</p>}

        <input className="loginButton" type="submit" value="로그인" />
        <div className="loginButton">
          <a href="/SignInPage">회원가입</a>
        </div>
      </form>
      <div className="failMessage">
        {loggedInSuccess == false ? (
          <div>
            <PiWarningCircleLight size={50} color="184914" />
            <p>로그인에 실패하였습니다</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LoginPage;
