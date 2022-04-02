const render = function (option: string):string{
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>前端每日必看</title>
  <link rel="icon" href="./public/favicon.ico" />
  <link rel="stylesheet" href="./public/style.css" />
  <script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.0/dayjs.min.js"></script>
  <script src="./public/main.js"></script>
</head>
<body>
  <div class="progress"></div>
  <header>
    <h1 class="title">前端每日必看</h1>
    <span id="date"></span>
  </header>
  ${option}
</body>
</html>
  `
}
export default render