<template>
  <div>
    <div 
      id="cookieBanner" 
      class="cookie-banner" 
      role="dialog" 
      :data-variant="variant"
    >
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <h3>🍪 We use cookies</h3>
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
            By clicking "Accept All", you consent to our use of cookies.
            <a href="#" @click.prevent="showSettings">Customize settings</a>
            or
            <a :href="privacyPolicyUrl" target="_blank">learn more</a>.
          </p>
        </div>
        <div class="cookie-banner-actions">
          <button class="cookie-btn cookie-btn-accept" @click="acceptAll">
            Accept All
          </button>
          <button class="cookie-btn cookie-btn-reject" @click="rejectAll">
            Reject All
          </button>
          <button class="cookie-btn cookie-btn-settings" @click="showSettings">
            Settings
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="showModal" 
      id="cookieSettingsOverlay" 
      class="cookie-settings-overlay" 
      role="dialog"
      @click.self="hideSettings"
    >
      <div class="cookie-settings-modal">
        <div class="cookie-settings-header">
          <h3>Cookie Preferences</h3>
        </div>
        <div class="cookie-settings-body">
          <div 
            v-for="(category, key) in categories" 
            :key="key" 
            class="cookie-category"
          >
            <div class="cookie-category-header">
              <h4>{{ category.icon }} {{ category.name }}</h4>
              <div 
                class="cookie-toggle"
                :class="{ 
                  enabled: category.enabled, 
                  disabled: category.required 
                }"
                :data-category="key"
                @click="!category.required && toggleCategory(key)"
              >
              </div>
            </div>
            <p>{{ category.description }}</p>
          </div>
        </div>
        <div class="cookie-settings-footer">
          <button class="cookie-btn cookie-btn-reject" @click="rejectAll(); hideSettings()">
            Reject All
          </button>
          <button class="cookie-btn cookie-btn-accept" @click="savePreferences(); hideSettings()">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedCookieConsent',
  props: {
    variant: {
      type: String,
      default: 'full'
    },
    trackChoices: {
      type: Boolean,
      default: true
    },
    autoBlockScripts: {
      type: Boolean,
      default: true
    },
    privacyPolicyUrl: {
      type: String,
      default: '/privacy-policy'
    }
  },
  data() {
    return {
      showModal: false,
      categories: {
        essential: {
          name: 'Essential',
          icon: '🔒',
          required: true,
          enabled: true,
          description: 'These cookies are necessary for the website to function.'
        },
        analytics: {
          name: 'Analytics',
          icon: '📊',
          required: false,
          enabled: false,
          description: 'These cookies help us understand how visitors interact with our website.'
        },
        marketing: {
          name: 'Marketing',
          icon: '📱',
          required: false,
          enabled: false,
          description: 'These cookies are used to deliver advertisements more relevant to you.'
        },
        social: {
          name: 'Social Media',
          icon: '📲',
          required: false,
          enabled: false,
          description: 'These cookies are set by social media services.'
        },
        personalization: {
          name: 'Personalization',
          icon: '⚙️',
          required: false,
          enabled: false,
          description: 'These cookies allow the website to remember your choices.'
        }
      }
    }
  },
  mounted() {
    this.initializeCookieConsent();
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    async initializeCookieConsent() {
      this.loadPreferences();
      
      if (!this.hasAnyConsent()) {
        setTimeout(() => {
          const banner = document.getElementById('cookieBanner');
          if (banner) banner.classList.add('show');
        }, 500);
      }
      
      this.triggerConsentEvent();
    },
    
    loadPreferences() {
      const saved = localStorage.getItem('gdpr_cookie_consent');
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
    },
    
    savePreferences() {
      const preferences = {};
      Object.keys(this.categories).forEach(category => {
        preferences[category] = this.categories[category].enabled;
      });
      
      localStorage.setItem('gdpr_cookie_consent', JSON.stringify(preferences));
      
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + (365 * 24 * 60 * 60 * 1000));
      document.cookie = `gdpr_cookie_consent_expiry=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
      
      this.triggerConsentEvent();
      this.hideBanner();
    },
    
    acceptAll() {
      Object.keys(this.categories).forEach(category => {
        this.categories[category].enabled = true;
      });
      this.savePreferences();
      this.$emit('consent-given', { type: 'accept-all', categories: this.categories });
    },
    
    rejectAll() {
      Object.keys(this.categories).forEach(category => {
        if (!this.categories[category].required) {
          this.categories[category].enabled = false;
        }
      });
      this.savePreferences();
      this.$emit('consent-given', { type: 'reject-all', categories: this.categories });
    },
    
    toggleCategory(category) {
      if (!this.categories[category].required) {
        this.categories[category].enabled = !this.categories[category].enabled;
      }
    },
    
    showSettings() {
      this.showModal = true;
    },
    
    hideSettings() {
      this.showModal = false;
    },
    
    hideBanner() {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.classList.remove('show');
    },
    
    hasConsent(category) {
      return this.categories[category] && this.categories[category].enabled;
    },
    
    hasAnyConsent() {
      return localStorage.getItem('gdpr_cookie_consent') !== null;
    },
    
    triggerConsentEvent() {
      this.$emit('consent-change', {
        categories: this.categories,
        timestamp: new Date().toISOString()
      });
      
      const event = new CustomEvent('cookieConsentChange', {
        detail: {
          categories: this.categories,
          timestamp: new Date().toISOString(),
          version: '2.0.0'
        }
      });
      document.dispatchEvent(event);
    },
    
    handleKeydown(e) {
      if (this.showModal && e.key === 'Escape') {
        this.hideSettings();
      }
    },
    
    reset() {
      localStorage.removeItem('gdpr_cookie_consent');
      document.cookie = 'gdpr_cookie_consent_expiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      Object.keys(this.categories).forEach(category => {
        if (!this.categories[category].required) {
          this.categories[category].enabled = false;
        }
      });
      
      setTimeout(() => {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.classList.add('show');
      }, 100);
    }
  }
}
</script>

<style scoped>
@import 'gdpr-banner-florios/dist/cookie-consent.css';
</style>