<?php
function gdpr_cookie_consent_enqueue() {
    wp_enqueue_style('gdpr-cookie-consent', 
        'https://cdn.jsdelivr.net/npm/gdpr-banner-florios@2/dist/cookie-consent.min.css');
    wp_enqueue_script('gdpr-cookie-consent', 
        'https://cdn.jsdelivr.net/npm/gdpr-banner-florios@2/dist/cookie-consent.min.js', 
        array(), '2.0.0', true);
}
add_action('wp_enqueue_scripts', 'gdpr_cookie_consent_enqueue');

function gdpr_cookie_banner() {
    include get_template_directory() . '/cookie-banner.php';
}
add_action('wp_footer', 'gdpr_cookie_banner');
?>