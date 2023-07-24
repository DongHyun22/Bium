import { useState } from 'react';
import { useDispatch } from 'react-redux';
import login from '../../../slices/userSlice.js';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const handleSubmit = (e)=> {

        if (!emailRegex.test(email)) {
            alert('유효한 이메일 형식이 아닙니다.');
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자와 숫자를 포함해야 합니다.");
            return;
        }
        dispatch(login({ email,  password }));
    }
    return (
        <div>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div className='loginId'>
                    <div>
                        <input 
                        type="input" id="userEmail" placeholder='이메일을 입력해 주세요.' 
                        value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className='loginPassword'>
                    <div>
                        <input 
                        type="password" id="userPassword" placeholder='비밀번호를 입력해 주세요.' 
                        value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button className='loginButton'>로그인</button>
                </div>
            </form>
        </div>
        
    )
}


export default Login