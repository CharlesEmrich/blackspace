/// Business ///
function Cipher () {
  this.alpha        = "abcdefghijklmnopqrstuvwxyz".split("");
  this.numbers      = "0123456789".split("");
  this.cipherLength = 1;
  this.encodedArr   = [];
}

Cipher.prototype.encodeString = function (string, lastKey) {
  var outputArr = [];
  if (lastKey!== "Enter") {
    string += lastKey;
  }
  for (var i = 0; i < string.length; i++) {
    var charArr = []
    //Handles lowercase letters:
    if (this.alpha.indexOf(string[i]) !== -1) {
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push(this.alpha[(this.alpha.indexOf(string[i]) + ii) % 26]);
        charArr.unshift(this.alpha[(this.alpha.indexOf(string[i]) + 26 - ii) % 26]);
      }
    }
    //Handles capital letters:
    if (this.alpha.map(function(e){ return e.toUpperCase() }).indexOf(string[i]) !== -1) {
      var lci = string[i].toLowerCase();
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push(this.alpha[(this.alpha.indexOf(lci) + ii) % 26]);
        charArr.unshift(this.alpha[(this.alpha.indexOf(lci) + 26 - ii) % 26]);
      }
      charArr = charArr.map(function(letter) {
        return letter.toUpperCase();
      });
    }
    //Handles numbers:
    if (this.numbers.indexOf(string[i]) !== -1) {
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push(this.numbers[(this.numbers.indexOf(string[i]) + ii) % 10]);
        charArr.unshift(this.numbers[(this.numbers.indexOf(string[i]) + 10 - ii) % 10]);
      }
    }
    if(lastKey === "Enter") {
      //TODO: incorporate line breaks into the outputArr.
    }
    //Handles punctuation:
    if (this.numbers.indexOf(string[i]) === -1
     && this.alpha.indexOf(string[i]) === -1
     && this.alpha.map(function(e){ return e.toUpperCase() }).indexOf(string[i]) === -1) {
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push(string[i], string[i]);
      }
    }
    outputArr.push(charArr);
  }
  return outputArr;
};

var ourCipher = new Cipher();
/// User Interface ///
$(function() {
  Cipher.prototype.displayCipherText = function (array) {
    $(".layer").empty();
    //This loops over the array of replacement letter arrays. ex. b => [a,c]
    for (var i = 0; i < array.length; i++) {
      //loops over each individual replacement letter array.
      for (var ii = 0; ii < array[i].length; ii++) {
        // if (this.alpha.indexOf(array[i][ii]) !== -1 || this.numbers.indexOf(array[i][ii]) !== -1) {
          $("#layer" + ii).text($("#layer" + ii).text() + array[i][ii]);
          // $("#layer" + ii).append(array[i][ii]);
          $(".layer").css("opacity", 1 / (1 + this.cipherLength));
        // }
      }
    }
  };

  $("#textBox").keydown(function(event) {
    if (event.key === "Backspace") {
      ourCipher.encodedArr.pop();
    }
    if (event.key === "ArrowUp" && $("#textBox").val() !== "") {
      ourCipher.cipherLength ++;
      ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), "");
    }
    console.log($("#textBox").val());
    if (event.key === "ArrowDown" && $("#textBox").val() !== "" && ourCipher.cipherLength > 1) {
      ourCipher.cipherLength --;
      ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), "");
    }
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });

  $("#textBox").keypress(function(event) {
    ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), event.key);
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });
});
