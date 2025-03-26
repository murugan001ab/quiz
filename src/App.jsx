import { useEffect, useState } from 'react'
import './App.css'
// import quetions from "./quetion.json"
import { fetchQuestions, saveUserScore } from "./api";

function App() {

const [quetions,setQuetions]=useState([])
const [show,setShow]=useState(false)
const [currentQuetion,setCurrentQuetion]=useState(0)
const [timer,setTimer]=useState(10)
const [score,setScore]=useState(0)

const [skip,setSkip]=useState([])
const [skipValue,setSkipValue]=useState(0)
const [name,setName]=useState("")
const [Start,setStart]=useState(true)


useEffect(() => {
  async function loadQuestions() {
    try {
      const data = await fetchQuestions(); // Fetch questions
      if (data) {
        setQuetions(data); // Set questions if data is available
      }
    } catch (error) {
      console.error("Error fetching questions:", error); // Log the error
    }
  }
  loadQuestions();
}, []);


const handlySkip = () => {
  setSkip((prevSkip) => [...prevSkip, currentQuetion]);
  setSkipValue((c)=>c+currentQuetion);
  // Add current question to the skip array
  console.log([...skip, currentQuetion]); // Log the updated skip array
  if (currentQuetion < quetions.length - 1) {
    setCurrentQuetion((current) => current + 1); // Move to the next question
    setTimer(10); // Reset the timer
  }
  else {
    setShow(true); // Show the score if it's the last question
  }
};
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
}, [timer, currentQuetion,skip]);

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

    async function setScore() {
      try {
        const data = await saveUserScore(name,score); // Fetch questions
        if (data) {
          // Set questions if data is available
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching questions:", error); // Log the error
      }
    }
    setScore();

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
    {Start ? (<>
    <div className="enter">
    <label htmlFor="name">Enter name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Enter name' required />
    <button className='start' onClick={()=>{
      setStart(false)
      handlyReset()
    }}  >Start</button>
    </div>
    </>):(<>
      {show ? (
      <div className="score">
      <p>your score is {score}/{quetions.length}</p>
      <button onClick={handlyReset} className='restart' >restart</button>
    </div>
    ):(
      <div className="quiz">
      <div className="quetion">
      <div className="q"><p>Quetion {quetions[currentQuetion].id}</p>
      <h3>{quetions[currentQuetion].question_text}</h3></div>
      <div className="option">
      {quetions[currentQuetion].options.map((option,index)=>(
        <button key={index} onClick={()=>handleQution(option)} >{option}</button>
      ))}
      </div>  
      <p>Time left {timer}s</p>
      <button className='skip'onClick={handlySkip} >skip</button>
   
      </div>  

</div> 
    )} 
    </>)}    
    </>
  )
}

export default App
