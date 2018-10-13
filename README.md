<img width="602" alt="screen shot 2018-10-13 at 12 51 11 pm" src="https://user-images.githubusercontent.com/40487883/46901031-1a5efc80-cee7-11e8-8496-6c4b28350745.png">

# 나랏말싸미
나랏말싸미는 한국 개발자 블로그들 모음의 검색엔진 입니다.

영어에 지친 개발자에게 한국의 앙질의 블로그를 제공해줍니다!


### 앱 시작 방법 (port: 3000)
`npm install`
`npm start`

### 소스코드
나랏말싸미는 Express.js에 기반을 둔 웹 어플리케이션입니다. 코드의 main은 app.js에서 이루어 지고,
routes 디렉토리에서 라우팅을 담당합니다.

lib 디렉토리에는 어플리케이션에서 사용하는 라이브러리들을 모아두었는데, front의 페이지를 위한 template,
사용자 인증을 위한 passport.js, 세션을 통해 로그인 상태를 확인하는 auth.js가 있습니다.

config 디렉토리에는 로그인 기능을 구현하기 위해서 설정파일의 템플릿을 적어두었습니다.
앱을 실제로 이용하기 위해서는 \*_template.json 의 _template을 지우고, API 키를 발급받아 본인의
client_id, client_secret, redirect_uris를 채우시면 됩니다.

session 파일도 마찬가지로 세션 구성을 위한 본인만의 비밀키(secret)을 채우시면 됩니다.

### working on process
검색기능의 품질 향상을 위해 다음과 같은 일에 작업하고 있습니다.
1. 검색 결과의 페이지 랭킹.
2. 블로그 플렛폼에 맞게 크롤링 작업 정교화
3. 사용자의 취향에 맞는 검색기능


### 검색 블로그 주제
<https://github.com/sarojaba/awesome-devblog>

![tagcloud](https://user-images.githubusercontent.com/40487883/46901173-9f4b1580-cee9-11e8-8c57-94e8b4ca42b6.png)

### 아키텍쳐
<img width="1430" alt="screen shot 2018-10-13 at 1 03 09 pm" src="https://user-images.githubusercontent.com/40487883/46901112-6494ad80-cee8-11e8-95af-c6c17ef499f1.png">
