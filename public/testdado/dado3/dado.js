window.onload = function () {
  var debug = false;
  var element = document.getElementById("interativo");
  var element = document.getElementById("interativo1");

  var dice = {
    position0: { y: 0, rotateX: 0, rotateY: 0 },
    position1: { y: 600, rotateX: -900, rotateY: -180 },
    position2: { y: 600, rotateX: -1080, rotateY: -180 },
    position3: { y: 600, rotateX: -1080, rotateY: -90 },
    position4: { y: 600, rotateX: -990, rotateY: -270 },
    position5: { y: 600, rotateX: -810, rotateY: -90 },
    position6: { y: 600, rotateX: -1080, rotateY: -270 },


    roll: function (callback) {
      var number = Math.floor((Math.random() * 6) + 1);
      if (debug && callback) {
        callback(prompt('Valor do dado') * 1);
        //return;
      }

      //Verifica se o dado existe
      if (!dice.element) {
        //Adiciona dado ao tabuleiro
        dice.element = document.createElement('div');
        dice.element.id = 'dice';
        dice.element.innerHTML = '' +
          '<div class="face front"></div>' +
          '<div class="face back"></div>' +
          '<div class="face left"></div>' +
          '<div class="face bottom"></div>' +
          '<div class="face top"></div>' +
          '<div class="face right"></div>';
        element.appendChild(dice.element);
      }
      dice.reset();

      $(dice.element).transition(dice['position' + number], 1300, 'linear', function () {
        if (callback)
          callback(number);
      });
    },
    reset: function () {
      $(dice.element).transition(dice.position0, 0);
    }
  };

  var dice2 = {
    position0: { y: 0, rotateX: 0, rotateY: 0 },
    position1: { y: 600, rotateX: -900, rotateY: -180 },
    position2: { y: 600, rotateX: -1080, rotateY: -180 },
    position3: { y: 600, rotateX: -1080, rotateY: -90 },
    position4: { y: 600, rotateX: -990, rotateY: -270 },
    position5: { y: 600, rotateX: -810, rotateY: -90 },
    position6: { y: 600, rotateX: -1080, rotateY: -270 },

    roll: function (callback) {
      var number2 = Math.floor((Math.random() * 6) + 1);
      if (debug && callback) {
        callback(prompt('Valor do dado') * 1);
        //return;
      }

      //Verifica se o dado existe
      if (!dice2.element) {
        //Adiciona dado ao tabuleiro
        dice2.element = document.createElement('div');
        dice2.element.id = 'dice2';
        dice2.element.innerHTML = '' +
          '<div class="face front"></div>' +
          '<div class="face back"></div>' +
          '<div class="face left"></div>' +
          '<div class="face bottom"></div>' +
          '<div class="face top"></div>' +
          '<div class="face right"></div>';
        element.appendChild(dice2.element);
      }
      dice2.reset();

      $(dice2.element).transition(dice2['position' + number2], 1300, 'linear', function () {
        if (callback)
          callback(number2);
      });
    },
    reset: function () {
      $(dice2.element).transition(dice2.position0, 0);
    }
  };

  dice.roll();
  dice2.roll();
  
  document.getElementById("play").addEventListener('click', function (e) {
    e.preventDefault();
    dice.roll(function (number) {
      document.getElementById("play1").innerHTML = "Roll: " + number;
      console.log(number);
    });
    dice2.roll(function (number2) {
      document.getElementById("play2").innerHTML = "Roll: " + number2;
      console.log(number2);
    });
  });
}



