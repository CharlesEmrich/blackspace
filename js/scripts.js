/// Business ///
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

/// User Interface ///
$(function() {
    $("textarea").keyup(function() {
      var outputChar = $(this).val()[$(this).val().length - 1]
      $("#output").text(outputChar);

    });
});
