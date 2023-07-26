import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUpPage() {
  const navigate = useNavigate();
  // 회원가입 요소 
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  
  // 검사 통과 여부
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [rightEmail, setRightEmail] = useState("유효한 이메일 형식입니다.");
  const [wrongEmail, setWrongEmail] = useState("형식에 맞지않는 이메일입니다.");
  const [rightPassword, setRightPassword] = useState("유효한 비밀번호 형식입니다.");
  const [wrongPassword, setWrongPassword] = useState("형식에 맞지않는 비밀번호입니다.");
  const [rightPasswordConfirm, setRightPasswordConfirm] = useState("비밀번호와 일치합니다.")
  const [wrongPasswordConfirm, setWrongPasswordConfirm] = useState("비밀번호와 일치하지 않습니다.")
  const [rightName, setRightName] = useState("유효한 이름 형식입니다.");
  const [wrongName, setWrongName] = useState("형식에 맞지않는 이름입니다.");

  const validateEmail = (mail) => {
    // 이메일 정규식
    const regEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return regEx.test(mail);
  };

  const validatePassword = (password) => {
    const passwordRegEx = /^[A-Za-z0-9]{4,20}$/;
    return passwordRegEx.test(password);
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

  const checkEmail = async () => {
    try {
      const response = await axios.post('/signup', { userMail, password, name, nickname });
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
    const checkMap = {
      'userMail': setUserMail,
      'password': setPassword,
      'passwordConfirm': setPasswordConfirm,
      'name': setName,
      'nickname': setNickname,
      'isEmailValid': setIsEmailValid,
      'isPasswordValid': setIsPasswordValid,
      'isPasswordConfirmValid': setIsPasswordConfirmValid,
      'isNameValid': setIsNameValid,
      'rightEmail': setRightEmail,     
      'wrongEmail': setWrongEmail, 
      'rightPassword': setRightPassword,     
      'wrongPassword': setWrongPassword,    
      'rightPasswordConfirm': setRightPasswordConfirm,     
      'wrongPasswordConfirm': setWrongPasswordConfirm,
      'rightName': setRightName,
      'wrongName': setWrongName,
    };
  
    const check = checkMap[e.target.name];
    if (check) {
      check(e.target.value);
    }
  };

  useEffect(() => {
    // 입력값 확인용
    // console.log(userMail);
    // console.log(password);
    // console.log(isPasswordConfirmValid);
    // console.log(name)

    // 해당 값들이 입력되면 true, false 판단 
    if (userMail) {
      setIsEmailValid(validateEmail(userMail));
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
  }, [userMail, password, passwordConfirm, name, isEmailValid, isPasswordValid, isPasswordConfirmValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일과 닉네임 중복 검사
    if (await checkEmail()) {
        // alert('이메일이 이미 사용 중입니다.');
        return;
      }
  
      if (await checkNickname()) {
        // alert('닉네임이 이미 사용 중입니다.');
        return;
      }

      navigate('/login');
  };

  return (
      <form onSubmit={handleSubmit}>
          <p>아이디</p>
          <input type="text" placeholder="ID" value={userMail} onChange={handleChange} name="userMail" required />
          {userMail && (
            <div>
              {isEmailValid ? <p>{rightEmail}</p> : <p>{wrongEmail}</p> }
            </div>
          )}

          <p>비밀번호</p>
          <input type="password" placeholder="Password" value={password} onChange={handleChange} name="password" required />
          {password && (
            <div>
              {isPasswordValid ? <p>{rightPassword}</p> : <p>{wrongPassword}</p> }
            </div>
          )}

          <p>비밀번호 확인</p>
          <input type="password" placeholder="Confirm password" value={passwordConfirm} onChange={handleChange} name="passwordConfirm" required />
          {passwordConfirm && (
            <div>
              {isPasswordConfirmValid ? <p>{rightPasswordConfirm}</p> : <p>{wrongPasswordConfirm}</p> }
            </div>
          )}
          
          <br></br>
          <p>이름</p>
          <input type="text" placeholder="Name" value={name} onChange={handleChange} name="name" required />
          {name && (
            <div>
              {isNameValid ? <p>{rightName}</p> : <p>{wrongName}</p> }
            </div>
          )}
          
          <br></br>
          <p>닉네임</p>
          <input type="text" placeholder="Nickname" value={nickname} onChange={handleChange} name="nickname" required />
          <p>확인</p>
          <button type="submit">Sign Up</button>
      </form>
  );
};