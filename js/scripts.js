/// Business ///
function Cipher () {
  this.alpha   = "abcdefghijklmnopqrstuvwxyz".split("");
  this.numbers = "0123456789".split("");
}

Cipher.prototype.encodeChar = function (char, shift) {
  var outputArr = [];
  if (this.alpha.indexOf(char) !== -1) {
    outputArr.push(this.alpha[(this.alpha.indexOf(char) + 25) % 26], this.alpha[(this.alpha.indexOf(char) + 1) % 26]);
  }
  if (shift) {
    outputArr = outputArr.map(function(letter) {
      return letter.toUpperCase();
    })
  }
  if (this.numbers.indexOf(char) !== -1) {
    outputArr.push(this.numbers[(this.numbers.indexOf(char) + 9) % 10], this.numbers[(this.numbers.indexOf(char) + 1) % 10]);
  }
  return outputArr;
};

var ourCipher = new Cipher();
/// User Interface ///
$(function() {
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
