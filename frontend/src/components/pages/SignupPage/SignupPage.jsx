import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserMail, setPassword, setPasswordConfirm, setName, setNickname } from '../../../slices/signUpSlice';

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMail = useSelector(state => state.userMail);
  const password = useSelector(state => state.password);
  const passwordConfirm = useSelector(state => state.passwordConfirm);
  const name = useSelector(state => state.name);
  const nickname = useSelector(state => state.nickname);

  const validateEmail = mail => {
    // 이메일 정규식
    const regEx = /^\S+@\S+\.\S+$/;
    return regEx.test(mail);
  };

  const validatePassword = (password, passwordConfirm) => {
    return password === passwordConfirm;
  };

  const checkEmail = async () => {
    try {
      const response = await axios.post('/mailcheck', { userMail });
      return response.data.duplicate;
    } catch (error) {
      console.error(error);
      return true; 
    }
  };

  const checkNickname = async () => {
    try {
      const response = await axios.post('/api/check-nickname', { nickname });
      return response.data.duplicate;
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const handleChange = (e) => {
    const actionMap = {
      'userMail': setUserMail,
      'password': setPassword,
      'passwordConfirm': setPasswordConfirm,
      'name': setName,
      'nickname': setNickname
    };

    const action = actionMap[e.target.name];
    if (action) {
      dispatch(action(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 이메일과 비밀번호 검증
    if (!validateEmail(userMail)) {
      alert('이메일 형식이 유효하지 않습니다.');
      return;
    }

    if (!validatePassword(password, passwordConfirm)) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 이메일과 닉네임 중복 검사
    if (await checkEmail()) {
        alert('이메일이 이미 사용 중입니다.');
        return;
      }
  
      if (await checkNickname()) {
        alert('닉네임이 이미 사용 중입니다.');
        return;
      }

      navigate('/signup');
  };

  return (
      <form onSubmit={handleSubmit}>
          <p>아이디</p>
          <input type="text" placeholder="ID" value={userMail} onChange={handleChange} name="userMail" required />
          <br></br>
          <p>비밀번호</p>
          <input type="password" placeholder="Password" value={password} onChange={handleChange} name="password" required />
          <br></br>
          <p>비밀번호 확인</p>
          <input type="password" placeholder="Confirm password" value={passwordConfirm} onChange={handleChange} name="passwordConfirm" required />
          <br></br>
          <p>이름</p>
          <input type="text" placeholder="Name" value={name} onChange={handleChange} name="name" required />
          <br></br>
          <p>닉네임</p>
          <input type="text" placeholder="Nickname" value={nickname} onChange={handleChange} name="nickname" required />
          <p>확인</p>
          <button type="submit">Sign Up</button>
      </form>
  );
};
