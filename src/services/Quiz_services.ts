import { QuestionType, Quiz } from "./../Types/quiz_types";

//Array ko shuffle krna ha ta ke options change hote rahe
const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);


//yaha per api ka data fetch horha ha..
export const getQuizdetails = async (totalQues: number, level: string): Promise<QuestionType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQues}&category=21&difficulty=${level}&type=multiple`);
    let { results } = await res.json();

    const quiz:QuestionType[] = results.map((questionObj: Quiz, ind: number)=> {
    return {
        question: questionObj.question,
        answer: questionObj.correct_answer,
        option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
    }
})


return quiz;
}