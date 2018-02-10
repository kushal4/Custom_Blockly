<?php
session_start();
$progran_name_selected=$_POST['program_name'];
$con = mysqli_connect("182.50.133.83","kushal_test","kushal1234","kushal_test");
$query="select * from blocks where program_name='$progran_name_selected'";
//$_SESSION['program_id']=$_POST['id_fetch'];
 $result=$con->query($query);
     if($result->num_rows>0){   
        while($row = $result->fetch_assoc()) {
            $XmlString=$row['program'];
        }
        echo $XmlString;
     }
