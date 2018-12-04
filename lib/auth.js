module.exports = {

	IsOwner(req, res) {
		if (req.user) {
			return true;
		} else {
			return false;
		}
	},

  StatusUI(req, res) {
		let authStatusUI = `
		<button class="btn blue uppercase bold" onclick="location.href='/auth/login';">로그인</button>
		`

		if (this.IsOwner(req, res)) {
			authStatusUI = `<button class="btn blue uppercase bold" onclick="">${req.user.displayName}</button> | <button class="btn blue uppercase bold" onclick="window.location='/book_mark';">북마크</button> | <button class="btn blue uppercase bold" onclick="location.href='/auth/logout';">로그아웃</button>`;
		}

		return authStatusUI;
	}

}
