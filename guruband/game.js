var LYRICS_PATH = 'lyrics/';
var HASH = '#';
var ELEMENT = {
	top : null,
	line1 : null,
	line2 : null,
	bottom : null
};
var STATE = {
	top : { top: '5vh', opacity: 0, background-color: #000 },
	line1 : { top: '10vh', opacity: 1, background-color: #222 },
	line2 : { top: '50vh', opacity: 1, background-color: #000 },
	bottom : { top: '60vh', opacity: 0, background-color: #000 }
}

var ANIMATION_LENGTH = 500;
var KEY_PAGE_UP = 33;
var KEY_PAGE_DOWN = 34;
var lines = [];
var currentLine = -2;
var body;

$(document).ready(function() {
	body = $('body');
	bindKeys();
	newSong('test');
});

function bindKeys() {
	body.keyup(function(event) {
		if (event.which == KEY_PAGE_DOWN) {
			nextLine();
		} else if (event.which == KEY_PAGE_UP) {
			prevLine();
		}
	});
}

function newSong(songFileName) {
	clearLines();
	var path = LYRICS_PATH + songFileName;
	$.get(LYRICS_PATH + songFileName, onSongLoaded);
}

function onSongLoaded(response) {
	lines = [];

	// process response into lines
	response = response.split('\n');
	for (var i = 0; i < response.length; i++) {
		if (response[i].length > 0) lines.push(response[i]);
	}

	// display line 0,1
	currentLine = 0;
	ELEMENT.line1 = newLine(lines[0]).appendTo(body).animate(STATE.line1, { duration : ANIMATION_LENGTH, queue : false });
	ELEMENT.line2 = newLine(lines[1]).appendTo(body).animate(STATE.line2, { duration : ANIMATION_LENGTH, queue : false });
}

function clearLines() {
	if (ELEMENT.line1 != null) ELEMENT.line1.remove();
	if (ELEMENT.line2 != null) ELEMENT.line2.remove();
	ELEMENT = {
		top : null,
		line1 : null,
		line2 : null,
		bottom : null
	};
}

function prevLine() {
	if (hasPrevLine()) {
		var line1 = ELEMENT.line1;
		var line2 = ELEMENT.line2;

		if (line2 != null) {
			line2.animate(STATE.bottom, { duration : ANIMATION_LENGTH, queue : false, complete : removeMe });
		}

		if (line1 != null) {
			line1.animate(STATE.line2, { duration : ANIMATION_LENGTH, queue : false });
			line2 = line1;
		}

		line1 = newLine(lines[currentLine - 1]).appendTo(body);
		line1.css(STATE.top);
		line1.animate(STATE.line1, { duration : ANIMATION_LENGTH, queue : false });

		ELEMENT.line1 = line1;
		ELEMENT.line2 = line2;
		currentLine -= 1;
	}
}

function nextLine() {
	if (!hasNextLine()) return;

	var ahead = 2;
	var line1 = ELEMENT.line1;
	var line2 = ELEMENT.line2;

	if (line1 != null) {
		line1.animate(STATE.top, { duration : ANIMATION_LENGTH, queue : false, complete : removeMe });
	}

	if (line2 != null) {
		line2.animate(STATE.line1, { duration : ANIMATION_LENGTH, queue : false });
		line1 = line2;
	}

	if (hasNextLine(ahead)) {
		line2 = newLine(lines[currentLine + ahead]).appendTo(body);
		line2.css(STATE.bottom);
		line2.animate(STATE.line2, { duration : ANIMATION_LENGTH, queue : false });
	}

	ELEMENT.line1 = line1;
	ELEMENT.line2 = line2;
	currentLine += 1;
}

function hasPrevLine() {
	return currentLine > 0;
}

function hasNextLine(ahead) {
	ahead = (ahead == undefined) ? 0 : ahead;
	return currentLine + ahead < lines.length;
}

function newLine(text) {
	var className = null;
	if (text.startsWith(HASH)) {
		var firstSpace = text.indexOf(' ');
		className = text.substring(0, firstSpace).replace(HASH, '');
		text = text.substring(firstSpace + 1);
	}
	var p = $('<p>').addClass('lyric').html(text);
	if (className != null) {
		p.addClass(className);
	}
	return p;
}

function removeMe() {
	$(this).remove();
}
