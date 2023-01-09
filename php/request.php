<?php
  include_once 'db.php';

  header ('Content-type: application/json');
  
  $smtp = $pdo->prepare('SELECT url_glb, location from planner_avatar_object');
  $smtp->execute();
  $rows = $smtp->fetchAll();

  $result = array();

  foreach ($rows as $row) {
    $result []= array(
      "url" => $row["url_glb"],
      "location" => $row["location"]
    );
  }

  echo json_encode($result, true);
?>