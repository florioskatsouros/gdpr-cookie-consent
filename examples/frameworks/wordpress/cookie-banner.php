<?php
/**
 * WordPress Cookie Banner Template
 * Enhanced GDPR Cookie Consent Banner for WordPress
 */
?>

<!-- Enhanced GDPR Cookie Consent Banner for WordPress -->
<div id="cookieBanner" class="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
    <div class="cookie-banner-content">
        <div class="cookie-banner-text">
            <h3 id="cookie-title"><?php echo esc_html__('🍪 We use cookies', 'textdomain'); ?></h3>
            <p id="cookie-desc">
                <?php echo esc_html__('We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.', 'textdomain'); ?>
                <?php echo esc_html__('By clicking "Accept All", you consent to our use of cookies.', 'textdomain'); ?>
                <a href="#" onclick="showCookieSettings(); return false;"><?php echo esc_html__('Customize settings', 'textdomain'); ?></a>
                <?php echo esc_html__('or', 'textdomain'); ?>
                <a href="<?php echo esc_url(get_privacy_policy_url()); ?>" target="_blank"><?php echo esc_html__('learn more', 'textdomain'); ?></a>.
            </p>
        </div>
        <div class="cookie-banner-actions">
            <button class="cookie-btn cookie-btn-accept" onclick="EnhancedCookieConsent.acceptAll()" aria-label="<?php echo esc_attr__('Accept all cookies', 'textdomain'); ?>">
                <?php echo esc_html__('Accept All', 'textdomain'); ?>
            </button>
            <button class="cookie-btn cookie-btn-reject" onclick="EnhancedCookieConsent.rejectAll()" aria-label="<?php echo esc_attr__('Reject all non-essential cookies', 'textdomain'); ?>">
                <?php echo esc_html__('Reject All', 'textdomain'); ?>
            </button>
            <button class="cookie-btn cookie-btn-settings" onclick="showCookieSettings()" aria-label="<?php echo esc_attr__('Open cookie settings', 'textdomain'); ?>">
                <?php echo esc_html__('Settings', 'textdomain'); ?>
            </button>
        </div>
    </div>
</div>

<!-- Enhanced Cookie Settings Modal -->
<div id="cookieSettingsOverlay" class="cookie-settings-overlay" role="dialog" aria-labelledby="settings-title">
    <div class="cookie-settings-modal">
        <div class="cookie-settings-header">
            <h3 id="settings-title"><?php echo esc_html__('Cookie Preferences', 'textdomain'); ?></h3>
        </div>
        <div class="cookie-settings-body">
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4><?php echo esc_html__('🔒 Essential Cookies', 'textdomain'); ?></h4>
                    <div class="cookie-toggle enabled disabled" data-category="essential" aria-label="<?php echo esc_attr__('Essential cookies always enabled', 'textdomain'); ?>">
                    </div>
                </div>
                <p><?php echo esc_html__('These cookies are necessary for the website to function and cannot be switched off.', 'textdomain'); ?></p>
                <div class="cookie-examples"><?php echo esc_html__('Examples: session_id, csrf_token, user_auth', 'textdomain'); ?></div>
            </div>

            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4><?php echo esc_html__('📊 Analytics Cookies', 'textdomain'); ?></h4>
                    <div class="cookie-toggle" data-category="analytics" onclick="toggleCookieCategory('analytics')" aria-label="<?php echo esc_attr__('Toggle analytics cookies', 'textdomain'); ?>">
                    </div>
                </div>
                <p><?php echo esc_html__('These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.', 'textdomain'); ?></p>
                <div class="cookie-examples"><?php echo esc_html__('Examples: _ga, _gid, _gat, gtag', 'textdomain'); ?></div>
            </div>

            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4><?php echo esc_html__('📱 Marketing Cookies', 'textdomain'); ?></h4>
                    <div class="cookie-toggle" data-category="marketing" onclick="toggleCookieCategory('marketing')" aria-label="<?php echo esc_attr__('Toggle marketing cookies', 'textdomain'); ?>">
                    </div>
                </div>
                <p><?php echo esc_html__('These cookies are used to deliver advertisements more relevant to you and track the effectiveness of our advertising campaigns.', 'textdomain'); ?></p>
                <div class="cookie-examples"><?php echo esc_html__('Examples: _fbp, _fbc, ads_data, conversion_data', 'textdomain'); ?></div>
            </div>

            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4><?php echo esc_html__('📲 Social Media Cookies', 'textdomain'); ?></h4>
                    <div class="cookie-toggle" data-category="social" onclick="toggleCookieCategory('social')" aria-label="<?php echo esc_attr__('Toggle social media cookies', 'textdomain'); ?>">
                    </div>
                </div>
                <p><?php echo esc_html__('These cookies are set by social media services to enable you to share our content with your friends and networks.', 'textdomain'); ?></p>
                <div class="cookie-examples"><?php echo esc_html__('Examples: twitter_widgets, linkedin_share, youtube_embed', 'textdomain'); ?></div>
            </div>

            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4><?php echo esc_html__('⚙️ Personalization Cookies', 'textdomain'); ?></h4>
                    <div class="cookie-toggle" data-category="personalization" onclick="toggleCookieCategory('personalization')" aria-label="<?php echo esc_attr__('Toggle personalization cookies', 'textdomain'); ?>">
                    </div>
                </div>
                <p><?php echo esc_html__('These cookies allow the website to remember choices you make and provide enhanced, more personal features.', 'textdomain'); ?></p>
                <div class="cookie-examples"><?php echo esc_html__('Examples: theme_preference, language, layout_settings', 'textdomain'); ?></div>
            </div>
        </div>
        <div class="cookie-settings-footer">
            <button class="cookie-btn cookie-btn-reject" onclick="EnhancedCookieConsent.rejectAll(); hideCookieSettings();">
                <?php echo esc_html__('Reject All', 'textdomain'); ?>
            </button>
            <button class="cookie-btn cookie-btn-accept" onclick="EnhancedCookieConsent.savePreferences(); hideCookieSettings();">
                <?php echo esc_html__('Save Preferences', 'textdomain'); ?>
            </button>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    EnhancedCookieConsent.init({
        variant: '<?php echo esc_js(get_option('cookie_consent_variant', 'full')); ?>',
        trackChoices: <?php echo get_option('cookie_consent_tracking', true) ? 'true' : 'false'; ?>,
        autoBlockScripts: <?php echo get_option('cookie_consent_blocking', true) ? 'true' : 'false'; ?>
    });
});
</script>