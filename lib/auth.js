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
		<button class="btn blue uppercase bold" onclick="location.href='/auth/register';">회원가입</button><!--
		<button class="btn blue uppercase bold" onclick="location.href='/auth/google';">구글로 로그인</button>
		<button class="btn blue uppercase bold" onclick="location.href='/auth/facebook';">페이스북으로 로그인</button>
		<button class="btn blue uppercase bold" onclick="location.href='/auth/github';">github로 로그인</button>-->`
		
		if (this.IsOwner(req, res)) {
			authStatusUI = `<button class="btn blue uppercase bold" onclick="">${req.user.displayName}</button> | <button class="btn blue uppercase bold" onclick="location.href='/auth/logout';">로그아웃</button> <img style="margin-left: 10px" width="33px" src="public/images/bell-regular.svg" alt="">`;
		}

		return authStatusUI;
	}
}

