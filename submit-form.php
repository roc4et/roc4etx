<?php
if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $captcha = $_POST['g-recaptcha-response'];
    $secret_key = "6LeBxJYkAAAAACWqcQ0Xvpr5ho73rNpSOnVhddsP"; // Replace with your actual secret key

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $secret_key,
        'response' => $captcha,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    );

    $options = array(
        'http' => array (
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response);

    if ($result->success) {
        // reCAPTCHA verification passed
        // Process the form data here
        // ...

        // Redirect to a success page
        header('Location: success.php');
        exit();
    } else {
        // reCAPTCHA verification failed
        // Redirect back to the form page with an error message
        header('Location: form.php?error=captcha');
        exit();
    }
}
?>
