/* eslint-disable */
import './App.scss';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calcData, setCalcData] = useState("");
  const calcDataRef = useRef(calcData);
  const inputDataRef = useRef(input);

  useEffect(() => {
    let buttons = document.querySelectorAll(".btn");

    buttons.forEach((el) => {

      el.addEventListener("click", handleInput);
    })

  }, [])

  const handleOutput = () => {
    setOutput(calcData)
  }

  useEffect(() => {
    handleOutput()
    calcDataRef.current = calcData;
    inputDataRef.current = input;
  }, [calcData])


  const handleSubmit = () => {
    const total = eval(calcDataRef.current);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalcData(`${total}`);
  }

  const handleClear = () => {
    setInput("0");
    setCalcData("");
  }

  const dotOperator = () => {
    const lastChat = calcDataRef.current.charAt(calcDataRef.current.length - 1);
    if (!calcDataRef.current.length) {
      setInput("0.");
      setCalcData("0.");
    } else {
      if (lastChat === "*" ||lastChat === "+" ||lastChat === "-"||lastChat === "/") {
        setInput("0.");
        setCalcData(`${calcDataRef.current} 0.`);
      } else {
        setInput(
          lastChat === "." || inputDataRef.current.includes(".") ? `${inputDataRef.current}` : `${inputDataRef.current}.`
        );
        const formattedValue =
          lastChat === "." || inputDataRef.current.includes(".")
            ? `${calcDataRef.current}`
            : `${calcDataRef.current}.`;
        setCalcData(formattedValue);
      }
    }
   
  }  

  const handleNumbers = (value) => {
    if (!calcDataRef.current) {
      
      setInput(`${value}`);
      setCalcData(`${value}`);
    } else {
      
      if (value === "0" && (calcDataRef.current === "0" || inputDataRef.current === "0")) {
       
        setCalcData(`${calcDataRef.current}`);
       
      } else {
       
        const lastChat = calcDataRef.current.charAt(calcDataRef.current.length - 1);
        const isLastChatOperator =
          lastChat === "*" || lastChat === "+"||lastChat === "-"||lastChat === "/";

        setInput(isLastChatOperator ? `${value}` : `${inputDataRef.current}${value}`);
        setCalcData(`${calcDataRef.current}${value}`);
      }
    }
  };

  const handleOperators = (value) => {
   if (calcDataRef.current.length) {
      setInput(`${value}`);
      const beforeLastChat = calcDataRef.current.charAt(calcDataRef.current.length - 2);

      const beforeLastChatIsOperator =
      beforeLastChat === "+"||beforeLastChat === "-"||beforeLastChat === "/"|| beforeLastChat === "*";

      const lastChat = calcDataRef.current.charAt(calcDataRef.current.length - 1);
      
      const lastChatIsOperator = lastChat === "+" ||lastChat === "-" || lastChat === "*"||lastChat === "/";
      
      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        beforeLastChatIsOperator && lastChatIsOperator
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calcDataRef.current.substring(
            0,
            calcDataRef.current.length - 2
          )}${value}`;
          setCalcData(updatedValue);
        } else {
          setCalcData(`${calcDataRef.current.substring(0, calcDataRef.current.length - 1)}${validOp}`);
        }
      } else {
        setCalcData(`${calcDataRef.current}${validOp}`);
      }
    }

  }

  const handleInput = (e) => {
    switch (e.target.innerText) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleNumbers(e.target.innerText);
        break;
      case "=":

        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case ".":
        dotOperator();
        break;

      case "+":
      case "-":
      case "x":
      case "/":
        handleOperators(e.target.innerText);
        break
      default:
        break;
    }
  }

  return (
    <div className="App">
      <div className="calc">
        <div className="calc-screen" >
          <p >{output}</p>
          <p id="display">{input}</p>
        </div>
        <div className="buttons">
          <div className="btn ac bg-grey" id="clear" >AC</div>
          <div className="btn plus bg-orange" id="add">+</div>
          <div className="btn division bg-orange" id="divide">/</div>

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
          

          <div className="btn zero" id="zero">0</div>
          <div className="btn dote" id="decimal">.</div>
          <div className="btn equal bg-orange" id="equals">=</div>
        </div>
      </div>
    </div>
  );
}
export default App;
