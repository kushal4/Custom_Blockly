<?php
session_start(); 
ini_set('memory_limit', '256M');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//require_once './Config.php';
$response_xml_string = $_POST['block_string'];
//$program_id=$_POST['program_id'];
$override=$_POST['override'];
$program_name=$_POST['program_name'];
echo $override;
//echo $response_xml_string;
//$count=$_POST['program_id'];
//require_once './index.php';
//$conobj = new ConnectionConfig();
//$con = $conobj->connect();
$con = mysqli_connect("182.50.133.83","kushal_test","kushal1234","kushal_test");
//$program_id=0;
//echo $con;
//echo gettype($response_xml_string);
//if(!empty( $_SESSION['program_id'])){
  //  echo $_SESSION['program_id'];
//}

if($override=='false'){
$google_query = "insert into blocks(program,program_name,user_id) values('$response_xml_string','$program_name',1)";
if ($con->query($google_query)) {
    //echo $program_id ;
    echo "you are inserted";
  //  $program_id=$con->insert_id; 
   // echo $program_id;
} 

}
else {
    //echo $program_id; 
    //s$program_id=$_SESSION["newsession"];
    //$program_id=$con->insert_id;
    //echo $;
   // echo $_SESSION['program_id'];
   // $program_id= $_SESSION['program_id'];
    //echo $program_id;
    $google_query="update blocks set program='$response_xml_string' where program_name='$program_name'";
    if ($con->query($google_query)) {
   
    echo "you are updated";
    //$program_id=$con->insert_id;
   // echo $program_id;
} else {
    //echo"error occured somewhere";
}
  
 
}



  $con->close();

 //if($con)
     //echo"came here";
// endif;
//die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());

?>

