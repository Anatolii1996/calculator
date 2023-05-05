import './App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let buttons = document.querySelectorAll(".btn");

    buttons.forEach((el) => {

      el.addEventListener("click", handleClick);
    })

  }, [])
  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "AC":
        setValue(0);
        break;
      case ".":
        setValue(prev => {
          if (typeof prev === "string") {
            if(prev.includes("+")){
              let plus = prev.split("+");
               
              let first= plus[0].concat("+")
              let second=plus[1].concat(".")
             
              return first+second
            }
           else if (prev.includes(".") && e.target.innerText === ".") {
              return prev; // не добавляем вторую точку
            } else {
              return prev.concat(e.target.innerText);
            }
          } else if (prev === 0) {
            return prev.toString().concat(e.target.innerText);
          }
           else {
            return prev + "." ;
          }
        });
        break;
      case "=":
        setValue(prev => eval(prev));
        break;
      case "0":
        setValue(prev => {
          if (typeof prev == "string") {
            return prev.concat("0")
          } else {
            return +(prev.toString().concat("0"))
          }
        });
        break;
      case "+":
        setValue(prev => prev.toString().concat("+"));
        break;
      case "-":
        setValue(prev => prev.toString().concat("-"));
        break;
      case "x":
        setValue(prev => prev.toString().concat("*"));
        break;
      case "/":
        setValue(prev => prev.toString().concat("/"));
        break;
      default:
        setValue(prev => {
          if (typeof prev == "string") {
            return prev.concat(e.target.innerText)
          } else {
            return +(prev.toString().concat(e.target.innerText))
          }
        });
        break;
    }
  }


  return (
    <div className="App">
      <div className="calc">
        <div className="calc-screen" id="display">
          <p>{value}</p>
        </div>
        <div className="buttons">
          <div className="btn ac bg-grey" id="clear" >AC</div>
          <div className="btn plus-minus bg-grey" id="divide">+/-</div>
          <div className="btn percent bg-grey">%</div>
          <div className="btn division bg-orange">/</div>

          <div className="btn seven" id="seven" >7</div>
          <div className="btn eight" id="eight">8</div>
          <div className="btn nine" id="nine">9</div>
          <div className="btn multiplu bg-orange" id="multiply">x</div>

          <div className="btn four" id="four">4</div>
          <div className="btn five" id="five">5</div>
          <div className="btn six" id="six">6</div>
          <div className="btn minus bg-orange" id="subtract">-</div>

          <div className="btn one" id="one">1</div>
          <div className="btn two" id="two">2</div>
          <div className="btn three" id="three">3</div>
          <div className="btn plus bg-orange" id="add">+</div>

          <div className="btn zero" id="zero">0</div>
          <div className="btn dote" id="decimal">.</div>
          <div className="btn equal bg-orange" id="equals">=</div>
        </div>
      </div>
    </div>
  );
}

export default App;
