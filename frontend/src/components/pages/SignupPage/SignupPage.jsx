import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const validateEmail = mail => {
    // 이메일 정규식
    const regEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return regEx.test(mail);
  };

  const validatePassword = (password) => {
    const passwordRegEx = /^[A-Za-z0-9]{2,20}$/;
    return passwordRegEx.test(password);
  };

  const validateName = (Name) => {
    const nameRegEx = /^[]$/;
  }

  const checkPassword = (password, passwordConfirm) => {
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
      action(e.target.value);
    }
  };

  useEffect(() => {
    if (userMail && !validateEmail(userMail)) {
      console.log(userMail);
    }

    console.log(password);

    if (!validatePassword(password)) {
      console.log('맞지 않은 비밀번호 입니다.');
    }
  }, [userMail, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 이메일과 비밀번호 검증
    if (!validateEmail(userMail)) {
      alert('이메일 형식이 유효하지 않습니다.');
      return;
    }

    if (!checkPassword(password, passwordConfirm)) {
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
          <div></div>
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