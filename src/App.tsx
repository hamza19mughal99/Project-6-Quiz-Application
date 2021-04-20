import React , {useEffect, useState} from 'react';
import {getQuizdetails} from "./services/Quiz_services";
import {QuestionType} from "./Types/quiz_types";
import Questioncard from "./Components/Questioncard";
import "./App.css";
function App() {

  let [quiz , setQuiz] = useState<QuestionType[]>([])
  let [currentStep , setCurrentStep] = useState(0)
  let [score , setscore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  
  //useEffect to fetch the api data..
  useEffect(() => {   
    //is fetchData() ky function per api se data fetch hokr console per show horha ha..
    async function fetchData(){
      const questions:QuestionType[] = await getQuizdetails(5 , "easy");
      setQuiz(questions)
    }
    fetchData()
       
  }, [])

  const handlesubmit = (e:React.FormEvent<EventTarget>, userAns:string) =>{
    e.preventDefault();
    
    const currentQuestion:QuestionType = quiz[currentStep];
    console.log("user ans " +userAns+ " and current ans "+currentQuestion.answer )
    if(userAns === currentQuestion.answer){
      setscore(++score);

    }
    if(currentStep !== quiz.length-1)
       setCurrentStep(++currentStep);
       else{
        //  document.write("your score is " +score + "out of "+ quiz.length);
         setShowResult(true);
      //    setCurrentStep(0)
      //    setscore(0);
       }
  }


  if(!quiz.length)
  return <h1 style={{fontSize:"3rem" , textAlign:"center"}}>Loading...</h1>
  if(showResult){
    return (
      <div className="question-container">
        <h3 className="result">Result </h3>
        <p className="scoreResult">Your Final Score Is <strong> {score} </strong> Out Of <strong> {quiz.length}</strong>.</p></div>
    )
  }
  return (
    <> 
    <h2 className="heading">Quiz Application</h2>
    <Questioncard 
       options={quiz[currentStep].option}
       question={quiz[currentStep].question}
       callBack={handlesubmit}
    />
    </>
  );
}

export default App;
