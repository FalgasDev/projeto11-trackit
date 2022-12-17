import styled from "styled-components";
import FooterMenu from "../components/FooterMenu";
import Header from "../components/Header";
import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import { weekdays } from "../constants/weekdays";
import 'dayjs/locale/pt-br'
import HabitsToday from "../components/HabitsToday";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TodayPage() {
  dayjs.extend(updateLocale)
  dayjs.updateLocale('pt-br', {
    weekdays
  })
  const today = dayjs().locale('pt-br').format('dddd, DD/MM')
  const token = localStorage.getItem('Token')
  const [habitsToday, setHabitsToday] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const promise = axios.get(URL, config)
    promise.then(res => {
      setHabitsToday(res.data)
    })
  }, [refresh])

  return (
    <Container>
      <Header />
      <h1>{today}</h1>
      <p>Nenhum hábito concluído ainda</p>
      {habitsToday.map(h => <HabitsToday key={h.id} habit={h} setRefresh={setRefresh} refresh={refresh}/>)}
      <footer></footer>
      <FooterMenu />
    </Container>
  )
}

const Container = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding-left: 17px;
  > h1{
    padding-top: 98px;
    font-size: 23px;
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
  }
  > p{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #BABABA;
    margin-top: 5px;
    margin-bottom: 28px;
  }
  footer{
    height: 120px;
  }
`