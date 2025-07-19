<?php
$filename = 'fileInserimento.csv';
$prodotti = [];

if (($handle = fopen($filename, "r")) !== false) {
    while (($row = fgetcsv($handle, 1000, ";")) !== false) {
        if (count($row) < 7) continue;
        $prodotti[] = [
            'id' => $row[0],
            'nome' => $row[1],
            'prezzo' => $row[2],
            'codice' => $row[3],
            'descrizione' => $row[4],
            'inStock' => $row[5],
            'immagine' => $row[6],
        ];
    }
    fclose($handle);
}

header('Content-Type: application/json');
echo json_encode($prodotti);
