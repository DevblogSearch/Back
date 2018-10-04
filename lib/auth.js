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
												<a href="/auth/google">Login with google</a>
												<a href="/auth/facebook">Login with facebook</a>
												<a href="/auth/github">Login with github</a>
											 `
		if (this.IsOwner(req, res)) {
			authStatusUI = `${req.user.displayName} | <a href="/auth/logout">logout</a>`;
		}

		return authStatusUI;
	}
}

