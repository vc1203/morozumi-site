<?php
// 1. 設定：受信したいメールアドレスを入力してください ★ここを書き換え
$to_email = "info@morozumi.jp"; 

// 2. フォームからのデータ取得
$name    = $_POST['name'] ?? '';
$kana    = $_POST['kana'] ?? '';
$email   = $_POST['email'] ?? '';
$tel     = $_POST['tel'] ?? '';
$item    = $_POST['item'] ?? '';
$message = $_POST['message'] ?? '';

// 3. 「送信」ボタンが押された場合（確認画面からの遷移）
if (isset($_POST['action']) && $_POST['action'] === 'submit') {
    $subject = "【ホームページ】お問い合わせがありました";
    $body = "ホームページよりお問い合わせがありました。\n\n";
    $body .= "【お名前】: $name ($kana)\n";
    $body .= "【メール】: $email\n";
    $body .= "【電話番号】: $tel\n";
    $body .= "【項目】: $item\n";
    $body .= "【内容】:\n$message\n";
    $headers = "From: info@morozumi.jp" . "\r\n"; // メールのヘッダー（送信元など）
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion(); // 念のため送信プログラム情報を付与


// 4. メール送信実行
if (mb_send_mail($to_email, $subject, $body, $headers)) {
    header("Location: thanks.html");
    exit;
    } else {
    $error = "送信に失敗しました。";
    }
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>入力内容の確認 | 株式会社 両角佛壇</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header id="header-include"></header>

<main class="container my-5 fade-in is-visible">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="contact-card">
        <h2 class="text-center fw-bold mb-5">入力内容の確認</h2>
        <p class="text-center mb-4">以下の内容で送信します。よろしければ「送信する」を押してください。</p>

        <table class="table table-bordered mb-5">
          <tr><th class="bg-light w-25">お名前</th><td><?php echo htmlspecialchars($name); ?></td></tr>
          <tr><th class="bg-light">フリガナ</th><td><?php echo htmlspecialchars($kana); ?></td></tr>
          <tr><th class="bg-light">メール</th><td><?php echo htmlspecialchars($email); ?></td></tr>
          <tr><th class="bg-light">電話番号</th><td><?php echo htmlspecialchars($tel); ?></td></tr>
          <tr><th class="bg-light">項目</th><td><?php echo htmlspecialchars($item); ?></td></tr>
          <tr><th class="bg-light">内容</th><td><?php echo nl2br(htmlspecialchars($message)); ?></td></tr>
        </table>

        <form action="mail.php" method="POST">
          <input type="hidden" name="name" value="<?php echo htmlspecialchars($name); ?>">
          <input type="hidden" name="kana" value="<?php echo htmlspecialchars($kana); ?>">
          <input type="hidden" name="email" value="<?php echo htmlspecialchars($email); ?>">
          <input type="hidden" name="tel" value="<?php echo htmlspecialchars($tel); ?>">
          <input type="hidden" name="item" value="<?php echo htmlspecialchars($item); ?>">
          <input type="hidden" name="message" value="<?php echo htmlspecialchars($message); ?>">
          
          <div class="d-flex justify-content-center gap-3">
            <button type="button" onclick="history.back()" class="btn btn-outline-secondary rounded-pill px-5">戻って修正</button>
            <button type="submit" name="action" value="submit" class="btn-submit px-5">送信する</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>

<footer id="footer-include"></footer>
<script src="script.js"></script>
</body>
</html>