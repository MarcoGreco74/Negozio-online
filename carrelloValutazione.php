<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$valutazione = '';
$value = 0;

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['star-rating1'])) {
    $value = intval($_POST['star-rating1']);
    $valutazione = "Grazie! Hai dato $value stelle.";
}
if (isset($_POST['product-image'])) {
        $imagePath = $_POST['product-image'];
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Valutazione Prodotto</title>
  <style>
    .star {
      visibility: hidden;
      font-size: 30px;
      cursor: pointer;
      margin: 5px;
    }
    .star::before {
      content: "\2605";
      visibility: visible;
    }
    .ckStar {
      color: orange;
    }
    #demo {
      font-weight: bold;
      font-size: 1.2em;
      margin-top: 10px;
    }
    .stars-container {
      margin: 20px 0;
    }
	.product-img {
      width: 200px;
      height: auto;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
  </style>
</head>
<body>
  <?php if (!empty($imagePath)) : ?>
    <img src="<?php echo htmlspecialchars($imagePath); ?>" alt="Prodotto" class="product-img">
  <?php endif; ?>
  <div class="stars-container">
    <?php for ($i = 1; $i <= 5; $i++): ?>
      <span class="star <?php echo $i <= $value ? 'ckStar' : ''; ?>"></span>
    <?php endfor; ?>
    <div id="demo"><?php echo $valutazione; ?></div>
  </div>
  <script>
    console.log("Valutazione ricevuta: <?php echo $value; ?> stelle");
  </script>
</body>
</html>
