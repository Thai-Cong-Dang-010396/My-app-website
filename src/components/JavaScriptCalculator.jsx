import React, {useState} from 'react'
import '../css/JavaScriptCalculator.scss'

const JavaScriptCalculator = () => {
  const operators = ["*", "/", "+", "-"];
    const [exp, setExp] = useState("");
    const [io, setIO] = useState("0");
    const [solved, setSolved] = useState(false);

    return (
      <div id='app-Calculator'>
        <div className="calculator">
            <div className="exp">{exp}</div>
            <div id="display" className="io">
                {io}
            </div>
            <div className="ac">
                <button id="clear" onClick={clear}>
                    AC
                </button>
            </div>
            <div className="d">
                <button id="divide" onClick={() => op("/")}>
                    /
                </button>
            </div>
            <div className="m">
                <button id="multiply" onClick={() => op("*")}>
                    X
                </button>
            </div>
            <div className="n7">
                <button id="seven" onClick={() => n("7")}>
                    7
                </button>
            </div>
            <div className="n8">
                <button id="eight" onClick={() => n("8")}>
                    8
                </button>
            </div>
            <div className="n9">
                <button id="nine" onClick={() => n("9")}>
                    9
                </button>
            </div>
            <div className="s">
                <button id="subtract" onClick={() => op("-")}>
                    -
                </button>
            </div>
            <div className="n4">
                <button id="four" onClick={() => n("4")}>
                    4
                </button>
            </div>
            <div className="n5">
                <button id="five" onClick={() => n("5")}>
                    5
                </button>
            </div>
            <div className="n6">
                <button id="six" onClick={() => n("6")}>
                    6
                </button>
            </div>
            <div className="a">
                <button id="add" onClick={() => op("+")}>
                    +
                </button>
            </div>
            <div className="n1">
                <button id="one" onClick={() => n("1")}>
                    1
                </button>
            </div>
            <div className="n2">
                <button id="two" onClick={() => n("2")}>
                    2
                </button>
            </div>
            <div className="n3">
                <button id="three" onClick={() => n("3")}>
                    3
                </button>
            </div>
            <div className="eq">
                <button id="equals" onClick={solve}>
                    =
                </button>
            </div>
            <div className="n0">
                <button id="zero" onClick={() => n("0")}>
                    0
                </button>
            </div>
            <div className="dec">
                <button id="decimal" onClick={() => n(".")}>
                    .
                </button>
            </div>
        </div>
      </div>
    );

    function clear() {
        setExp("");
        setIO("0");
    }

    function op(toDo) {
        // working copy
        let wcExp = exp;

        if (solved) {
            wcExp = io;
            setSolved(false);
        }

        if (toDo !== "-") {
            wcExp = wcExp.replace(/[*\/+-]+$/, "");
        } else if (toDo === "-" && wcExp.endsWith("-")) {
            return;
        }

        setExp(wcExp + toDo);
        setIO(toDo);
    }

    function n(digit) {
        // working copy
        let wcExp = exp;
        let wcIO = io;

        if (digit === "0" && wcExp === "0") {
            return;
        }

        if (solved) {
            wcExp = "";
            wcIO = "";
            setSolved(false);
        }

        if (operators.includes(io)) {
            wcIO = "";
        }

        if (wcIO === "0") {
            wcIO = "";
        }

        if (digit === ".") {
            if (wcIO.includes(".")) {
                return;
            }

            if (wcIO === "") {
                wcIO = "0";
            }

            if (wcExp === "" || /[*\/+-]$/.test(wcExp)) {
                wcExp += "0";
            }
        }

        setExp(wcExp + digit);
        setIO(wcIO + digit);
    }

    function solve() {
        // working copy
        let wcExp = exp;

        wcExp = wcExp.replace(/[*\/+-]+$/, "");

        const answer = eval(wcExp).toString();

        setExp(wcExp + "=" + answer);
        setIO(answer);
        setSolved(true);
    }
}

export default JavaScriptCalculator