// Role-specific chatbot for NourishNet dashboards
class NourishNetChatbot {
    constructor(role, containerId) {
        this.role = role;
        this.containerId = containerId;
        this.isOpen = false;
        this.conversationState = { step: 'greeting', data: {} };
        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
    }

    createChatWidget() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <!-- Chat Toggle Button -->
            <div class="chat-toggle" id="chatToggle">
                <i class="fa-solid fa-robot"></i>
                <span class="chat-badge">Amina AI</span>
            </div>

            <!-- Chat Window -->
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-avatar">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="chat-info">
                        <h4>Amina AI</h4>
                        <p>${this.getRoleDescription()}</p>
                    </div>
                    <button class="chat-settings-btn" id="chatSettingsBtn" title="Customize chatbot">
                        <i class="fa-solid fa-sliders"></i>
                    </button>
                    <button class="chat-close" id="chatClose">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>

                <!-- Settings Panel -->
                <div class="chat-settings-panel" id="chatSettingsPanel">
                    <div class="settings-title"><i class="fa-solid fa-sliders"></i> Customize Chatbot</div>

                    <div class="settings-group">
                        <label>Width</label>
                        <div class="settings-row">
                            <input type="range" id="settingWidth" min="280" max="600" value="500" step="10">
                            <span id="settingWidthVal">500px</span>
                        </div>
                    </div>

                    <div class="settings-group">
                        <label>Height</label>
                        <div class="settings-row">
                            <input type="range" id="settingHeight" min="350" max="800" value="520" step="10">
                            <span id="settingHeightVal">520px</span>
                        </div>
                    </div>

                    <div class="settings-group">
                        <label>Position</label>
                        <div class="settings-pos-grid">
                            <button class="pos-btn" data-pos="bottom-left">↙ Bottom Left</button>
                            <button class="pos-btn active" data-pos="bottom-center">↓ Bottom Center</button>
                            <button class="pos-btn" data-pos="bottom-right">↘ Bottom Right</button>
                        </div>
                    </div>

                    <button class="settings-reset" id="settingsReset">↺ Reset to Default</button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot">
                        <div class="message-bubble">
                            ${this.getGreeting()}
                        </div>
                    </div>
                    
                    <div class="message bot">
                        <div class="message-bubble">
                            Here are some common questions I can help you with:
                        </div>
                        <div class="role-suggestions">
                            ${this.renderSuggestedQuestions()}
                        </div>
                    </div>
                </div>
                
                <div class="chat-input">
                    <input type="text" id="chatInput" placeholder="Tell Amina what you need..." />
                    <div class="chat-voice-btn coming-soon-tip" id="chatVoiceBtn" data-tip="Voice input — coming soon!">
                        <i class="fa-solid fa-waveform-lines"></i>
                        <span>Voice</span>
                    </div>
                    <button id="chatSend">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>

                <!-- Bottom Nav -->
                <div class="chat-bottom-nav">
                    <div class="chat-nav-item active" id="navChat">
                        <i class="fa-solid fa-message"></i>
                        <span>Chat</span>
                    </div>
                    <div class="chat-nav-item coming-soon-tip" id="navVoice" data-tip="Voice mode — coming soon!">
                        <i class="fa-solid fa-waveform-lines"></i>
                        <span>Voice</span>
                    </div>
                    <div class="chat-nav-item coming-soon-tip" id="navHistory" data-tip="Chat history — coming soon!">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        <span>History</span>
                    </div>
                </div>
            </div>
        `;

        this.addChatStyles();
    }

    getRoleColors() {
        const colorMap = {
            hotel:     { primary: '#FF7F50', secondary: '#e63c1e', shadow: 'rgba(255,127,80,0.45)' },
            ngo:       { primary: '#10b981', secondary: '#059669', shadow: 'rgba(16,185,129,0.45)' },
            donor:     { primary: '#ec4899', secondary: '#be123c', shadow: 'rgba(236,72,153,0.45)' },
            volunteer: { primary: '#3b82f6', secondary: '#1d4ed8', shadow: 'rgba(59,130,246,0.45)' }
        };
        return colorMap[this.role] || { primary: '#667eea', secondary: '#764ba2', shadow: 'rgba(102,126,234,0.45)' };
    }

    addChatStyles() {
        if (document.getElementById('chatbot-styles')) return;

        const c = this.getRoleColors();

        const styles = document.createElement('style');
        styles.id = 'chatbot-styles';
        styles.textContent = `
            /* ── Capsule toggle button ── */
            .chat-toggle {
                position: fixed;
                bottom: 28px;
                left: 50%;
                transform: translateX(-50%);
                display: inline-flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0 1.6rem;
                height: 52px;
                background: linear-gradient(135deg, ${c.primary}, ${c.secondary});
                border-radius: 999px;
                cursor: pointer;
                box-shadow: 0 6px 24px ${c.shadow};
                z-index: 1000;
                transition: all 0.3s ease;
                white-space: nowrap;
                border: none;
                outline: none;
            }

            .chat-toggle:hover {
                transform: translateX(-50%) translateY(-3px);
                box-shadow: 0 10px 32px ${c.shadow};
            }

            .chat-toggle i {
                color: white;
                font-size: 1.2rem;
            }

            .chat-badge {
                color: white;
                font-size: 0.88rem;
                font-weight: 700;
                letter-spacing: 0.02em;
            }

            /* pulse dot */
            .chat-toggle::after {
                content: '';
                width: 9px;
                height: 9px;
                background: #fff;
                border-radius: 50%;
                opacity: 0.85;
                animation: chatPulse 2s infinite;
            }

            @keyframes chatPulse {
                0%,100% { transform: scale(1); opacity: 0.85; }
                50%      { transform: scale(1.4); opacity: 0.5; }
            }

            .chat-window {
                position: fixed;
                bottom: 96px;
                left: 50%;
                transform: translateX(-50%);
                width: 500px;
                height: 520px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 16px 48px rgba(0,0,0,0.18);
                display: none;
                flex-direction: column;
                z-index: 1001;
                overflow: hidden;
                border: 2px solid ${c.primary}33;
            }

            .chat-window.open {
                display: flex;
                animation: slideUp 0.3s ease;
            }

            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(20px); opacity: 0; }
                to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
            }

            .chat-header {
                background: linear-gradient(135deg, ${c.primary}, ${c.secondary});
                color: white;
                padding: 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .chat-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255,255,255,0.25);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }

            .chat-info h4 {
                margin: 0;
                font-size: 1rem;
                font-weight: 600;
            }

            .chat-info p {
                margin: 0;
                font-size: 0.8rem;
                opacity: 0.8;
            }

            .chat-close {
                margin-left: auto;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chat-messages {
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                background: #f8fafc;
            }

            .message {
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
            }

            .message.bot {
                align-items: flex-start;
            }

            .message.user {
                align-items: flex-end;
            }

            .message-bubble {
                max-width: 80%;
                padding: 0.75rem 1rem;
                border-radius: 15px;
                font-size: 0.9rem;
                line-height: 1.4;
            }

            .message.bot .message-bubble {
                background: white;
                color: #2d3748;
                border-bottom-left-radius: 5px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .message.user .message-bubble {
                background: linear-gradient(135deg, ${c.primary}, ${c.secondary});
                color: white;
                border-bottom-right-radius: 5px;
            }

            .quick-replies {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 0.75rem;
            }

            .quick-reply {
                padding: 0.5rem 0.75rem;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.3s;
            }

            .quick-reply:hover {
                border-color: #667eea;
                background: #f7fafc;
            }

            .chat-input {
                padding: 0.75rem 1rem;
                background: white;
                border-top: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .chat-input input {
                flex: 1;
                padding: 0.65rem 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 20px;
                outline: none;
                font-size: 0.88rem;
            }

            .chat-input input:focus {
                border-color: ${c.primary};
            }

            /* Voice capsule button in input row */
            .chat-voice-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                padding: 0 0.85rem;
                height: 36px;
                background: linear-gradient(135deg, ${c.primary}, ${c.secondary});
                border-radius: 999px;
                color: white;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                white-space: nowrap;
                flex-shrink: 0;
                transition: all 0.2s;
            }

            .chat-voice-btn:hover {
                opacity: 0.88;
                transform: translateY(-1px);
            }

            .chat-voice-btn i {
                font-size: 0.85rem;
            }

            .chat-input button {
                width: 36px;
                height: 36px;
                background: linear-gradient(135deg, ${c.primary}, ${c.secondary});
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            /* Bottom nav */
            .chat-bottom-nav {
                display: flex;
                background: white;
                border-top: 1px solid #f1f5f9;
                padding: 0.5rem 0 0.4rem;
            }

            .chat-nav-item {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.2rem;
                padding: 0.4rem 0;
                cursor: pointer;
                color: #94a3b8;
                font-size: 0.72rem;
                font-weight: 600;
                transition: color 0.2s;
                position: relative;
            }

            .chat-nav-item i {
                font-size: 1.1rem;
            }

            .chat-nav-item.active {
                color: ${c.primary};
            }

            .chat-nav-item:not(.active):hover {
                color: #64748b;
            }

            /* "Coming soon" tooltip */
            .coming-soon-tip {
                position: relative;
            }

            .coming-soon-tip::before {
                content: attr(data-tip);
                position: absolute;
                bottom: calc(100% + 8px);
                left: 50%;
                transform: translateX(-50%) scale(0.85);
                background: #1e293b;
                color: #fff;
                font-size: 0.72rem;
                font-weight: 500;
                padding: 0.35rem 0.7rem;
                border-radius: 8px;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.18s ease, transform 0.18s ease;
                z-index: 9999;
            }

            .coming-soon-tip::after {
                content: '';
                position: absolute;
                bottom: calc(100% + 2px);
                left: 50%;
                transform: translateX(-50%) scale(0.85);
                border: 5px solid transparent;
                border-top-color: #1e293b;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.18s ease, transform 0.18s ease;
                z-index: 9999;
            }

            .coming-soon-tip:hover::before,
            .coming-soon-tip:hover::after {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }

            .quick-reply:hover {
                border-color: ${c.primary};
                background: #f7fafc;
            }

            .suggestion-item:hover {
                border-color: ${c.primary};
                background: #f7fafc;
                transform: translateX(2px);
            }

            .role-suggestions {
                margin-top: 1rem;
                max-width: 100%;
            }

            .suggestion-category {
                margin-bottom: 1rem;
                background: #f8fafc;
                border-radius: 10px;
                padding: 0.875rem;
                border: 1px solid #e2e8f0;
            }

            .suggestion-category h5 {
                margin: 0 0 0.625rem 0;
                font-size: 0.85rem;
                font-weight: 600;
                color: #374151;
                display: flex;
                align-items: center;
                gap: 0.4rem;
            }

            .suggestion-item {
                padding: 0.625rem 0.75rem;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                margin-bottom: 0.4rem;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                gap: 0.4rem;
            }

            .suggestion-item:last-child {
                margin-bottom: 0;
            }

            @media (max-width: 768px) {
                .chat-window {
                    width: calc(100vw - 40px);
                    height: 70vh;
                    bottom: 96px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            /* Settings button in header */
            .chat-settings-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
                transition: background 0.2s;
            }
            .chat-settings-btn:hover { background: rgba(255,255,255,0.35); }

            /* Settings panel */
            .chat-settings-panel {
                display: none;
                position: absolute;
                top: 60px;
                left: 0; right: 0;
                background: white;
                border-bottom: 2px solid #f1f5f9;
                padding: 1rem 1.1rem;
                z-index: 10;
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            }
            .chat-settings-panel.open { display: block; }

            .settings-title {
                font-size: 0.85rem;
                font-weight: 700;
                color: #374151;
                margin-bottom: 0.85rem;
                display: flex;
                align-items: center;
                gap: 0.4rem;
            }
            .settings-group {
                margin-bottom: 0.85rem;
            }
            .settings-group label {
                font-size: 0.75rem;
                font-weight: 600;
                color: #6b7280;
                display: block;
                margin-bottom: 0.3rem;
                text-transform: uppercase;
                letter-spacing: 0.04em;
            }
            .settings-row {
                display: flex;
                align-items: center;
                gap: 0.6rem;
            }
            .settings-row input[type=range] {
                flex: 1;
                accent-color: ${c.primary};
                height: 4px;
                cursor: pointer;
            }
            .settings-row span {
                font-size: 0.78rem;
                font-weight: 600;
                color: ${c.primary};
                min-width: 42px;
                text-align: right;
            }
            .settings-pos-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 0.4rem;
            }
            .pos-btn {
                padding: 0.4rem 0.3rem;
                border: 2px solid #e5e7eb;
                background: white;
                border-radius: 8px;
                font-size: 0.72rem;
                font-weight: 600;
                cursor: pointer;
                color: #6b7280;
                transition: all 0.2s;
                text-align: center;
            }
            .pos-btn:hover { border-color: ${c.primary}; color: ${c.primary}; }
            .pos-btn.active { border-color: ${c.primary}; background: ${c.primary}18; color: ${c.primary}; }

            .settings-reset {
                width: 100%;
                padding: 0.45rem;
                border: 2px solid #e5e7eb;
                background: white;
                border-radius: 8px;
                font-size: 0.78rem;
                font-weight: 600;
                color: #6b7280;
                cursor: pointer;
                transition: all 0.2s;
                margin-top: 0.2rem;
            }
            .settings-reset:hover { border-color: #ef4444; color: #ef4444; }

            /* ── NGO Matcher ── */
            .ngo-matcher-category { border: 2px solid ${c.primary}44 !important; background: ${c.primary}08 !important; }
            .ngo-matcher-item {
                background: linear-gradient(135deg, ${c.primary}18, ${c.secondary}18) !important;
                border-color: ${c.primary}66 !important;
                font-weight: 700 !important;
                font-size: 0.85rem !important;
                color: ${c.primary} !important;
                justify-content: center;
                padding: 0.75rem !important;
            }
            .ngo-matcher-item:hover { background: linear-gradient(135deg, ${c.primary}30, ${c.secondary}30) !important; transform: translateY(-1px); }

            .ngo-matcher-card {
                background: white;
                border: 2px solid ${c.primary}33;
                border-radius: 16px;
                padding: 1.1rem;
                max-width: 92%;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            }
            .ngo-matcher-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                margin-bottom: 1rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
            }
            .ngo-matcher-icon { font-size: 1.6rem; }
            .ngo-matcher-title { font-weight: 800; font-size: 1rem; color: #1e293b; }
            .ngo-matcher-sub { font-size: 0.72rem; color: #64748b; margin-top: 0.1rem; }

            .ngo-form-group { margin-bottom: 0.85rem; }
            .ngo-form-group label {
                display: block;
                font-size: 0.72rem;
                font-weight: 700;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 0.4rem;
            }
            .ngo-chip-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
            .ngo-chip {
                padding: 0.3rem 0.65rem;
                border: 1.5px solid #e2e8f0;
                background: white;
                border-radius: 999px;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                color: #475569;
                transition: all 0.2s;
            }
            .ngo-chip:hover { border-color: ${c.primary}; color: ${c.primary}; }
            .ngo-chip.active { border-color: ${c.primary}; background: ${c.primary}18; color: ${c.primary}; }

            .ngo-input {
                width: 100%;
                padding: 0.55rem 0.8rem;
                border: 1.5px solid #e2e8f0;
                border-radius: 10px;
                font-size: 0.85rem;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
            }
            .ngo-input:focus { border-color: ${c.primary}; }

            .ngo-find-btn {
                width: 100%;
                padding: 0.7rem;
                color: white;
                border: none;
                border-radius: 10px;
                font-weight: 700;
                font-size: 0.88rem;
                cursor: pointer;
                margin-top: 0.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: opacity 0.2s, transform 0.2s;
            }
            .ngo-find-btn:hover { opacity: 0.9; transform: translateY(-1px); }

            .ngo-action-row {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.25rem;
            }
            .ngo-action-btn {
                flex: 1;
                padding: 0.55rem 0.5rem;
                border: 1.5px solid #e2e8f0;
                background: white;
                border-radius: 10px;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                color: #475569;
                transition: all 0.2s;
            }
            .ngo-action-btn:hover { border-color: #94a3b8; }
            .ngo-action-primary { color: white !important; border: none !important; }
            .ngo-action-primary:hover { opacity: 0.88; }
        `;
        document.head.appendChild(styles);
    }

    bindEvents() {
        const toggle   = document.getElementById('chatToggle');
        const close    = document.getElementById('chatClose');
        const send     = document.getElementById('chatSend');
        const input    = document.getElementById('chatInput');
        const settBtn  = document.getElementById('chatSettingsBtn');
        const widthR   = document.getElementById('settingWidth');
        const heightR  = document.getElementById('settingHeight');
        const resetBtn = document.getElementById('settingsReset');

        toggle?.addEventListener('click', () => this.toggleChat());
        close?.addEventListener('click',  () => this.closeChat());
        send?.addEventListener('click',   () => this.sendMessage());
        input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });

        // Settings toggle
        settBtn?.addEventListener('click', () => {
            document.getElementById('chatSettingsPanel')?.classList.toggle('open');
        });

        // Width slider
        widthR?.addEventListener('input', () => {
            const v = widthR.value;
            document.getElementById('settingWidthVal').textContent = v + 'px';
            document.getElementById('chatWindow').style.width = v + 'px';
        });

        // Height slider
        heightR?.addEventListener('input', () => {
            const v = heightR.value;
            document.getElementById('settingHeightVal').textContent = v + 'px';
            document.getElementById('chatWindow').style.height = v + 'px';
        });

        // Position buttons
        document.querySelectorAll('.pos-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applyPosition(btn.dataset.pos);
            });
        });

        // Reset
        resetBtn?.addEventListener('click', () => {
            const win = document.getElementById('chatWindow');
            const tog = document.getElementById('chatToggle');
            win.style.width  = '500px';
            win.style.height = '520px';
            widthR.value  = 500;
            heightR.value = 520;
            document.getElementById('settingWidthVal').textContent  = '500px';
            document.getElementById('settingHeightVal').textContent = '520px';
            document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.pos-btn[data-pos="bottom-center"]')?.classList.add('active');
            this.applyPosition('bottom-center');
        });
    }

    applyPosition(pos) {
        const win = document.getElementById('chatWindow');
        const tog = document.getElementById('chatToggle');
        // reset
        win.style.left = win.style.right = win.style.transform = '';
        tog.style.left = tog.style.right = tog.style.transform = '';

        if (pos === 'bottom-center') {
            win.style.left = '50%';  win.style.transform = 'translateX(-50%)';
            tog.style.left = '50%';  tog.style.transform = 'translateX(-50%)';
        } else if (pos === 'bottom-left') {
            win.style.left = '20px'; tog.style.left = '20px';
        } else if (pos === 'bottom-right') {
            win.style.right = '20px'; tog.style.right = '20px';
        }
    }

    toggleChat() {
        const window = document.getElementById('chatWindow');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('open');
        } else {
            window.classList.remove('open');
        }
    }

    closeChat() {
        const window = document.getElementById('chatWindow');
        window.classList.remove('open');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, true);
            input.value = '';
            this.processMessage(message);
        }
    }

    // Convert basic markdown to HTML for clean rendering
    renderMarkdown(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="background:#f1f5f9;padding:2px 5px;border-radius:4px;font-size:0.85em">$1</code>')
            .replace(/^### (.+)$/gm, '<strong style="font-size:0.95em">$1</strong>')
            .replace(/^## (.+)$/gm,  '<strong>$1</strong>')
            .replace(/^# (.+)$/gm,   '<strong style="font-size:1.05em">$1</strong>')
            .replace(/^\* (.+)$/gm,  '• $1')
            .replace(/^- (.+)$/gm,   '• $1')
            .replace(/\n{2,}/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    addMessage(content, isUser = false) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        const rendered = isUser ? content : this.renderMarkdown(content);
        messageDiv.innerHTML = `<div class="message-bubble">${rendered}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async processMessage(message) {
        this.showTyping();
        const response = await this.getAIResponse(message);
        this.hideTyping();
        this.addMessage(response);
    }

    showTyping() {
        const container = document.getElementById('chatMessages');
        const el = document.createElement('div');
        el.className = 'message bot';
        el.id = 'chatTyping';
        el.innerHTML = `<div class="message-bubble" style="padding:0.6rem 1rem;display:flex;gap:4px;align-items:center">
            <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingDot 1.2s infinite 0s"></span>
            <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingDot 1.2s infinite 0.2s"></span>
            <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingDot 1.2s infinite 0.4s"></span>
        </div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        if (!document.getElementById('typingKeyframe')) {
            const s = document.createElement('style');
            s.id = 'typingKeyframe';
            s.textContent = `@keyframes typingDot{0%,80%,100%{transform:scale(0.7);opacity:0.5}40%{transform:scale(1);opacity:1}}`;
            document.head.appendChild(s);
        }
    }

    hideTyping() {
        document.getElementById('chatTyping')?.remove();
    }

    async getAIResponse(message) {
        // ─────────────────────────────────────────────────────────────
        // PASTE YOUR GEMINI API KEY BELOW
        // Get a free key at: https://aistudio.google.com/app/apikey
        // ─────────────────────────────────────────────────────────────
        const GEMINI_API_KEY = 'AIzaSyDMuHErxi0PLNIHqo-s8krb7jjdSBjHlng';

        // Scrape the current dashboard page as context
        const pageContext = document.body.innerText
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 4000);

        const roleContext = {
            hotel:     'a hotel or restaurant manager donating surplus food',
            ngo:       'an NGO coordinator receiving and distributing food donations',
            volunteer: 'a volunteer picking up and delivering food donations',
            donor:     'an individual donor making food donations for special occasions'
        };

        const prompt = `You are Amina, a helpful AI assistant on NourishNet — a food donation platform connecting donors, NGOs, and volunteers.

The user is ${roleContext[this.role] || 'a NourishNet user'}.

The page context below is supplementary — use it when relevant, but your PRIMARY job is to give complete, knowledgeable answers using everything you know about food donation, NGOs, volunteering, food safety, nutrition, sustainability, and community impact.

Dashboard context (use as reference):
--- DASHBOARD CONTENT ---
${pageContext}
--- END ---

Important instructions:
- ALWAYS give complete, full answers — keep responses between 50-80 words, never cut off mid-sentence
- Use your broad general knowledge freely — don't limit yourself to the page
- Format responses clearly using bullet points or short paragraphs when helpful
- Be warm, friendly, and use emojis occasionally
- Focus on helping the user with their role: ${this.role}
- Only avoid making up specific NourishNet platform statistics not shown in the page

User: ${message}`;

        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
                    })
                }
            );

            if (!res.ok) {
                const err = await res.json();
                console.error('Gemini error:', err);
                const code = err?.error?.code;
                const msg  = err?.error?.message || '';
                if (code === 400) return "⚠️ Invalid API key — double-check it in <b>js/chatbot.js</b>.";
                if (code === 429) return "⚠️ Quota exceeded (429). Wait a minute and try again, or create a new key at <a href='https://aistudio.google.com/app/apikey' target='_blank'>aistudio.google.com</a>.";
                if (code === 403) return "⚠️ API key doesn't have permission (403). Make sure the Gemini API is enabled in your Google Cloud project.";
                return `⚠️ Gemini error ${code}: ${msg}`;
            }

            const data = await res.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text
                || "I couldn't generate a response. Please try again.";

        } catch (error) {
            console.error('Gemini fetch error:', error);
            if (window.location.protocol === 'file:') {
                return "⚠️ You're opening this file directly (file://). Please serve it with a local server — in VS Code, install the <b>Live Server</b> extension and click <b>Go Live</b> at the bottom right. Then reopen via <code>http://localhost:...</code>";
            }
            return "⚠️ Network error. Make sure your API key is set and you're online.";
        }
    }

    getRoleDescription() {
        const descriptions = {
            'hotel': 'Food donation assistant',
            'ngo': 'Donation management helper',
            'volunteer': 'Task coordination assistant',
            'donor': 'Impact tracking helper'
        };
        return descriptions[this.role] || 'Your AI assistant';
    }

    getGreeting() {
        const greetings = {
            'hotel': `Hi! I'm here to help you donate surplus food to NGOs. What would you like to know?`,
            'ngo': `Hello! I can help you manage incoming donations and coordinate with volunteers. How can I assist?`,
            'volunteer': `Hey there! I'm here to help you find delivery tasks and track your impact. What do you need?`,
            'donor': `Hi! I can help you make meaningful donations and track your impact. What would you like to do?`
        };
        return greetings[this.role] || 'Hello! How can I help you today?';
    }

    getSuggestedQuestions() {
        const ngoMatcherEntry = { text: '🎯 Find Best NGO for my food', question: '__NGO_MATCHER__' };
        const suggestions = {
            'hotel': {
                '🎯 AI NGO Matcher': [ ngoMatcherEntry ],
                'Getting Started': [
                    { text: '🍽️ How do I donate surplus food?', question: 'How do I donate surplus food from my restaurant?' },
                    { text: '📋 What types of food can I donate?', question: 'What types of food are accepted for donation?' },
                    { text: '⏰ How quickly will food be picked up?', question: 'How quickly will volunteers pick up my donated food?' }
                ],
                'Process & Requirements': [
                    { text: '📦 How should I package the food?', question: 'How should I package food for donation pickup?' },
                    { text: '🕐 Can I schedule regular donations?', question: 'Can I set up regular donation schedules?' },
                    { text: '📄 What documentation do I need?', question: 'What documentation or permits do I need for food donation?' }
                ],
                'Impact & Tracking': [
                    { text: '📊 What\'s my donation impact?', question: 'How many people have I fed through my donations?' },
                    { text: '🏆 How do I earn badges?', question: 'How can I earn contributor badges and recognition?' },
                    { text: '📈 Can I see donation history?', question: 'Where can I view my complete donation history?' }
                ]
            },
            'ngo': {
                'Donation Management': [
                    { text: '📥 How do I accept donations?', question: 'How do I accept and manage incoming food donations?' },
                    { text: '🔍 How to find available donations?', question: 'How can I find available food donations in my area?' },
                    { text: '❌ Can I reject unsuitable donations?', question: 'Can I reject donations that don\'t meet our requirements?' }
                ],
                'Volunteer Coordination': [
                    { text: '🚚 How to coordinate with volunteers?', question: 'How do I coordinate pickup and delivery with volunteers?' },
                    { text: '📞 How to contact volunteers directly?', question: 'Can I contact volunteers directly for urgent pickups?' },
                    { text: '⭐ How to rate volunteer performance?', question: 'How do I rate and provide feedback on volunteer performance?' }
                ],
                'Impact & Reporting': [
                    { text: '📊 How to track people fed?', question: 'How do I track and report the number of people we\'ve fed?' },
                    { text: '📸 How to upload impact photos?', question: 'How do I upload photos and videos of food distribution?' },
                    { text: '📋 How to generate reports?', question: 'How can I generate impact reports for donors and stakeholders?' }
                ]
            },
            'volunteer': {
                'Finding Tasks': [
                    { text: '📍 What tasks are available near me?', question: 'What delivery tasks are available in my area?' },
                    { text: '🚗 Tasks matching my vehicle type?', question: 'Show me tasks that match my vehicle type and capacity' },
                    { text: '⚡ Are there any urgent deliveries?', question: 'Are there any urgent or high-priority delivery tasks?' }
                ],
                'Task Management': [
                    { text: '✅ How do I accept a delivery task?', question: 'How do I accept and start a delivery task?' },
                    { text: '📱 How to update task status?', question: 'How do I update the status of my current delivery?' },
                    { text: '🗺️ How to get navigation help?', question: 'Can I get navigation assistance for pickup and delivery locations?' }
                ],
                'Performance & Rewards': [
                    { text: '📈 What\'s my volunteer impact?', question: 'How many deliveries have I completed and people helped?' },
                    { text: '⭐ How is my rating calculated?', question: 'How is my volunteer rating calculated and how can I improve it?' },
                    { text: '🏅 What rewards can I earn?', question: 'What badges and rewards can I earn as a volunteer?' }
                ]
            },
            'donor': {
                '🎯 AI NGO Matcher': [ ngoMatcherEntry ],
                'Making Donations': [
                    { text: '🎂 How to donate for my birthday?', question: 'How can I make a donation to celebrate my birthday?' },
                    { text: '🏢 Which NGO should I choose?', question: 'How do I choose the right NGO for my donation?' },
                    { text: '💰 What donation amounts are suggested?', question: 'What are typical donation amounts for different occasions?' }
                ],
                'Occasions & Celebrations': [
                    { text: '💒 Wedding celebration donations?', question: 'How can I make a donation to celebrate my wedding?' },
                    { text: '🎓 Graduation milestone giving?', question: 'How do I donate to mark my graduation achievement?' },
                    { text: '🎉 Festival and holiday donations?', question: 'How can I make donations during festivals and holidays?' }
                ],
                'Impact & Sharing': [
                    { text: '👥 How many people will I feed?', question: 'How many people will my donation be able to feed?' },
                    { text: '📸 Can I see distribution photos?', question: 'Can I see photos and videos of my donation being distributed?' },
                    { text: '📱 How to share my impact?', question: 'How can I share my donation impact on social media?' }
                ]
            }
        };
        return suggestions[this.role] || {};
    }

    renderSuggestedQuestions() {
        const suggestions = this.getSuggestedQuestions();
        let html = '';
        
        Object.keys(suggestions).forEach(category => {
            html += `
                <div class="suggestion-category">
                    <h5>${category}</h5>
                    ${suggestions[category].map(item => `
                        <div class="suggestion-item" onclick="window.chatbotInstance_${this.role}.askSuggestedQuestion('${item.question.replace(/'/g, "\\'")}')">
                            ${item.text}
                        </div>
                    `).join('')}
                </div>
            `;
        });
        
        return html;
    }

    renderSuggestedQuestions() {
        const suggestions = this.getSuggestedQuestions();
        let html = '';

        Object.keys(suggestions).forEach(category => {
            const isMatcherSection = category === '🎯 AI NGO Matcher';
            html += `<div class="suggestion-category ${isMatcherSection ? 'ngo-matcher-category' : ''}">
                <h5>${category}</h5>
                ${suggestions[category].map(item => `
                    <div class="suggestion-item ${isMatcherSection ? 'ngo-matcher-item' : ''}"
                         onclick="window.chatbotInstance_${this.role}.askSuggestedQuestion('${item.question.replace(/'/g, "\\'")}')">
                        ${item.text}
                    </div>
                `).join('')}
            </div>`;
        });

        return html;
    }

    askSuggestedQuestion(question) {
        if (question === '__NGO_MATCHER__') {
            this.showNGOMatcher();
            return;
        }
        this.addMessage(question, true);
        this.processMessage(question);
    }

    showNGOMatcher() {
        const c = this.getRoleColors();
        const container = document.getElementById('chatMessages');
        const el = document.createElement('div');
        el.className = 'message bot';
        el.id = 'ngoMatcherCard';
        el.innerHTML = `
            <div class="ngo-matcher-card">
                <div class="ngo-matcher-header">
                    <span class="ngo-matcher-icon">🎯</span>
                    <div>
                        <div class="ngo-matcher-title">Find Best NGO</div>
                        <div class="ngo-matcher-sub">AI-powered matching to reduce food waste</div>
                    </div>
                </div>

                <div class="ngo-form-group">
                    <label>Food Type</label>
                    <div class="ngo-chip-row" id="foodTypeChips">
                        <button class="ngo-chip" data-val="Vegetarian">🥦 Veg</button>
                        <button class="ngo-chip" data-val="Non-Vegetarian">🍗 Non-Veg</button>
                        <button class="ngo-chip" data-val="Bakery Items">🍞 Bakery</button>
                        <button class="ngo-chip" data-val="Fruits & Vegetables">🍎 Fruits/Veg</button>
                        <button class="ngo-chip" data-val="Cooked Meals">🍛 Cooked</button>
                        <button class="ngo-chip" data-val="Packaged Food">📦 Packaged</button>
                    </div>
                </div>

                <div class="ngo-form-group">
                    <label>Quantity (meals / kg)</label>
                    <input class="ngo-input" id="ngoQty" type="number" placeholder="e.g. 50" min="1">
                </div>

                <div class="ngo-form-group">
                    <label>Expiry Time</label>
                    <div class="ngo-chip-row" id="expiryChips">
                        <button class="ngo-chip" data-val="1 hour">⚡ 1 hr</button>
                        <button class="ngo-chip" data-val="2-4 hours">🕐 2-4 hrs</button>
                        <button class="ngo-chip" data-val="Same day">📅 Same day</button>
                        <button class="ngo-chip" data-val="Next day">🗓️ Next day</button>
                    </div>
                </div>

                <div class="ngo-form-group">
                    <label>Location / Area</label>
                    <input class="ngo-input" id="ngoLocation" type="text" placeholder="e.g. Mumbai Central">
                </div>

                <button class="ngo-find-btn" id="ngoFindBtn"
                    style="background: linear-gradient(135deg, ${c.primary}, ${c.secondary})">
                    <i class="fa-solid fa-magnifying-glass"></i> Find Best NGO
                </button>
            </div>
        `;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;

        // chip toggle logic
        ['foodTypeChips', 'expiryChips'].forEach(groupId => {
            document.getElementById(groupId)?.querySelectorAll('.ngo-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    document.getElementById(groupId).querySelectorAll('.ngo-chip')
                        .forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                });
            });
        });

        document.getElementById('ngoFindBtn')?.addEventListener('click', () => this.runNGOMatch());
    }

    async runNGOMatch() {
        const foodType  = document.querySelector('#foodTypeChips .ngo-chip.active')?.dataset.val || '';
        const expiry    = document.querySelector('#expiryChips .ngo-chip.active')?.dataset.val || '';
        const qty       = document.getElementById('ngoQty')?.value || '';
        const location  = document.getElementById('ngoLocation')?.value || '';

        if (!foodType || !qty || !expiry) {
            this.addMessage('⚠️ Please fill in food type, quantity, and expiry time to find the best NGO match.');
            return;
        }

        // Remove the form card
        document.getElementById('ngoMatcherCard')?.remove();

        this.addMessage(`🔍 Finding best NGO for: **${foodType}**, **${qty} meals**, expires in **${expiry}**${location ? `, near **${location}**` : ''}...`, true);

        this.showTyping();

        const prompt = `You are an NGO matching assistant for NourishNet food donation platform.

A donor has the following food to donate:
- Food Type: ${foodType}
- Quantity: ${qty} meals/kg
- Expiry Time: ${expiry}
- Location: ${location || 'Not specified'}

Based on this, recommend the 3 best NGO types/categories that would be most suitable. For each NGO recommendation provide:
1. NGO name (use realistic Indian NGO names like Akshaya Patra, Robin Hood Army, Feeding India, Goonj, No Food Waste, etc.)
2. Match percentage (realistic, between 75-98%)
3. Why they are a good match (1 sentence)
4. Capacity they can handle
5. Typical pickup time

Format your response EXACTLY like this for each NGO:
🏆 [NGO Name] — [Match]% match
✅ Why: [reason]
📦 Capacity: [capacity]
⏱️ Pickup: [time]

After the 3 NGOs, add a short recommendation on which one to choose first.
Keep the total response under 120 words.`;

        const response = await this.getAIResponse(prompt);
        this.hideTyping();
        this.addMessage(response);

        // Show action buttons
        const container = document.getElementById('chatMessages');
        const actEl = document.createElement('div');
        actEl.className = 'message bot';
        actEl.innerHTML = `
            <div class="ngo-action-row">
                <button class="ngo-action-btn" onclick="window.chatbotInstance_${this.role}.showNGOMatcher()">
                    🔄 Try Again
                </button>
                <button class="ngo-action-btn ngo-action-primary"
                    style="background: linear-gradient(135deg, ${this.getRoleColors().primary}, ${this.getRoleColors().secondary})"
                    onclick="window.chatbotInstance_${this.role}.addMessage('How do I contact the recommended NGO?', true); window.chatbotInstance_${this.role}.processMessage('How do I contact and connect with the recommended NGO for food donation?')">
                    📞 How to Connect
                </button>
            </div>
        `;
        container.appendChild(actEl);
        container.scrollTop = container.scrollHeight;
    }
}

// Auto-initialize chatbot if role is specified
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatbot-container');
    if (chatContainer && window.userRole) {
        const chatbot = new NourishNetChatbot(window.userRole, 'chatbot-container');
        // Store globally for suggested questions
        window[`chatbotInstance_${window.userRole}`] = chatbot;
    }
});
