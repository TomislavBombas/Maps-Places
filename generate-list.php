<?php
//$_POST["submit"] = null;
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
      // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
            $csvFile = file ($target_file);
            echo '<script>var places = [';
            $data;
            $names;
            foreach ($csvFile as $line) {   
                if (!$names) {
                    $names = str_getcsv($line);
                } else {
                    $data = str_getcsv($line);
                    echo '{ ';
                    foreach ($names as $key => $name) {
                        echo $name . ': "' . $data[$key] . '",';
                    }
                    echo ' }, ';
                }
                
            }
            echo '];</script>';
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}


?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Maps pharmacy list</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <header>
            <nav id="main-nav">
                <ul>
                    <li><a href="./">Maps</a></li>
                    <li><a href="./generate-list.php">Add places via CSV</a></li>
                    <li><a href="mailto:TomislavBombas@users.github.com">Kontakt</a></li>
                </ul>
            </nav>
            <div id="hamburger">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </header>
        <section>
            <div class="wrapper">
                <p>Uploaduj CSV fajl liste apoteka. Neophodna polja su: name, adress, city. Polja su odvojena zarezom (CSV)</p>
                <form method="post" enctype="multipart/form-data">
                    <input type="file" name="fileToUpload" id="fileToUpload" accept=".csv" >
                    <input type="submit" value="Upload" name="submit">
                </form>
            </div>
        </section>
        <script src="js/list-generator.js" async defer></script>
    </body>
</html>