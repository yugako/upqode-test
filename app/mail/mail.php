<?php

$recipients = ['example@mail.com']; 
$subject   = 'Лист із сайту';

$before_table = ''; 
$after_table  = ''; 
$sep          = ', '; 

//  SMTP:
$smtp_host     = 'smtp.mail.ru'; 
$smtp_port     = 465; 
$smtp_secure   = 'ssl'; 
$smtp_auth     = true; 
$smtp_username = 'gasyuk_m@mail.ua';
$smtp_password = '$dk820&123'; 



if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

	function inputsTable($s) {
		$infoTable = '<table width="100%">';
		foreach ( $_POST as $key => $value ) {
			if( $value ) {
				if( $key == 'errorReport' ) continue;
				if( gettype($value) == 'array' ) {
					foreach( $value as $sub_value ) {
						if( !next($value) ) $new_value .= $sub_value;
						else $new_value .= $sub_value . $s;
					} 
					$value = $new_value;
				} 
				$infoTable .= '
					<tr style="background-color: #f8f8f8; color: #757575; font-size: 14px;">
						<td style="padding: 10px; border: #e9e9e9 1px solid; font-weight: bold; width: 30%;">' . preg_replace("/_/", " ", $key) . '</td>
						<td style="padding: 10px; border: #e9e9e9 1px solid;">' . trim(htmlspecialchars($value)) . '</td>
					</tr>';
			}
		}
		return $infoTable .= '</table>';
	}

	require_once('phpmailer/PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';
	$mail->isSMTP();
	$mail->Host = $smtp_host;
	$mail->Port = $smtp_port;
	$mail->SMTPSecure = $smtp_secure;
	$mail->SMTPAuth = $smtp_auth;
	$mail->Username = $smtp_username;
	$mail->Password = $smtp_password;
	$mail->setFrom($smtp_username);
	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body = $before_table.inputsTable($sep).$after_table;

	foreach( $recipients as $rec )
		$mail->addAddress($rec);

	if( $_FILES ) {
		foreach( $_FILES as $file) {
			// SingleFile
			if( $file['name'] != '' && gettype($file['name']) != 'array') {
				$mail->addAttachment($file['tmp_name'], $file['name']);
			// Multiple
			} else if( $file['name'] != '' && gettype($file['name']) == 'array' && $file['name'][0] != '' ) {
				for( $i=0; $i < count($file['name']); $i++ ) {
					$mail->addAttachment($file['tmp_name'][$i], $file['name'][$i]);
				}
			}
		}
	}

	if( !$mail->send() ) {

		if( $_POST['errorReport'] ) echo 'sendmail-server-error'; 

		if( isset($error_page) ) {
			header('Location: ' . $error_page);
		} else {
			header('Content-Type: text/html; charset=utf-8');
			echo 'Error!';
		}

	} else {
		
		if( isset($success_page) ) {
			header('Location: ' . $success_page);
		} else {
			header('Content-Type: text/html; charset=utf-8');
			echo 'Success';
		}

	}

}

 ?>