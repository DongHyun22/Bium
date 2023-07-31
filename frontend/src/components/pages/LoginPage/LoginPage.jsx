import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { loginActions } from '../../../slices/userSlice.js';
import { userLogin } from '../../../slices/getLoginInfo';
// import axios from 'axios';

// 로그인 컴포넌트
function Login() {
  const [userMail, setUserMail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // axios 요청 함수
  // const getUserInfo = (email,password) => {
  //     const API = 'http:localhost:8080/login'

  //     console.log(email,password)

  //     axios.post(API,{
  //         userEmail: 'ssafy',
  //         userPw: '1234',
  //     },
  //     {
  //         // headers: {
  //         //     Authorization: `Bearer ${token}`,
  //         // },
  //     })
  //     .then((response) => {
  //         console.log(response.data);
  //         console.log('로그인 되었습니다.')
  //         // userSlice의 actions를 불러옴
  //         dispatch(loginActions.getUserInfo(email,password))
  //     })
  //     .catch((error) => {
  //         console.log(error)
  //         window.alert('로그인 실패')
  //     })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(userMail)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }
    const user = { userMail, password };
    dispatch(userLogin(user));

    // const user = { userMail: 'ssafy', password: '1234' };

    // axios 요청 함수
    // getUserInfo(email,password);
  };
  const handleEmailChange = (e) => {
    setUserMail(e.target.value);
    console.log(userMail);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginId">
          <div>
            <input
              type="input"
              id="userEmail"
              placeholder="이메일을 입력해 주세요."
              value={userMail}
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
              value={password}
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
