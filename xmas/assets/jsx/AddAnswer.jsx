var AddAnswer = React.createClass({
	onAnswer: function(e) {
		e.preventDefault();

		var obj = $(this.refs.answer.getDOMNode());

		if (obj.val()) {
			gameDispatcher.addAnswer($(obj).val().substring(0, 2));
			$(obj).val("");
		}
	},

	render: function() {
		return <div className="row">
			<div className="col-sm-8 col-sm-offset-2 well">
				<h4>Answer</h4>
				<form onSubmit={ this.onAnswer }>
					<div className="col-sm-12 input-group">
						<input onKeyDown={ gameDispatcher.onAnswerInput } type="number" className="col-sm-12" ref="answer" />
						<div className="input-group-btn">
							<input type="submit"
							       className="btn btn-primary noshow"
							       onClick={ this.onAnswer }
							       value="OK" />
						</div>
					</div>
				</form>
			</div>
			<div className="col-sm-12">
				<Answers {...this.props }/>
			</div>
		</div>
	}
});
