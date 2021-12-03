<?php
    if (!empty($_POST["name"])) {
        $to = 'hello@softwarelux.com';
        $subject = 'New submission at softwarelux.com';
        $message = 'Name: ' .  $_POST["name"] . "\r\n" . 
            'Email: ' . $_POST["email"] . "\r\n" .
            'Message: ' . $_POST["message"] . "\r\n";
        $headers = 'From: bot@softwarelux.com'       . "\r\n" .
                    'Reply-To: bot@softwarelux.com';

        mail($to, $subject, $message, $headers);
    }
?>