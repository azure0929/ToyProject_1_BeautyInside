import GlobalStyle from '../styles/GlobalStyles';
import styled from 'styled-components';
import SignUp from './SignUp';
import { useState, FormEvent } from 'react';
import { signIn } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const SignInBox = styled.div`
  font-family: 'Noto Sans KR';
  text-align: center;
  margin-top: 100px;

  h1 {
    font-size: 26px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #191919;

    div {
      display: flex;
      align-items: center;
      width: auto;
      margin-top: 10px;
      margin-bottom: 50px;
      font-size: 20px;
      color: #8E8E8E;
      flex-direction: row;

      h2 {
        color: #FFA9BE;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    padding: 10px;
    margin-top: 10px;
    width: 500px;
    height: 46px;
    border: 1px solid #8E8E8E;
    border-radius: 7px;
  }

  input:focus {
    border: 2px solid #FFA9BE;
    outline: none;
  }

  button {
    margin-top: 30px;
    background-color: ${({ isValidEmail }) => (isValidEmail ? 'red' : '#DEDEDE')};
    padding: 20px;
    width: 500px;
    height: 60px;
    border-radius: 7px;
    font-size: 24px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState(''); // setUsername -> setDisplayName 변경
  const headers = {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team4',
  };

  const validateEmail = (input) => {
    // 이메일 유효성 검사
    const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return regex.test(input);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };
  
  const handleSignIn = async (e: Event) => { // FormEvent -> Event로 변경
    e.preventDefault();

    try {
      const response = await signIn(email, password);
      if (response.success) {
        alert('로그인에 성공하였습니다.');
        setLoggedIn(true);
        setDisplayName(response.data.user.displayName); 
        navigate(-1);
      } else {
        alert('비밀번호나 패스워드가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인에 실패하였습니다.', error);
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <SignInBox isValidEmail={isValidEmail}>
      <h1>
        로그인
        <div>
          <h2>뷰티인사이드</h2>
          의 다양한 서비스와 퍼스널 진단을 누리세요.
        </div>
      </h1>
      {loggedIn ? (
        <p>{`${displayName}님 안녕하세요`}</p>
      ) : (
        <form onSubmit={handleSignIn}>
          <input name="email" value={email} onChange={handleEmailChange} placeholder="이메일" />
          <input
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <button
            type="submit"
            style={{ backgroundColor: isValidEmail && password !== '' ? '#FFA9BE' : '#DEDEDE' }}
          >
            로그인
          </button>
        </form>
      )}
    </SignInBox>
  );
};

export default SignIn;