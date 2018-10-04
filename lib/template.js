module.exports = {
  HTML(title, body, authStatusUI='<a href="/auth/login">login</a>', searchResult="No Result") {
    return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${authStatusUI}
      ${body}
      ${searchResult}
    </body>
    </html>
    `;
  },
  parseSearchResponse(searchResponse) {
    let searchResult = '';
    for (res of searchResponse) {
      searchResult += `<div><ul>
      <li>url: ${res.url}</li>
      <li>title: ${res.title}</li>
      <li>content: ${res.content}</li>`
      searchResult += '</ul></div>'
    }
    return searchResult;
  }
}