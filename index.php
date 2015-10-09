<!-- The Homepage -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>TutorMe - Home</title>

  <!-- Bootstrap -->
  <link href="./bootstrap-3.3.5/css/bootstrap.min.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="./bootstrap-3.3.5/js/bootstrap.js"></script>

  <link href="./css/index.css" rel="stylesheet">
  <link href="./css/Global.css" rel="stylesheet">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.5.0.min.js"></script>
  <script type="text/javascript" src="./app/models/App.js"></script>

  <?php include('./app/php/Global.php'); ?>
  <link rel='shortcut icon' href='./app/favicon.ico' type='image/x-icon'/ >
</head>

<body>
  <!-- Container -->
  <div class="container-fluid">
    <?php include('./app/php/LoginOrSignUp.php'); ?>    <!-- The Login or Signup pop up -->
    <!-- Navigation Content Container -->
    <div class="container-fluid">
      <!-- Navigationbar -->
      <?php include('./app/php/Navigationbar.php'); ?>  <!-- The whole navbar -->
      <!-- Navigationbar end -->
    </div>
    <!-- Navigation Content Container -->
  </div>
  <!-- Container End -->
</body>

</html>
