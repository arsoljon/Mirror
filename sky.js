let w = 450;
let h = 300;
//sky
let skyY2 = h-(h/4);
const sizediff = 5;

function sky() {
    //sky should be 3/4th the size of screen
    push();
    fill('#6daebe');
    rect(0, 0, w,skyY2);
    pop();
  }
  