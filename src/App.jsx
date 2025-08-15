
import { useState } from "react";
import { URL } from "./constants";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents": [{
      "parts": [{ "text": "Explain how AI works" }]
    }]
  }

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    })

    response = await response.json();
    console.log(response.caandidate[0].contents.parts[0].text);
    setResult(response.caandidate[0].contents.parts[0].text)
  }
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
      </div>
      <div className="col-span-4 p-10">
        <div className="container h-110">
          {result}
        </div>
        <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white rounded-4xl
          border border-zinc-700 flex h-16">
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask me Anything" />
          <button onClick={askQuestion} >Ask</button>


        </div>

      </div>
    </div>
  );
}
export default App;