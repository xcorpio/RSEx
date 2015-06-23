
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  console.log('no support!');
} else {
  var recognition = new webkitSpeechRecognition();
  //recognition.continuous = true;
  //recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    console.log('recognition start...');
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      ignore_onend = true;
      console.log('recognition onerror:no-speech');
    }
    if (event.error == 'audio-capture') {
      ignore_onend = true;
      console.log('recognition onerror:audio-capture');
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        console.log('info-blocked');
      } else {
        console.log('info_denied');
      }
      ignore_onend = true;
    }
    $("#rs-voice").removeClass('voice-rec');
  };

  recognition.onend = function() {
    console.log('recognition.onend .');
    $("#rs-voice").removeClass('voice-rec');
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      console.log('cant recogition');
      return;
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    if (final_transcript || interim_transcript) {
      console.log('result  final_transcript:',final_transcript,' interim_transcript:',interim_transcript);
      var textarea = $("#fastpostmessage");
      textarea.val(textarea.val()+final_transcript);
      
      $("#rs-voice").removeClass('voice-rec');
    }
  };
}


var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    console.log('recognition.stop');
    $("#rs-voice").removeClass('voice-rec');
    return;
  }
  final_transcript = '';
  recognition.lang = 'cmn-Hans-CN';
  //recognition.lang = 'en-US';
  recognition.start();
  ignore_onend = false;
  start_timestamp = event.timeStamp;
  
  $("#rs-voice").addClass('voice-rec');
}

