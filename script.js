let div = document.querySelectorAll(".randNum");
let solve = document.getElementById("solve");
let reset = document.getElementById("reset");

for (let i = 0; i < div.length; i++) {
  // click on each element
  div[i].onclick = function () {
    let cont = document.getElementById("container");
    const rectBottom = cont.getBoundingClientRect();
    const rectRight = cont.getBoundingClientRect();

    // find the position of current element
    var l = this.offsetLeft;
    var t = this.offsetTop;
    var b = rectBottom.height - t - this.getBoundingClientRect().height;
    var r = rectRight.width - l - this.getBoundingClientRect().width;

    // find the siblings position of current element

    for (let j = 0; j < div.length; j++) {
      var lSub = div[j].offsetLeft;
      var tSub = div[j].offsetTop;
      var bSub =
        rectBottom.height - tSub - div[j].getBoundingClientRect().height;
      var rSub = rectRight.width - lSub - div[j].getBoundingClientRect().width;
      if (
        (l - 50 === lSub && t === tSub) ||
        (t - 50 === tSub && l === lSub) ||
        (b - 50 === bSub && l === lSub) ||
        (r - 50 === rSub && t == tSub)
      ) {
        if (div[j].innerHTML === "") {
          // replace empty element value with current number
          div[j].innerHTML = this.innerHTML;
          this.innerHTML = "";

          // game over
          var arr = [];
          for (let i = 0; i < div.length; i++) {
            arr.push(Number(div[i].innerHTML));
          }

          arr.pop();
          if (
            arr.every(function (num, index) {
              return index === arr.length - 1 || num < arr[index + 1];
            })
          ) {
            alert("congratulations you win");
          }
        }
      }
    }
  };
}

// solve the game
solve.onclick = function () {
  let s = [];

  for (let i = 0; i < div.length; i++) {
    let x = div[i].innerHTML;
    s.push(x);
    s.sort(function (a, b) {
      return a - b;
    });
  }
  for (let i = 0; i < s.length; i++) {
    div[i].innerHTML = s[i + 1];
    if (!s[i + 1]) {
      div[i].innerHTML = "";
    }
  }
};

// reset values
reset.onclick = function () {
  let s = [];

  for (let i = 0; i < div.length; i++) {
    let x = div[i].innerHTML;
    s.push(x);
    shuffle(s);
  }

  for (let i = 0; i < s.length; i++) {
    div[i].innerHTML = s[i];
  }
};

// shuffle function
function shuffle(s) {
  var len = s.length,
    temp,
    index;
  // While there are elements in the array
  while (len > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * len);
    // Decrease ctr by 1
    len--;
    // And swap the last element with it
    temp = s[len];
    s[len] = s[index];
    s[index] = temp;
  }
  return s;
}
