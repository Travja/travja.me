function select(obj) {
    var parent = obj.parentElement;
    var children = parent.children[4].children;
    
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
    $("#body").css('top', '75px');
}

/*$(document).bind('mousewheel', function(e){
  var delta = e.wheelDelta;
  var inc = 85;
  var topOfPage = 75;
  if(delta < 0){
    var bottom = $("#body").position().top + $("#body").height();
    var top = $("#body").position().top;
    if(bottom >= $(window).height()+20) {
        if(bottom-inc < $(window).height()+20) {
            $("#body").css('top', top-(bottom-$(window).height()+20) + "px");
        } else
            $("#body").css('top', (top-inc) + "px");
    }
  }
  else{
    var top = $("#body").position().top;
    if(top <= topOfPage) {
        if(top+inc > topOfPage)
            $("#body").css('top', topOfPage + "px");
        else
            $("#body").css('top', (top+inc) + "px");
    }
  }
});*/