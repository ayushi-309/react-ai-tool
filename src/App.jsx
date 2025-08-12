import React, { useState } from 'react'
import { URL } from './constants.js'
import './App.css'
import { Answer } from './Answers.jsx'
function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')

  const payLoad = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }


  const askQuestion = async () => {
    // console.log(question)
    let response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payLoad)
    })

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())


    console.log(dataString)
    // console.log(response.candidates[0].content.parts[0].text)
    // setResult(response.candidates[0].content.parts[0].text)
    setResult(dataString)
  }




  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800" >
      </div>
      <div className="col-span-4 p-10">
        <div className="container h-100 overflow-scroll">
          <div className="text-white">

            <ul>
            {/* {result} */}
            {
              result && result.map((item,index)=>(
                <li><Answer ans={item} key={index} /></li>
              ))
            }
            </ul>

          </div>

        </div>
        <div className="bg-zinc-800 
  w-1/2 
  text-white 
  mx-auto 
  rounded-4xl
  border 
  border-zinc-700 
  flex h-16 
  items-center
  justify-between
  mt-10
  
  ">
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} className="w-full h-full p-3 outline-none" placeholder="Ask me anything..." />
          <button onClick={() => askQuestion()}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
