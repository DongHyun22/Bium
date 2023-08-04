import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function SignUpPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (isLogin || token !== null) {
      navigate('/');
      console.log('isLogin', isLogin);
    }
  }, [isLogin]);
  // 회원가입 요소
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  // 검사 통과 여부
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [checkEmailDuplicate, setCheckEmailDuplicate] = useState(false);

  // 검사 결과 통보용
  const [rightEmail, setRightEmail] = useState('유효한 이메일 형식입니다.');
  const [wrongEmail, setWrongEmail] = useState('형식에 맞지않는 이메일입니다.');
  const [rightPassword, setRightPassword] = useState('유효한 비밀번호 형식입니다.');
  const [wrongPassword, setWrongPassword] = useState('형식에 맞지않는 비밀번호입니다.');
  const [rightPasswordConfirm, setRightPasswordConfirm] = useState('비밀번호와 일치합니다.');
  const [wrongPasswordConfirm, setWrongPasswordConfirm] = useState('비밀번호와 일치하지 않습니다.');
  const [rightName, setRightName] = useState('유효한 이름 형식입니다.');
  const [wrongName, setWrongName] = useState('형식에 맞지않는 이름입니다.');

  const validateEmail = (mail) => {
    // 이메일 정규식
    const regEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return regEx.test(mail);
  };

  const validatePassword = (event) => {
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,30}$/;
    return passwordRegEx.test(event);
  };

  const validateName = (name) => {
    const nameRegEx = /^[가-힣a-zA-Z\s]+$/;
    return nameRegEx.test(name);
  };

  const checkPassword = (password, passwordConfirm) => {
    if (password === passwordConfirm) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const checkMap = {
      userEmail: setUserEmail,
      password: setPassword,
      passwordConfirm: setPasswordConfirm,
      name: setName,
      nickname: setNickname,
      isEmailValid: setIsEmailValid,
      isPasswordValid: setIsPasswordValid,
      isPasswordConfirmValid: setIsPasswordConfirmValid,
      isNameValid: setIsNameValid,
      checkEmailDuplicate: setCheckEmailDuplicate,
      rightEmail: setRightEmail,
      wrongEmail: setWrongEmail,
      rightPassword: setRightPassword,
      wrongPassword: setWrongPassword,
      rightPasswordConfirm: setRightPasswordConfirm,
      wrongPasswordConfirm: setWrongPasswordConfirm,
      rightName: setRightName,
      wrongName: setWrongName
    };

    const check = checkMap[e.target.name];
    if (check) {
      check(e.target.value);
    }
  };

  const goSignup = async (e) => {
    e.preventDefault();
    try {
      const userRegisterInfomation = {
        userEmail: userEmail,
        userPw: password,
        userName: name,
        userNickname: nickname
      };
      const response = await axios.post('http://localhost:8080/api/signup', userRegisterInfomation);
      return console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkMail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/signup/check', {
        params: {
          userEmail: userEmail
        }
      });

      console.log(response.data);
      if (response.data === 0) {
        alert('사용가능한 이메일입니다.');
        return setCheckEmailDuplicate(true);
      }
      alert('이미 가입이 된 이메일입니다.');
      return setCheckEmailDuplicate(false);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (userEmail) {
      setIsEmailValid(validateEmail(userEmail));
    }

    if (password) {
      setIsPasswordValid(validatePassword(password));
    }

    if (passwordConfirm) {
      setIsPasswordConfirmValid(checkPassword(password, passwordConfirm));
    }

    if (name) {
      setIsNameValid(validateName(name));
      console.log(validateName(name));
    }
  }, [userEmail, password, passwordConfirm, name, isEmailValid, isPasswordValid, isPasswordConfirmValid]);

  const handleSubmit = async (e) => {
    console.log(checkEmailDuplicate);

    if (checkEmailDuplicate && isPasswordValid && isNameValid) {
      await goSignup(e);

      navigate('/login');
    } else {
      alert('회원가입에 실패 하셨습니다.');
    }
  };

  return (
    <div>
      <form onSubmit={checkMail}>
        <p>아이디</p>
        <input type="text" placeholder="ID" value={userEmail} onChange={handleChange} name="userEmail" required />
        <button type="submit">중복 확인</button>
      </form>
      {userEmail && <div>{isEmailValid ? <p>{rightEmail}</p> : <p>{wrongEmail}</p>}</div>}
      <form onSubmit={handleSubmit}>
        <p>비밀번호</p>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />
        {password && <div>{isPasswordValid ? <p>{rightPassword}</p> : <p>{wrongPassword}</p>}</div>}

        <p>비밀번호 확인</p>
        <input
          type="password"
          autoComplete="off"
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={handleChange}
          name="passwordConfirm"
          required
        />
        {passwordConfirm && (
          <div>{isPasswordConfirmValid ? <p>{rightPasswordConfirm}</p> : <p>{wrongPasswordConfirm}</p>}</div>
        )}

        <br></br>
        <p>이름</p>
        <input type="text" placeholder="Name" value={name} onChange={handleChange} name="name" required />
        {name && <div>{isNameValid ? <p>{rightName}</p> : <p>{wrongName}</p>}</div>}

        <br></br>
        <p>닉네임</p>
        <input type="text" placeholder="Nickname" value={nickname} onChange={handleChange} name="nickname" required />
        <p>확인</p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
