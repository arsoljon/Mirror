let w = 450;
let h = 300;
//ground
let groundY1 = h-(h/4);
let groundY2 = h/4;

function ground() {
    //ground should be 1/4th the size of screen
    push();
    fill('#ab7b66');
    rect(0, groundY1, w,groundY2);
    pop();
  }