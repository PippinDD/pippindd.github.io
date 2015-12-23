var Answers = React.createClass({
	render: function() {
		return <div className="text-center row">
			{ gameStore.answers.map(function(answer) {
				return <div className="col-sm-2 text-center well">
					<h3>{ answer.val() }</h3>
				</div>;
			}) }
			<div className="col-sm-2 text-center well">
				=
			</div>
			<div className="col-sm-2 text-center well">
				<h3>{ gameStore.sumAnswer.val() }</h3>
			</div>
		</div>
	}
});
