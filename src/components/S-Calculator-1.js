import React, { useState, useEffect } from 'react';

function Calculator() {

    /*initializing variables*/
    const [display, setDisplay] = useState("");

    /*Operator calculation using switch/case */
    function Operator(op) {
        let temp = 0;
        switch (op) {

            case '!':
                let i = parseFloat(eval(display));
                temp = 1;
                while (i > 0) {
                    temp *= i;
                    i--;
                }
                break;
            case '^2':
                temp = eval(display);
                temp *= temp;
                break;
            case '√':
                temp = Math.sqrt(eval(display));
                break;
            case '%':
                temp = eval(display);
                temp = temp / 100;
                break;
            case null: temp = parseFloat(display);
        }

        return temp;
    }

    /*Handle click event and render components using set*/
    function Clicked(value) {

        /*= key press*/
        if (value === "=") {
            setDisplay(eval(display))      
        }

        /*Clear key press*/
        else if (value === "C") {   
            setDisplay("")   
        }

        /*Scientific functions*/
        else if (value === "√" || value === "!" || value === "%" || value === "^2") {
            setDisplay(Operator(value))
        }
        /*Display key press*/
        else setDisplay(display + "" + value);


    }

    /*Component to create Buttons*/
    const CalcButton = (props) => {
        const ID = "id" + props.val + "button";
        return <td><button id={ID} class="buttons" onClick={() => Clicked(props.val)}>{props.val} </button></td>
    }

    /*Component to create Text Field*/
    const DisplayField = (props) => {
        return <input type="text" value={display} class="display" disabled />
    }   

    /*Render components*/
    return (
        <div class="container">
            <div id="div"><DisplayField />
                {/* <ResultField /> */}
            </div>
          
            <div>
                <CalcButton val={'('} />
                <CalcButton val={')'} />
                <CalcButton val={'C'} />
            </div>

            <div>
                <CalcButton val={'^2'} />
                <CalcButton val={'√'} />
                <CalcButton val={'!'} />
                <CalcButton val={'%'} />
            </div>
            <div>

                <CalcButton val={1} />
                <CalcButton val={2} />
                <CalcButton val={3} />
                <CalcButton val={'+'} />
            </div>
            <div>

                <CalcButton val={4} />
                <CalcButton val={5} />
                <CalcButton val={6} />
                <CalcButton val={'-'} />
            </div>
            <div>
                <CalcButton val={7} />
                <CalcButton val={8} />
                <CalcButton val={9} />
                <CalcButton val={'*'} />
            </div>

            <div>
                <CalcButton val={0} />
                <CalcButton val={'.'} />
                <CalcButton val={'/'} />
            </div>
            <div>
              
                <CalcButton val={'='} />
            </div>
        </div>
    )
}
export default Calculator;