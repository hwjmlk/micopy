<?php
$name=$_GET["username"];
$pwd=$_GET["userpass"];

$conn = mysqli_connect("localhost","root","root","meizudb");
	
$result = mysqli_query($conn,"select * from vip where username='$name'");

if(mysqli_num_rows($result) == 1){
  echo "1";
}else{
  echo "0";
  mysqli_query($conn,"insert into vip (username,userpass) values('$name','$pwd')");
}
mysqli_close($conn);
?>