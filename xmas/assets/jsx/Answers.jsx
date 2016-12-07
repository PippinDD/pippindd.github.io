var Answers = React.createClass({
	render: function() {
		gameDispatcher.calAnswers();

		return <div className="text-center row">
			{ gameStore.answers.map(function(answer) {
				return <div className="col-sm-3 text-center btn btn-default">
					<div className=" answer-number">{ answer.val() }</div>
				</div>;
			}) }
			<div className="col-sm-3 text-center btn btn-success">
				<div className="answer-number">{ gameStore.sumAnswer.val() }</div>
			</div>
		</div>
	}
});
