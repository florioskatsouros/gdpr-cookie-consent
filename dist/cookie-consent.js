/**
 * Enhanced GDPR Cookie Consent Banner
 * Version: 2.0.0
 * License: MIT
 */

// Enhanced GDPR Cookie Consent Banner
class EnhancedCookieConsent {
    static STORAGE_KEY = 'gdpr_cookie_consent';
    static EXPIRY_DAYS = 365;
    static VERSION = '2.0.0';
    
    static categories = {
        essential: { name: 'Essential', required: true, enabled: true },
        analytics: { name: 'Analytics', required: false, enabled: false },
        marketing: { name: 'Marketing', required: false, enabled: false },
        social: { name: 'Social Media', required: false, enabled: false },
        personalization: { name: 'Personalization', required: false, enabled: false }
    };

    static blockedScripts = new Map();
    static config = {
        variant: 'full', // 'full', 'minimal'
        trackChoices: true,
        autoGeoCheck: true,
        autoBlockScripts: true
    };

    static async init(userConfig = {}) {
        // Merge user config
        this.config = { ...this.config, ...userConfig };
        if (userConfig.categories) {
            this.categories = { ...this.categories, ...userConfig.categories };
        }

        // Set banner variant
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.setAttribute('data-variant', this.config.variant);
        }

        // Auto-block scripts if enabled
        if (this.config.autoBlockScripts) {
            this.initScriptBlocking();
        }

        // Load saved preferences
        this.loadPreferences();
        
        // Show banner if no consent given
        if (!this.hasAnyConsent()) {
            this.showBanner();
        }

        // Update UI
        this.updateUI();
        
        // Trigger consent event
        this.triggerConsentEvent();

        // Scan existing cookies
        this.scanExistingCookies();

        console.log(`🍪 Enhanced Cookie Consent v${this.VERSION} initialized`);
    }


    static initScriptBlocking() {
        // Common tracking scripts to auto-block
        const scriptsToBlock = [
            { src: 'googletagmanager.com/gtag/js', category: 'analytics' },
            { src: 'google-analytics.com/analytics.js', category: 'analytics' },
            { src: 'connect.facebook.net', category: 'marketing' },
            { src: 'platform.twitter.com', category: 'social' },
            { src: 'platform.linkedin.com', category: 'social' },
            { src: 'youtube.com/iframe_api', category: 'social' }
        ];

        // Override document.createElement to intercept script tags
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(this, tagName);
            
            if (tagName.toLowerCase() === 'script') {
                const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set;
                Object.defineProperty(element, 'src', {
                    set: function(value) {
                        const script = scriptsToBlock.find(s => value.includes(s.src));
                        if (script && !EnhancedCookieConsent.hasConsent(script.category)) {
                            console.log(`🛡️ Blocked script: ${value} (${script.category})`);
                            EnhancedCookieConsent.blockedScripts.set(value, script.category);
                            return; // Don't set src, effectively blocking the script
                        }
                        originalSrcSetter.call(this, value);
                    },
                    get: function() {
                        return this.getAttribute('src');
                    }
                });
            }
            
            return element;
        };
    }

    static scanExistingCookies() {
        const allCookies = document.cookie.split(';').map(c => c.trim().split('=')[0]);
        const categorized = {
            analytics: [],
            marketing: [],
            social: [],
            personalization: [],
            unknown: []
        };

        // Cookie patterns for categorization
        const patterns = {
            analytics: [/_ga/, /_gid/, /_gat/, /gtag/, /analytics/i],
            marketing: [/_fbp/, /_fbc/, /ads/, /conversion/, /retargeting/i],
            social: [/twitter/, /linkedin/, /youtube/, /social/i],
            personalization: [/theme/, /language/, /preference/, /setting/i]
        };

        allCookies.forEach(cookie => {
            let categorized_cookie = false;
            for (const [category, categoryPatterns] of Object.entries(patterns)) {
                if (categoryPatterns.some(pattern => pattern.test(cookie))) {
                    categorized[category].push(cookie);
                    categorized_cookie = true;
                    break;
                }
            }
            if (!categorized_cookie && cookie) {
                categorized.unknown.push(cookie);
            }
        });

        console.log('🔍 Cookie scan results:', categorized);
        return categorized;
    }

    static loadPreferences() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                Object.keys(this.categories).forEach(category => {
                    if (preferences[category] !== undefined && !this.categories[category].required) {
                        this.categories[category].enabled = preferences[category];
                    }
                });
            } catch (e) {
                console.warn('Failed to load cookie preferences:', e);
            }
        }
    }

    static savePreferences() {
        const preferences = {};
        Object.keys(this.categories).forEach(category => {
            preferences[category] = this.categories[category].enabled;
        });
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
        
        // Set expiry cookie
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (this.EXPIRY_DAYS * 24 * 60 * 60 * 1000));
        document.cookie = `${this.STORAGE_KEY}_expiry=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        
        // Clean up cookies for disabled categories
        this.cleanupCookies();
        
        // Load any blocked scripts that are now allowed
        this.loadBlockedScripts();
        
        // Update Google Consent Mode
        this.updateConsentMode();
        
        // Track consent choices
        if (this.config.trackChoices) {
            this.trackConsentChoice(preferences);
        }
        
        this.triggerConsentEvent();
        this.updateUI();
    }

    static cleanupCookies() {
        Object.keys(this.categories).forEach(category => {
            if (!this.categories[category].enabled && !this.categories[category].required) {
                const cookiePatterns = this.getCookiePatterns(category);
                const allCookies = document.cookie.split(';');
                
                allCookies.forEach(cookie => {
                    const cookieName = cookie.trim().split('=')[0];
                    if (cookiePatterns.some(pattern => pattern.test(cookieName))) {
                        // Delete cookie
                        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
                        console.log(`🧹 Cleaned up cookie: ${cookieName}`);
                    }
                });
            }
        });
    }

    static getCookiePatterns(category) {
        const patterns = {
            analytics: [/_ga/, /_gid/, /_gat/, /gtag/, /analytics/i],
            marketing: [/_fbp/, /_fbc/, /ads/, /conversion/, /retargeting/i],
            social: [/twitter/, /linkedin/, /youtube/, /social/i],
            personalization: [/theme/, /language/, /preference/, /setting/i]
        };
        return patterns[category] || [];
    }

    static loadBlockedScripts() {
        this.blockedScripts.forEach((category, scriptSrc) => {
            if (this.hasConsent(category)) {
                console.log(`🚀 Loading previously blocked script: ${scriptSrc}`);
                const script = document.createElement('script');
                script.src = scriptSrc;
                document.head.appendChild(script);
                this.blockedScripts.delete(scriptSrc);
            }
        });
    }

    static updateConsentMode() {
        // Google Consent Mode v2 integration
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': this.hasConsent('analytics') ? 'granted' : 'denied',
                'ad_storage': this.hasConsent('marketing') ? 'granted' : 'denied',
                'ad_user_data': this.hasConsent('marketing') ? 'granted' : 'denied',
                'ad_personalization': this.hasConsent('marketing') ? 'granted' : 'denied',
                'personalization_storage': this.hasConsent('personalization') ? 'granted' : 'denied',
                'functionality_storage': this.hasConsent('essential') ? 'granted' : 'denied',
                'security_storage': 'granted'
            });
            console.log('📊 Google Consent Mode updated');
        }
    }

    static trackConsentChoice(choices) {
        if (!this.config.trackChoices) return;
        
        // Track to console (replace with your analytics endpoint)
        const trackingData = {
            choices,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            variant: this.config.variant,
            version: this.VERSION
        };
        
        console.log('📈 Tracking consent choice:', trackingData);
        
        // Example: Send to your analytics endpoint
        // fetch('/api/consent-analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(trackingData)
        // });
    }

    static acceptAll() {
        Object.keys(this.categories).forEach(category => {
            this.categories[category].enabled = true;
        });
        this.savePreferences();
        this.hideBanner();
    }

    static rejectAll() {
        Object.keys(this.categories).forEach(category => {
            if (!this.categories[category].required) {
                this.categories[category].enabled = false;
            }
        });
        this.savePreferences();
        this.hideBanner();
    }

    static hasConsent(category) {
        return this.categories[category] && this.categories[category].enabled;
    }

    static hasAnyConsent() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    static showBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            setTimeout(() => banner.classList.add('show'), 500);
        }
    }

    static hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    static updateUI() {
        // Update toggle switches in settings
        Object.keys(this.categories).forEach(category => {
            const toggle = document.querySelector(`[data-category="${category}"]`);
            if (toggle) {
                toggle.classList.toggle('enabled', this.categories[category].enabled);
                if (this.categories[category].required) {
                    toggle.classList.add('disabled');
                }
            }
        });
    }

    static triggerConsentEvent() {
        // Dispatch custom event for other scripts to listen to
        const event = new CustomEvent('cookieConsentChange', {
            detail: {
                categories: this.categories,
                timestamp: new Date().toISOString(),
                version: this.VERSION
            }
        });
        document.dispatchEvent(event);
    }

    static reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        document.cookie = `${this.STORAGE_KEY}_expiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        // Reset categories to default
        Object.keys(this.categories).forEach(category => {
            if (!this.categories[category].required) {
                this.categories[category].enabled = false;
            }
        });
        
        this.updateUI();
        this.showBanner();
    }

    

    static blockScript(scriptSrc, category) {
        this.blockedScripts.set(scriptSrc, category);
        console.log(`🛡️ Script blocked: ${scriptSrc} (${category})`);
    }
}

// Enhanced helper functions
function showCookieSettings() {
    const overlay = document.getElementById('cookieSettingsOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        // Focus management for accessibility
        const firstButton = overlay.querySelector('button');
        if (firstButton) firstButton.focus();
    }
}

function hideCookieSettings() {
    const overlay = document.getElementById('cookieSettingsOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function toggleCookieCategory(category) {
    if (EnhancedCookieConsent.categories[category] && !EnhancedCookieConsent.categories[category].required) {
        EnhancedCookieConsent.categories[category].enabled = !EnhancedCookieConsent.categories[category].enabled;
        EnhancedCookieConsent.updateUI();
    }
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('cookieSettingsOverlay');
    if (overlay && overlay.style.display === 'flex') {
        if (e.key === 'Escape') {
            hideCookieSettings();
        }
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.id === 'cookieSettingsOverlay') {
        hideCookieSettings();
    }
});

// Enhanced consent change listener
document.addEventListener('cookieConsentChange', function(e) {
    console.log('🍪 Enhanced cookie consent changed:', e.detail);
    
    // Example: Load Google Analytics if analytics consent is given
    if (EnhancedCookieConsent.hasConsent('analytics')) {
        console.log('✅ Analytics consent given - you can now load GA');
        // loadGoogleAnalytics();
    }
    
    // Example: Load marketing scripts if marketing consent is given
    if (EnhancedCookieConsent.hasConsent('marketing')) {
        console.log('✅ Marketing consent given - you can now load marketing pixels');
        // loadMarketingScripts();
    }

    // Example: Load social media widgets
    if (EnhancedCookieConsent.hasConsent('social')) {
        console.log('✅ Social consent given - you can now load social widgets');
        // loadSocialWidgets();
    }

    // Example: Apply personalization
    if (EnhancedCookieConsent.hasConsent('personalization')) {
        console.log('✅ Personalization consent given - you can now save user preferences');
        // enablePersonalization();
    }
});

// Enhanced example functions for loading external scripts
function loadGoogleAnalytics() {
    // Only load if consent is given
    if (!EnhancedCookieConsent.hasConsent('analytics')) return;
    
    // Your GA loading code here
    console.log('🚀 Loading Google Analytics...');
    // Example:
    // const script = document.createElement('script');
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    // document.head.appendChild(script);
}

function loadMarketingScripts() {
    // Only load if consent is given
    if (!EnhancedCookieConsent.hasConsent('marketing')) return;
    
    // Your marketing script loading code here
    console.log('🚀 Loading marketing scripts...');
}

function loadSocialWidgets() {
    // Only load if consent is given
    if (!EnhancedCookieConsent.hasConsent('social')) return;
    
    // Your social widget loading code here
    console.log('🚀 Loading social media widgets...');
}

function enablePersonalization() {
    // Only enable if consent is given
    if (!EnhancedCookieConsent.hasConsent('personalization')) return;
    
    // Your personalization code here
    console.log('🚀 Enabling personalization features...');
}