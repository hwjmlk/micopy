<?php
$username=$_REQUEST["username"];
$userpass=$_REQUEST["userpass"];

$conn = mysqli_connect("localhost","root","root","meizudb");

$result = mysqli_query($conn,"select * from vip where username='$username' AND userpass='$userpass'");

if(mysqli_num_rows($result) == 1){
  echo "1";
}else{
  echo "0";
  }
mysqli_close($conn);
?>