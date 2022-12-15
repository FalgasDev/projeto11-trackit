import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import { Container, InputLogin, LoginButton } from './LoginPage';

export default function RegisterPage() {
  const navigate = useNavigate()

	return (
		<Container>
			<img src={logo} />
      <form>
        <InputLogin type='email' placeholder='email' required/>
        <InputLogin type='password' placeholder='senha' required/>
        <InputLogin type='text' placeholder='nome' required/>
        <InputLogin type='url' placeholder='foto' required/>
        <LoginButton type='submit'>Cadastrar</LoginButton>
      </form>
      <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
		</Container>
	);
}