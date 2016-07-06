function select(obj) {
    var children = obj.children;
    if(children[0].className=="active") {
        children[0].className="";
    } else {
        children[0].className="active";
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
    console.log(bottom >= $(window).height());
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