<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if (!error_get_last()) {
    
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$title = "Email Title";
$body = "
<h2>New message</h2>
<b>Name:</b> $name<br>
<b>E-mail:</b> $email<br><br>
<b>Message:</b><br>$message
";

$mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = '';
    $mail->Username   = '';
    $mail->Password   = '';
    $mail->SMTPSecure = '';
    $mail->Port       = 465;
    $mail->setFrom('This Mail ^', 'This Theme ^');

    $mail->addAddress('To Address');  

    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Form successfully submited!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Form was not submited";
        $data['desc'] = "Error: {$mail->ErrorInfo}";
    }
    
} else {
    $data['result'] = "error";
    $data['info'] = "In code error";
    $data['desc'] = error_get_last();
}

header('Content-Type: application/json');
echo json_encode($data);

?>