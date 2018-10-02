module.exports = {
	IsOwner(req, res) {
		if (req.user) {
			return true;
		} else {
			return false;
		}
	},
	StatusUI(req, res) {
		let authStatusUI = '<a href="/auth/login">login</a>'
		console.log(this.IsOwner(req, res));
		if (this.IsOwner(req, res)) {
			authStatusUI = `${req.user.email} | <a href="/auth/logout">logout</a>`;
		}
		return authStatusUI;
	}
}
