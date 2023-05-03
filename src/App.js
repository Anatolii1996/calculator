import './App.scss';

function App() {
  return (
    <div className="App">
     <div class="calc">
      <div class="calc-screen">
        <p>0</p>
      </div>
      <div class="buttons">
        <div class="btn ac bg-grey">AC</div>
        <div class="btn plus-minus bg-grey" id="divide">+/-</div>
        <div class="btn percent bg-grey">%</div>
        <div class="btn division bg-orange">/</div>
      
        <div class="btn seven" id="seven">7</div>
        <div class="btn eight" id="eight">8</div>
        <div class="btn nine" id="nine">9</div>
        <div class="btn multiplu bg-orange" id="multiply">x</div>
      
        <div class="btn four" id="four">4</div>
        <div class="btn five" id="five">5</div>
        <div class="btn six" id="six">6</div>
        <div class="btn minus bg-orange" id="subtract">-</div>
     
        <div class="btn one" id="one">1</div>
        <div class="btn two" id="two">2</div>
        <div class="btn three" id="three">3</div>
        <div class="btn plus bg-orange" id="add">+</div>
      
        <div class="btn zero" id="zero">0</div>
        <div class="btn dote">,</div>
        <div class="btn equal bg-orange" id="equals">=</div>
      </div>
    </div>
    </div>
  );
}

export default App;
