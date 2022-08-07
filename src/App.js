import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import UseEffectBasic from "./ReactHookComponent/UseEffectBasic";
/**
 * Tao một ứng dụng đếm số
 * Có 1 button : nhất vào nút đó thì sẽ tăng lên 1
 * @returns
 */

//vi du ve initial callback
const orders = [100, 200, 300];

//this is a function component
function App() {
  const [info, setInfo] = useState({
    name: "Nguyen Van A",
    age: 18,
    address: "HCM , VN",
  });

  //setState là thay thế state bằng giá trị mới
  // nên info sẽ bị thay thế bằng đối tượng chỉ có bio thôi
  //nếu muốn giữ những thuộc tính cũ thì làm sao ?
  //dùng toán từ spread của ES6 để rải giá trị cũ vào ...info,
  const handleUpdate = () => {
    setInfo({
      ...info, // nếu muốn giữ lại các giá TRỊ CŨ hoặc dùng callbac
      bio: "Like reactjs",
    });
  };

  const handleUpdateCallback = () => {
    setInfo((prev) => {
      //other login here
      return {
        ...prev,
        bio: "I like reactjs",
      };
    });
  };

  //Nếu tính total tại đây thì nó sẽ được call mỗi khi App được gọi lại ( khi nhấn button)
  // Do vậy không ổn tí nào => đưa vào callback của initial state

  //const total = orders.reduce((total , cur)=> total+ cur)

  //gia tri khoi tao la 1 nen counter duoc set la 1
  //const [counter, setCounter] = useState(1);
  //const [counter, setCounter] = useState(total);

  const [counter, setCounter] = useState(() => {
    const total = orders.reduce((total, cur) => total + cur);
    //tra ve state để làm gia trị init
    //lúc này thì chỉ phải gọi 1 lần thôi
    console.log(total);
    return total;
  });
  //khi thấy hàm này thì đánh dấu là hàm nhưng nó chưa thực thi ngay
  const handleIncrease = () => {
    //sau khi call hàm setCounter thì React sẽ gọi lại hàm App => render lại dữ liệu mới
    setCounter(counter + 1);
    setCounter(counter + 1); //cho dù có gọi này bao nhiêu lần thì counter vẫn chỉ có tăng lên 1
    setCounter(counter + 1); // mặc dù gọi 3 lần setCounter nhưng react chỉ render có 1 lần thôi

    //dùng với callback
    setCounter((preState) => preState + 1);
    //preState đã thay đổi
    //lấy giá trị  (preState + 1) để set giá trị mới cho state
    setCounter((preState) => preState + 1);
    //preState đã thay đổi
    setCounter((preState) => preState + 1); // tăng lên 3
    //tuy nhiên nó cũng chỉ re-render có 1 lần.
  };

  console.log("re-render");

  const [show, setShow] = useState(false);

  //tra giá trị về
  return (
    <div className="App">
      <h2>============Hoc ve useState basic============</h2>
      {/* lúc này counter sẽ là 1  */}
      <h1>{counter}</h1>
      {/* Khi bấn vào button thì hàm handleIncease sẽ được gọi và thục thi 
       lúc này counter đang có giá trị là 1 => counter sẽ tăng lên 1 là  2 và giá trị
       counter lúc này sẽ là 2
      */}
      <button onClick={handleIncrease}>Increase</button>

      <h2>{JSON.stringify(info)}</h2>
      <button onClick={handleUpdate}>Update</button>

      <h2>============Hoc ve Mounted UnMounted============</h2>
      <button onClick={() => setShow(!show)}>Toogle</button>

      <h2>============Hoc ve useEffect basic============</h2>
      {show && <UseEffectBasic />}
    </div>
  );
}

export default App;
