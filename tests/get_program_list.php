<?php

$con = mysqli_connect("182.50.133.83","kushal_test","kushal1234","kushal_test");
$query="select * from blocks";
$result=$con->query($query);

$data='';
     if($result->num_rows>0){   
         $arr=array();
        while($row = $result->fetch_assoc()) {
            $data='';
           $row_id=$row['id'];
           $data[$row_id]=$row['program_name'];
           array_push($arr, $data);
        }
     }
       echo json_encode($arr);
