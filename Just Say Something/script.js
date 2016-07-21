window.onload=function() {
    setTimeout(function (){
        run();
    }, 9);
};

var speed = [[],[]];

function run() {
    var objects = document.getElementsByClassName("word");
    for (var c = 0; c < objects.length; c++) {
        var obj =  objects[c];
        if(obj != null && obj && obj.style) {
            if(obj.style.top) {
                obj.style.top = (parseFloat(obj.style.top.substring(0, obj.style.top.length-2))+parseFloat(obj.getAttribute("speed"))) + "px";
                if(parseInt(obj.style.top.substring(0, obj.style.top.length-2)) > window.innerHeight+100) {
                    speed[obj.value] = null;
                    obj.parentElement.removeChild(obj);
                    objects[c] = null;
                }
            } else {
                obj.style.top = "-200px";
            }
        }
    }
    setTimeout(function () {
        run();
    }, 9);
}


document.getElementById('input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
        var node = document.createElement("div");
        var text = document.createTextNode(document.getElementById('input').value);
        node.appendChild(text);
        node.className = "word";
        document.getElementById('input').value = "";
        node.style.left = (Math.random() * window.innerWidth - 50) + "px";
        node.setAttribute("speed", Math.ceil(Math.random()*8)/3);
        document.getElementsByTagName("body")[0].appendChild(node);
        return false;
    }
}