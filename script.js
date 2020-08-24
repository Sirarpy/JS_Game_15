let div = document.querySelectorAll(".randNum");
let solve = document.getElementById("solve");
let reset = document.getElementById("reset");
div.forEach(function (key, value) {
  // click on each element
  key.onclick = function () {
    var container = document.getElementById("container");
    // find the current element coordinates
    var el_button =
      get_Rect(container).height - this.offsetTop - get_Rect(this).height;
    var el_right =
      get_Rect(container).width - this.offsetLeft - get_Rect(this).width;
    // find the empty current element coordinates
    var emp = empty_div(div);
    var empty_button =
      get_Rect(container).height - emp.offsetTop - get_Rect(emp).height;
    var empty_right =
      get_Rect(container).width - emp.offsetLeft - get_Rect(emp).width;
    // check if current element next to the empty element
    if (el_button === empty_button) {
      // if horizontal check
      if (el_right - empty_right === 50 || el_right - empty_right === -50) {
        // if true change values
        emp.innerHTML = key.innerHTML;
        key.innerHTML = "";
        if(emp.classList.contains("empty")){
          emp.classList.remove("empty");
          key.classList.add("empty")
        }
      }
    } else if (el_right === empty_right) {
      // if vertical check
      if (el_button - empty_button === 50 || el_button - empty_button === -50) {
        // if true change values
        emp.innerHTML = key.innerHTML;
        key.innerHTML = "";
        if(emp.classList.contains("empty")){
          emp.classList.remove("empty");
          key.classList.add("empty")
        }
      }
    }
    // call check_win() function if you win, game is over
    check_win();
  };
});

// for getting pos
function get_Rect(elem) {
  return elem.getBoundingClientRect();
}

// find empty div
function empty_div(param) {
  for (var i = 0; i < param.length; i++) {
    if (param[i].innerHTML === "") {
      return param[i];
    }
  }
}

//  check_win() function for show message when game is over
function check_win() {
  // put all element in array
  arr = [];
  for (var j = 0; j < div.length; j++) {
    var content = div[j].innerHTML;
    if (content !== "") {
      arr.push(content);
    }
  }
  // check sequence of elements
  if (
    arr.every(function (num, index) {
      return index === arr.length - 1 || Number(num) < arr[index + 1];
    })
  ) {
    // show win message
    alert("congratulations you win");
  } else {
    console.log("still gaming");
  }
}
// solve the game
solve.onclick = function () {
  // put all elements in array
  let s = [];
  for (let i = 0; i < div.length; i++) {
    var x = div[i].innerHTML;
    if (x !== "") {
      s.push(x);
    }
    // sort that elements
    s.sort(function (a, b) {
      return a - b;
    });
  }
  //   push one empty element for last div
  s.push("");
  //   put new sorted elements
  for (let i = 0; i < s.length; i++) {
    div[i].innerHTML = s[i];
  }
};

// start new game
reset.onclick = function () {
  // put all elements in array
  let newArr = [];
  for (let i = 0; i < div.length; i++) {
    let x = div[i].innerHTML;
    newArr.push(x);
    // shuffle for change values
    shuffle(newArr);
  }
  //   put  shuffled vales  into elements
  for (let i = 0; i < newArr.length; i++) {
    div[i].innerHTML = newArr[i];
  }
};

// shuffle function
function shuffle(elem) {
  var len = elem.length,
    temp,
    i;
  while (len > 0) {
    i = Math.floor(Math.random() * len);
    len--;
    temp = elem[len];
    elem[len] = elem[i];
    elem[i] = temp;
  }
  return elem;
}
