let numInpGroups = document.getElementById("numInpGroups");
let numOutGroups = document.getElementById("numOutGroups");
let form1 = document.querySelector(" body > form:first-child");
let form2 = document.querySelector("body > form:nth-child(2)");
let forms = document.querySelector("body > div");
let lists = document.querySelector("body > div:last-of-type");
let groups = [];
let outputGroups = [];
let groupsLengthInp = [];

form1.onsubmit = function (e) {
  e.preventDefault();
  if (
    numInpGroups.value == "" ||
    numOutGroups.value == "" ||
    numInpGroups.value < 1 ||
    numOutGroups.value < 1
  ) {
    return 0;
  }
  for (let i = 0; i < numOutGroups.value; i++) {
    outputGroups.push([]);
  }
  console.log(outputGroups);
  form1.classList.add("d-none");
  form1.classList.remove("d-flex");
  for (let i = 0; i < numInpGroups.value; i++) {
    groups.push([]);
    let label = document.createElement("label");
    label.textContent = `Enter The Length Of Group Number ${i + 1}`;
    form2.appendChild(label);
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    groupsLengthInp.push(input);
    form2.appendChild(input);
  }
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "submit");
  form2.appendChild(submit);
  form2.classList.add("d-flex");
  form2.classList.remove("d-none");
};

form2.onsubmit = function (e) {
  e.preventDefault();
  for (let i = 0; i < form2.children.length; i++) {
    if (form2.children[i].value == "" || form2.children[i].value < 1) {
      return 0;
    }
  }
  form1.classList.add("d-none");
  form2.classList.add("d-none");
  form1.classList.remove("d-flex");
  form2.classList.remove("d-flex");
  for (let i = 0; i < numInpGroups.value; i++) {
    let heading = document.createElement("h2");
    heading.textContent = `Group ${i + 1}`;
    heading.style.margin = "auto";
    heading.style.color = "white";
    heading.style.backgroundColor = "black";
    heading.style.width = "fit-content";
    forms.appendChild(heading);
    let form = document.createElement("form");
    form.classList.add("d-flex", "direction-column", "gap-10", "p-10");
    for (let j = 0; j < groupsLengthInp[i].value; j++) {
      let label = document.createElement("label");
      label.textContent = `Enter The Value Of Element Number ${
        j + 1
      } At Group Number ${i + 1}`;
      form.appendChild(label);
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      form.style.border = "white 2px solid";
      form.appendChild(input);
    }
    forms.appendChild(form);
  }
  let submit = document.createElement("div");
  submit.style.border = "white 2px solid";
  submit.style.color = "white";
  submit.style.backgroundColor = "black";
  submit.style.width = "75%";
  submit.style.padding = "10px";
  submit.style.margin = "10px auto 0";
  submit.classList.add("d-flex", "align-center", "justify-center", "pointer");
  submit.textContent = "Make The Draw";
  submit.setAttribute("onclick", "submitGroups()");
  forms.appendChild(submit);
};

let ind = 0;

function restart() {
  window.location.reload();
}
function submitGroups() {
  let div = document.querySelector("body > div");
  let theForms = document.querySelectorAll("body > div form");
  for (let i = 0; i < theForms.length; i++) {
    for (let j = 0; j < theForms[i].children.length; j++) {
      if (theForms[i].children[j].hasAttributes()) {
        groups[i].push(theForms[i].children[j].value);
      }
    }
  }
  lists.innerHTML = `<h1 class="text-center p-10 mb-20">Here Is Our Random Draw</h1>`;
  for (let i = 0; i < outputGroups.length; i++) {
    outputGroups[i] = [];
  }
  div.style.display = "none";
  lists.classList.remove("d-none");
  lists.classList.add("d-flex");
  console.log(groups);
  let randomArray;
  for (let i = 0; i < groups.length; i++) {
    randomArray = [];
    let lenth = groups[i].length;
    for (let j = 0; j < lenth; j++) {
      let random = parseInt(Math.random() * groups[i].length);
      randomArray.push(groups[i][random]);
      groups[i].splice(random, 1);
    }
    let x = true;
    while (x) {
      outputGroups[ind].push(randomArray[0]);
      randomArray.splice(0, 1);
      if (randomArray.length == 0) {
        x = false;
        if (ind == outputGroups.length - 1) {
          ind = 0;
        } else if (ind < outputGroups.length - 1) {
          ind++;
        }
      } else if (ind == outputGroups.length - 1 && randomArray.length != 0) {
        ind = 0;
      } else {
        ind++;
      }
    }
  }
  console.log(outputGroups);
  for (let i = 0; i < outputGroups.length; i++) {
    let heading = document.createElement("h2");
    heading.textContent = `Group ${i + 1}`;
    heading.style.margin = "auto";
    heading.style.color = "white";
    heading.style.backgroundColor = "black";
    heading.style.width = "fit-content";
    lists.appendChild(heading);
    let list = document.createElement("ul");
    list.classList.add("non-styled-list", "d-flex", "direction-column");
    list.style.border = "white 2px solid";
    for (let j = 0; j < outputGroups[i].length; j++) {
      let li = document.createElement("li");
      li.style.color = "white";
      li.style.backgroundColor = "black";
      li.style.padding = "5px";
      li.style.borderTop = "1px grey solid";
      li.style.borderBottom = "1px grey solid";
      li.textContent = outputGroups[i][j];
      list.appendChild(li);
    }
    lists.appendChild(list);
  }
  let btnGroup = document.createElement("div");
  btnGroup.classList.add("d-flex", "align-center", "justify-around", "pointer");
  btnGroup.style.margin = "10px auto 0";
  btnGroup.style.width = "75%";
  let restartBTN = document.createElement("div");
  restartBTN.style.border = "white 2px solid";
  restartBTN.style.color = "white";
  restartBTN.style.backgroundColor = "black";
  restartBTN.style.padding = "10px";
  restartBTN.style.margin = "10px auto 0";
  restartBTN.textContent = "Restart The Draw";
  restartBTN.classList.add(
    "d-flex",
    "align-center",
    "justify-center",
    "pointer"
  );
  restartBTN.setAttribute("onclick", "restart()");
  let resetBTN = document.createElement("div");
  resetBTN.style.border = "white 2px solid";
  resetBTN.style.color = "white";
  resetBTN.style.backgroundColor = "black";
  resetBTN.style.padding = "10px";
  resetBTN.style.margin = "10px auto 0";
  resetBTN.classList.add("d-flex", "align-center", "justify-center", "pointer");
  resetBTN.textContent = "Reset The Draw";
  resetBTN.setAttribute("onclick", "submitGroups()");
  btnGroup.appendChild(restartBTN);
  btnGroup.appendChild(resetBTN);
  lists.appendChild(btnGroup);
}
