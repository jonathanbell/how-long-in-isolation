<?php

require('../vendor/autoload.php');

$is_benevilation_over = false;
$start_of_benevity_self_isolation = 'March 16 2020 08:30:00 GMT-0700';
// @TODO: Update when known
$end_of_benevity_isolation = 'May 3 9999 02:11:11 GMT-0700';
$start = new DateTime($start_of_benevity_self_isolation);
$start->setTimezone(new DateTimeZone('America/Vancouver'));

$end = new DateTime($end_of_benevity_isolation);
$end->setTimezone(new DateTimeZone('America/Vancouver'));
if ($end->getTimestamp() > time()) {
  $end->setTimestamp(time());
} else {
  $is_benevilation_over = true;
}

$diff_str_long = $end->diff($start)->format('%a Days, %h Hours, %i Minutes and %s Seconds');
$diff_str_short = $end->diff($start)->format('%a:%h:%i:%s');

?>
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">

  <!--
    for Slack:
    https://api.slack.com/legacy/message-link-unfurling#classic_unfurling
  -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?php print $diff_str_short; ?>">
  <meta property="og:title" content="Benevity Isolation Tally">
  <meta property="og:description" content="Benevity <?php print $is_benevilation_over ? 'was' : 'has been'; ?> in isolation for <?php print $diff_str_long; ?>">
  <meta property="og:url" content="https://How-Long-in-Isolation--jonathanbell.repl.co">

  <link rel="shortcut icon" type="image/x-icon" href="https://images.squarespace-cdn.com/content/v1/564ac671e4b01a652ab50744/1449009986310-8896SQCJC13ISC3NY6CC/ke17ZwdGBToddI8pDm48kNjpXgdB2GQ4GXsvq_1og8aoCXeSvxnTEQmG4uwOsdIceAoHiyRoc52GMN5_2H8WpxXDtSN1slPP_rP6A6T3dFMmKRcoxufNhG74c8v5liKcWrggTE7sjdLCRC2ZnDBkWg/favicon.ico?format=">

  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&display=swap" rel="stylesheet">
	<link href="/stylesheets/main.css" rel="stylesheet" type="text/css">

  <title>How Many Days in Isolation?</title>
</head>

<body>
  <canvas id="canvas"></canvas>
  <h1 id="heading">How Many Days in Isolation?</h1>
	<div id="timer">
		<div>
			<span class="days"></span>
      <small>Days</small>
    </div>
    <div>
      <span class="hours"></span>
      <small>Hours</small>
    </div>
    <div>
      <span class="minutes"></span>
      <small>Minutes</small>
    </div>
    <div>
      <span class="seconds"></span>
      <small>Seconds</small>
    </div>
  </div>

  <img
    id="logo"
    src="/images/TnLMw8Oi_400x400.png"
  />

  <?php print $is_benevilation_over ? '<p>Ya did it, kid.</p>' : ''; ?>

  <script>
    const isBenevilationOver = <?php print $is_benevilation_over ? 'true' : 'false'; ?>;
  </script>
  <script src="/scripts/main.js"></script>
  <script>
    initTimer(
      'timer',
      new Date('<?php print $start_of_benevity_self_isolation; ?>')
      <?php print ($is_benevilation_over) ? ', new Date(\''.$end_of_benevity_isolation.'\')' : '' ?>
    );
  </script>

</body>
</html>
