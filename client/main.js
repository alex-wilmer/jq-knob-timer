(function($) {
  
  $(document).ready(function() { 

    var dial = $('.dial'); 
    var startPauseBtn = $('.start-pause');
    var reset = $('.reset'); 
    var mute = $('.mute'); 
    var multi = 0;  
    var flipCounter = 0;
    var text
      , timer
      , lastValue
      , running
      , startTime;

    // Audio

    var audio = new Audio('//a.clyp.it/uwz5c5b5.mp3');

    mute.click(function() {
      if (audio.volume === 1) {
        audio.volume = 0;
        mute.html('<i class="fa fa-volume-off"></i>');
      }
      else {
        audio.volume = 1;
        mute.html('<i class="fa fa-volume-up"></i>');      
      }
    });

    // Dial

    dial.knob({
      'max': 59
    , 'stopper': false
    , 'fgColor': '#000'
    , 'change': function(v) {
        change(v);
      }  
    });

    var change = function(v) {
      if (v >= 0) {
        if (v % 60 == 0 && lastValue % 60 == 59)
          multi++;        
        if (v % 60 == 59 && lastValue % 60 == 0) 
          if (multi > 0)
            multi--;
        text.html(v + (60 * (multi)));
        lastValue = v;
        dial.trigger('change');
      }
    }

    setTimeout(function() {
      text = $('<span class="text">0</span>')
        .attr('style', dial.attr('style'))
        .insertAfter('.dial')
        .css({
          'color': '#000'
        , 'margin-top': '70px' 
        , 'cursor': 'pointer'
        });
      
      text.click(startPause);      

      dial.hide();
    },0); 

    var pause = function() {
        running = false;
        startPauseBtn.html('<i class="fa fa-play"></i>');
        clearInterval(timer);
    };

    var startPause = function () {
      audio.play();
      audio.pause();
      var time = startTime = parseInt(text.html());
      if (!running && time > 0) {
        running = true;
        startPauseBtn.html('<i class="fa fa-pause"></i>');
        timer = setInterval(function() {
          dial
            .val(parseInt(dial.val())-1)
            .trigger('change');         
          text.html(parseInt(dial.val()) + (60 * (multi)));
         
          if (text.html() === '0') {
            pause();
            reset.html('<i class="fa fa-refresh"></i>')
            text.html('Go!');
            return audio.play();
          }

          if (dial.val() === '0' && multi > 0) {
            flipCounter++;
            if (flipCounter === 2) {
              dial.val((60 * multi) - 1).trigger('change');;
              text.html((60 * multi) - 1);
              multi--;
              flipCounter = 0;
            }
          }    
        }, 1000);
      }
      else pause();
    }  

    startPauseBtn.click(startPause);

    reset.click(function() {
      if (startTime > 0) {
        audio.pause();
        audio.currentTime = 0;
        reset.html('<i class="fa fa-refresh"></i>')
        dial
          .val(startTime % 60)
          .trigger('change');      
        return text.html(startTime)
      }
    });  
  });

})(jQuery);