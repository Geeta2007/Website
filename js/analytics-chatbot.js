// Analytics-focused chatbot for NourishNet home page
class AnalyticsChatbot {
    constructor(containerId) {
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
            <div class="analytics-chat-toggle" id="analyticsChatToggle">
                <i class="fa-solid fa-chart-line"></i>
                <span class="chat-pulse"></span>
            </div>

            <!-- Chat Window -->
            <div class="analytics-chat-window" id="analyticsChatWindow">
                <div class="analytics-chat-header">
                    <div class="chat-avatar">
                        <i class="fa-solid fa-chart-pie"></i>
                    </div>
                    <div class="chat-info">
                        <h4>NourishNet Analytics</h4>
                        <p>Donation insights & improvements</p>
                    </div>
                    <button class="analytics-settings-btn" id="analyticsSettingsBtn" title="Customize chatbot">
                        <i class="fa-solid fa-sliders"></i>
                    </button>
                    <button class="chat-close" id="analyticsChatClose">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>

                <!-- Settings Panel -->
                <div class="analytics-settings-panel" id="analyticsSettingsPanel">
                    <div class="settings-title"><i class="fa-solid fa-sliders"></i> Customize Chatbot</div>

                    <div class="settings-group">
                        <label>Width</label>
                        <div class="settings-row">
                            <input type="range" id="aSettingWidth" min="280" max="600" value="500" step="10">
                            <span id="aSettingWidthVal">500px</span>
                        </div>
                    </div>

                    <div class="settings-group">
                        <label>Height</label>
                        <div class="settings-row">
                            <input type="range" id="aSettingHeight" min="350" max="800" value="600" step="10">
                            <span id="aSettingHeightVal">600px</span>
                        </div>
                    </div>

                    <div class="settings-group">
                        <label>Position</label>
                        <div class="settings-pos-grid">
                            <button class="pos-btn" data-apos="bottom-left">↙ Bottom Left</button>
                            <button class="pos-btn active" data-apos="bottom-center">↓ Bottom Center</button>
                            <button class="pos-btn" data-apos="bottom-right">↘ Bottom Right</button>
                        </div>
                    </div>

                    <button class="settings-reset" id="aSettingsReset">↺ Reset to Default</button>
                </div>
                
                <div class="analytics-chat-messages" id="analyticsChatMessages">
                    <div class="message bot">
                        <div class="message-bubble">
                            👋 Hi! I'm your analytics assistant. I can help you understand donation patterns, impact metrics, and suggest improvements for the platform.
                        </div>
                    </div>
                    
                    <div class="message bot">
                        <div class="message-bubble">
                            Here are some things you can ask me about:
                        </div>
                        <div class="suggested-questions">
                            <div class="suggestion-category">
                                <h5><i class="fa-solid fa-chart-bar"></i> Recent Analytics</h5>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('What are the latest donation statistics?')">
                                    📊 Latest donation statistics
                                </div>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('Which NGOs received the most donations this month?')">
                                    🏆 Top performing NGOs
                                </div>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('What food types are donated most frequently?')">
                                    🍽️ Popular food categories
                                </div>
                            </div>
                            
                            <div class="suggestion-category">
                                <h5><i class="fa-solid fa-lightbulb"></i> Improvements</h5>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('How can we reduce food waste in the system?')">
                                    ♻️ Reduce food waste
                                </div>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('What improvements can increase volunteer participation?')">
                                    🚀 Boost volunteer engagement
                                </div>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('How to optimize delivery routes?')">
                                    🗺️ Optimize delivery efficiency
                                </div>
                            </div>
                            
                            <div class="suggestion-category">
                                <h5><i class="fa-solid fa-target"></i> Impact Analysis</h5>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('How many people were fed this week?')">
                                    👥 Weekly impact summary
                                </div>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('What is our carbon footprint reduction?')">
                                    🌱 Environmental impact
                                </div>
                                <div class="suggestion-item" onclick="analyticsBot.askQuestion('Show me donation trends over time')">
                                    📈 Donation trends
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-chat-input">
                    <input type="text" id="analyticsChatInput" placeholder="Ask about donations, analytics..." />
                    <div class="analytics-voice-btn coming-soon-tip" data-tip="Voice input — coming soon!">
                        <i class="fa-solid fa-waveform-lines"></i>
                        <span>Voice</span>
                    </div>
                    <button id="analyticsChatSend">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>

                <!-- Bottom Nav -->
                <div class="analytics-bottom-nav">
                    <div class="analytics-nav-item active">
                        <i class="fa-solid fa-message"></i>
                        <span>Chat</span>
                    </div>
                    <div class="analytics-nav-item coming-soon-tip" data-tip="Voice mode — coming soon!">
                        <i class="fa-solid fa-waveform-lines"></i>
                        <span>Voice</span>
                    </div>
                    <div class="analytics-nav-item coming-soon-tip" data-tip="Chat history — coming soon!">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        <span>History</span>
                    </div>
                </div>
            </div>
        `;

        this.addAnalyticsStyles();
    }

    addAnalyticsStyles() {
        if (document.getElementById('analytics-chatbot-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'analytics-chatbot-styles';
        styles.textContent = `
            /* ── Analytics capsule toggle ── */
            .analytics-chat-toggle {
                position: fixed;
                bottom: 28px;
                left: 50%;
                transform: translateX(-50%);
                display: inline-flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0 1.6rem;
                height: 52px;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border-radius: 999px;
                cursor: pointer;
                box-shadow: 0 6px 24px rgba(139,92,246,0.45);
                z-index: 1000;
                transition: all 0.3s ease;
                white-space: nowrap;
                border: none;
                outline: none;
            }

            .analytics-chat-toggle:hover {
                transform: translateX(-50%) translateY(-3px);
                box-shadow: 0 10px 32px rgba(139,92,246,0.6);
            }

            .analytics-chat-toggle i {
                color: white;
                font-size: 1.2rem;
            }

            .analytics-chat-toggle::after {
                content: 'Analytics AI';
                color: white;
                font-size: 0.88rem;
                font-weight: 700;
                letter-spacing: 0.02em;
            }

            .chat-pulse {
                width: 9px;
                height: 9px;
                background: #10b981;
                border-radius: 50%;
                animation: analyticsPulse 2s infinite;
                flex-shrink: 0;
            }

            @keyframes analyticsPulse {
                0%,100% { transform: scale(1); opacity: 1; }
                50%      { transform: scale(1.5); opacity: 0.5; }
            }

            .analytics-chat-window {
                position: fixed;
                bottom: 96px;
                left: 50%;
                transform: translateX(-50%);
                width: 500px;
                height: 600px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                display: none;
                flex-direction: column;
                z-index: 1001;
                overflow: hidden;
                border: 2px solid #8b5cf633;
            }

            .analytics-chat-window.open {
                display: flex;
                animation: slideUpAnalytics 0.35s ease;
            }

            @keyframes slideUpAnalytics {
                from { transform: translateX(-50%) translateY(24px); opacity: 0; }
                to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
            }

            .analytics-chat-header {
                background: linear-gradient(135deg, #1f2937, #111827);
                color: white;
                padding: 1.25rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .chat-avatar {
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
            }

            .chat-info h4 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 700;
            }

            .chat-info p {
                margin: 0;
                font-size: 0.85rem;
                opacity: 0.8;
            }

            .chat-close {
                margin-left: auto;
                background: rgba(255,255,255,0.15);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
            }

            .chat-close:hover {
                background: rgba(255,255,255,0.25);
            }

            .analytics-chat-messages {
                flex: 1;
                padding: 1.25rem;
                overflow-y: auto;
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            }

            .message {
                margin-bottom: 1.25rem;
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
                max-width: 85%;
                padding: 1rem 1.25rem;
                border-radius: 18px;
                font-size: 0.95rem;
                line-height: 1.5;
            }

            .message.bot .message-bubble {
                background: white;
                color: #1f2937;
                border-bottom-left-radius: 6px;
                box-shadow: 0 3px 12px rgba(0,0,0,0.08);
                border: 1px solid #e5e7eb;
            }

            .message.user .message-bubble {
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                color: white;
                border-bottom-right-radius: 6px;
            }

            .suggested-questions {
                margin-top: 1rem;
                max-width: 100%;
            }

            .suggestion-category {
                margin-bottom: 1.25rem;
                background: #f8fafc;
                border-radius: 12px;
                padding: 1rem;
                border: 1px solid #e2e8f0;
            }

            .suggestion-category h5 {
                margin: 0 0 0.75rem 0;
                font-size: 0.9rem;
                font-weight: 600;
                color: #374151;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .suggestion-category h5 i {
                color: #8b5cf6;
            }

            .suggestion-item {
                padding: 0.75rem;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 0.85rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .suggestion-item:hover {
                border-color: #8b5cf6;
                background: #faf5ff;
                transform: translateX(3px);
            }

            .suggestion-item:last-child {
                margin-bottom: 0;
            }

            .analytics-chat-input {
                padding: 0.75rem 1rem;
                background: white;
                border-top: 2px solid #f1f5f9;
                display: flex;
                align-items: center;
                gap: 0.6rem;
            }

            .analytics-chat-input input {
                flex: 1;
                padding: 0.75rem 1rem;
                border: 2px solid #e5e7eb;
                border-radius: 25px;
                outline: none;
                font-size: 0.88rem;
                transition: all 0.3s;
            }

            .analytics-chat-input input:focus {
                border-color: #8b5cf6;
                box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
            }

            /* Voice capsule in analytics input */
            .analytics-voice-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                padding: 0 0.85rem;
                height: 38px;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border-radius: 999px;
                color: white;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                white-space: nowrap;
                flex-shrink: 0;
                transition: all 0.2s;
            }

            .analytics-voice-btn:hover {
                opacity: 0.88;
                transform: translateY(-1px);
            }

            .analytics-voice-btn i {
                font-size: 0.85rem;
            }

            .analytics-chat-input button {
                width: 38px;
                height: 38px;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                flex-shrink: 0;
            }

            .analytics-chat-input button:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
            }

            /* Analytics bottom nav */
            .analytics-bottom-nav {
                display: flex;
                background: white;
                border-top: 1px solid #f1f5f9;
                padding: 0.5rem 0 0.4rem;
            }

            .analytics-nav-item {
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

            .analytics-nav-item i {
                font-size: 1.1rem;
            }

            .analytics-nav-item.active {
                color: #8b5cf6;
            }

            .analytics-nav-item:not(.active):hover {
                color: #64748b;
            }

            /* "Coming soon" tooltip — shared */
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

            @media (max-width: 768px) {
                .analytics-chat-toggle {
                    padding: 0 1.2rem;
                    height: 46px;
                    font-size: 0.8rem;
                }
                
                .analytics-chat-window {
                    width: calc(100vw - 32px);
                    height: 70vh;
                    bottom: 86px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            /* Analytics settings button */
            .analytics-settings-btn {
                background: rgba(255,255,255,0.15);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
                transition: background 0.2s;
            }
            .analytics-settings-btn:hover { background: rgba(255,255,255,0.3); }

            /* Analytics settings panel */
            .analytics-settings-panel {
                display: none;
                position: absolute;
                top: 72px;
                left: 0; right: 0;
                background: white;
                border-bottom: 2px solid #f1f5f9;
                padding: 1rem 1.1rem;
                z-index: 10;
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            }
            .analytics-settings-panel.open { display: block; }

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
                accent-color: #8b5cf6;
                height: 4px;
                cursor: pointer;
            }
            .settings-row span {
                font-size: 0.78rem;
                font-weight: 600;
                color: #8b5cf6;
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
            .pos-btn:hover  { border-color: #8b5cf6; color: #8b5cf6; }
            .pos-btn.active { border-color: #8b5cf6; background: #8b5cf618; color: #8b5cf6; }

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
        `;
        document.head.appendChild(styles);
    }

    bindEvents() {
        const toggle   = document.getElementById('analyticsChatToggle');
        const close    = document.getElementById('analyticsChatClose');
        const send     = document.getElementById('analyticsChatSend');
        const input    = document.getElementById('analyticsChatInput');
        const settBtn  = document.getElementById('analyticsSettingsBtn');
        const widthR   = document.getElementById('aSettingWidth');
        const heightR  = document.getElementById('aSettingHeight');
        const resetBtn = document.getElementById('aSettingsReset');

        toggle?.addEventListener('click', () => this.toggleChat());
        close?.addEventListener('click',  () => this.closeChat());
        send?.addEventListener('click',   () => this.sendMessage());
        input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });

        // Settings toggle
        settBtn?.addEventListener('click', () => {
            document.getElementById('analyticsSettingsPanel')?.classList.toggle('open');
        });

        // Width slider
        widthR?.addEventListener('input', () => {
            const v = widthR.value;
            document.getElementById('aSettingWidthVal').textContent = v + 'px';
            document.getElementById('analyticsChatWindow').style.width = v + 'px';
        });

        // Height slider
        heightR?.addEventListener('input', () => {
            const v = heightR.value;
            document.getElementById('aSettingHeightVal').textContent = v + 'px';
            document.getElementById('analyticsChatWindow').style.height = v + 'px';
        });

        // Position buttons
        document.querySelectorAll('[data-apos]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-apos]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applyPosition(btn.dataset.apos);
            });
        });

        // Reset
        resetBtn?.addEventListener('click', () => {
            const win = document.getElementById('analyticsChatWindow');
            const tog = document.getElementById('analyticsChatToggle');
            win.style.width  = '500px';
            win.style.height = '600px';
            widthR.value  = 500;
            heightR.value = 600;
            document.getElementById('aSettingWidthVal').textContent  = '500px';
            document.getElementById('aSettingHeightVal').textContent = '600px';
            document.querySelectorAll('[data-apos]').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-apos="bottom-center"]')?.classList.add('active');
            this.applyPosition('bottom-center');
        });
    }

    applyPosition(pos) {
        const win = document.getElementById('analyticsChatWindow');
        const tog = document.getElementById('analyticsChatToggle');
        win.style.left = win.style.right = win.style.transform = '';
        tog.style.left = tog.style.right = tog.style.transform = '';

        if (pos === 'bottom-center') {
            win.style.left = '50%'; win.style.transform = 'translateX(-50%)';
            tog.style.left = '50%'; tog.style.transform = 'translateX(-50%)';
        } else if (pos === 'bottom-left') {
            win.style.left = '20px'; tog.style.left = '20px';
        } else if (pos === 'bottom-right') {
            win.style.right = '20px'; tog.style.right = '20px';
        }
    }

    toggleChat() {
        const window = document.getElementById('analyticsChatWindow');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('open');
        } else {
            window.classList.remove('open');
        }
    }

    closeChat() {
        const window = document.getElementById('analyticsChatWindow');
        window.classList.remove('open');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('analyticsChatInput');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, true);
            input.value = '';
            this.processMessage(message);
        }
    }

    askQuestion(question) {
        this.addMessage(question, true);
        this.processMessage(question);
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
        const messagesContainer = document.getElementById('analyticsChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        const rendered = isUser ? content : this.renderMarkdown(content);
        messageDiv.innerHTML = `<div class="message-bubble">${rendered}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async processMessage(message) {
        this.showTyping();
        const response = await this.getAnalyticsResponse(message);
        this.hideTyping();
        this.addMessage(response);
    }

    showTyping() {
        const container = document.getElementById('analyticsChatMessages');
        const el = document.createElement('div');
        el.className = 'message bot';
        el.id = 'analyticsTyping';
        el.innerHTML = `<div class="message-bubble" style="padding:0.6rem 1rem;display:flex;gap:4px;align-items:center">
            <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingDot 1.2s infinite 0s"></span>
            <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingDot 1.2s infinite 0.2s"></span>
            <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingDot 1.2s infinite 0.4s"></span>
        </div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        // inject keyframe once
        if (!document.getElementById('typingKeyframe')) {
            const s = document.createElement('style');
            s.id = 'typingKeyframe';
            s.textContent = `@keyframes typingDot{0%,80%,100%{transform:scale(0.7);opacity:0.5}40%{transform:scale(1);opacity:1}}`;
            document.head.appendChild(s);
        }
    }

    hideTyping() {
        document.getElementById('analyticsTyping')?.remove();
    }

    async getAnalyticsResponse(message) {
        // ─────────────────────────────────────────────────────────────
        // PASTE YOUR GEMINI API KEY BELOW
        // Get a free key at: https://aistudio.google.com/app/apikey
        // ─────────────────────────────────────────────────────────────
        const GEMINI_API_KEY = 'AIzaSyBgS5JVpVoH0t7rF-fxCI0BzEUZ2jDOQX8';

        // Scrape visible page text as context (capped to avoid token limits)
        const pageContext = document.body.innerText
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 4000);

        const prompt = `You are an AI assistant for NourishNet, a food donation platform that connects hotels, restaurants, and individual donors with NGOs and volunteers to reduce food waste and feed people in need.

The page context below is supplementary — use it when relevant, but your PRIMARY job is to give complete, knowledgeable answers using everything you know about food donation, NGOs, volunteering, food safety, nutrition, sustainability, and community impact.

Page context (use as reference):
--- PAGE CONTENT ---
${pageContext}
--- END ---

Important instructions:
- ALWAYS give complete, full answers — keep responses between 50-80 words, never cut off mid-sentence
- Use your broad general knowledge freely — don't limit yourself to the page
- Format responses clearly using bullet points or short paragraphs when helpful
- Be warm, friendly, and use emojis occasionally
- Only avoid making up specific NourishNet platform statistics not shown in the page

User question: ${message}`;

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
                if (code === 400) return "⚠️ Invalid API key — double-check it in <b>js/analytics-chatbot.js</b>.";
                if (code === 429) return "⚠️ Quota exceeded (429). Your free tier limit is hit — wait a minute and try again, or create a new key at <a href='https://aistudio.google.com/app/apikey' target='_blank'>aistudio.google.com</a>.";
                if (code === 403) return "⚠️ API key doesn't have permission (403). Make sure the Gemini API is enabled in your Google Cloud project.";
                return `⚠️ Gemini error ${code}: ${msg}`;
            }

            const data = await res.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text
                || "I couldn't generate a response. Please try again.";

        } catch (error) {
            console.error('Gemini fetch error:', error);
            if (window.location.protocol === 'file:') {
                return "⚠️ You're opening this file directly (file://). Please serve it with a local server — in VS Code, install the <b>Live Server</b> extension and click <b>Go Live</b> at the bottom right. Then reopen the page via <code>http://localhost:...</code>";
            }
            return "⚠️ Network error. Make sure your API key is set and you're online.";
        }
    }
}

// Initialize analytics chatbot
let analyticsBot;
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('analytics-chatbot-container');
    if (chatContainer) {
        analyticsBot = new AnalyticsChatbot('analytics-chatbot-container');
    }
});