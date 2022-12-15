import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import { Container, InputLogin } from './LoginPage';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  function register(e) {
    e.preventDefault()
    setIsRegister(true)

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up'
    const body = { email, name, image, password }

    const promise = axios.post(URL, body)
    promise.then(() => {
      navigate('/')
      setIsRegister(false)
    })
    promise.catch(err => {
      alert(err.response.data)
      setIsRegister(false)
    })
  }

	return (
		<Container>
			<img src={logo} alt=''/>
      <form onSubmit={register}>
        <InputLogin value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email' required disabled={isRegister}/>
        <InputLogin value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='senha' required disabled={isRegister}/>
        <InputLogin value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='nome' required disabled={isRegister}/>
        <InputLogin value={image} onChange={(e) => setImage(e.target.value)} type='url' placeholder='foto' required disabled={isRegister}/>
        <RegisterButton register={isRegister} type='submit' disabled={isRegister}>{isRegister ? <ThreeDots color='#FFFFFF'/> : 'Cadastrar'}</RegisterButton>
      </form>
      <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
		</Container>
	);
}

const RegisterButton = styled.button`
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: #52B6FF;
  opacity: ${props => props.register ? '0.7' : '1'};
  color: #FFFFFF;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`