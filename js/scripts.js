/// Business ///
function Cipher () {
  this.alpha        = "abcdefghijklmnopqrstuvwxyz".split("");
  this.numbers      = "0123456789".split("");
  this.cipherLength = 1;
}

Cipher.prototype.encodeChar = function (char, shift) {
  var outputArr = [];
  if (this.alpha.indexOf(char) !== -1) {
    for (var i = 1; i <= this.cipherLength; i++) {
      outputArr.push(this.alpha[(this.alpha.indexOf(char) + i) % 26]);
      outputArr.unshift(this.alpha[(this.alpha.indexOf(char) + 26 - i) % 26]);
    }
  }
  if (shift) {
    outputArr = outputArr.map(function(letter) {
      return letter.toUpperCase();
    })
  }
  if (this.numbers.indexOf(char) !== -1) {
    for (var i = 1; i <= this.cipherLength; i++) {
      outputArr.push(this.numbers[(this.numbers.indexOf(char) + i) % 10]);
      outputArr.unshift(this.numbers[(this.numbers.indexOf(char) + 10 - i) % 10]);
    }
  }
  return outputArr;
};

var ourCipher = new Cipher();
/// User Interface ///
$(function() {
  Cipher.prototype.displayCipherText = function (array) {
    $("#output").empty();
    var printThis = "";
    for (var i = 0; i < array.length; i++) {
      printThis = "";
      for (var ii = 0; ii < array[i].length; ii++) {
        if (this.alpha.indexOf(array[i][ii]) !== -1 || this.numbers.indexOf(array[i][ii]) !== -1) {
          printThis += array[i][ii];
        }
      }
      $("#output").append("<div class='singleChar'>" + printThis + "</div>");
    }
  };

  $("select").change(function() {
    ourCipher.cipherLength = parseInt($(this).val());
    ourCipher.displayCipherText(userString);
  });

  var userString = []
  $("textarea").keypress(function(event) {
    var encodedArr = ourCipher.encodeChar(event.key.toLowerCase(), event.shiftKey);
    userString.push(encodedArr);
    console.log(userString);
    ourCipher.displayCipherText(userString);

    // if (encodedChar.length > 0) {
    //   $("#output").append(
    //     "<div class='singleChar'>" +
    //     encodedChar[0] + "<span class='shifted'>" + encodedChar[1] + "</span>" +
    //     "</div>"
    //   );
    // } else {
    //   $("#output").append(
    //     "<div class='singleChar'>" +
    //     event.key +
    //     "</div>")
    // }
  });
});
