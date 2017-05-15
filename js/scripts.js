/// Business ///
//NOTE: add handling for capitals.
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
//NOTE: add handling for 0, 1.
var numbers  = "0123456789".split("");

/// User Interface ///
$(function() {
  $("textarea").keypress(function(event) {
    var inputChar = event.key.toLowerCase();
    var outputArr = [];

    //NOTE: Dry this into a single function?
    if (alphabet.indexOf(inputChar) !== -1) {
      if (inputChar === "a") {
        outputArr.push("z","b");
      } else if (inputChar === "z") {
        outputArr.push("y","a");
      } else {
        outputArr.push(alphabet[alphabet.indexOf(inputChar) - 1], alphabet[alphabet.indexOf(inputChar) + 1]);
      }
    }

    if (event.shiftKey) {
      outputArr = outputArr.map(function(letter) {
        return letter.toUpperCase();
      })
    }

    if (numbers.indexOf(inputChar) !== -1) {
      if (inputChar === "0") {
        outputArr.push("9", "1");
      } else if (inputChar === "9") {
        outputArr.push("8", "0");
      } else {
        outputArr.push(numbers[numbers.indexOf(inputChar) - 1], numbers[numbers.indexOf(inputChar) + 1]);
      }
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
}
