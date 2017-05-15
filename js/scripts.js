



$(document).ready(function(){
  $("#textBox").keyup(function(){
    var tB = $("#textBox").val();
    $("#textShow").text(tB);
  });
});
