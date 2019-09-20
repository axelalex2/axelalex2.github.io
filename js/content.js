// [min, max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var NOTES = [
  'C',
  'C♯/D♭',
  'D',
  'D♯/E♭',
  'E',
  'F',
  'F♯/G♭',
  'G',
  'G♯/A♭',
  'A',
  'A♯/B♭',
  'B'
];

var MOVEMENT = [
  '↗',
  '↘',
  '→'
];

function generateMotiv(num_notes, movement) {
  if (!num_notes) {
    return [false, "You need to specify a number of notes to be generated!"];
  }

  var result = "";
  var prev_note_index = null;
  for (var i = 0; i < num_notes; i++) {
    var note_index = getRandomInt(0, NOTES.length);

    if (i > 0) {
      if (movement) {
        result += " ";
        var is_same_note = prev_note_index === note_index ? 0 : 1;
        var movement_index = getRandomInt(0, MOVEMENT.length - is_same_note);
        result += MOVEMENT[movement_index];
        result += " ";
      } else {
        result += ", ";
      }
    }

    prev_note_index = note_index;
    result += NOTES[note_index];
  }

  return [true, result];
} // function generateMotiv(num_notes, movement)

function selectStyle(styles) {
  if (!styles) {
    return [false, ""];
  }

  styles = styles.split('\n');
  var style_index = getRandomInt(0, styles.length);
  return [true, styles[style_index]];
} // function selectStyle(styles)

function generate() {
  var num_notes = document.getElementById("num_notes").value;
  var movement = document.getElementById("movement").checked;
  var motiv_result = generateMotiv(num_notes, movement);
  if (!motiv_result[0]){
    document.getElementById("result").value = motiv_result[1];
    return;
  }
  var result = motiv_result[1];

  var styles = document.getElementById("styles").value;
  var style_result = selectStyle(styles);
  if (style_result[0]){
    result += " (style: " + style_result[1] + ")";
  }

  document.getElementById("result").value = result;
} // function generate()
