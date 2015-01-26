// //$(function() {

// $(document).ready(function() { 

//   var timer, lastTime;
//   var dial = $('.dial');
//   var multiplier = 0;
//   var startPause = $('#start-pause');
//   var reset = $('#reset');
//   var running = false;

//   dial.knob({
//     'max': 59
//   , 'change': function (v) {
//       modulus(v);
//     }
//   });

//   var modulus = function(v, b) {
//     if (b) lastTime--;
//     if (v >= 0) {
//       if (v % 60 == 0 && lastTime % 60 == 59) {
//         multiplier++;
//         setTimeout(function() {
//           configure(multiplier);
//         }, 0);
//       }
//       if (v % 60 == 59 && lastTime % 60 == 0) {
//         if (multiplier > 0) {
//           multiplier--;

//           setTimeout(function() {
//             configure(multiplier);
//             dial.val(parseInt(dial.val())+59);
//             if (b) lastTime++;
//           }, 0);
//         }
//       }
//     }

//     lastTime = v;
//   }

//   var pause = function() {
//       running = false;
//       startPause.html('Start');
//       clearInterval(timer);
//   };

//   startPause.click(function() {
//     var time = dial.val();
//     if (!running && time > 0) {
//       running = true;
//       startPause.html('Pause');
//       timer = setInterval(function() {
//         modulus(parseInt(dial.val())-1, true);          
//         dial
//           .val(parseInt(dial.val())-1)
//           .trigger('change');        
//         if (dial.val() === '0') {
//           pause();
//           dial.val('Go!');
//         }
//       }, 1000);
//     }
//     else pause();
//   });

//   reset.click(function() {
//     multiplier = 0;
//     pause();
//     configure(0);
//     dial
//       .val(0)
//       .trigger('change');
//   });  

//   var configure = function(multi) {
//     dial.trigger(
//       'configure', {
//         'min': 60 * multi
//       , 'max': (60 * (multi + 1)) - 1
//     });    
//   }

// });
// //});