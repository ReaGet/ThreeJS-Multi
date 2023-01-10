<?php
  include_once 'db.php';

  header ('Content-type: application/json');
  
  if (isset($_GET["get"])) {
    $smtp = $pdo->prepare('SELECT id, url_glb, location, rotation from planner_avatar_object');
    $smtp->execute();
    $rows = $smtp->fetchAll();

    $result = array();

    foreach ($rows as $row) {
      $result []= array(
        "id" => $row["id"],
        "url" => $row["url_glb"],
        "location" => $row["location"],
        "rotation" => $row["rotation"],
      );
    }

    echo json_encode($result, true);
  }

  if (isset($_GET["objectId"])) {
    $id = intval($_GET["objectId"]);
    var_dump($id);
    $rotation = array(
      "x" => $_GET["x"],
      "y" => $_GET["y"],
      "z" => $_GET["z"],
    );
    $smtp = $pdo->prepare("UPDATE planner_avatar_object SET rotation=? WHERE id=?");
    $result = $smtp->execute([json_encode($rotation), $id]);
    // echo json_encode(array( "result" => $result ), true);
  }
?>