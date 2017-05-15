
$(function() {
    $("textarea").keyup(function() {
      $("#output").text($(this).val()[$(this).val().length - 1]);
    });
});
