import { useEffect, useState } from "react";

function App() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fecthData() {
      const data = await fetch("http://localhost:3000").then((response) =>
        response.json()
      );
      setData(data);
    }
    fecthData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInput = (e) => {
    setInputData(e.target.value);
  };
const handleDelete=(Index)=>{
  console.log("delete..")
  const task = data.filter((item,index)=>item[index]===item[Index])
  console.log(task)
}
  console.log(data, "state data....");
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task to do"
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
      {data?.map((item, index) => (
        <li>
          {item.task}
          <button onClick={handleDelete(index)}>delete</button>
        </li>
      ))}
    </div>
  );
}

export default App;
