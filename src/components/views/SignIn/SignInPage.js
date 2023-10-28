import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./SignInPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleLight } from "react-icons/pi";
import { GrStatusGood } from "react-icons/gr";

function SignInPage() {
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState(""); // 이메일 상태 추가
  const [memberPassword, setMemberPassword] = useState(""); // 비밀번호 상태 추가
  const [memberBirth, setMemberBirth] = useState(""); // 생일 추가
  const [memberNum, setMemberNum] = useState(""); // 휴대폰 추가
  const [memberData, setMemberData] = useState(null); // 유저 상태 추가
  
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/PlantsPlanet/save`;
  
  // const axiosData = async() => {
  //     const response = await axios.post("http://localhost:4000/userSignIn");
  //     console.log(response);
  // };
  // useEffect(()=> {
  //     axiosData();
  // },[]);

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        URL,
        {
          memberEmail: memberEmail, // memberEmail 상태를 서버에 전달
          memberPassword: memberPassword, // memberPasswd 상태를 서버에 전달
          memberBirth: memberBirth,
          memberNum: memberNum,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const response = await axios.post(
      //   "/PlantsPlanet/save",
      //   {
      //     memberEmail: memberEmail, // memberEmail 상태를 서버에 전달
      //     memberPassword: memberPassword, // memberPasswd 상태를 서버에 전달
      //     memberBirth: memberBirth,
      //     memberNum: memberNum,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      setMemberData(response.data);
      console.log(response.data);
      //response.data가 success로 응답이 오면 if실행
      if (response.data == "success") {
        setTimeout(() => {
          navigate("/LoginPage");
        }, 2000);
      }
      // 서버로부터의 응답 처리
      // await axios.post(SERVER_URL, );
      // axiosData();
    } catch (error) {
      console.error(error);
    }
  };
  const formSchema = yup.object({
    memberEmail: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    memberPassword: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("memberPassword")], "비밀번호가 다릅니다."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  return (
    <div className="signIn">
      <div className="signInMain">
        <img className="loginGrupImg" alt="grupImg" src="image/logo.jpg" />
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="memberEmail"
            placeholder="이메일"
            {...register("memberEmail")}
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            // register에 포함된 구문임 onChange={(e)=> setUserEmail(e.target.value)}
          />
          {errors.memberEmail && <p>{errors.memberEmail.message}</p>}
          <input
            name="memberPassword"
            type="password"
            placeholder="비밀번호"
            value={memberPassword}
            {...register("memberPassword")}
            onChange={(e) => setMemberPassword(e.target.value)}
          />
          {errors.memberPassword && <p>{errors.memberPassword.message}</p>}

          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          <input
            name="memberBirth"
            placeholder="생년월일 (6자리)"
            value={memberBirth}
            {...register("memberBirth")}
            onChange={(e) => setMemberBirth(e.target.value)}
          />

          <input
            name="memberNum"
            placeholder="핸드폰 번호"
            value={memberNum}
            {...register("memberNum")}
            onChange={(e) => setMemberNum(e.target.value)}
          />
          <input
            className="loginButton"
            type="submit"
            value="회원가입"
            onClick={handleSubmit(onSubmit)}
          />
        </form>

        {/* 백엔드 응답에 따라 메시지 표시 */}
        {memberData !== null ? (
          memberData == "success" ? (
            <div className="failMessage">
              <GrStatusGood size={50} color="184914" />
              <p>회원가입 성공했습니다</p>
              <p>잠시후 로그인 페이지로 이동합니다</p>
            </div>
          ) : (
            <div className="failMessage">
              <PiWarningCircleLight size={50} color="184914" />
              <p>회원정보가 이미 존재합니다</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default SignInPage;
