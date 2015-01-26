//$(function() {

$(document).ready(function() { 

  var dial = $('.dial');
  var startPause = $('#start-pause');
  var reset = $('#reset');  
  var multi = 0;  
  var flipCounter = 0;
  var text
    , timer
    , lastTime
    , running;

  dial.knob({
    'max': 59
  , 'change': function(v) {
      change(v);
    }
  });

  var change = function(v) {
    if (v >= 0) {
      if (v % 60 == 0 && lastTime % 60 == 59)
        multi++;        
      if (v % 60 == 59 && lastTime % 60 == 0) 
        if (multi > 0)
          multi--;
      text.val(v + (60 * (multi)));
      lastTime = v;
    }
  }

  setTimeout(function() {
    text = $('.dial')
      .clone()
      .removeClass('dial')
      .addClass('.text')
      .val(dial.val())
      .show()
      .insertAfter('.dial');

    dial.hide();
  },0); 

  var pause = function() {
      running = false;
      startPause.html('Start');
      clearInterval(timer);
  };

  startPause.click(function() {
    var time = text.val();
    if (!running && time > 0) {
      running = true;
      startPause.html('Pause');
      timer = setInterval(function() {
        dial
          .val(parseInt(dial.val())-1)
          .trigger('change');         
        text.val(parseInt(dial.val()) + (60 * (multi)));
       
        if (text.val() === '0') {
          pause();
          return text.val('Go!');
        }

        if (dial.val() === '0' && multi > 0) {
          flipCounter++;
          if (flipCounter === 2) {
            dial.val((60 * multi) - 1).trigger('change');;
            text.val((60 * multi) - 1);
            multi--;
            flipCounter = 0;
          }
        }    
      }, 1000);
    }
    else pause();
  });

  reset.click(function() {
    multi = 0;
    pause();
    dial
      .val(0)
      .trigger('change');
    text.val(0);
  });  

});
//});