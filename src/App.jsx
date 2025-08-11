import React, { useState } from 'react'
import { URL } from './constants.js'
import './App.css'
function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')

  const payLoad = {
    "contents": [
      {
        "parts": [
          {
            "text": question,
          }
        ]
      }
    ]
  }


  const askQuestion = async() => {
    // console.log(question)
    let response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payLoad)
    })
    
    response = await response.json();
    console.log(response.candidates[0].content.parts[0].text)
    setResult(response.candidates[0].content.parts[0].text)
    }




  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800" >
        hello
      </div>
      <div className="col-span-4 p-10">
        <div className="container h-100 overflow-scroll">
          <div className="text-white font-bold">
            {result}
            </div>
        
        </div>
        <div className="bg-zinc-800 
  w-1/2 
  text-white 
  mx-auto 
  rounded-4xl
  border 
  border-zinc-400 
  flex h-16 
  justify-between 
  items-center 
  p-5 
  mt-10">
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} className="w-full h-full p-3 outline-none" placeholder="Ask me anything..." />
          <button onClick={() => askQuestion()}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
