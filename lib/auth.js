module.exports = {
	IsOwner(req, res) {
		if (req.user) {
			return true;
		} else {
			return false;
		}
	},
  StatusUI(req, res) {
		let authStatusUI = `<a href="/auth/login">login</a> | 
												<a href="/auth/register">Register</a>
											 `
		if (this.IsOwner(req, res)) {
			authStatusUI = `${req.user.displayName} | <a href="/auth/logout">logout</a>`;
		}

		return authStatusUI;
	}
}

