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
  $("select").change(function() {
    ourCipher.cipherLength = parseInt($(this).val());
    console.log(ourCipher);
    //TODO: re-parse output div using new cipherLength.
  });

  $("textarea").keypress(function(event) {
    var encodedChar = ourCipher.encodeChar(event.key.toLowerCase(), event.shiftKey);
    console.log(encodedChar);

    if (encodedChar.length > 0) {
      $("#output").append(
        "<div class='singleChar'>" +
        encodedChar[0] + "<span class='shifted'>" + encodedChar[1] + "</span>" +
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
