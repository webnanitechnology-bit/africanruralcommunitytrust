<?php
header('Content-Type: application/json; charset=utf-8');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Helper to read and sanitize POST values
function post($k) {
    return isset($_POST[$k]) ? trim((string)$_POST[$k]) : '';
}

// Required fields
$name = post('name');
$phone = post('phone');
$email = post('email');
$reason = post('reason');
$availability = post('availability');
$region = post('region');
$message = post('message');

// Validate required
$errors = [];
if ($name === '') $errors[] = 'Name is required.';
if ($phone === '') $errors[] = 'Phone is required.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email is required.';
if ($reason === '') $errors[] = 'Reason for volunteering is required.';
if ($availability === '') $errors[] = 'Availability is required.';
if ($region === '') $errors[] = 'Region is required.';

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fix the following: ' . implode(' ', $errors)
    ]);
    exit;
}

// Build email
$to = 'info@africanruralcommunitytrust.org';
$subject = 'Volunteer Registration — ' . $name;

$body = "New volunteer registration\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Phone: " . $phone . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Reason: " . $reason . "\n";
$body .= "Availability: " . $availability . "\n";
$body .= "Region: " . $region . "\n";
$body .= "Message: " . ($message !== '' ? $message : '(none)') . "\n";
$body .= "\n--\nGenerated: " . date('Y-m-d H:i:s') . "\n";

// Headers
$headers = [];
$headers[] = 'From: no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'yourdomain.com');
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';

// Send mail (returns true on success)
$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your volunteer registration has been received.']);
} else {
    // don't leak server details
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send the email. Please try again later.']);
}
exit;
?>
