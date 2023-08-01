import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { loginActions } from '../../../slices/userSlice.js';
import { userLogin, getUserInfo } from '../../../slices/getLoginInfo';
import { setIsLogin } from '../../../slices/userSlice';
// import axios from 'axios';

// 로그인 컴포넌트
function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(userEmail)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }
    const user = { userEmail, userPw };
    dispatch(userLogin(user));

    // console.log(userLogin(userEmail, userPw));
    const token = sessionStorage.getItem('accessToken');
    console.log('세션의 토큰을 변수에 담음');

    if (isLogin === true) {
      navigate('/api/');
    } else {
    }
  };
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    // console.log(userEmail);
  };
  const handlePasswordChange = (e) => {
    setUserPw(e.target.value);
  };

  return (
    <div>
      {}
      <form onSubmit={handleSubmit}>
        <div className="loginId">
          <div>
            <input
              type="input"
              id="userEmail"
              placeholder="이메일을 입력해 주세요."
              value={userEmail}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="loginPassword">
          <div>
            <input
              type="password"
              id="userPassword"
              placeholder="비밀번호를 입력해 주세요."
              value={userPw}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div>
          <button className="loginButton">로그인</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
