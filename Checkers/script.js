window.onload = function () {
    var boxes = document.getElementsByClassName("box");
    for(var i = 0; i < boxes.length; i++) {
        boxes[i].setAttribute("onclick", "move(this)");
    }
}

var turn = "red";

var active = null;
var previousClass = null;
function update() {
    document.getElementById("start").style.visibility = "hidden";
    var delay = 50;
    for(var i = 0; i < 12; i++) {
        var derp = function(b) {
            setTimeout(function() {popB(b);}, i*delay);
        }
        derp(i);
    }
    
    for(var i = 0; i < 12; i++) {
        var derp = function(b) {
            setTimeout(function() {popR(b);}, 12*delay+i*delay);
        }
        derp(i);
    }
    document.getElementById("turn").innerHTML = "<div class=\"" + turn + "Checker\"></div>";
}

function popB(num) {
    var black = document.getElementsByClassName("black");
    black[num].innerHTML = "<div class=\"blackChecker\" onclick=\"select(this)\"></div>";
}
function popR(num) {
    var red = document.getElementsByClassName("red");
    red[num].innerHTML = "<div class=\"redChecker\" onclick=\"select(this)\"></div>";
}

function select(obj) {
    if(!jumped) {
        setTimeout(function () {
            if((obj.className == "blackChecker" && turn == "black") || (obj.className == "redChecker" && turn == "red")) {
                if(active != null) {
                    active.className = previousClass;
                }
                previousClass = obj.className;
                active = obj;
                obj.className = obj.className + " active";
            }
        }, 2);
    }
}

var jumped = false;

function move(obj) {
    if(active != null) {
        if($(obj).css("background-color") == "rgba(0, 0, 0, 0.6)" && obj.children.length == 0) {
            if(canMove(obj, active)) {
                
                if(active.className == "blackChecker active" && parseInt(obj.parentElement.className.substring(3, 4)) == 8)
                    active.setAttribute("king", "true");
                
                if(active.className == "redChecker active" && parseInt(obj.parentElement.className.substring(3, 4)) == 1)
                    active.setAttribute("king", "true");
                
                obj.appendChild(active);
                var jump = canJump();
                
                
                if(jump && jumped) {
                    document.getElementById("cancel").style.visibility = "visible";
                }
                
                if(!jumped || (!jump && jumped)) {
                    active.className = previousClass;
                    active = null;
                    turn = turn == "red" ? "black" : "red";
                    
                    document.getElementById("turn").innerHTML = "<div class=\"" + turn + "Checker\"></div>";
                    jumped = false;
                    document.getElementById("cancel").style.visibility = "hidden";
                    checkWin();
                }
                
                    
            }
        }
    }
}

function canMove(obj, active) {
    var dest = parseInt(obj.parentElement.className.substring(3, 4));
    var origin = parseInt(active.parentElement.parentElement.className.substring(3, 4));
    var move = parseInt(obj.className.substring(4, 5)) - parseInt(active.parentElement.className.substring(4, 5));
    if(!jumped && (move == 1 || move == -1))
        return (active.getAttribute("king") == "true" && (dest == +origin+1 || dest == +origin-1))
        ||
        (active.className == "blackChecker active" && dest == +origin+1) ||
        (active.className == "redChecker active" && dest == +origin-1);
    else {
        if((active.className == "redChecker active" && ((active.getAttribute("king") == "true" && +dest-+origin == 2) || +dest-+origin == -2) && (move == 2 || move == -2)
        && $(".row" + (+origin+(+dest-+origin)/2))[0].children[parseInt(active.parentElement.className.substring(4, 5))+ +move/2 -1].children[0].className == "blackChecker") ||
        (active.className == "blackChecker active" && (+dest-+origin == 2 || (active.getAttribute("king") == "true" && +dest-+origin == -2)) && (move == 2 || move == -2)
        && $(".row" + (+origin+(+dest-+origin)/2))[0].children[parseInt(active.parentElement.className.substring(4, 5))+ +move/2 -1].children[0].className == "redChecker")) {
            jumped = true;
            $(".row" + (+origin+(+dest-+origin)/2))[0].children[parseInt(active.parentElement.className.substring(4, 5))+ +move/2 -1].removeChild($(".row" + (+origin+(+dest-+origin)/2))[0].children[parseInt(active.parentElement.className.substring(4, 5))+ +move/2 -1].children[0]);
            return true;
        }
    }
    return false;
}



function checkWin() {
    var board = document.getElementById('board');
    var red = board.getElementsByClassName('redChecker');
    var black = board.getElementsByClassName('blackChecker');
    if(red.length == 0) {
        document.getElementById("blackWin").style.visibility = "visible";
    } else if(black.length == 0) {
        document.getElementById("redWin").style.visibility = "visible";
    }
}

function canJump() {
 
    var canJump = false;
    
    var posX = parseInt(active.parentElement.className.substring(4, 5));
    var posY = parseInt(active.parentElement.parentElement.className.substring(3, 4));
    
    var checker = active.className.split(" ")[0];
 
    if(active.getAttribute("king") == "true") {
        //check all sides
        if(getObjectAt(+posX+1, +posY+1) != false && (getObjectAt(+posX+1, +posY+1).className == "redChecker" && checker == "blackChecker") || (getObjectAt(+posX+1, +posY+1).className == "blackChecker" && checker == "redChecker")) {
            if(getObjectAt(+posX+2, +posY+2) == false)
                canJump = true;
        }
        if(getObjectAt(+posX+1, +posY-1) != false && (getObjectAt(+posX+1, +posY-1).className == "redChecker" && checker == "blackChecker") || (getObjectAt(+posX+1, +posY-1).className == "blackChecker" && checker == "redChecker")) {
            if(getObjectAt(+posX+2, +posY-2) == false)
                canJump = true;
        }
        if(getObjectAt(+posX-1, +posY-1) != false && (getObjectAt(+posX-1, +posY-1).className == "redChecker" && checker == "blackChecker") || (getObjectAt(+posX-1, +posY-1).className == "blackChecker" && checker == "redChecker")) {
            if(getObjectAt(+posX-2, +posY-2) == false)
                canJump = true;
        }
        if(getObjectAt(+posX-1, +posY+1) != false && (getObjectAt(+posX-1, +posY+1).className == "redChecker" && checker == "blackChecker") || (getObjectAt(+posX-1, +posY+1).className == "blackChecker" && checker == "redChecker")) {
            if(getObjectAt(+posX-2, +posY+2) == false)
                canJump = true;
        }
        
    }
    
    
    if(getObjectAt(+posX+1, +posY+1) != false && getObjectAt(+posX+1, +posY+1).className == "redChecker" && checker == "blackChecker") {
        if(getObjectAt(+posX+2, +posY+2) == false) {
            canJump = true;
        }
    }
    if(getObjectAt(+posX+1, +posY-1) != false && getObjectAt(+posX+1, +posY-1).className == "blackChecker" && checker == "redChecker") {
        if(getObjectAt(+posX+2, +posY-2) == false) {
            canJump = true;
        }
    }
    if(getObjectAt(+posX-1, +posY-1) != false && getObjectAt(+posX-1, +posY-1).className == "blackChecker" && checker == "redChecker") {
        if(getObjectAt(+posX-2, +posY-2) == false) {
            canJump = true;
        }
    }
    if(getObjectAt(+posX-1, +posY+1) != false && getObjectAt(+posX-1, +posY+1).className == "redChecker" && checker == "blackChecker") {
        if(getObjectAt(+posX-2, +posY+2) == false) {
            canJump = true;
        }
    }
 
    return canJump;
}


function getObjectAt(x, y) {
    if(y > 8 || y < 1 || x > 8 || x < 1)
        return "OOB";
    if($(".row" + y)[0] != null && $(".row" + y)[0].children[+x-1] != null && $(".row" + y)[0].children[+x-1].children[0] != null)
        return $(".row" + y)[0].children[+x-1].children[0];
    return false;
}

function cancelDouble() {
    
    active.className = previousClass;
    active = null;
    turn = turn == "red" ? "black" : "red";
    
    document.getElementById("turn").innerHTML = "<div class=\"" + turn + "Checker\"></div>";
    jumped = false;
    checkWin();
    
    document.getElementById("cancel").style.visibility = "hidden";
}