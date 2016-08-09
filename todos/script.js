function del (obj) {
    var x = obj.parentElement;
    x.className = "item completed";
    x.style.transition = "0.5s";
    x.style.height = 0;
    x.style.padding = 0;
    x.style.opacity = 0;
    setTimeout(function (){
        for (var i = 0; i < x.length; i++) {
            if(x.element[i])
                obj.removeChild(x.element[i]);
        }
        x.parentElement.removeChild(x);
    }, 500);
    countItems();
}

$(function() {
    $("form").submit(function() { return false; });
});

function addItem (obj) {
    if (event.keyCode == 13) {
        var todo = obj.value;
        obj.value = "";
        var item = document.createElement("li");
        item.className = "item";
        var circle = document.createElement("div");
        circle.href = "#";
        circle.className = "circle";
        circle.setAttribute("onclick", "complete(this);");
        item.appendChild(circle);
        var text = document.createTextNode(todo);
        item.appendChild(text);
        var x = document.createElement("div");
        x.appendChild(document.createTextNode("X"));
        x.href = "#";
        x.className = "x";
        x.setAttribute("onclick", "del(this);");
        item.appendChild(x);
        document.getElementById("items").appendChild(item);
        countItems();
    }
}

function countItems() {
    var items = document.getElementById("items");
    var children = items.children;
    var count = 0;
    for(var i = 0; i < children.length; i++) {
        if(children[i].className=="item") {
            count++;
        }
    }
    
    var obj = document.getElementById("count");
    obj.textContent = count + " items left";
    if(children.length > count) {
        document.getElementById("clearCompleted").style.visibility = "visible";
    } else {
        document.getElementById("clearCompleted").style.visibility = "hidden";
    }
}

function complete(obj) {
    var x = obj.parentElement;
    if(x.className=="item completed") {
        x.className = "item";
        obj.innerHTML = '';
    } else {
        x.className = "item completed";
        obj.innerHTML = '<p>\u2713</p>';
    }
    countItems();
}

function select(obj) {
    var x = obj.parentElement;
    var children = x.children;
    for(var i = 0; i < children.length; i++) {
        if(children[i].className=="active") {
            children[i].className="";
        }
    }
    obj.className = "active";
    var title = obj.id;
    var items = document.getElementById("items");
    var iChildren = items.children;
    if(title=="all") {
        for(var i = 0; i < iChildren.length; i++) {
            iChildren[i].removeAttribute("style");
        }
    } else if(title=="activeItems") {
        for(var i = 0; i < iChildren.length; i++) {
            if(iChildren[i].className=="item")
                iChildren[i].removeAttribute("style");
            else {
                iChildren[i].style.height = 0;
                iChildren[i].style.padding = 0;
                iChildren[i].style.border = "none";
            }
        }
    } else if(title=="completeItems") {
        for(var i = 0; i < iChildren.length; i++) {
            if(iChildren[i].className=="item completed")
                iChildren[i].removeAttribute("style");
            else {
                iChildren[i].style.height = 0;
                iChildren[i].style.padding = 0;
                iChildren[i].style.border = "none";
            }
        }
    }
}


function clearCompleted() {
    var items = document.getElementById("items");
    var children = items.children;
    var toDelete = [];
    for(var i = 0; i < children.length; i++) {
        if(children[i].className=="item completed")
            toDelete.push(children[i]);
    }
    for(var i = 0; i < toDelete.length; i++) {
        del(toDelete[i].children[0]);
    }
}