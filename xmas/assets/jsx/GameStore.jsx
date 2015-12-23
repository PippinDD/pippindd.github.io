var gameStore = new Cortex({
	winners: {
		engineer: [],
		operation: [],
		marketing: [],
		tele: [],
		b2c: []
	},

	candidates: [],

	answers: [],
	sumAnswer: null,
	reviewAnswers: false,

	spinning: false,
	winner: null,
	won: false,

	displayCounter: false,

	pointer: 0,
	candidateCount: null,
	counter: null
});

var gameDispatcher = {
	reset: function() {
		gameStore.candidates.set([]);

		gameStore.answers.set([]);
		gameStore.sumAnswer.set(null);
		gameStore.reviewAnswers.set(false);

		gameStore.spinning.set(false);
		gameStore.winner.set(null);
		gameStore.won.set(false);

		gameStore.displayCounter.set(false);

		gameStore.pointer.set(0);
		gameStore.candidateCount.set(null);
		gameStore.counter.set(null);
	},

	setCandidates: function(team) {
		gameStore.candidates.set(_.shuffle(Staff[team]));
	},

	addWinner: function(team, winner) {
		// add to winners
		gameStore.winners[team].push(winner);

		// remove from candidate
		var idWinner = gameStore.candidates.findIndex(function(candidate){
			return candidate.val() == winner;
		});
		gameStore.candidates.removeAt(idWinner);

		if (gameStore.winners[team].count() == Staff.teams[team].prizes) {
			window.location = "#/" + team + "/winners";
		}
	},

	resetAnswers: function() {
		gameStore.answers.set([]);
		gameStore.sumAnswer.set(null);
		gameStore.reviewAnswers.set(false);
		gameStore.winner.set(null);

		gameStore.pointer.set(0);
		gameStore.counter.set(null);
	},
	addAnswer: function(answer) {
		gameStore.answers.push(parseInt(answer, 10));
	},

	calAnswers: function() {
		gameStore.sumAnswer.set(_.sum(gameStore.answers.val()));
	},

	showAnswers: function() {
		gameDispatcher.calAnswers();
		gameStore.reviewAnswers.set(true);
	},
	hideAnswers: function() {
		gameStore.reviewAnswers.set(false);
	},

	showCounter: function() {
		gameDispatcher.hideAnswers();
		gameStore.counter.set(gameStore.sumAnswer.val());
		gameStore.displayCounter.set(true);

		gameDispatcher.setSpinning(false);
		gameStore.pointer.set(0);
		gameStore.candidateCount.set(gameStore.candidates.count());
		gameStore.counter.set(gameStore.sumAnswer.val());

		setTimeout(gameDispatcher.spin, gameDispatcher.getTimeout());
	},
	hideCounter: function() {
		gameDispatcher.setSpinning(false);
		gameDispatcher.addWinner(routeStore.team.val(), gameStore.winner.val());
		gameDispatcher.resetAnswers();
		gameStore.displayCounter.set(false);
	},

	shuffleCandidate: function() {
		gameStore.candidates.set(_.shuffle(gameStore.candidates.val()));
	},

	setSpinning: function(spinning) {
		gameStore.spinning.set(spinning);
	},

	startSpinning: function(e) {
		e.preventDefault();

		gameDispatcher.calAnswers();
		gameDispatcher.hideAnswers();

		gameDispatcher.setSpinning(true);

		gameStore.pointer.set(0);
		gameStore.candidateCount.set(gameStore.candidates.count());
		gameStore.counter.set(gameStore.sumAnswer.val());
	},
	spin: function() {
		var counter = gameStore.counter.val() - 1,
			pointer = gameStore.pointer.val() + 1,
			winner;

		if (pointer > gameStore.candidateCount.val()-1) {
			pointer = 0;
		}

		gameStore.pointer.set(pointer);

		if (gameStore.spinning.val() == false) {
			setTimeout(gameDispatcher.spin, 80);

			return;
		}

		if (counter > 0) {
			gameStore.counter.set(counter);
			setTimeout(gameDispatcher.spin, gameDispatcher.getTimeout());
		} else {
			gameStore.counter.set(0);
			gameDispatcher.setSpinning(false);
			gameStore.won.set(true);

			winner = gameStore.candidates.val()[gameStore.pointer.val()];

			gameStore.winner.set(winner);
		}
	},
	getTimeout: function() {
		var counter = gameStore.counter.val();

		if (counter > 1000)
			return 5;

		if (counter > 250)
			return 7;

		if (counter > 100)
			return 9;

		if (counter > 50)
			return 20;

		if (counter > 40)
			return 50;

		if (counter > 20)
			return 75;

		if (counter > 5)
			return 100;

		if (counter > 3)
			return 250;

		if (counter > 1)
			return 700;

		return 1000;
	}
};
