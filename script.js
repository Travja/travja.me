function select(obj) {
    var parent = obj.parentElement.parentElement;
    var children = parent.parentElement.children;
    
    //Clear other active items
    var changed = false;
    for(var i = 0; i < children.length; i++) {
        if(children[i].className=="info active" && children[i]!==parent) {
            children[i].className="info";
            changed = true;
        }
    }
    
    if(changed) {
        setTimeout(function () {
            if(parent.className=="info active") {
                parent.className="info";
            } else {
                parent.className="info active";
            }
        }, 700);
    } else {
        if(parent.className=="info active") {
            parent.className="info";
        } else {
            parent.className="info active";
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