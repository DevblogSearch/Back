module.exports = {
  HTML(title, body, authStatusUI='<a href="/auth/login">login</a>') {
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
    </body>
    </html>
    `;
  }
}