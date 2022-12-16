import { useContext, useState } from "react"
import styled from "styled-components"
import FooterMenu from "../components/FooterMenu"
import Header from "../components/Header"
import { weekdays } from "../constants/weekdays"
import axios from "axios"
import { AuthContext } from "../AuthContext"
import { ThreeDots } from "react-loader-spinner"
import CreatedHabits from "../components/CreatedHabits"

export default function HabitsPage() {
  const [clickCreate, setClickCreate] = useState(false)
  const [name, setName] = useState('')
  const [days, setDays] = useState([])
  const {token} = useContext(AuthContext)
  const [isDisabled, setIsDisabled] = useState(false)

  function selectDays(req) {
    if (!days.some((props) => props === req)) {
      const newDays = [...days, req]
      setDays(newDays)
    } else {
      const removeDays = days.filter((props) => props !== req)
      setDays(removeDays)
    }
  }

  function createHabit() {
    setIsDisabled(true)
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
    const body = {name, days}
    const config = {
      headers: {
        Authorization : `Bearer ${token}`
      }
    }

    const promise = axios.post(URL, body, config)
    promise.then((res) => {
      setIsDisabled(false)
      setName('')
      setDays([])
      setClickCreate(false)
      console.log(res)
    })
    promise.catch((err) => {
      alert(err.response.data)
      setIsDisabled(false)
    })
  }

  return (
    <ContainerHabits>
      <Header />
      <MyHabits>
        <h1>Meus hábitos</h1>
        <button onClick={() => setClickCreate(true)}>+</button>
      </MyHabits>
      <CreateHabit isClick={clickCreate} isDisabled={isDisabled}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="nome do hábito" disabled={isDisabled}/>
        <div>
          {weekdays.map((w, index) => <WeekdaysButton key={index} days={days} index={index} onClick={() => selectDays(index)} disabled={isDisabled}>{w[0]}</WeekdaysButton>)}
        </div>
        <p onClick={() => setClickCreate(false)}>Cancelar</p>
        <button onClick={createHabit} disabled={isDisabled}>{isDisabled ? <ThreeDots color='#FFFFFF' width='50px'/> : 'Salvar'}</button>
      </CreateHabit>
      <CreatedHabits />
      <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
      <FooterMenu />
    </ContainerHabits>
  )
}

const ContainerHabits = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding-left: 17px;
  padding-right: 18px;
  > p{
    margin-top: 28px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
  }
`

const MyHabits = styled.div`
  display: flex;
  justify-content: space-between;
  h1{
    padding-top: 98px;
    font-size: 23px;
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
  }
  button{
    margin-top: 92px;
    width: 40px;
    height: 35px;
    border: none;
    background-color: #52B6FF;
    border-radius: 5px;
    color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 26px;
  }
`

const CreateHabit = styled.div`
  margin-top: 20px;
  width: 340px;
  height: 180px;
  background-color: #FFFFFF;
  border-radius: 5px;
  position: relative;
  display: ${props => props.isClick ? '' : 'none'};
  input{
    margin-top: 18px;
    margin-left: 19px;
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    outline: none;
    padding-left: 11px;
    &::placeholder{
      color: #DBDBDB;
    }
  }
  div{
    margin-left: 19px;
    margin-top: 8px;
  }
  p{
    position: absolute;
    bottom: 23px;
    right: 123px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    color: #52B6FF;
  }
  > button{
    font-family: 'Lexend Deca', sans-serif;
    position: absolute;
    bottom: 15px;
    right: 16px;
    width: 84px;
    height: 35px;
    border-radius: 5px;
    border: none;
    background-color: #52B6FF;
    opacity: ${props => props.isDisabled ? '0.7' : '1'};
    color: #FFFFFF;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: ${props => props.isDisabled ? '23px' : ''};
    padding-bottom: ${props => props.isDisabled ? '8px' : ''};
  }
`

const WeekdaysButton = styled.button`
  font-family: 'Lexend Deca', sans-serif;
  margin-right: 4px;
  width: 30px;
  height: 30px;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  background-color: ${props => props.days.includes(props.index) ? '#CFCFCF' : '#FFFFFF'};
  color: ${props => props.days.includes(props.index) ? '#FFFFFF' : '#DBDBDB'};
  font-size: 20px;
`