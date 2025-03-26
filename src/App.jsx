import { useEffect, useState } from 'react'
import './App.css'
import quetions from "./quetion.json"

function App() {
 
const [show,setShow]=useState(false)
const [currentQuetion,setCurrentQuetion]=useState(0)
const [timer,setTimer]=useState(10)
const [score,setScore]=useState(0)

useEffect(()=>{

  let interval;
  if(timer > 0) {
    interval = setInterval(() => {
      setTimer((second) => second - 1);
    }, 1000);

  } else if (timer === 0) {

    if(currentQuetion<quetions.length-1){
    setCurrentQuetion((current) => current + 1);
    setTimer(10);
  }
  else{
    clearInterval(interval)
    setShow(true)
  }
    
  }

  return () => clearInterval(interval);
}, [timer, currentQuetion]);

const handleQution=(option)=>{

  if(option==quetions[currentQuetion].correct_answer){
    setCurrentQuetion((current)=>current+1)
    setScore((score)=>(score+1))
    setTimer(10)
  }
  if(option!=quetions[currentQuetion].correct_answer){
    setCurrentQuetion((current)=>current+1)

  }
  if (currentQuetion==quetions.length-1){
    setShow(true)  
  }

}

const handlyReset=()=>{
  setCurrentQuetion(0)
  setScore(0)
  setShow(false)
  setTimer(10)
 
}

  return (
    <>
    {show ? (
      <div className="score">
      <p>your score is {score}/{quetions.length}</p>
      <button onClick={handlyReset} className='restart' >restart</button>
    </div>
    ):(
      <div className="quiz">
      <div className="quetion">
      <div className="q"><p>Quetion {quetions[currentQuetion].id}</p>
      <h3>{quetions[currentQuetion].question}</h3></div>
      <div className="option">
      {quetions[currentQuetion].options.map((option,index)=>(
        <button key={index} onClick={()=>handleQution(option)} >{option}</button>
      ))}
      </div>

      <div className="footer">
      <p>Time left {timer}s</p>
      <button className='skip'>skip</button>
      </div>
      

    </div> 
    

</div> 
    )}  
         
    </>
  )
}

export default App
