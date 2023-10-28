import React, { useState, useEffect } from 'react';
var perc = false;
var PrevValue = 0;
var CurrentValue = 0;

function Calculator() {

    /*initializing UseStates*/
    const [display, setDisplay] = useState("");
    const [cal, setCal] = useState("");

    //Function to handle any error in calculation like Syntax error
    function Eval(val) {
        let total = 0;
        try {
            total = eval(val);
            return total;
        }
        catch (err) {
            setDisplay("Syntax Error")
            console.log(err);
        }
    
    }

    /*Operator calculation using switch/case */
    function Operator(op) {
        let temp = "";
        switch (op) {

            case '!':
                let i = parseFloat(Eval(display));
                temp = 1;
                while (i > 0) {
                    temp *= i;
                    i--;
                }
                break;
            case '√':
                temp = Math.sqrt(Eval(display));
                break;
        }

        return temp;
    }

    /*Handle click event and render components*/
    function Clicked(value) {
        PrevValue = CurrentValue;
        CurrentValue = value;
        /* = key press after = will do nothing
        if (PrevValue === '=' & value === '=') {
            console.log("do nothing");
        }*/

        /* = key press */
        if (value === "=" & PrevValue != '=') {
            console.log(cal);
            if (Number.isInteger(PrevValue) || PrevValue == ')' || PrevValue == '!' || PrevValue == '√' || PrevValue == '^2'|| PrevValue == '%') {
                setDisplay(Eval(cal))
                setCal(Eval(cal))
                perc = false;
            }
            /*If last key press is operator then remove it and calculate*/
            else {
                let c = cal.toString();
                let l = c.length;
                l = cal[l - 1];
                c = c.slice(0, -1);
                let final = Eval(c) + "" + l;
                setDisplay(final)
                setCal(final)
            }
        }

        /*Clear key press*/
        else if (value === "C") {
            setDisplay("")
            setCal("")
            perc = false;
            PrevValue = 0;
            CurrentValue = 0;
        }
        /* Square: ^2 key press*/
        else if (value === "^2") {
            setCal(display + "**2")
            setDisplay(display + "^2")
            perc = false;
        }
        /*% key press*/
        else if (value === "%") {
            setCal(cal + "/100")

            setDisplay(display + "%")
            perc = true;
        }
        /* left bracket key press*/
        else if (value === "(") {
            //if last key press is number then multiply it with (
            if (Number.isInteger(PrevValue) & cal != "") {
                setCal(cal + "*(")
                setDisplay(display + "*(")
                perc = false;
            }
            else {
                setCal(cal + "(")
                setDisplay(display + "(")
                perc = false;
            }
        }

        /*Scientific functions via Operator function*/
        else if (value === "√" || value === "!") {

            setDisplay(Operator(value))
            setCal(Operator(value))
            perc = false;
        }
        /*Display number press*/
        else if (Number.isInteger(value)) {

            if (perc == true) {

                setCal(cal + "*" + value)

                perc = false;
            }
            else {

                setCal(cal + "" + value);
            }
            setDisplay(display + "" + value);
        }
        else {
            if (PrevValue == '+' || PrevValue == '-' || PrevValue == '*' || PrevValue == '/') {
                let c = cal.toString();
                c = c.slice(0, -1);
                let final = c + "" + value;
                setDisplay(final)
                setCal(final)
            }

            else {

                setDisplay(display + "" + value);
                setCal(cal + "" + value);
                perc = false;
            }
        }
        console.log(cal);
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
            <br />
            <div class="row"><DisplayField />
            </div>
            <br />
            <div class="row">
                <CalcButton val={'√'} />
                <CalcButton val={'!'} />
                <CalcButton val={'C'} />
            </div>

            <div class="row">
                <CalcButton val={'('} />
                <CalcButton val={')'} />
                <CalcButton val={'^2'} />
                <CalcButton val={'%'} />
            </div>
            <div class="row">

                <CalcButton val={1} />
                <CalcButton val={2} />
                <CalcButton val={3} />
                <CalcButton val={'+'} />
            </div>
            <div class="row">

                <CalcButton val={4} />
                <CalcButton val={5} />
                <CalcButton val={6} />
                <CalcButton val={'-'} />
            </div>
            <div class="row">
                <CalcButton val={7} />
                <CalcButton val={8} />
                <CalcButton val={9} />
                <CalcButton val={'*'} />
            </div>

            <div class="row">
                <CalcButton val={0} />
                <CalcButton val={'.'} />
                <CalcButton val={'/'} />
            </div>
            <div class="row">
                <CalcButton val={'='} onClick />
            </div>
        </div>
    )
}
export default Calculator;