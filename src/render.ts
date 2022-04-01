const render = function (option: string):string{
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="./favicon.ico" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>前端每日必看</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    body {
      padding: 15px;
    }
    h2 {
      padding-bottom: 20px;
    }
    a {
      text-decoration: none;
      color: #424242;
      font-size: 13px;
    }
    ul, li {
      list-style-type: none;
    }
    section {
      margin-bottom: 15px !important;
    }
    section dl {
      padding: 12px 15px;
      border-radius: 6px;
      box-shadow: 0 3px 8px 0 rgb(0, 0, 0, 0.05);
      transition: box-shadow 0.3s ease-in-out 0.1s;
    }
    section dl:hover {
      box-shadow: 0 5px 8px 0 rgb(0, 0, 0, 0.1);
    }
    section dl dd {
      cursor: pointer !important;
    }
  </style>
</head>
<body style="background: #f1f1f1;">
<h2>前端每日必看</h2>
${option}
</body>
</html>
  `
}
export default render