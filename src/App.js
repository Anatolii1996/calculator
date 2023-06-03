import './App.scss';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calcData, setCalcData] = useState("");
  const calcDataRef = useRef(calcData);

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
  }, [calcData])


  const handleSubmit = () => {
    // console.log("handleSubmit", calcDataRef.current)
    const total = eval(calcDataRef.current)
    const stringTotal = String(total);
    if (stringTotal.startsWith("0.") && stringTotal.length > 7) {
      console.log(589);
      let newTotal = stringTotal.substring(0, 7)
      setInput(`${newTotal}`)
      setCalcData(`${newTotal}`)
      return
    }
    setInput(`${total}`)
    setCalcData(`${total}`)
  }
  const handleClear = () => {
    setInput("0");
    setCalcData("");
  }
  const dotOperator = () => {

    setCalcData((prevCalc) => {
      const lastChar = prevCalc.charAt(prevCalc.length - 1);
      if (!prevCalc) {
        setInput("0.");
        return "0."
      } else {
        if (lastChar === "*" || lastChar === "+" || lastChar === "-" || lastChar === "/") {
          setInput("0.");
          return `${prevCalc} 0.`
        } else {
          setInput(lastChar === "." || input.includes(".") ? `${input}` : `${input}.`)
          //обрати внимание
          const format = lastChar === "." || input.includes(".") ? `${prevCalc}` : `${prevCalc}.`
          return format
        }

      }
    })
  }
  // const handleNumbers = (value) => {
  //   setCalcData((prevCalc) => {
  //     if (!prevCalc) {
  //       setInput(value);
  //       return value;
  //     }
  //     else {
  //       console.log(3333)
  //       if (value == "0" && (prevCalc == "0" || input == "0")) {
  //         console.log(4444)
  //         console.log(prevCalc)
  //         console.log(value)
  //         console.log(input)
  //        return prevCalc;
  //       } else {
  //         console.log(555);
  //         const lastChar = prevCalc.charAt(prevCalc.length - 1);
  //         const lastOperator = lastChar === "*" || lastChar === "+" || lastChar === "-" || lastChar === "/";
  //         setInput( `${value}` );
  //         return lastOperator ? `${value}` : `${prevCalc}${value}`;
  //       }
  //     }
  //   })


  // }

  const handleNumbers = (value) => {
    setCalcData((prevCalc) => {
      if (!prevCalc) {
        setInput(value);
        return value;
      } else if (prevCalc === "0" && value === "0") {
        return prevCalc;
      } else if (prevCalc === "0" && value !== "0") {
        setInput(value)
        return value
      }

      else {
        const lastChar = prevCalc.charAt(prevCalc.length);
        const lastOperator =
          lastChar === "*" || lastChar === "+" || lastChar === "-" || lastChar === "/";
        setInput((prevInput) => {
          if (prevInput === "0") {
            return value;
          } else {
            return prevInput + value;
          }
        });
        return lastOperator ? value : prevCalc + value;
      }
    });
  };
  const handleOperators = (value) => {
    // console.log(value);
    setCalcData((prevCalc) => {
      if (prevCalc) {

        setInput(value)
        const BbeforeLast = prevCalc.charAt(prevCalc.length - 2);
        // console.log("bblast", BbeforeLast)
        const BbeforeIsOerator = BbeforeLast == "+" || BbeforeLast == "-" || BbeforeLast == "*" || BbeforeLast == "/";
        // console.log(BbeforeIsOerator);
        const beforeLast = prevCalc.charAt(prevCalc.length - 1);
        // console.log("blast", beforeLast)
        const beforeLastIsOperator = beforeLast == "+" || beforeLast == "-" || beforeLast == "*" || beforeLast == "/";
        // console.log(beforeLastIsOperator)
        const lastChar = value;
        // console.log("last", lastChar)
        const LastIsOperator = lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/";
        // console.log(LastIsOperator)
        const validOp = value == "x" ? "*" : value;
        // console.log(validOp)
        if (BbeforeIsOerator) {
          const updateValue = `${prevCalc.slice(0, -3).concat(prevCalc.slice(0, -2))}${validOp}`
          // console.log(updateValue);
          return updateValue
        }
        if ((LastIsOperator && value != "-") || (beforeLastIsOperator && LastIsOperator)) {
          if (beforeLastIsOperator) {
            const updateValue = `${prevCalc.substring(0, prevCalc.length-1)}${value}`
            console.log(updateValue)
            return updateValue;
          } else {
            return `${prevCalc.substring(0, prevCalc.length)}${validOp}`
          }
        } else {
          console.log(111);
          return `${prevCalc}${validOp}`
        }
      }
    })

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
          {/* <div className="btn plus-minus bg-grey" id="divide">+/-</div> */}
          <div className="btn plus bg-orange" id="add">+</div>
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
          

          <div className="btn zero" id="zero">0</div>
          <div className="btn dote" id="decimal">.</div>
          <div className="btn equal bg-orange" id="equals">=</div>
        </div>
      </div>
    </div>
  );
}
export default App;
