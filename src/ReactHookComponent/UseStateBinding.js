import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const gifts = ["CPU i9", "RAM 32 GB", "MAXXX BOOK"];

//this is a function component
function App() {
  console.log("re-render");
  const [gift, setGift] = useState();

  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length);
    setGift(gifts[index]);
  };

  //binding example
  const [name, setName] = useState("");

  //tra giá trị về
  return (
    <div style={{ padding: 32 }}>
      {/* Nếu có gift thì hiển thị gift , nếu không có gift (undedined) thì hiển thị text */}
      <h1>{gift || "Chua co phan thuong"}</h1>
      <button onClick={randomGift}>Get gift</button>

      {/* //binding  */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export default App;
