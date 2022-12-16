import styled from "styled-components";
import { weekdays } from "../constants/weekdays";
import trash from "../assets/Trash.png"
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";

export default function CreatedHabits({habit, habitDelete, setHabitDelete}) {
  const {token} = useContext(AuthContext)

  function deleteHabit() {
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    if(window.confirm('Você tem certeza que quer apagar esse hábito?')) {
      const promise = axios.delete(URL, config)
      promise.then(() => setHabitDelete(!habitDelete))
    }
  }

	return (
		<CreatedHabitsStyled>
			<p>{habit.name}</p>
			<div>
				{weekdays.map((w, index) => (
          habit.days.includes(index) ? <DaysButton key={index} selected={true}>{w[0]}</DaysButton> : <DaysButton key={index} selected={false}>{w[0]}</DaysButton>
				))}
			</div>
			<img src={trash} alt="" onClick={deleteHabit}/>
		</CreatedHabitsStyled>
	);
}

const CreatedHabitsStyled = styled.div`
  width: 340px;
  height: 91px;
  background-color: #FFFFFF;
  margin-top: 10px;
  border-radius: 5px;
  position: relative;
  p{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    margin-left: 15px;
    padding-top: 13px;
    color: #666666;
  }
  div{
    margin-left: 14px;
    margin-top: 8px;
  }
  img{
    position: absolute;
    top: 11px;
    right: 10px;
    cursor: pointer;
  }
`

const DaysButton = styled.button`
  font-family: 'Lexend Deca', sans-serif;
  margin-right: 4px;
  width: 30px;
  height: 30px;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  background-color: ${props => props.selected === true ? '#CFCFCF' : '#FFFFFF'};
  color: ${props => props.selected === true ? '#FFFFFF' : '#DBDBDB'};
  font-size: 20px;
`