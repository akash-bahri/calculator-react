import React, { useEffect, useState } from "react";


function CalculatorKey(props) {
    return (
        <button onClick={() => props.onClick(props.value)}>
            {props.value}
        </button>
    );
}

function Calculator() {

    const [display, setDisplay] = useState("");
    const [prevValue, setPrevValue] = useState(null);
    const [currentValue, setCurrentValue] = useState("");
    const [op, setOp] = useState(null);

    useEffect(() => {
        setDisplay("-")
    }, []);

    useEffect(() => {
        setDisplay(currentValue)
    }, [currentValue])

    useEffect(() => {
        setDisplay(prevValue != null ? prevValue : "-")
    }, [prevValue])

    const captureButton = (value) => {
        if (Number.isInteger(value)) {
            //value = parseInt(value, 10)
            //if currentValue is 
            setCurrentValue(currentValue === "" ? value : currentValue * 10 + value);
        } else {

            if (op === null) {
                setOp(value)
                setPrevValue(currentValue)
                setCurrentValue("")
            } else {

                let temp = 0;
                switch (op) {
                    case '+':
                        temp = parseFloat(prevValue) + parseFloat(currentValue);
                        break;
                    case '*':
                        temp = parseFloat(prevValue) + parseFloat(currentValue);
                        break;
                }

                setOp(value)
                setCurrentValue("");
                setPrevValue(String(temp));
            }

        }
    }

    return (
        <div className="calculator">
            <input type="text" value={display} readOnly /> P: {prevValue} C: {currentValue} O: {op}
            <div>
                <CalculatorKey value={7} onClick={captureButton} />
                <CalculatorKey value={8} onClick={captureButton} />
                <CalculatorKey value={9} onClick={captureButton} />
                <CalculatorKey value={"+"} onClick={captureButton} /><br />
                <CalculatorKey value={4} onClick={captureButton} />
                <CalculatorKey value={5} onClick={captureButton} />
                <CalculatorKey value={6} onClick={captureButton} />
                <CalculatorKey value={"*"} onClick={captureButton} />

            </div>
        </div>
    );
}

export default Calculator;