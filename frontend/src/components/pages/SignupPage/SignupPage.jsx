import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword, setPasswordConfirm, setName, setNickname } from '../../../slices/signUpSlice';

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const username = useSelector(state => state.username);
  const password = useSelector(state => state.password);
  const passwordConfirm = useSelector(state => state.passwordConfirm);
  const name = useSelector(state => state.name);
  const nickname = useSelector(state => state.nickname);

  const handleChange = (e) => {
    switch (e.target.name) {
        case 'username':
            dispatch(setUsername(e.target.value));
            break;
        case 'password':
            dispatch(setPassword(e.target.value));
            break;
        case 'passwordConfirm':
            dispatch(setPasswordConfirm(e.target.value));
            break;
        case 'name':
            dispatch(setName(e.target.value));
            break;
        case 'nickname':
            dispatch(setNickname(e.target.value));
            break;
        default:
            break;
    }
  };

  return (
      <form onSubmit={handleChange}>
          <input type="text" placeholder="ID" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <br></br>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br></br>
          <input type="password" placeholder="Confirm password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
          <br></br>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <br></br>
          <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          <button type="submit">Sign Up</button>
      </form>
  );
};