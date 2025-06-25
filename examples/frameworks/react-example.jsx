import React, { useEffect } from 'react';
import 'gdpr-banner-florios/dist/cookie-consent.css';

const CookieConsent = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.EnhancedCookieConsent) {
            window.EnhancedCookieConsent.init({
                variant: 'full',
                trackChoices: true,
                autoBlockScripts: true
            });
        }
    }, []);

    return (
        <>
            <div id="cookieBanner" className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
                <div className="cookie-banner-content">
                    <div className="cookie-banner-text">
                        <h3 id="cookie-title">🍪 We use cookies</h3>
                        <p id="cookie-desc">
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                            By clicking "Accept All", you consent to our use of cookies. 
                            <a href="#" onClick={(e) => { e.preventDefault(); window.showCookieSettings(); }}>Customize settings</a> or 
                            <a href="/privacy-policy" target="_blank">learn more</a>.
                        </p>
                    </div>
                    <div className="cookie-banner-actions">
                        <button className="cookie-btn cookie-btn-accept" onClick={() => window.EnhancedCookieConsent.acceptAll()}>
                            Accept All
                        </button>
                        <button className="cookie-btn cookie-btn-reject" onClick={() => window.EnhancedCookieConsent.rejectAll()}>
                            Reject All
                        </button>
                        <button className="cookie-btn cookie-btn-settings" onClick={() => window.showCookieSettings()}>
                            Settings
                        </button>
                    </div>
                </div>
            </div>

            <div id="cookieSettingsOverlay" className="cookie-settings-overlay" role="dialog">
                <div className="cookie-settings-modal">
                    <div className="cookie-settings-header">
                        <h3>Cookie Preferences</h3>
                    </div>
                    <div className="cookie-settings-body">
                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <h4>🔒 Essential Cookies</h4>
                                <div className="cookie-toggle enabled disabled" data-category="essential"></div>
                            </div>
                            <p>These cookies are necessary for the website to function.</p>
                        </div>

                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <h4>📊 Analytics Cookies</h4>
                                <div className="cookie-toggle" data-category="analytics" onClick={() => window.toggleCookieCategory('analytics')}></div>
                            </div>
                            <p>These cookies help us understand how visitors interact with our website.</p>
                        </div>

                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <h4>📱 Marketing Cookies</h4>
                                <div className="cookie-toggle" data-category="marketing" onClick={() => window.toggleCookieCategory('marketing')}></div>
                            </div>
                            <p>These cookies are used to deliver advertisements more relevant to you.</p>
                        </div>

                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <h4>📲 Social Media Cookies</h4>
                                <div className="cookie-toggle" data-category="social" onClick={() => window.toggleCookieCategory('social')}></div>
                            </div>
                            <p>These cookies are set by social media services.</p>
                        </div>

                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <h4>⚙️ Personalization Cookies</h4>
                                <div className="cookie-toggle" data-category="personalization" onClick={() => window.toggleCookieCategory('personalization')}></div>
                            </div>
                            <p>These cookies allow the website to remember your choices.</p>
                        </div>
                    </div>
                    <div className="cookie-settings-footer">
                        <button className="cookie-btn cookie-btn-reject" onClick={() => { window.EnhancedCookieConsent.rejectAll(); window.hideCookieSettings(); }}>
                            Reject All
                        </button>
                        <button className="cookie-btn cookie-btn-accept" onClick={() => { window.EnhancedCookieConsent.savePreferences(); window.hideCookieSettings(); }}>
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieConsent;