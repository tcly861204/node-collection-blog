const render = function (option: string):string{
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>博客文档</title>
  <style>
    a {
      text-decoration: none;
      color: #424242;
      font-size: 13px;
    }
    ul, li {
      list-style-type: none;
    }
  </style>
</head>
<body>
${option}
</body>
</html>
  `
}
export default render