$(document).ready(function() { 

  var dial = $('.dial');
  var startPause = $('.start-pause');
  var reset = $('.reset');  
  var multi = 0;  
  var flipCounter = 0;
  var text
    , timer
    , lastTime
    , running;

  dial.knob({
    'max': 59
  , 'stopper': false
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
      dial.trigger('change');
    }
  }

  setTimeout(function() {
    text = $('.dial')
      .clone()
      .removeClass('dial')
      .addClass('.text')
      .val(dial.val())
      .show()
      .insertAfter('.dial')
      .keyup(function(e) {
        if(e.keyCode == 13){
          var v = parseInt(text.val());
          if (typeof v === 'number' && v > 0) {
            dial.val(v % 60).trigger('change');
            multi = Math.floor(v/60);
            text.blur();
          }
        }        
      });

    dial.hide();
  },0); 

  var pause = function() {
      running = false;
      startPause.html('<i class="fa fa-play"></i>');
      clearInterval(timer);
  };

  startPause.click(function() {
    var time = text.val();
    if (!running && time > 0) {
      running = true;
      startPause.html('<i class="fa fa-pause"></i>');
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