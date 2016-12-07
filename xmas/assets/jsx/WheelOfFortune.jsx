var WheelOfFortune = React.createClass({
	componentWillMount: function() {
		gameDispatcher.showCounter();
	},
	componentWillUnmount: function() {
		gameDispatcher.hideCounter();
	},

	render: function() {
		var pointer = gameStore.pointer.val();

		return <div className="col-sm-12 right-menu">
			<div className="col-sm-12 candidate prize">
				{ gameStore.candidates[pointer].val() }
			</div>

			{ gameStore.winner.val() ?
				<div className="col-sm-12 well spin-counter text-center winner">
					<span><i className="glyphicon glyphicon-gift"/> WINNER <i className="glyphicon glyphicon-gift"/></span>
				</div> :
				<div className="col-sm-12 well spin-counter text-center">
					{ gameStore.counter.val() }
				</div>
			}

			{ gameStore.winner.val() == null ?
				<a className="col-xs-12 btn btn-primary lucky-draw"
				   disabled={ gameStore.spinning.val() }
				   onClick={ gameDispatcher.startSpinning }>
					<i className="glyphicon glyphicon-heart"/> Lucky Draw!
				</a> :
				<a className="col-xs-12 btn btn-default lucky-draw"
				   href={ "#/" + routeStore.team.val() }>
					<i className="glyphicon glyphicon-repeat"/> Start new round
				</a>
			}
		</div>
	}
});
