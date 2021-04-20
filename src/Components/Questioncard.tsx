import React, { useState } from "react";
import "../App.css";
import { questionPropsType } from "../Types/quiz_types";

const Questioncard: React.FC<questionPropsType> = ({ question, options , callBack}) => {


    let [selectedAns , setSelectedAns] = useState("");
    
    const handleSelection = (ev: any) =>{
           setSelectedAns(ev.target.value)

    }

    
    return (
        <div className="question-container">
            <div className="question"> {question} </div>
            <form onSubmit={(e:React.FormEvent<EventTarget>) => callBack(e,selectedAns )}
            className="question-form">
                {
                    options.map((opt: string, ind: number) => {
                        return (
                            <div key={ind}>
                                <label className="radio">
                                    <input type="radio"
                                        name="opt"
                                        required
                                        value={opt}
                                        checked={selectedAns === opt}
                                        onChange={handleSelection}
                                    />
                                    {opt}
                           </label>
                           </div>
                        )
                    })
                }
                <input className="submit" type="submit" />
            </form>

        </div>
    )
}

export default Questioncard;