<?php
$program_name_delete=$_POST['program_name'];
$con = mysqli_connect("182.50.133.83","kushal_test","kushal1234","kushal_test");
$query="delete from blocks where program_name='$program_name_delete'";
$con->query($query);
