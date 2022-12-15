import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/Logo.png';

export default function LoginPage() {
  const navigate = useNavigate()

	return (
		<Container>
			<img src={logo} />
      <form>
        <InputLogin type='email' placeholder='email' required/>
        <InputLogin type='password' placeholder='senha' required/>
        <LoginButton type='submit'>Entrar</LoginButton>
      </form>
      <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 68px;
  img {
    margin-bottom: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  p {
    font-family: 'Lexend Deca', sans-serif;
    margin-top: 25px;
    font-size: 14px;
    color: #52B6FF;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InputLogin = styled.input`
  width: 303px;
  height: 45px;
  border: 2px solid #D5D5D5;
  border-radius: 5px;
  margin-bottom: 6px;
  outline: none;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  padding-left: 11px;
  &::placeholder {
    color: #DBDBDB;
  }
`

const LoginButton = styled.button`
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: #52B6FF;
  color: #FFFFFF;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 21px;
  cursor: pointer;
`

export {Container, InputLogin, LoginButton}