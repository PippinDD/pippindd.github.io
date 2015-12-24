var RightMenu = React.createClass({
	render: function() {
		var team = this.props.team,
			gameEnded = gameStore.winners[team].count() == this.props.teamData.prizes;

		if (gameStore.displayCounter.val()) {
			return <div className="col-sm-12 right-menu">
				{ gameStore.winner.val() == null ?
					<a className="col-xs-3 btn btn-primary"
					   onClick={ gameDispatcher.startSpinning }>
						<i className="glyphicon glyphicon-heart"/> Lucky Draw!
					</a> :
					<a className="col-xs-3 btn btn-default"
					   onClick={ gameDispatcher.hideCounter }>
						<i className="glyphicon glyphicon-repeat"/> Start new round
					</a>
				}
				<div className="col-sm-12 well spin-counter text-center">
					{ gameStore.counter.val() || "WINNER !!!" }
				</div>
			</div>
		}

		if (routeStore.page.val() == 'answer') {
			return <div className="col-sm-12 right-menu">
				<a className="col-xs-2 btn btn-default" href={"#/" + team}>
					<i className="glyphicon glyphicon-ok"/> Done
				</a>
			</div>
		}

		if (routeStore.page.val() == 'winners') {
			return <div className="col-sm-12 right-menu">
				<a className="col-xs-2 btn btn-default"
				   href={"#/" + team}>
					Close
				</a>
			</div>
		}

		if (gameEnded) {
			return <div className="col-sm-12 right-menu">
				<a className="col-xs-2 btn btn-success" href={ "#/" + team + "/winners" }>
					<i className="glyphicon glyphicon-gift"/> Winner
				</a>
			</div>
		}

		return <div className="col-sm-12 right-menu">
			<a className="col-xs-2 btn btn-default"
			   href={"#/" + team + "/answer"}>
				<i className="glyphicon glyphicon-plus"/> Add Answer
			</a>

			<a className="col-xs-2 btn btn-default noshow"
			   onClick={ gameDispatcher.shuffleCandidate }>
				<i className="glyphicon glyphicon-refresh"/> Shuffle
			</a>

			{ gameStore.reviewAnswers.val() ?
				<a className="col-xs-2 btn btn-default noshow" onClick={ gameDispatcher.hideAnswers }>
					<i className="glyphicon glyphicon-eye-close"/> Hide Answer
				</a> :
				<a className="col-xs-2 btn btn-warning noshow" onClick={ gameDispatcher.showAnswers }>
					<i className="glyphicon glyphicon-eye-open"/> Show Answer
				</a>
			}

			{ gameStore.sumAnswer.val() <= 0 ? null :
				<a className="col-xs-2 btn btn-primary" onClick={ gameDispatcher.showCounter }>
					<i className="glyphicon glyphicon-eye-open"/> Start
				</a>
			}

			<a className="col-xs-2 btn btn-success" href={ "#/" + team + "/winners" }>
				<i className="glyphicon glyphicon-gift"/> Winner
			</a>
		</div>
	}
});
