import "./styles.css";

let app = document.getElementById("app");

let calculator_box = document.createElement("div");
calculator_box.setAttribute("class", "calculator_box");
app.append(calculator_box);

let display_answer = document.createElement("div");
display_answer.setAttribute("class", "display_answer");
calculator_box.append(display_answer);

let answer = document.createElement("div");
answer.setAttribute("id", "answer");
answer.setAttribute("data-value", "0");
answer.innerHTML = "0";
display_answer.append(answer);

let row = document.createElement("div");
row.setAttribute("id", "row");
row.setAttribute("class", "calculator_row");
calculator_box.append(row);

let button11 = document.createElement("div");
button11.setAttribute("id", "button11");
button11.setAttribute("class", "input_button op-col");
button11.setAttribute("data-value", "AC");
button11.innerText = "AC";
row.append(button11);

let button12 = document.createElement("div");
button12.setAttribute("id", "button12");
button12.setAttribute("class", "input_button op-col");
button12.setAttribute("data-value", "X");
button12.innerText = "X";
row.append(button12);

let button13 = document.createElement("div");
button13.setAttribute("id", "button13");
button13.setAttribute("class", "input_button op-col");
button13.setAttribute("data-value", "%");
button13.innerText = "%";
row.append(button13);

let button14 = document.createElement("div");
button14.setAttribute("id", "button14");
button14.setAttribute("class", "input_button op-col");
button14.setAttribute("data-value", "/");
button14.innerText = "/";
row.append(button14);

let button21 = document.createElement("div");
button21.setAttribute("id", "button21");
button21.setAttribute("class", "input_button");
button21.setAttribute("data-value", "9");
button21.innerText = "9";
row.append(button21);

let button22 = document.createElement("div");
button22.setAttribute("id", "button22");
button22.setAttribute("class", "input_button");
button22.setAttribute("data-value", "8");
button22.innerText = "8";
row.append(button22);

let button23 = document.createElement("div");
button23.setAttribute("id", "button23");
button23.setAttribute("class", "input_button");
button23.setAttribute("data-value", "7");
button23.innerText = "7";
row.append(button23);

let button24 = document.createElement("div");
button24.setAttribute("id", "button24");
button24.setAttribute("class", "input_button op-col");
button24.setAttribute("data-value", "*");
button24.innerText = "*";
row.append(button24);

let button31 = document.createElement("div");
button31.setAttribute("id", "button31");
button31.setAttribute("class", "input_button");
button31.setAttribute("data-value", "6");
button31.innerText = "6";
row.append(button31);

let button32 = document.createElement("div");
button32.setAttribute("id", "button32");
button32.setAttribute("class", "input_button");
button32.setAttribute("data-value", "5");
button32.innerText = "5";
row.append(button32);

let button33 = document.createElement("div");
button33.setAttribute("id", "button33");
button33.setAttribute("class", "input_button");
button33.setAttribute("data-value", "4");
button33.innerText = "4";
row.append(button33);

let button34 = document.createElement("div");
button34.setAttribute("id", "button34");
button34.setAttribute("class", "input_button op-col");
button34.setAttribute("data-value", "-");
button34.innerText = "-";
row.append(button34);

let button41 = document.createElement("div");
button41.setAttribute("id", "button41");
button41.setAttribute("class", "input_button");
button41.setAttribute("data-value", "3");
button41.innerText = "3";
row.append(button41);

let button42 = document.createElement("div");
button42.setAttribute("id", "button42");
button42.setAttribute("class", "input_button");
button42.setAttribute("data-value", "2");
button42.innerText = "2";
row.append(button42);

let button43 = document.createElement("div");
button43.setAttribute("id", "button43");
button43.setAttribute("class", "input_button");
button43.setAttribute("data-value", "1");
button43.innerText = "1";
row.append(button43);

let button44 = document.createElement("div");
button44.setAttribute("id", "button44");
button44.setAttribute("class", "input_button op-col");
button44.setAttribute("data-value", "+");
button44.innerText = "+";
row.append(button44);

let button51 = document.createElement("div");
button51.setAttribute("id", "button51");
button51.setAttribute("class", "input_button double-col");
button51.setAttribute("data-value", "0");
button51.innerText = "0";
row.append(button51);

let button53 = document.createElement("div");
button53.setAttribute("id", "button53");
button53.setAttribute("class", "input_button");
button53.setAttribute("data-value", ".");
button53.innerText = ".";
row.append(button53);

let button54 = document.createElement("div");
button54.setAttribute("id", "button54");
button54.setAttribute("class", "input_button op-col");
button54.setAttribute("data-value", "=");
button54.innerText = "=";
row.append(button54);

let operand1 = 0;
let operand2 = null;
let operator = null;

function calculate() {
  operand2 = parseFloat(answer.getAttribute("data-value"));
  // let ans = eval(operand1+operator+operand2);
  // let ans = eval(answer.innerText);
  let ans = null;
  switch (operator) {
    case "+":
      ans = operand1 + operand2;
      break;

    case "-":
      ans = operand1 - operand2;
      break;

    case "*":
      ans = operand1 * operand2;
      break;

    case "%":
      if (operand2 === 0) {
        alert("Division By Zero Error");
      } else {
        ans = operand1 % operand2;
      }
      break;

    case "/":
      if (operand2 === 0) {
        alert("Division By Zero Error");
      } else {
        ans = operand1 / operand2;
      }
      break;

    default:
      break;
  }
  if (ans) {
    operator = null;
    answer.innerText = ans;
    answer.setAttribute("data-value", ans);
  }
}
document.addEventListener("click", function (event) {
  let ele = event.target.getAttribute("data-value");
  if (ele === "AC") {
    answer.innerText = "0";
    answer.setAttribute("data-value", "0");
  } else if (ele === "X") {
    let s = answer.innerText;
    if (s !== "0") {
      let n = s.length - 1;
      if (n === 0) {
        answer.innerText = "0";
        answer.setAttribute("data-value", "0");
      } else {
        answer.innerText = s.slice(0, -1);
        if (s[n] >= "0" && s[n] <= "9") {
          let val = answer.getAttribute("data-value");
          if (val !== "0") answer.setAttribute("data-value", val.slice(0, -1));
        }
      }
    }
  } else if (ele === "+") {
    if (operator == null) {
      operator = "+";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "-") {
    if (operator == null) {
      operator = "-";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "*") {
    if (operator == null) {
      operator = "*";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "%") {
    if (operator == null) {
      operator = "%";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "/") {
    if (operator == null) {
      operator = "/";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "=") {
    calculate();
  } else {
    // let s = answer.innerHTML;
    let s = answer.getAttribute("data-value");
    if (s === "0") {
      answer.innerText = ele;
      answer.setAttribute("data-value", ele);
    } else {
      answer.innerText += ele;
      let val = answer.getAttribute("data-value");
      answer.setAttribute("data-value", val + ele);
    }
  }
});
