function select(obj) {
    var parent = obj.parentElement;
    var children = parent.children[3].children;
    
    //Clear other active items
    var changed = false;
    var num = -1;
    for(var i = 0; i < children.length; i++) {
        if(parent.children[i]==obj)
            num = i;
        if(children[i].className=="active" && i != num) {
            children[i].className="";
            changed = true;
        }
    }
    
    if(changed) {
        setTimeout(function () {
            if(children[num].className=="active") {
                children[num].className="";
            } else {
                children[num].className="active";
            }
        }, 700);
    } else {
        console.log(children[num]);
        if(children[num].className=="active") {
            children[num].className="";
        } else {
            children[num].className="active";
        }
    }
}

window.onload = function () {
    $("#body").css('position', 'absolute');
}

$(document).bind('mousewheel', function(e){
  var delta = e.wheelDelta;
  var inc = 50;
  var topOfPage = 75;
  if(delta < 0){
    var bottom = $("#body").position().top + $("#body").height();
    var top = $("#body").position().top;
    if(bottom >= $(window).height()) {
        $("#body").css('top', (top-inc) + "px");
    }
  }
  else{
    var top = $("#body").position().top;
    if(top <= topOfPage) {
        $("#body").css('top', (top+inc) + "px");
    }
  }
});