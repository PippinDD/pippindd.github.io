var routeStore = new Cortex({
		team: null,
		page: null,
		action: null
	}),

	routeDispatcher = {
		setPage: function(team, page, action) {
			team = team || null;
			page = page || null;
			action = action || null;

			routeStore.team.set(team);
			routeStore.page.set(page);
			routeStore.action.set(action);
		},

		goBack: function(e) {
			e && e.preventDefault();
			history.back();
		}
	},

	router = new Router({
		'/([\\w\-\_]+)/?([\\w\-\_]+)?/?([\\w\-\_]+)?': {
			on: function(team, page, action) {
				routeDispatcher.setPage(team, page, action);
			}
		},
		'': {
			on: function() {
				routeDispatcher.setPage(null, null, null);
			}
		}
	}).configure({});

$(function(){
	router.init();
});
