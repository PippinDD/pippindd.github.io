var AddAnswer = React.createClass({
	onAnswer: function(e) {
		e.preventDefault();

		var obj = $(this.refs.answer.getDOMNode());

		if (obj.val()) {
			gameDispatcher.addAnswer($(obj).val().substring(0, 3));
			$(obj).val("");
		}
	},

	render: function() {
		return <div className="row">
			<div className="col-sm-8 col-sm-offset-2 well">
				<h4>Answer</h4>

				<form onSubmit={ this.onAnswer }>
					<div className="input-group">
						<input type="number" maxLength="3" className="form-control" ref="answer" />
						<div className="input-group-btn">
							<input type="submit"
							       className="btn btn-primary"
							       onClick={ this.onAnswer }
							       value="OK" />
						</div>
					</div>
				</form>
			</div>
		</div>
	}
});
