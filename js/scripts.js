/// Business ///
function Cipher () {
  this.alpha        = "abcdefghijklmnopqrstuvwxyz".split("");
  this.numbers      = "0123456789".split("");
  this.cipherLength = 1;
  this.encodedArr   = [];
}

Cipher.prototype.encodeString = function (string, shift) {
  var outputArr = [];
  for (var i = 0; i < string.length; i++) {
    var charArr = []
    if (this.alpha.indexOf(string[i]) !== -1) {
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push(this.alpha[(this.alpha.indexOf(string[i]) + ii) % 26]);
        charArr.unshift(this.alpha[(this.alpha.indexOf(string[i]) + 26 - ii) % 26]);
      }
    }
    if (shift) {
      charArr = charArr.map(function(letter) {
        return letter.toUpperCase();
      });
    }
    if (this.numbers.indexOf(string[i]) !== -1) {
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push(this.numbers[(this.numbers.indexOf(string[i]) + ii) % 10]);
        charArr.unshift(this.numbers[(this.numbers.indexOf(string[i]) + 10 - ii) % 10]);
      }
    }
    if (this.numbers.indexOf(string[i]) === -1 && this.alpha.indexOf(string[i]) === -1) {
      for (var ii = 0; ii <= this.cipherLength + 1; ii++) {
        //NOTE: Currently there's an unaddressed issue with spaces disappearing when we fire run this.
        charArr.push(string[i]);
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
          $("#layer" + ii).append(array[i][ii]);
          $(".layer").css("opacity", 1 / (1.1 + this.cipherLength));
        // }
      }
    }
  };
  Cipher.prototype.doStuffToString = function(userstringConfig, shiftKeyValue) {
    //TODO: Use this to DRY out change and keypress handlers?
  }

  $("select").change(function(event) {
    //TODO:currently, each layer added creates one correct layer and one layer that is missing a space.
    ourCipher.cipherLength = parseInt($(this).val());
    ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), false);
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });

  $("#textBox").keypress(function(event) {
    ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val() + event.key.toLowerCase(), event.shiftKey);
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });
});
