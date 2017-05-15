/// Business ///
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var numbers  = "0123456789".split("");

/// User Interface ///
$(function() {
  $("textarea").keypress(function(event) {
    var inputChar = event.key.toLowerCase();
    var outputArr = [];

    //NOTE: Dry this into a single function?
    if (alphabet.indexOf(inputChar) !== -1) {
        outputArr.push(alphabet[(alphabet.indexOf(inputChar) + 25) % 26], alphabet[(alphabet.indexOf(inputChar) + 1) % 26]);
    }

    if (event.shiftKey) {
      outputArr = outputArr.map(function(letter) {
        return letter.toUpperCase();
      })
    }

    if (numbers.indexOf(inputChar) !== -1) {
        outputArr.push(numbers[(numbers.indexOf(inputChar) + 9) % 10], numbers[(numbers.indexOf(inputChar) + 1) % 10]);
    }

    if (outputArr.length > 0) {
      $("#output").append(
        "<div class='singleChar'>" +
        outputArr[0] + "<span class='shifted'>" + outputArr[1] + "</span>" +
        "</div>"
      );
    } else {
      $("#output").append(
        "<div class='singleChar'>" +
        event.key +
        "</div>")
    }
  });
});
