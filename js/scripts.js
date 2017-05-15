/// Business ///
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var numbers  = "1234567890".split("");

/// User Interface ///
$(function() {
    $("textarea").keyup(function() {
      var inputChar = $(this).val()[$(this).val().length - 1]
      var outputChar = alphabet[alphabet.indexOf(inputChar) - 1] + alphabet[alphabet.indexOf(inputChar) + 1];
      if (inputChar === "a") {
        outputChar = "zb";
      } else if (inputChar === "z") {
        outputChar = "ya";
      } else if (alphabet.indexOf(inputChar) === -1) {
        outputChar = inputChar + " ";
      }
      $("#output").append(
        "<div class='singleChar'>" +
        outputChar[0] + "<span class='shifted'>" + outputChar[1] + "</span>" +
        "</div>"
      );
    });
});
