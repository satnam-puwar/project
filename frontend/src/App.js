import { use, useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState();
  const handleClick = async () => {
    const data = await fetch("http://localhost:8000/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    }).then((data) => data.json());
    setData(data?.reply);
    setUserInput("");
  };
  return (
    <>
      <div>
        <input
          placeholder="ask anything..."
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      <p>{data}</p>
    </>
  );
}

export default App;
