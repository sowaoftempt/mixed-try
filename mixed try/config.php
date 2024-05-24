<?php
define("DB_SERVER", "localhost");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "");
define("DB_NAME", "test");

# Connection
$link = mysqli_connect('localhost', DB_USERNAME, '', 'test' );

# Check connection
if (!$link) {
  die("Connection failed: " . mysqli_connect_error());
}
