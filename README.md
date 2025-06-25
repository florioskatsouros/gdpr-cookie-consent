s# 🍪 Enhanced GDPR Cookie Consent

> **Zero dependencies** • **15KB total** • **GDPR compliant** • **Auto-blocking scripts** • **Production ready**

A lightweight, intelligent, and GDPR-compliant cookie consent solution with advanced features that actually works out of the box.

[![Live Demo](https://img.shields.io/badge/🎯_Try_Live_Demo-brightgreen?style=for-the-badge)](https://florioskatsouros.github.io/gdpr-cookie-consent/)
[![NPM Version](https://img.shields.io/npm/v/gdpr-banner-florios?style=for-the-badge)](https://www.npmjs.com/package/gdpr-banner-florios)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/gdpr-banner-florios?style=for-the-badge)](https://www.npmjs.com/package/gdpr-banner-florios)

## 🚀 Why Choose This?

| This Solution | Cookiebot | OneTrust | Others |
|---------------|-----------|----------|---------|
| **Setup Time** | 🟢 30 seconds | 🔴 Hours | 🔴 Days |
| **Bundle Size** | 🟢 15KB | 🔴 200KB+ | 🔴 300KB+ |
| **Price** | 🟢 Free | 🔴 $50-200/month | 🔴 $200-1000/month |
| **Dependencies** | 🟢 Zero | 🔴 Many | 🔴 Many |
| **Auto Script Blocking** | ✅ | ✅ | ⚠️ |
| **Cookie Scanner** | ✅ | ⚠️ | ❌ |
| **Mobile Optimized** | ✅ | ✅ | ⚠️ |

## ⚡ Quick Start (30 seconds)

### 1. Copy & Paste Implementation

```html
<!-- 1. Add CSS to <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gdpr-banner-florios@2/dist/cookie-consent.min.css">

<!-- 2. Add HTML before closing </body> -->
<div id="cookieBanner" class="cookie-banner">
    <div class="cookie-banner-content">
        <div class="cookie-banner-text">
            <h3>🍪 We use cookies</h3>
            <p>
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                <a href="#" onclick="showCookieSettings(); return false;">Customize settings</a> or 
                <a href="/privacy-policy" target="_blank">learn more</a>.
            </p>
        </div>
        <div class="cookie-banner-actions">
            <button class="cookie-btn cookie-btn-accept" onclick="EnhancedCookieConsent.acceptAll()">Accept All</button>
            <button class="cookie-btn cookie-btn-reject" onclick="EnhancedCookieConsent.rejectAll()">Reject All</button>
            <button class="cookie-btn cookie-btn-settings" onclick="showCookieSettings()">Settings</button>
        </div>
    </div>
</div>

<!-- Cookie Settings Modal - Get full HTML from examples/cookie-banner.html -->

<!-- 3. Add JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/gdpr-banner-florios@2/dist/cookie-consent.min.js"></script>
<script>
    EnhancedCookieConsent.init();
</script>
```

### 2. NPM Installation

```bash
npm install gdpr-banner-florios
```

```javascript
import 'gdpr-banner-florios/dist/cookie-consent.css';
import { EnhancedCookieConsent } from 'gdpr-banner-florios';

EnhancedCookieConsent.init();
```

### 3. Download & Use Locally

[📥 Download Latest Release](https://github.com/florioskatsouros/gdpr-cookie-consent/releases/latest)

## 🎮 Live Demo & Examples

| Demo Type | Description | Link |
|-----------|-------------|------|
| **Interactive Demo** | Full-featured demo with all options | [🔗 Try Now](https://florioskatsouros.github.io/gdpr-cookie-consent/) |
| **Quick Start** | Ready-to-use template | [🔗 View](examples/quick-start.html) |
| **Minimal Style** | Compact banner variant | [🔗 Demo](demos/minimal-demo.html) |
| **A/B Testing** | Compare banner variants | [🔗 Demo](demos/ab-test-demo.html) |
| **WordPress** | WordPress integration | [🔗 Example](examples/frameworks/wordpress/) |
| **React** | React component example | [🔗 Code](examples/frameworks/react-example.jsx) |

## ✨ Features That Actually Work

### 🎯 Core Features
- **GDPR Compliant** - Granular consent with proper opt-in/opt-out
- **Zero Dependencies** - Pure vanilla JavaScript, no jQuery
- **Lightweight** - Only 15KB total (CSS + JS)
- **Mobile Optimized** - Perfect responsive design with slide-up animation
- **Accessibility** - ARIA labels, keyboard navigation, focus management

### 🛡️ Smart Features
- **Auto Script Blocking** - Automatically blocks tracking scripts until consent
- **Cookie Scanner** - Detects and categorizes existing cookies
- **Auto Cleanup** - Removes cookies when consent is withdrawn
- **Google Consent Mode v2** - Integrates with GA4 consent modes
- **Event System** - Listen for consent changes in your app

### 🎨 Customization
- **Two Variants** - Full banner and minimal banner
- **Custom Styling** - Easy CSS customization
- **5 Cookie Categories** - Essential, Analytics, Marketing, Social, Personalization
- **Flexible Configuration** - Customize categories and behavior

## 📖 Integration Examples

### Google Analytics 4

```javascript
// Listen for consent changes
document.addEventListener('cookieConsentChange', function() {
    if (EnhancedCookieConsent.hasConsent('analytics')) {
        // Load Google Analytics
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    }
});
```

### Facebook Pixel

```javascript
document.addEventListener('cookieConsentChange', function() {
    if (EnhancedCookieConsent.hasConsent('marketing')) {
        // Load Facebook Pixel
        !function(f,b,e,v,n,t,s){/* FB Pixel code */}
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
    }
});
```

### WordPress Integration

```php
// Add to functions.php
function add_cookie_consent() {
    wp_enqueue_style('cookie-consent', get_template_directory_uri() . '/assets/cookie-consent.css');
    wp_enqueue_script('cookie-consent', get_template_directory_uri() . '/assets/cookie-consent.js');
}
add_action('wp_enqueue_scripts', 'add_cookie_consent');

// Add HTML template to footer.php
function cookie_consent_html() {
    include get_template_directory() . '/templates/cookie-banner.php';
}
add_action('wp_footer', 'cookie_consent_html');
```

### React Component

```jsx
import { useEffect } from 'react';
import 'gdpr-banner-florios/dist/cookie-consent.css';

export default function CookieConsent() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.EnhancedCookieConsent) {
            window.EnhancedCookieConsent.init({
                variant: 'full',
                autoBlockScripts: true,
                trackChoices: true
            });
        }
    }, []);

    return (
        <div>
            {/* Copy cookie banner HTML here */}
        </div>
    );
}
```

## 🎯 Complete Setup Guide

### Step 1: Get the Files

**Option A: CDN (Recommended)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gdpr-banner-florios@2/dist/cookie-consent.min.css">
<script src="https://cdn.jsdelivr.net/npm/gdpr-banner-florios@2/dist/cookie-consent.min.js"></script>
```

**Option B: NPM**
```bash
npm install gdpr-banner-florios
```

**Option C: Download**
Download from [GitHub Releases](https://github.com/florioskatsouros/gdpr-cookie-consent/releases)

### Step 2: Add the HTML

Copy the complete HTML structure from [examples/templates/cookie-banner.html](examples/templates/cookie-banner.html) into your page before the closing `</body>` tag.

### Step 3: Initialize

```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
    EnhancedCookieConsent.init({
        variant: 'full',           // 'full' or 'minimal'
        autoBlockScripts: true,    // Auto-block tracking scripts
        trackChoices: true,        // Track consent analytics
        categories: {              // Optional: customize categories
            essential: { name: 'Essential', required: true, enabled: true },
            analytics: { name: 'Analytics', required: false, enabled: false },
            marketing: { name: 'Marketing', required: false, enabled: false },
            social: { name: 'Social Media', required: false, enabled: false },
            personalization: { name: 'Personalization', required: false, enabled: false }
        }
    });
});
</script>
```

## 🔧 API Reference

### Methods

| Method | Description | Example |
|--------|-------------|---------|
| `init(config)` | Initialize the cookie consent | `EnhancedCookieConsent.init()` |
| `acceptAll()` | Accept all cookies | `EnhancedCookieConsent.acceptAll()` |
| `rejectAll()` | Reject all non-essential cookies | `EnhancedCookieConsent.rejectAll()` |
| `hasConsent(category)` | Check if category has consent | `EnhancedCookieConsent.hasConsent('analytics')` |
| `hasAnyConsent()` | Check if any consent is given | `EnhancedCookieConsent.hasAnyConsent()` |
| `reset()` | Reset all consent (for testing) | `EnhancedCookieConsent.reset()` |
| `savePreferences()` | Save current preferences | `EnhancedCookieConsent.savePreferences()` |
| `scanExistingCookies()` | Scan and categorize cookies | `EnhancedCookieConsent.scanExistingCookies()` |

### Events

```javascript
// Listen for consent changes
document.addEventListener('cookieConsentChange', function(event) {
    const { categories, timestamp } = event.detail;
    console.log('Consent changed:', categories);
    
    // Load scripts based on consent
    if (EnhancedCookieConsent.hasConsent('analytics')) {
        loadGoogleAnalytics();
    }
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `variant` | String | `'full'` | Banner style: 'full' or 'minimal' |
| `autoBlockScripts` | Boolean | `true` | Automatically block tracking scripts |
| `trackChoices` | Boolean | `true` | Track consent choices for analytics |
| `categories` | Object | See below | Define custom cookie categories |

## 🎨 Customization

### Quick Theme Changes

```css
:root {
    --cookie-banner-bg: #2c3e50;
    --cookie-banner-text: #ffffff;
    --cookie-accept-bg: #27ae60;
    --cookie-reject-bg: #e74c3c;
    --cookie-border-radius: 15px;
}
```

### Custom Categories

```javascript
EnhancedCookieConsent.init({
    categories: {
        essential: { name: 'Essential', required: true, enabled: true },
        analytics: { name: 'Website Analytics', required: false, enabled: false },
        marketing: { name: 'Advertising', required: false, enabled: false },
        functional: { name: 'Functionality', required: false, enabled: false }
    }
});
```

### Custom Styling

```css
/* Custom banner background */
.cookie-banner {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Custom button styles */
.cookie-btn-accept {
    background: #2ecc71;
    border-radius: 20px;
}

/* Minimal variant modifications */
.cookie-banner[data-variant="minimal"] {
    padding: 15px;
    background: rgba(44, 62, 80, 0.95);
    border-radius: 15px 15px 0 0;
}
```

## 🌐 Framework Integration

### WordPress
- Copy files to your theme directory
- Add HTML template to footer.php
- Enqueue CSS/JS in functions.php
- [📁 View WordPress Example](examples/frameworks/wordpress/)

### React/Next.js
- Install via NPM
- Import CSS and JS
- Add HTML as JSX component
- [📁 View React Example](examples/frameworks/react-example.jsx)

### Vue.js
- Install via NPM or CDN
- Add to mounted() lifecycle
- [📁 View Vue Example](examples/frameworks/vue-example.vue)

### Laravel
- Add to public assets
- Create Blade component
- Include in layout template

## 📱 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |
| Mobile Safari | 12+ |
| Chrome Mobile | 60+ |

## 🏗️ Development

### File Structure

gdpr-cookie-consent/
├── dist/                     # Production-ready CSS/JS builds
│   ├── cookie-consent.css
│   ├── cookie-consent.js
│   ├── cookie-consent.min.css
│   └── cookie-consent.min.js
│
├── demos/                    # Live HTML demos
│   ├── ab-test-demo.html     # A/B testing variant
│   └── minimal-demo.html     # Minimal variant demo
│
├── examples/                 # Integration examples
│   ├── frameworks/           # Framework-specific implementations
│   │   ├── react-example.jsx
│   │   ├── vue-example.vue
│   │   └── wordpress/
│   │       ├── cookie-banner.php
│   │       └── functions.php
│   ├── templates/            # Prebuilt HTML templates
│   │   ├── basic-example.html
│   │   ├── cdn-example.html
│   │   └── cookie-banner.html
│   └── quick-start.html      # Plug-and-play example
│
├── index.html                # Interactive full demo
├── package.json              # Project metadata and npm config
├── README.md                 # Project documentation
└── LICENSE                   # MIT license


### Build Commands
```bash
npm install          # Install dependencies
npm run build        # Build distribution files
npm run minify       # Create minified versions
npm run dev          # Start development server
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Keep it lightweight (current bundle: ~15KB)
- Maintain zero dependencies
- Ensure mobile responsiveness
- Follow accessibility standards
- Add tests for new features

## 📋 Roadmap

### v2.1 (Coming Soon)
- [ ] TypeScript definitions
- [ ] More banner variants (corner, top bar)
- [ ] Advanced consent analytics
- [ ] Consent management dashboard

### v2.2 (Future)
- [ ] Multi-language support
- [ ] Server-side consent validation
- [ ] Advanced A/B testing features
- [ ] Integration with popular CMSs

## 🐛 Troubleshooting

### Common Issues

**Q: Banner doesn't appear**
- Ensure the banner HTML is properly added to your page
- Check console for JavaScript errors
- Call `EnhancedCookieConsent.reset()` to clear existing consent

**Q: Scripts still loading without consent**
- Ensure `autoBlockScripts` is `true`
- Check that scripts are in the blocked scripts list
- Verify scripts are loaded after consent events

**Q: Styling issues**
- Check CSS file is loaded correctly
- Ensure no CSS conflicts with existing styles
- Use browser dev tools to inspect elements

### Testing Your Implementation

```javascript
// Reset consent for testing
EnhancedCookieConsent.reset();

// Check current consent status
console.log('Analytics consent:', EnhancedCookieConsent.hasConsent('analytics'));
console.log('Marketing consent:', EnhancedCookieConsent.hasConsent('marketing'));

// View all categories
console.log('All categories:', EnhancedCookieConsent.categories);
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/florioskatsouros/gdpr-cookie-consent?style=social)](https://github.com/florioskatsouros/gdpr-cookie-consent/stargazers)

## 🙏 Acknowledgments

- Built with ❤️ for the developer community
- Inspired by the need for GDPR compliance without complexity
- Thanks to all contributors and users

---

**Made by [Florios Katsouros](https://github.com/florioskatsouros)** • **[Report Bug](https://github.com/florioskatsouros/gdpr-cookie-consent/issues)** • **[Request Feature](https://github.com/florioskatsouros/gdpr-cookie-consent/issues)**
