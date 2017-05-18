/// Business ///
function Cipher () {
  this.alpha        = "abcdefghijklmnopqrstuvwxyz".split("");
  this.numbers      = "0123456789".split("");
  this.currentFont  = 0;
  this.fonts        = ['cutive-mono','anonymous-pro','droid-sans','fira','nova','roboto','space-mono','ubuntu','vt323'];
  this.cipherLength = 1;
  this.encodedArr   = [];
}

Cipher.prototype.encodeString = function (string, lastKey) {
  var outputArr = [];
  if (lastKey!== "Enter") {
    string += lastKey;
  } else if (lastKey === "Enter") {
    string += "\n";
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
    //Handles newlines:
    if(string[i] === "\n") {
      for (var ii = 1; ii <= this.cipherLength; ii++) {
        charArr.push("<br>","<br>");
      }
    //Handles punctuation:
    } else if (this.numbers.indexOf(string[i]) === -1
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
  autosize($("#textBox"));
  Cipher.prototype.displayCipherText = function (array) {
    $(".layer").empty();
    //This loops over the array of replacement letter arrays. ex. b => [a,c]
    for (var i = 0; i < array.length; i++) {
      //loops over each individual replacement letter array.
      for (var ii = 0; ii < array[i].length; ii++) {
        if (array[i][ii] === "<br>") {
          $("#layer" + ii).append(array[i][ii]);
        } else {
          $("#layer" + ii).append(array[i][ii]);
          $(".layer").css("opacity", 1 / (1 + this.cipherLength));
        }
      }
    }
  };

  Cipher.prototype.changeFont = function (direction) {
    $(".font-control").removeClass(ourCipher.fonts[ourCipher.currentFont]);
    if (direction === "+") {
      ourCipher.currentFont ++;
      if (ourCipher.currentFont > ourCipher.fonts.length - 1) {
        ourCipher.currentFont = 0;
      }
    }
    if (direction === "-") {
      ourCipher.currentFont --;
      if (ourCipher.currentFont < 0) {
        ourCipher.currentFont = ourCipher.fonts.length - 1;
      }
    }
    $(".font-control").addClass(ourCipher.fonts[ourCipher.currentFont]);
  };

  $("body").keydown(function() {
    if (event.key === "ArrowUp" && $("#textBox").val() !== "" && ourCipher.cipherLength < 12 && event.metaKey) {
      ourCipher.cipherLength ++;
      $("#layers").addClass("bright");
      setTimeout(function() { $("#layers").removeClass("bright"); }, 250);
      ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), "");
    }
    if (event.key === "ArrowDown" && $("#textBox").val() !== "" && ourCipher.cipherLength > 1 && event.metaKey) {
      ourCipher.cipherLength --;
      $("#layers").addClass("bright");
      setTimeout(function() { $("#layers").removeClass("bright"); }, 250);
      ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), "");
    }
    if (event.key === "ArrowRight" && event.metaKey) {
      ourCipher.changeFont("+");
    }
    if (event.key === "ArrowLeft" && event.metaKey) {
      ourCipher.changeFont("-");
    }
    if (event.key === "0" && event.metaKey) {
      $("#layers").css("height", $("#layer0").height());
      $("#layers").css("width", "calc(10px + " + $("#layer0").width() + "px)");
      html2canvas($("#layers"), {
          background: '#000000',
          logging: true,
          }
        ).then(function(canvas) {
          Canvas2Image.saveAsPNG(canvas);
        });
    }
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });

  $("#textBox").keydown(function(event) {
    if (event.key === "Backspace") {
      ourCipher.encodedArr.pop();
    }
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });

  $("#textBox").keypress(function(event) {
    ourCipher.encodedArr = ourCipher.encodeString($("#textBox").val(), event.key);
    ourCipher.displayCipherText(ourCipher.encodedArr);
  });
});
