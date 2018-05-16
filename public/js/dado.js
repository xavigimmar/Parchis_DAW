function dados3d(caca) {
  var caca = [];

  daditos = 1;
  //console.log(daditos);
  var debug = false;
  var element = document.getElementById("interativo");
  var element1 = document.getElementById("interativo1");

  var dice = {
    position0: { y: 0, rotateX: 0, rotateY: 0 },
    position1: { y: 700, rotateX: -900, rotateY: -180 },
    position2: { y: 700, rotateX: -1080, rotateY: -180 },
    position3: { y: 700, rotateX: -1080, rotateY: -90 },
    position4: { y: 700, rotateX: -990, rotateY: -270 },
    position5: { y: 700, rotateX: -810, rotateY: -90 },
    position6: { y: 700, rotateX: -1080, rotateY: -270 },


    roll: function (callback) {
      var number = Math.floor((Math.random() * 6) + 1);
      caca.push(number);
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
    position1: { y: 700, rotateX: -900, rotateY: -180 },
    position2: { y: 700, rotateX: -1080, rotateY: -180 },
    position3: { y: 700, rotateX: -1080, rotateY: -90 },
    position4: { y: 700, rotateX: -990, rotateY: -270 },
    position5: { y: 700, rotateX: -810, rotateY: -90 },
    position6: { y: 700, rotateX: -1080, rotateY: -270 },

    roll: function (callback) {
      var number2 = Math.floor((Math.random() * 6) + 1);
      caca.push(number2);
      if (debug && callback) {
        callback(prompt('Valor do dado') * 1);
        //return;
      }

      //Verifica se o dado existe
      if (!dice2.element) {
        //Adiciona dado ao tabuleiro
        dice2.element1 = document.createElement('div');
        dice2.element1.id = 'dice2';
        dice2.element1.innerHTML = '' +
          '<div class="face front"></div>' +
          '<div class="face back"></div>' +
          '<div class="face left"></div>' +
          '<div class="face bottom"></div>' +
          '<div class="face top"></div>' +
          '<div class="face right"></div>';
          element1.appendChild(dice2.element1);
      }
      dice2.reset();

      $(dice2.element1).transition(dice2['position' + number2], 1300, 'linear', function () {
        if (callback)
          callback(number2);
      });
    },
    reset: function () {
      $(dice2.element1).transition(dice2.position0, 0);
    }
  };

  dice.roll();
  dice2.roll();

  return caca;
}


function dados3drival(dados) {
  var caca = [];
  daditos = 1;
  //console.log(daditos);
  var debug = false;
  var element = document.getElementById("interativo");
  var element1 = document.getElementById("interativo1");

  var dice = {
    position0: { y: 0, rotateX: 0, rotateY: 0 },
    position1: { y: 700, rotateX: -900, rotateY: -180 },
    position2: { y: 700, rotateX: -1080, rotateY: -180 },
    position3: { y: 700, rotateX: -1080, rotateY: -90 },
    position4: { y: 700, rotateX: -990, rotateY: -270 },
    position5: { y: 700, rotateX: -810, rotateY: -90 },
    position6: { y: 700, rotateX: -1080, rotateY: -270 },


    roll: function (callback) {
      var number = dados[0];
      caca.push(number);
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
    position1: { y: 700, rotateX: -900, rotateY: -180 },
    position2: { y: 700, rotateX: -1080, rotateY: -180 },
    position3: { y: 700, rotateX: -1080, rotateY: -90 },
    position4: { y: 700, rotateX: -990, rotateY: -270 },
    position5: { y: 700, rotateX: -810, rotateY: -90 },
    position6: { y: 700, rotateX: -1080, rotateY: -270 },

    roll: function (callback) {
      var number2 = dados[1];
      caca.push(number2);
      if (debug && callback) {
        callback(prompt('Valor do dado') * 1);
        //return;
      }

      //Verifica se o dado existe
      if (!dice2.element) {
        //Adiciona dado ao tabuleiro
        dice2.element1 = document.createElement('div');
        dice2.element1.id = 'dice2';
        dice2.element1.innerHTML = '' +
          '<div class="face front"></div>' +
          '<div class="face back"></div>' +
          '<div class="face left"></div>' +
          '<div class="face bottom"></div>' +
          '<div class="face top"></div>' +
          '<div class="face right"></div>';
          element1.appendChild(dice2.element1);
      }
      dice2.reset();

      $(dice2.element1).transition(dice2['position' + number2], 1300, 'linear', function () {
        if (callback)
          callback(number2);
      });
    },
    reset: function () {
      $(dice2.element1).transition(dice2.position0, 0);
    }
  };

  dice.roll();
  dice2.roll();

  return caca;
}
