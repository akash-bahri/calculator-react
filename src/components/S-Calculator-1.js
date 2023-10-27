import React, { useState, useEffect } from 'react';

function Calculator() {

    /*initializing variables*/
    const [result, setResult] = useState("");
    const [prevValue, setPrevValue] = useState(null);
    const [currentValue, setCurrentValue] = useState("");
    const [op, setOp] = useState(null);
    const [display, setDisplay] = useState("Enter a number");

    /*initializing Result via useEffect*/
    useEffect(() => {
        setResult("Enter a number")
        console.log('System initialized')
    }, []);

    /*Console Logs for Debugging */
    useEffect(() => {
        console.log('currentValue:' + currentValue)
    }, [currentValue])

    useEffect(() => {
        console.log('prevValue:' + prevValue)
    }, [prevValue])

    useEffect(() => {
        console.log('result:' + result)
    }, [result])

    useEffect(() => {
        console.log('op:' + op)
    }, [op])

    /* Trim trailing zeros*/
    function trimvalue(inputString) {
        const trimmedString = inputString.trim();
        const parts = trimmedString.split('.');
        if (parts.length === 2) {
            parts[1] = parts[1].replace(/0+$/, '');
            return parts.join('.');
        }
        return trimmedString;
    }

    /*Operator calculation using switch/case */
    function Operator(op) {
        let temp = 0;
        switch (op) {
            case '+':
                temp = parseFloat(prevValue) + parseFloat(currentValue);
                break;
            case '*':
                temp = parseFloat(prevValue) * parseFloat(currentValue);
                break;
            case '-':
                temp = parseFloat(prevValue) - parseFloat(currentValue);
                break;
            case '/':
                temp = parseFloat(prevValue) / parseFloat(currentValue);
                break;
            case '!':
                console.log(parseFloat(prevValue));
                let i = parseFloat(prevValue);
                temp = 1;
                while (i > 0) {
                    temp *= i;
                    i--;
                }
                break;
            case '^2':
                temp = parseFloat(prevValue) * parseFloat(prevValue);
                break;
            case '√':
                let squareRootVal = parseFloat(currentValue);
                temp = Math.sqrt(squareRootVal);
                break;
            case '%':
                temp = parseFloat(prevValue) * parseFloat(currentValue);
                temp= temp/100;
                break;
            case null: temp = parseFloat(currentValue);
        }
        temp = trimvalue(temp.toString());
        return temp;
    }

    /*Handle click event and render components using set*/
    function Clicked(value) {

        /*Number key press*/
        if (Number.isInteger(value)) {
            setCurrentValue(currentValue + "" + value);
            setResult(currentValue + "" + value);
        }

        /*Clear key press*/
        else if (value === "C") {
            setResult("Enter a number")
            setPrevValue(null)
            setCurrentValue("")
            setOp(null)
        }

        /*Calculate key press*/
        else if (value === "CALCULATE") {
            let temp = 0;
            temp = Operator(op);
            setResult(temp)
            setCurrentValue(temp)
            setPrevValue("")
            setOp(null)
        }
        /*Decimal key press*/
        else if (value === ".") {
            if (!currentValue.toString().includes('.')) {
                setCurrentValue(currentValue + '.');
                setResult(currentValue + '.');
            }
        }

        /*Operator key press*/
        else {
            if (op === null) {
                setOp(value)
                setPrevValue(currentValue)
                setCurrentValue("")
            }
            else {
                let temp = 0;
                temp = Operator(op);
                setResult(temp)
                setOp(value)
                setCurrentValue("");
                setPrevValue(temp);
            }
        }
    }

    /*Component to create Buttons*/
    const CalcButton = (props) => {
        const ID = "id" + props.val + "button";
        return <td><button id={ID} class="buttons" onClick={() => Clicked(props.val)}>{props.val} </button></td>
    }

    /*Component to create Text Field*/
    const TextField = (props) => {
        return <input type="text" value={result} class="display" disabled />
    }

    /*Render components*/
    return (
        <div>
            <h1>new Calculator</h1>
            <TextField />
            <div>Previous: {prevValue} <br /> Current: {currentValue} <br /> Operator: {op}</div>
            <br /><br />
            <table>
                <tr>
                    <CalcButton val={'^2'} />
                    <CalcButton val={'√'} />
                    <CalcButton val={'!'} />
                    <CalcButton val={'%'} />
                </tr>
                <tr>
                    <CalcButton val={1} />
                    <CalcButton val={2} />
                    <CalcButton val={3} />
                    <CalcButton val={'+'} />
                </tr>
                <tr>
                    <CalcButton val={4} />
                    <CalcButton val={5} />
                    <CalcButton val={6} />
                    <CalcButton val={'-'} />
                </tr>
                <tr>
                    <CalcButton val={7} />
                    <CalcButton val={8} />
                    <CalcButton val={9} />
                    <CalcButton val={'*'} />
                </tr>
            </table>
            <div>
                <CalcButton val={0} />
                <CalcButton val={'.'} />
                <CalcButton val={'/'} />
            </div>
            <div>
                <CalcButton val={'C'} />
                <CalcButton val={'CALCULATE'} />
            </div>
        </div>
    )
}
export default Calculator;