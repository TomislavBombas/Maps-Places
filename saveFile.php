<?php
    $file = './js/places.js';

    $current = $_COOKIE["pharvar"];

    file_put_contents($file, $current);
    echo 'Nova lista apoteka je snimljena';
    echo '<script>document.location = "./";</script>';
    die;
?>