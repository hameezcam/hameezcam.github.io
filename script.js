/* ----------------------------------------------------
   Hameez Cambal - Cybersecurity Portfolio Script
   Interactive CLI, Plexus Canvas, Modals, & Form
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Current date display in terminal
    updateTerminalDate();

    // Init Component Managers
    initPlexusCanvas();
    initTypewriter();
    initMobileNav();
    initHeaderScroll();
    initTerminal();
    initSkillsTabs();
    initProjectsFilter();
    initModals();
    initContactForm();
    initBackToTop();
    initCVDownload();
});

// Global init export for Next.js hydration
window.initCyberApp = function() {
    updateTerminalDate();
    initPlexusCanvas();
    initTypewriter();
    initMobileNav();
    initHeaderScroll();
    initTerminal();
    initSkillsTabs();
    initProjectsFilter();
    initModals();
    initContactForm();
    initBackToTop();
    initCVDownload();
};

/* --- Update Date in Terminal --- */
function updateTerminalDate() {
    const dates = document.querySelectorAll('.current-date-placeholder');
    const now = new Date();
    dates.forEach(el => {
        el.textContent = now.toString().split(' GMT')[0];
    });
}

/* --- Canvas Particle Plexus System --- */
function initPlexusCanvas() {
    const canvas = document.getElementById('plexus-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Keep particles inside canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            
            // Draw particle
            this.draw();
        }
    }

    // Initialize particle array
    function initParticles() {
        particlesArray = [];
        // Calculate density based on canvas size
        let numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
        if (numberOfParticles > 120) numberOfParticles = 120; // Cap to optimize rendering
        if (numberOfParticles < 30) numberOfParticles = 30;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Assign theme colors
            let color = 'rgba(0, 240, 255, 0.25)'; // Cyber blue
            if (Math.random() > 0.5) {
                color = 'rgba(189, 0, 255, 0.25)'; // Cyber purple
            }
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = ((dx * dx) + (dy * dy));
                
                let maxDist = 9000; // 95px distance squared
                if (distance < maxDist) {
                    opacityValue = 1 - (distance / maxDist);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
            
            // Connect to mouse
            if (mouse.x && mouse.y) {
                let mdx = particlesArray[a].x - mouse.x;
                let mdy = particlesArray[a].y - mouse.y;
                let mDistance = ((mdx * mdx) + (mdy * mdy));
                
                let mouseMaxDist = 14400; // 120px distance squared
                if (mDistance < mouseMaxDist) {
                    let mOpacity = 1 - (mDistance / mouseMaxDist);
                    ctx.strokeStyle = `rgba(189, 0, 255, ${mOpacity * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();

    // Adjust particle count on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initParticles();
        }, 200);
    });
}

/* --- Hero Section Professional Role Typing Animation --- */
function initTypewriter() {
    const textTarget = document.getElementById('role-typewriter-text') || document.getElementById('typed-text');
    if (!textTarget) return;

    const roles = [
        "Cybersecurity Analyst",
        "Penetration Tester",
        "Security Operations Analyst",
        "Vulnerability Assessment Analyst",
        "Security Assessment Analyst",
        "Threat Detection Analyst",
        "Incident Response Analyst",
        "Security Operations Specialist",
        "Network Security Analyst",
        "Microsoft Security Analyst",
        "Cybersecurity Tools Developer"
    ];

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        textTarget.textContent = "Cybersecurity Analyst";
        return;
    }

    let currentRoleIdx = 0;
    let currentCharIdx = roles[0].length;
    let isDeleting = true; // starts on first role, pauses, then cycles
    let typingSpeed = 65;

    textTarget.textContent = roles[0];

    function type() {
        const fullText = roles[currentRoleIdx];

        if (isDeleting) {
            textTarget.textContent = fullText.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typingSpeed = 35; // smooth backspacing speed
        } else {
            textTarget.textContent = fullText.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typingSpeed = 65; // realistic smooth typing
        }

        // Handle transitions
        if (!isDeleting && currentCharIdx === fullText.length) {
            typingSpeed = 1800; // Pause 1.8 seconds after role is fully typed
            isDeleting = true;
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 350; // Short pause before starting next role
        }

        setTimeout(type, typingSpeed);
    }

    // Initial pause on Cybersecurity Analyst before beginning the cycle
    setTimeout(type, 1800);
}

/* --- Mobile Navigation Hamburger & Drawer --- */
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-toggle-active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-toggle-active');
        });
    });
}

/* --- Header Sticky & Active Link Spy --- */
function initHeaderScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Auto-highlight active link based on current page URL
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = (currentPath.split('/').pop() || 'index.html');
    navLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Sticky Header Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active scrollspy highlight ONLY if nav contains anchor links matching sections on the same page
        const hasAnchorNav = Array.from(navLinks).some(link => link.getAttribute('href')?.startsWith('#'));
        if (hasAnchorNav) {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(sec => {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                
                if (scrollPos >= top && scrollPos < top + height) {
                    currentSectionId = sec.getAttribute('id');
                }
            });
            
            if (currentSectionId) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href')?.startsWith('#')) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSectionId}`) {
                            link.classList.add('active');
                        }
                    }
                });
            }
        }
    });
}

/* --- Skills Tab Panel Switcher --- */
function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Toggle buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/* --- Projects Filter Matrix --- */
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Toggle buttons active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards
            projectCards.forEach(card => {
                const cardCategories = (card.getAttribute('data-category') || '').split(/\s+/);
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --- Interactive Security Operations Terminal (SOC Simulation) --- */
function initTerminal() {
    const termBody = document.getElementById('soc-terminal-body') || document.getElementById('terminal-body');
    const termInput = document.getElementById('soc-terminal-input') || document.getElementById('terminal-input');
    const termWindow = document.getElementById('soc-terminal-window') || document.querySelector('.soc-terminal-window');
    const closeBtn = document.getElementById('soc-terminal-close');
    
    if (!termBody || !termInput) return;

    // Focus input on terminal click
    if (termWindow) {
        termWindow.addEventListener('click', (e) => {
            // Don't focus if user selected text or clicked a link
            if (window.getSelection().toString().length === 0 && e.target.tagName !== 'A') {
                termInput.focus();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            termBody.innerHTML = '';
            appendLine('<span class="term-cmd">[SESSION CLEARED]</span> Type <span class="term-cmd">help</span> for available commands.');
            termInput.focus();
        });
    }

    function appendLine(htmlContent, className = '') {
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.innerHTML = htmlContent;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    // Initial sequence script definition
    const initialSequence = [
        { type: 'cmd', text: '$ initialize_security_profile', delay: 80 },
        { type: 'blank', delay: 120 },
        { type: 'log', text: '[+] Security profile loaded', delay: 100 },
        { type: 'log', text: '[+] Analyst: Hameez Cambal', delay: 90 },
        { type: 'log', text: '[+] Role: Cybersecurity Analyst', delay: 90 },
        { type: 'log', text: '[+] Focus: Security Operations', delay: 80 },
        { type: 'log', text: '[+] Focus: Threat Detection', delay: 80 },
        { type: 'log', text: '[+] Focus: Incident Response', delay: 80 },
        { type: 'log', text: '[+] Focus: Security Assessment', delay: 80 },
        { type: 'blank', delay: 140 },
        { type: 'cmd', text: '$ security_status', delay: 80 },
        { type: 'blank', delay: 120 },
        { type: 'status', text: '<span class="term-online">[ONLINE]</span> SIEM Monitoring', delay: 80 },
        { type: 'status', text: '<span class="term-online">[ONLINE]</span> Threat Detection', delay: 80 },
        { type: 'status', text: '<span class="term-online">[ONLINE]</span> Security Assessment', delay: 80 },
        { type: 'status', text: '<span class="term-online">[ONLINE]</span> Network Security', delay: 80 },
        { type: 'status', text: '<span class="term-online">[ONLINE]</span> Microsoft Security', delay: 80 },
        { type: 'status', text: '<span class="term-online">[ONLINE]</span> Security Tool Development', delay: 80 },
        { type: 'blank', delay: 150 },
        { type: 'cmd', text: '$ current_mode', delay: 80 },
        { type: 'blank', delay: 120 },
        { type: 'mode', text: '<span class="term-mode">MONITOR → DETECT → INVESTIGATE → ASSESS → DEFEND</span>', delay: 120 },
        { type: 'blank', delay: 100 }
    ];

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render initial sequence
    if (prefersReducedMotion) {
        initialSequence.forEach(item => {
            if (item.type === 'blank') {
                appendLine('&nbsp;');
            } else if (item.type === 'cmd') {
                appendLine(`<span class="term-cmd">${item.text}</span>`);
            } else {
                appendLine(item.text, `term-${item.type}`);
            }
        });
        startRotatingEvents();
    } else {
        let stepIdx = 0;
        function runNextStep() {
            if (stepIdx >= initialSequence.length) {
                startRotatingEvents();
                return;
            }
            const item = initialSequence[stepIdx];
            stepIdx++;

            if (item.type === 'blank') {
                appendLine('&nbsp;');
                setTimeout(runNextStep, item.delay || 100);
            } else if (item.type === 'cmd') {
                // Smooth typewriter effect for command input
                typeCommand(item.text, () => {
                    setTimeout(runNextStep, 150);
                });
            } else {
                appendLine(item.text, `term-${item.type}`);
                setTimeout(runNextStep, item.delay || 80);
            }
        }

        function typeCommand(fullCmd, onComplete) {
            const line = document.createElement('div');
            line.className = 'term-line term-cmd';
            termBody.appendChild(line);
            
            let charIdx = 0;
            const typeInterval = setInterval(() => {
                charIdx++;
                line.textContent = fullCmd.slice(0, charIdx);
                termBody.scrollTop = termBody.scrollHeight;
                if (charIdx >= fullCmd.length) {
                    clearInterval(typeInterval);
                    onComplete();
                }
            }, 25);
        }

        runNextStep();
    }

    // Rotating simulated security events
    let eventTimer = null;
    function startRotatingEvents() {
        if (eventTimer) clearInterval(eventTimer);
        
        const simulatedEvents = [
            '[SIMULATION MODE] [MONITOR] Security telemetry synchronized',
            '[SIMULATION MODE] [DETECT] Authentication anomaly identified',
            '[SIMULATION MODE] [ANALYZE] Event correlation in progress',
            '[SIMULATION MODE] [ASSESS] Security control review initiated',
            '[SIMULATION MODE] [DEFEND] Recommended response generated',
            '[SIMULATION MODE] [SIEM] New event stream received',
            '[SIMULATION MODE] [THREAT] Suspicious authentication pattern detected',
            '[SIMULATION MODE] [NETWORK] Firewall telemetry analyzed',
            '[SIMULATION MODE] [IDENTITY] Authentication activity reviewed',
            '[SIMULATION MODE] [EMAIL] Phishing indicators analyzed',
            '[SIMULATION MODE] [ENDPOINT] Security telemetry evaluated'
        ];
        let eventIdx = 0;

        eventTimer = setInterval(() => {
            // Prune excess lines to preserve performance
            if (termBody.children.length > 50) {
                const firstChild = termBody.firstElementChild;
                if (firstChild) firstChild.remove();
            }

            const evtText = simulatedEvents[eventIdx % simulatedEvents.length];
            eventIdx++;
            appendLine(evtText, 'term-sim-event');
        }, 12000);
    }

    // Predefined safe commands dictionary
    const commands = {
        'help': `Available commands:
  <span class="term-cmd">about</span>       → Analyst profile & background
  <span class="term-cmd">skills</span>      → Security capabilities
  <span class="term-cmd">projects</span>    → Featured security projects
  <span class="term-cmd">experience</span>  → Professional experience
  <span class="term-cmd">certs</span>       → Professional certifications
  <span class="term-cmd">contact</span>     → Contact information
  <span class="term-cmd">status</span>      → Security capability status
  <span class="term-cmd">whoami</span>      → Current analyst profile
  <span class="term-cmd">clear</span>       → Clear terminal output`,

        'whoami': `Hameez Cambal
Cybersecurity Analyst
Security Operations • Threat Detection • Defense
SuperCAD | Dubai, UAE`,

        'skills': `--- TECHNICAL CAPABILITIES ---
• Security Operations (SOC, SIEM, Alert Triage, Incident Response)
• Threat Detection (Threat Hunting, Detection Engineering, MITRE ATT&CK)
• Security Assessment (VAPT, Posture Auditing, Risk Assessment)
• Microsoft Security (Sentinel, Defender, M365 Security, Entra ID)
• Network Security (Check Point, Fortinet, WatchGuard, Cisco Meraki)
• Cybersecurity Tool Development (Python, RBAC, Multi-Tenant Systems)

→ <a href="skills.html" class="term-link">Open Full Skills Page &rarr;</a>`,

        'projects': `--- FEATURED SECURITY WORK ---
[01] Port Scanner (Network Security • Tool Development)
[02] Cybersecurity Assessment & Reporting SaaS (Assessment • Reporting)
[03] SOC Detection Engineering & MITRE ATT&CK Mapping (Threat Detection)
[04] SIEM-Based SOC Lab (Wazuh • Security Monitoring)
[05] In-House SOC Development (Architecture • Incident Response)
[06] Active Directory Red Team Lab (Red Teaming • Penetration Testing)

→ <a href="projects.html" class="term-link">Open Projects Page &rarr;</a>`,

        'experience': `--- PROFESSIONAL EXPERIENCE ---
Role: Cybersecurity Analyst
Company: SuperCAD
Location: Dubai, UAE
Period: 2026 – Present

Focus: Security operations, SIEM monitoring, threat detection, Microsoft security, network security, and security assessments.

→ <a href="experience.html" class="term-link">Open Experience Page &rarr;</a>`,

        'certs': `--- PROFESSIONAL CERTIFICATIONS ---
• Microsoft Copilot for Security — Completed, 2026
• CEH — In Progress

→ <a href="certifications.html" class="term-link">Open Certifications Page &rarr;</a>`,

        'status': `--- SECURITY CAPABILITY STATUS ---
[OK] Security Operations
[OK] SIEM & Monitoring
[OK] Threat Detection
[OK] Incident Response
[OK] Vulnerability Assessment
[OK] Microsoft Security
[OK] Network Security
[OK] Security Tool Development`,

        'contact': `Interested in connecting?
Reach out for security operations, assessments, or professional inquiries.

→ <a href="contact.html" class="term-link">Open Contact Page &rarr;</a>
• Email: <a href="mailto:hameez.cam@gmail.com" class="term-link">hameez.cam@gmail.com</a>
• LinkedIn: <a href="https://www.linkedin.com/in/hameez-cambal-988a2b314/" target="_blank" class="term-link">LinkedIn Profile</a>
• GitHub: <a href="https://github.com/hameezcam" target="_blank" class="term-link">GitHub Profile</a>`,

        'about': `Hameez Cambal
Cybersecurity Analyst based in Dubai, UAE.
Focusing on security operations, threat detection, incident response, vulnerability assessment, and building practical cybersecurity solutions.

→ <a href="about.html" class="term-link">Open About Page &rarr;</a>`,

        // Easter eggs
        'sudo': `Nice try.

Privilege escalation is not available in this portfolio.`,

        'scan': `PORTFOLIO SCAN INITIATED...

[OPEN] Security Operations
[OPEN] Threat Detection
[OPEN] Incident Response
[OPEN] Security Assessment
[OPEN] Cybersecurity Tool Development

No unauthorized activity detected.`,

        'matrix': `This portfolio has standards.

Matrix mode denied.`,

        'hack': `Ethical security testing only.

Try:
projects
skills
status`
    };

    // Keyboard input submission
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawVal = termInput.value;
            const inputVal = rawVal.trim().toLowerCase();
            termInput.value = '';

            if (!inputVal) return;

            // Echo input
            appendLine(`<span class="prompt">visitor@hameez:~$</span> ${escapeHtml(rawVal)}`, 'term-echo');

            if (inputVal === 'clear') {
                termBody.innerHTML = '';
                return;
            }

            if (commands[inputVal]) {
                appendLine(commands[inputVal]);
            } else {
                appendLine(`Command not recognized: "${escapeHtml(rawVal)}"<br>Type <span class="term-cmd">help</span> to view available commands.`, 'term-error');
            }
        }
    });

    function escapeHtml(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

/* --- Project Detail & Certification Modals --- */
function initModals() {
    const projectModal = document.getElementById('project-modal');
    const projectModalBody = document.getElementById('project-modal-body');
    const projectClose = document.getElementById('project-modal-close');
    
    const certModal = document.getElementById('cert-modal');
    const certModalBody = document.getElementById('cert-modal-body');
    const certClose = document.getElementById('cert-modal-close');
    
    const blogModal = document.getElementById('blog-modal');
    const blogModalBody = document.getElementById('blog-modal-body');
    const blogClose = document.getElementById('blog-modal-close');

    // Projects Database - Complete 20 Projects (Numbered 01 to 20)
    const projectsData = {
        '1': {
            title: "Port Scanner",
            category: "Cybersecurity Tool / Network Security",
            timeline: "Sep 2026",
            tags: ["Application Security", "Port Scanning", "Network Security", "RBAC", "Multi-Tenant Architecture", "Tauri 2", "TypeScript"],
            description: "Developed a cross-platform network security assessment platform designed to help authorized users discover and assess network services through controlled port scanning.",
            status: "Featured Tool",
            features: [
                "Cross-platform port scanning with dedicated multi-threaded scanning engine.",
                "Configurable scan parameters and structured service/port discovery output.",
                "Enterprise application architecture supporting user authentication and RBAC.",
                "Multi-tenant organization management and license entitlement engine.",
                "Administrative approval workflows, secure activation, and centralized reporting."
            ],
            architecture: "Cross-platform desktop application architecture built on Tauri 2, TypeScript, secure local runtime, and modular scanning core."
        },
        '2': {
            title: "Cybersecurity Assessment & Reporting SaaS",
            category: "Cybersecurity Platform / Vulnerability Management",
            timeline: "Sep 2026",
            tags: ["Vulnerability Management", "IT Security Assessments", "Security Reporting", "Risk Assessment", "NVD", "CISA KEV"],
            description: "A multi-tenant cybersecurity assessment and reporting platform designed to help organizations perform assessments, identify vulnerabilities, generate professional reports, and track remediation. (Standalone project presented independently).",
            status: "Featured Platform",
            features: [
                "End-to-end vulnerability assessment workflows and risk scoring.",
                "Integration with National Vulnerability Database (NVD) and CISA Known Exploited Vulnerabilities (KEV).",
                "Multi-tenant architecture with robust Role-Based Access Control.",
                "Automated professional PDF executive and technical report generation.",
                "Structured remediation milestone tracking and verification workflows."
            ],
            architecture: "Full-stack vulnerability assessment and intelligence platform with automated CVE feeds and PDF generation microservices."
        },
        '3': {
            title: "SOC Detection Engineering & MITRE ATT&CK Mapping",
            category: "Detection Engineering / SOC",
            timeline: "Sep 2026",
            organization: "Supercad Trading LLC",
            tags: ["SOC", "SIEM", "Detection Engineering", "MITRE ATT&CK", "Threat Detection", "Incident Response"],
            description: "Developed a structured detection catalogue covering enterprise threats such as impossible travel, password spraying, MFA fatigue, PowerShell activity, ransomware, OAuth abuse, and mass file deletion.",
            status: "Featured Engineering",
            features: [
                "Detection logic definition and query formulation across telemetry feeds.",
                "Direct mapping of detection scenarios to MITRE ATT&CK techniques and sub-techniques.",
                "Step-by-step investigation procedures and analyst containment runbooks.",
                "False-positive analysis, severity scoring, and client environment applicability ratings."
            ],
            architecture: "Enterprise detection engineering library linking threat intelligence, behavioral indicators, and automated response actions."
        },
        '4': {
            title: "SIEM-Based SOC Lab (Wazuh)",
            category: "SOC / SIEM / Security Monitoring",
            timeline: "Apr 2026 – May 2026",
            tags: ["Wazuh SIEM", "Ubuntu Linux", "Windows Server", "Kali Linux", "Event Logs", "Security Monitoring"],
            description: "Designed and implemented a Security Operations Center (SOC) laboratory environment using Wazuh SIEM for centralized security monitoring and log analysis.",
            status: "Featured SOC Project",
            features: [
                "Deployed and configured Wazuh SIEM on Ubuntu Linux.",
                "Integrated Windows Server endpoints for centralized log collection and monitoring.",
                "Simulated brute-force authentication attacks to generate security events.",
                "Investigated Windows Event ID 4625 and authentication anomalies.",
                "Built custom dashboards for monitoring suspicious activity and security alerts.",
                "Performed log correlation and threat detection aligned with SOC analyst workflows.",
                "Developed hands-on experience in incident investigation, alert triage, and security monitoring."
            ],
            architecture: "Centralized Wazuh manager with distributed Windows and Linux agents, correlating Sysmon and authentication telemetry for automated alert generation."
        },
        '5': {
            title: "In-House Security Operations Center (SOC) Development",
            category: "SOC / Security Operations",
            timeline: "Jul 2026 – Sep 2026",
            organization: "Supercad Trading LLC",
            tags: ["Security Operations Center", "Incident Response", "SIEM", "SOC Architecture", "Splunk"],
            description: "Contributed to the planning and development of an in-house Security Operations Center (SOC), including SOC architecture, monitoring strategy, operational processes, scalability planning, and proof-of-concept implementation. Built and worked with a SOC lab using Splunk and security monitoring technologies, while developing foundational SOC processes and incident-response playbooks.",
            status: "Featured SOC Development",
            features: [
                "Developed SOC technical architecture and log ingestion strategy.",
                "Built and operated a SOC testbed utilizing Splunk and security telemetry collectors.",
                "Authored foundational SOC operational procedures and tier-1 triage guidelines.",
                "Drafted initial incident response playbooks for common attack scenarios."
            ],
            architecture: "Tiered SOC operating model integrating centralized log management, real-time alert triage pipelines, and structured escalation paths."
        },
        '6': {
            title: "Active Directory Red Team Lab",
            category: "Red Team / Active Directory / Penetration Testing",
            timeline: "Apr 2026 – May 2026",
            tags: ["Windows Server", "Active Directory", "BloodHound", "PowerView", "Mimikatz", "Rubeus", "Hashcat"],
            description: "Designed and deployed an enterprise-style Active Directory lab environment using multiple Windows Server and Windows Client virtual machines to simulate a realistic corporate network.",
            status: "Featured Lab",
            features: [
                "Configured Active Directory Domain Services (AD DS), DNS, Group Policy, Organizational Units, Users, and Security Groups.",
                "Integrated Windows clients and servers into the domain infrastructure.",
                "Deployed Microsoft SQL Server and Metasploitable3 for attack simulation scenarios.",
                "Performed Active Directory enumeration using BloodHound, SharpHound, PowerView, PowerUpSQL, and SQLRecon.",
                "Simulated credential attacks, Kerberoasting, privilege escalation, lateral movement, and password spraying techniques.",
                "Conducted post-exploitation exercises using Mimikatz, Rubeus, PsExec, Inveigh, Netcat, Hashcat, and John the Ripper.",
                "Analyzed authentication events, network activity, and attack paths to identify security weaknesses and detection opportunities."
            ],
            architecture: "Multi-tier virtualized forest with domain controllers, member servers, and workstations instrumented for attack path graphing and defense validation."
        },
        '7': {
            title: "OSINT-Based Data Exposure Assessment Tool",
            category: "OSINT / Threat Intelligence / Cybersecurity Tool",
            timeline: "Feb 2025 – Dec 2025",
            tags: ["OSINT", "Threat Intelligence", "Have I Been Pwned", "VirusTotal", "AbuseIPDB", "Python"],
            description: "Developed an OSINT-based cybersecurity tool to analyze publicly available data and identify potential exposure risks. Integrated APIs such as Have I Been Pwned, VirusTotal, and AbuseIPDB to perform threat intelligence and security analysis.",
            github: "https://github.com/hameezcam/osint-data-exposure-tool",
            contributors: "Jethendri",
            status: "Open Source Tool",
            features: [
                "Automated ingestion of breach intelligence using Have I Been Pwned API.",
                "Malicious IP reputation scoring via AbuseIPDB API integration.",
                "Domain and URL risk analysis powered by VirusTotal API.",
                "Consolidated exposure risk report generation for security analysts."
            ],
            architecture: "Python engine querying multiple threat intelligence APIs, performing data correlation and scoring exposure severity."
        },
        '8': {
            title: "Vulnerability Assessment & Penetration Testing (VAPT) Service Development",
            category: "VAPT / Security Services",
            timeline: "Jul 2026 – Sep 2026",
            organization: "Supercad Trading LLC",
            tags: ["Vulnerability Assessment", "Penetration Testing", "OWASP", "Security Testing", "Security Services"],
            description: "Contributed to the development of a VAPT service offering, including scope-based service structures, pricing frameworks, client questionnaires, proposals, and testing methodologies. Worked with intentionally vulnerable environments including DVWA and OWASP Juice Shop to support security testing and demonstrations.",
            status: "Enterprise Service Framework",
            features: [
                "Formulated scope-based service structures and client intake assessment questionnaires.",
                "Developed end-to-end testing methodologies covering network and web application layers.",
                "Configured vulnerable testing environments (DVWA, OWASP Juice Shop) for attack simulations.",
                "Created standardized technical remediation guidance and proposal frameworks."
            ],
            architecture: "Structured VAPT delivery framework encompassing scoping, discovery, vulnerability validation, risk assessment, and executive reporting."
        },
        '9': {
            title: "Check Point Email Security & Anti-Phishing Standardization",
            category: "Email Security / Security Operations",
            timeline: "Aug 2026",
            organization: "Supercad Trading LLC",
            tags: ["Email Security", "Anti-Phishing", "Check Point", "DMARC", "SPF", "DLP", "Security Hardening"],
            description: "Configured and standardized email security controls across multiple client environments using Check Point Email Security.",
            status: "Production Hardening",
            features: [
                "Anti-phishing and impersonation detection policy tuning.",
                "Strict SPF, DKIM, and DMARC verification and alignment enforcement.",
                "URL reputation analysis, anomaly detection, and Click-Time Protection configuration.",
                "Data Loss Prevention (DLP) policy formulation and compliance rule sets.",
                "Developed consolidated security documentation and configuration standards."
            ],
            architecture: "Cloud email security gateway inline inspection architecture with anomaly detection and automated threat remediation."
        },
        '10': {
            title: "Microsoft Security Architecture & Protection",
            category: "Microsoft Security",
            timeline: "Aug 2026 – Sep 2026",
            organization: "Supercad Trading LLC",
            tags: ["Microsoft Defender", "EDR", "Microsoft 365 Security", "Identity Security", "Safe Links", "Safe Attachments"],
            description: "Designed and implemented Microsoft security controls covering endpoint, identity, email, phishing, malicious URLs, attachments, and security monitoring.",
            status: "Enterprise Protection",
            features: [
                "Configured Microsoft Defender for Endpoint with automated investigation and EDR policies.",
                "Implemented Microsoft 365 Security policies including Safe Links and Safe Attachments.",
                "Engineered identity protection controls and Conditional Access policies.",
                "Established unified telemetry ingestion into Microsoft Sentinel for centralized visibility."
            ],
            architecture: "Integrated Microsoft 365 Defender XDR ecosystem spanning identities, endpoints, email communications, and cloud workloads."
        },
        '11': {
            title: "Client Cybersecurity Posture Assessment",
            category: "Security Assessment / Governance",
            timeline: "Sep 2026",
            organization: "Supercad Trading LLC",
            tags: ["Risk Assessment", "Information Security Governance", "Security Assessment", "Security Posture Management"],
            description: "Developed a standardized security posture assessment framework for evaluating client environments across identity, endpoint, email, network, cloud, SIEM, vulnerability management, backup, incident response, and security governance.",
            status: "Governance Framework",
            features: [
                "Evaluation matrices spanning 10 critical security domains.",
                "Assessment of identity security, endpoint hardening, and email defenses.",
                "Evaluation of backup resilience, incident response readiness, and governance policies.",
                "Actionable gap analysis and executive remediation roadmap generation."
            ],
            architecture: "Standardized posture evaluation model mapping technical control audits against risk management frameworks."
        },
        '12': {
            title: "Enterprise Network Security Assessment",
            category: "Network Security / Security Audit",
            timeline: "Sep 2026 – Present",
            organization: "Supercad Trading LLC",
            tags: ["Cisco Meraki", "Network Security", "Security Auditing", "Firewall Security", "VPN Security"],
            description: "Conducted security assessments across multiple Cisco Meraki client environments, reviewing administrative access, MFA, firewall policies, VLANs, wireless security, VPN configuration, firmware, IDS/IPS, logging, and overall security posture.",
            status: "Ongoing Engagements",
            features: [
                "Comprehensive audit of administrative access controls and MFA enforcement.",
                "Firewall policy, access rule, and network segmentation (VLAN) analysis.",
                "Wireless security configuration and rogue AP detection review.",
                "VPN encryption standards, client VPN authentication, and firmware currency audits.",
                "IDS/IPS alert tuning and centralized security logging validation."
            ],
            architecture: "Multi-branch cloud-managed perimeter network audit framework evaluating edge defenses, secure segmentation, and operational logging."
        },
        '13': {
            title: "Multi-Tenant Finance & Business Management ERP",
            category: "Business Application / SaaS / Software Development",
            timeline: "Sep 2026",
            tags: ["ERP Development", "Financial Management", "RBAC", "Multi-Tenant Architecture", "User Management", "Workflow Automation"],
            description: "Designed and developed a multi-tenant Finance ERP platform for managing financial and operational workflows across multiple organizations. (Business software development project, presented independently of security tooling).",
            status: "Software / SaaS Application",
            features: [
                "Role-based access control (Super Admin, Finance Manager, Senior Accountant, Operations, Auditor).",
                "Centralized user and organization access management and suspension controls.",
                "End-to-end financial workflows: Invoices, Delivery notes, Petty cash, Expense management, Approvals.",
                "Organization-specific document templates, financial reporting, and audit logs."
            ],
            architecture: "Multi-tenant cloud SaaS architecture with tenant-isolated database schemas and granular role authorization pipelines."
        },
        '14': {
            title: "AI-Assisted Scam & Threat Analysis Platform",
            category: "Threat Intelligence / Security Analysis",
            timeline: "Sep 2026",
            tags: ["Threat Analysis", "Cyber Threat Intelligence", "Application Security", "SSRF Protection", "Multi-Tenancy"],
            description: "A cybersecurity platform designed to analyze potentially malicious URLs, messages, emails, QR codes, and other digital content.",
            status: "Intelligence Platform",
            features: [
                "Multi-vector threat analysis for suspicious URLs, SMS, emails, and QR codes.",
                "Built-in Server-Side Request Forgery (SSRF) protection and sandboxed inspection.",
                "Cyber Threat Intelligence (CTI) feed correlation and risk scoring.",
                "AI-assisted threat pattern recognition and explanation.",
                "Secure multi-tenant authentication and security telemetry logging."
            ],
            architecture: "Sandboxed inspection microservice with threat intelligence cache, automated URL unpacker, and AI classification layer."
        },
        '15': {
            title: "Incident Response Playbook Framework",
            category: "Incident Response / Security Operations",
            timeline: "2026",
            tags: ["Incident Response", "BEC", "Account Compromise", "PowerShell", "Data Exfiltration", "Playbooks"],
            description: "Developed structured incident response playbooks covering common enterprise security incidents and investigation workflows.",
            status: "Operational Framework",
            features: [
                "Business Email Compromise (BEC) investigation and containment runbook.",
                "Account Compromise and session termination workflows.",
                "Malicious URL and phishing campaign analysis procedures.",
                "Suspicious PowerShell activity and execution triage protocols.",
                "Data Exfiltration, Privileged Activity abuse, and Vulnerability Exploitation response paths."
            ],
            architecture: "Standardized incident handling frameworks aligned with NIST SP 800-61 Rev. 2 phases from detection to post-incident review."
        },
        '16': {
            title: "Security Posture Assessment Framework",
            category: "Security Assessment",
            timeline: "2026",
            tags: ["Security Posture", "Identity Security", "Endpoint Defense", "Network Hardening", "Assessment"],
            description: "Developed a structured security posture assessment methodology covering identity, endpoint, email, network, SIEM, administrative access, authentication, and security controls.",
            status: "Assessment Methodology",
            features: [
                "Comprehensive audit checklists for enterprise identity and access controls.",
                "Endpoint security posture and EDR deployment verification criteria.",
                "Email security gateway and perimeter firewall policy inspection.",
                "Administrative access governance, privileged identity controls, and MFA enforcement review."
            ],
            architecture: "Structured assessment matrix delivering quantitative maturity scores and prioritized mitigation checklists."
        },
        '17': {
            title: "Detection Catalogue",
            category: "Detection Engineering",
            timeline: "2026",
            tags: ["Detection Logic", "Data Sources", "Threat Scenarios", "Investigation Guidance", "Detection Gaps"],
            description: "Developed a structured catalogue of security detections mapped to threat scenarios, telemetry sources, investigation requirements, security controls, and detection gaps.",
            status: "Detection Engineering Library",
            features: [
                "Detection query logic and analytic rule definitions.",
                "Telemetry source requirement mapping (Windows Security Events, Sysmon, Firewall logs).",
                "Threat scenario playbooks and triage analyst guidance.",
                "Identification of telemetry blind spots and recommended sensor configurations."
            ],
            architecture: "Living detection catalogue bridging threat modeling, query engineering, and operational alert verification."
        },
        '18': {
            title: "NESA Security Roadmap",
            category: "Security / Compliance",
            timeline: "2026",
            tags: ["Security Governance", "Controls Maturity", "Compliance Planning", "NESA IAS", "Roadmap"],
            description: "Developed a structured cybersecurity roadmap covering security governance, controls, maturity, and compliance-oriented security planning.",
            status: "Governance Roadmap",
            features: [
                "Control framework alignment addressing foundational and advanced security measures.",
                "Phased implementation timeline prioritizing critical security baseline controls.",
                "Maturity assessment checklists and technical audit preparation guidance.",
                "Documentation workflows for tracking governance and defensive compliance progress."
            ],
            architecture: "Strategic security roadmap establishing a path from baseline security controls to enterprise compliance readiness."
        },
        '19': {
            title: "SOC Implementation Roadmap",
            category: "SOC / Security Operations",
            timeline: "2026",
            tags: ["SOC Architecture", "Security Operations", "Monitoring Strategy", "Processes", "Operational Maturity"],
            description: "Developed a practical roadmap for establishing and maturing a Security Operations Center, covering architecture, technology, processes, monitoring, detection, incident response, and operational maturity.",
            status: "SOC Blueprint",
            features: [
                "Phased SOC buildout covering core architecture, telemetry ingestion, and tooling.",
                "Standard operating procedure definitions for alert handling, escalation, and shift handovers.",
                "Technology evaluation framework for SIEM, EDR, and log management platforms.",
                "Metrics and KPI framework for measuring SOC operational maturity and detection coverage."
            ],
            architecture: "End-to-end SOC development blueprint detailing infrastructure, process engineering, and analyst operational workflows."
        },
        '20': {
            title: "SOCaaS Planning",
            category: "Security Operations",
            timeline: "2026",
            tags: ["SOCaaS", "Security Services", "Client Onboarding", "Monitoring Architecture", "Service Delivery"],
            description: "Developed a framework for planning a managed Security Operations service, including client onboarding, monitoring architecture, security tooling, detection capabilities, operational workflows, and service delivery.",
            status: "Managed Service Architecture",
            features: [
                "Client onboarding lifecycle covering log source identification, agent rollout, and scope validation.",
                "Multi-tenant monitoring architecture ensuring strict tenant data isolation.",
                "Service Level Agreement (SLA) models for alert response, investigation, and reporting.",
                "Recurring client security reporting cadence and remediation advisory workflows."
            ],
            architecture: "Managed security service delivery model connecting remote client telemetry to centralized monitoring and analyst response."
        }
    };

    // Certifications Database
    const certsData = {
        'copilot': {
            title: "Microsoft Copilot for Security",
            issuer: "Microsoft",
            date: "Completed — 2026",
            id: "Microsoft Certified",
            status: "COMPLETED // 2026",
            details: "Specialized certification covering Microsoft Copilot for Security architecture, natural language security prompts, incident investigation enrichment, KQL integration, and automated threat triage."
        },
        'kingston': {
            title: "BSc (Hons) Cybersecurity & Digital Forensics",
            issuer: "Kingston University",
            date: "Completed",
            id: "Kingston University London",
            status: "COMPLETED",
            details: "Comprehensive degree program covering network security, digital forensics, cryptographic foundations, operating systems, malware analysis, incident response, and security governance frameworks."
        },
        'ccna': {
            title: "Cisco Certified Network Associate (CCNA 200-301)",
            issuer: "Cisco",
            date: "Completed",
            id: "Cisco Certification",
            status: "COMPLETED",
            details: "Network fundamentals, IP connectivity, IP services, enterprise security fundamentals, ACLs, VPN architectures, and network automation."
        },
        'az900': {
            title: "Microsoft Azure Fundamentals (AZ-900)",
            issuer: "Microsoft",
            date: "Completed",
            id: "Microsoft Certified",
            status: "COMPLETED",
            details: "Cloud concepts, Azure architectural components, Azure security services, identity, governance, compliance, and privacy controls."
        },
        'hardware': {
            title: "Advanced Diploma in Hardware & Networking Professional",
            issuer: "Hardware & Networking Institute",
            date: "Completed",
            id: "Professional Diploma",
            status: "COMPLETED",
            details: "Enterprise hardware troubleshooting, server architecture, switching, routing, firewalls, and network operating system administration."
        },
        'letsdefend': {
            title: "SOC Fundamentals",
            issuer: "LetsDefend",
            date: "Completed — 2026",
            id: "LetsDefend · SOC Track",
            status: "COMPLETED // 2026",
            details: "Hands-on SOC analyst training platform. Covers alert triage, SIEM usage, log analysis, malware analysis, phishing investigation, and real-world incident response workflows."
        },
        'ceh': {
            title: "Certified Ethical Hacker (CEH)",
            issuer: "EC-Council",
            date: "In Progress",
            id: "EC-Council Track",
            status: "IN PROGRESS",
            details: "Active preparation for Certified Ethical Hacker covering vulnerability assessment, penetration testing methodologies, network scanning, and offensive security analysis."
        }
    };

    // Blog Articles Database
    const blogData = {
        'soc-roadmap': {
            title: "SOC Analyst Roadmap: From Scratch to Deployed",
            category: "Roadmaps",
            date: "June 2026",
            readTime: "8 min read",
            content: `
                <p>Entering the Security Operations Center (SOC) requires a structured approach to systems, networks, and telemetry tracking. As a SOC analyst, your role is to act as the primary defense line, identifying and investigating threats before they become critical breaches.</p>
                
                <h4>1. Solidify Network Foundations</h4>
                <p>You cannot defend what you don't understand. A SOC analyst must comprehend how packets traverse networks. Focus on:</p>
                <ul>
                    <li>The TCP/IP model in depth (packet headers, 3-way handshakes, TCP flags).</li>
                    <li>DNS operations, DHCP, ARP, and routing configurations.</li>
                    <li>Network traffic analysis using tools like Wireshark and TCPdump.</li>
                </ul>

                <h4>2. Master SIEM & Telemetry Operations</h4>
                <p>Security Information and Event Management (SIEM) systems act as the brain of the SOC. Key focus areas:</p>
                <ul>
                    <li>Log collection, normalization, and KQL query writing in Microsoft Sentinel.</li>
                    <li>Constructing correlation rules to trigger alerts under specific threat heuristics.</li>
                    <li>Wazuh and Sysmon telemetry for endpoint event correlation (Event ID 1, 3, 11, 4625, 4624).</li>
                </ul>

                <h4>3. Incident Response Playbooks</h4>
                <p>Learn structured triage and containment steps for phishing, malware outbreaks, and account compromises following NIST SP 800-61 frameworks.</p>
            `
        },
        'siem-intro': {
            title: "Introduction to SIEM: Ingestion, Correlating, and Alerts",
            category: "SIEM",
            date: "May 2026",
            readTime: "6 min read",
            content: `
                <p>SIEM (Security Information and Event Management) forms the backbone of modern security operations. By collecting and correlating data from endpoints, cloud services, and network perimeters, it provides centralized threat visibility.</p>
                
                <h4>Data Ingestion Pipelines</h4>
                <p>Logs from endpoints, firewalls, and Active Directory domains are collected by forwarders or cloud connectors (CEF, Syslog, Graph API). The SIEM normalizes this data into structured schemas.</p>

                <h4>Correlation Engines & Detection Rules</h4>
                <p>Correlation rules map disparate events to uncover adversary tactics. For example: multiple Event ID 4625 failed logons within 60 seconds followed by a successful Event ID 4624 and subsequent PowerShell execution triggers a high-severity alert.</p>

                <h4>Best Practices for SOC Rule Tuning</h4>
                <ul>
                    <li>Reduce Alert Fatigue: Continuously tune rules to minimize false positives and elevate signal-to-noise ratio.</li>
                    <li>Align with MITRE ATT&CK: Map detections to specific adversary techniques to identify coverage blind spots.</li>
                </ul>
            `
        },
        'threat-hunting': {
            title: "Threat Hunting Methodology: Detecting Hidden Adversaries",
            category: "Threat Hunting",
            date: "May 2026",
            readTime: "10 min read",
            content: `
                <p>Passive alert triage is no longer sufficient against sophisticated threat actors. Proactive threat hunting searches for adversaries who have evaded automated detections.</p>
                
                <h4>Hypothesis-Driven Hunting</h4>
                <p>Formulate actionable hypotheses based on threat intelligence reports, MITRE ATT&CK techniques, and environment-specific risks (e.g. searching for unmanaged scheduled tasks or living-off-the-land binaries).</p>

                <h4>Endpoint & Network Telemetry Triangulation</h4>
                <p>Correlate process execution logs (Sysmon Event ID 1) with outbound network connections (Event ID 3) and DNS queries to trace command-and-control beacons.</p>
            `
        },
        'ad-security': {
            title: "Active Directory Security & Attack Paths",
            category: "Active Directory",
            date: "April 2026",
            readTime: "7 min read",
            content: `
                <p>Active Directory remains the primary target for lateral movement and privilege escalation in enterprise environments.</p>
                
                <h4>Key Vulnerability Surfaces</h4>
                <ul>
                    <li><strong>Kerberoasting:</strong> Requesting TGS tickets for accounts with SPNs and cracking them offline.</li>
                    <li><strong>AS-REP Roasting:</strong> Exploiting user accounts that do not require Kerberos pre-authentication.</li>
                    <li><strong>LLMNR / NBT-NS Poisoning:</strong> Capturing NetNTLM hashes by responding to broadcast name resolution requests.</li>
                </ul>

                <h4>Defensive Mitigations</h4>
                <p>Enforce strong AES-256 Kerberos encryption, disable LLMNR/NBT-NS via GPO, implement Tiered Administration models, and monitor Event IDs 4768 and 4769 for anomalies.</p>
            `
        },
        'osint-techniques': {
            title: "OSINT & External Attack Surface Management",
            category: "OSINT",
            date: "March 2026",
            readTime: "5 min read",
            content: `
                <p>Understanding an organization's public-facing attack surface is crucial for both offensive penetration testing and defensive exposure management.</p>
                
                <h4>Asset Discovery & Exposure Assessment</h4>
                <p>Utilize Certificate Transparency logs, DNS enumeration, Shodan queries, and breach intelligence APIs to identify exposed credentials, leaked endpoints, and misconfigured perimeter services before threat actors can target them.</p>
            `
        }
    };

    // Open Project Modal
    document.querySelectorAll('.open-project-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const pid = btn.getAttribute('data-project');
            const data = projectsData[pid];
            if (!data || !projectModal || !projectModalBody) return;
            
            projectModalBody.innerHTML = `
                <div class="modal-header-info">
                    <span class="modal-category">${data.category}</span>
                    <h2 class="modal-project-title">${data.title}</h2>
                    <div class="modal-meta-row">
                        <span><i class="far fa-calendar"></i> ${data.timeline}</span>
                        <span><i class="fas fa-shield-halved"></i> ${data.status}</span>
                    </div>
                </div>
                <div class="modal-tags">
                    ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="modal-body-section">
                    <h3>Project Overview</h3>
                    <p>${data.description}</p>
                </div>
                <div class="modal-body-section">
                    <h3>Key Technical Highlights</h3>
                    <ul class="modal-feature-list">
                        ${data.features.map(f => `<li><i class="fas fa-check-circle"></i> <span>${f}</span></li>`).join('')}
                    </ul>
                </div>
                <div class="modal-body-section">
                    <h3>Architecture &amp; Methodology</h3>
                    <p>${data.architecture}</p>
                </div>
                ${data.github ? `
                <div class="modal-footer-cta">
                    <a href="${data.github}" target="_blank" rel="noopener" class="cyber-btn primary-btn">
                        <span class="btn-text"><i class="fab fa-github"></i> View GitHub Repository</span>
                    </a>
                </div>` : ''}
            `;
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Project Modal
    if (projectClose && projectModal) {
        projectClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Open Cert Modal
    document.querySelectorAll('.verify-cert-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cid = link.getAttribute('data-cert');
            const cert = certsData[cid];
            if (!cert || !certModal || !certModalBody) return;

            certModalBody.innerHTML = `
                <div class="cert-modal-header">
                    <div class="cert-modal-icon"><i class="fas fa-award"></i></div>
                    <h3>${cert.title}</h3>
                    <span class="cert-modal-issuer">${cert.issuer}</span>
                </div>
                <div class="cert-modal-details">
                    <p class="cert-id-badge"><i class="fas fa-check-circle text-success"></i> ${cert.id}</p>
                    <p class="cert-desc-text">${cert.details}</p>
                </div>
            `;
            certModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (certClose && certModal) {
        certClose.addEventListener('click', () => {
            certModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Open Blog Modal
    document.querySelectorAll('.read-blog-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bid = btn.getAttribute('data-post');
            const blog = blogData[bid];
            if (!blog || !blogModal || !blogModalBody) return;

            blogModalBody.innerHTML = `
                <div class="blog-modal-header">
                    <span class="blog-category">${blog.category}</span>
                    <h2>${blog.title}</h2>
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${blog.date}</span>
                        <span><i class="far fa-clock"></i> ${blog.readTime}</span>
                    </div>
                </div>
                <div class="blog-modal-article">
                    ${blog.content}
                </div>
            `;
            blogModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (blogClose && blogModal) {
        blogClose.addEventListener('click', () => {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close on overlay click
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === certModal) {
            certModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/* --- Contact Form Simulation with Math Captcha --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const captchaNum1 = document.getElementById('challenge-num1');
    const captchaNum2 = document.getElementById('challenge-num2');
    const captchaInput = document.getElementById('form-captcha');
    const submitBtn = document.getElementById('contact-submit-btn');
    const logsBox = document.getElementById('contact-log-box');
    const logStatusText = document.getElementById('log-transmitting-status');

    if (!form || !captchaNum1 || !captchaNum2) return;

    let num1, num2;

    function generateCaptcha() {
        num1 = Math.floor(Math.random() * 9) + 2; // [2-10]
        num2 = Math.floor(Math.random() * 9) + 2; // [2-10]
        captchaNum1.textContent = num1;
        captchaNum2.textContent = num2;
        if (captchaInput) captchaInput.value = '';
    }

    generateCaptcha();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const answer = parseInt(captchaInput.value);
        if (answer !== (num1 + num2)) {
            alert('Captcha verification failed. Please check your math equation.');
            generateCaptcha();
            return;
        }

        // Simulating packet transmission
        submitBtn.disabled = true;
        logsBox.style.display = 'flex';
        logStatusText.textContent = '> Connecting to SuperCAD Security Node...';
        
        let sequences = [
            { t: 800, txt: '> Socket connection established. Exchanging certificates...' },
            { t: 1500, txt: '> Tunnel established. Encrypting message bytes via AES-256-GCM...' },
            { t: 2300, txt: '> Transmitting payload hashes... 100%' },
            { t: 3000, txt: '> Transmission successful! Response code: 200 OK.' },
            { t: 3500, txt: '> Message transmitted securely. Hameez will review the packet shortly.' }
        ];

        sequences.forEach(step => {
            setTimeout(() => {
                const logLine = document.createElement('div');
                logLine.className = 'log-line text-success';
                logLine.innerHTML = step.txt;
                logsBox.appendChild(logLine);
                logsBox.scrollTop = logsBox.scrollHeight;
                
                if (step.txt.includes('Response code: 200')) {
                    logStatusText.style.display = 'none';
                    // Reset form fields
                    form.reset();
                    generateCaptcha();
                    submitBtn.disabled = false;
                }
            }, step.t);
        });
    });
}

/* --- Back to Top Float Button --- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- Dynamic Text-Based CV Generator --- */
function initCVDownload() {
    const downloadBtn = document.getElementById('download-cv-btn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const cvText = `========================================================================
                      HAMEEZ CAMBAL - CYBERSECURITY CV
========================================================================
Title: Cybersecurity Analyst
Company: SuperCAD — Dubai, UAE
Employment: 2026 – Present
Location: Dubai, United Arab Emirates
Contact: hameez.cam@gmail.com
Website: https://hameezcam.github.io
GitHub: https://github.com/hameezcam
LinkedIn: https://www.linkedin.com/in/hameez-cambal-988a2b314/

------------------------------------------------------------------------
PROFESSIONAL SUMMARY
------------------------------------------------------------------------
Cybersecurity Analyst focused on Security Operations, Threat Detection, 
SIEM, Incident Response, Security Assessments and Cybersecurity Tool 
Development. Working across practical enterprise security operations,
monitoring capabilities, assessment methodologies, and security applications.

------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
------------------------------------------------------------------------
Cybersecurity Analyst
SuperCAD — Dubai, UAE
2026 – Present
Description:
Working across security operations, monitoring, security assessments, 
incident investigation, Microsoft security, network security, vulnerability 
management, and cybersecurity service development within a managed security 
environment.

Key Responsibilities & Operational Areas:
* Security alert investigation and event analysis across SIEM environments
* Centralized telemetry monitoring using Microsoft Sentinel and Wazuh
* Threat detection, incident investigation, and containment procedures
* Microsoft Defender security operations (Endpoint, Office 365, Identity, XDR)
* Microsoft Sentinel SIEM detection rules and Log Analytics queries
* Microsoft 365 and Entra ID security hardening (MFA, Conditional Access)
* Check Point security operations, email security, and perimeter firewalls
* Fortinet and WatchGuard security management
* Cisco Meraki security assessments and audits
* Security posture assessments and gap evaluations
* Vulnerability assessment and VAPT documentation
* Security audit activities and remediation tracking
* Authoring incident response playbooks and detection catalogues
* SOC implementation planning and SOCaaS service delivery planning
* Client security reporting and executive deliverables

------------------------------------------------------------------------
TECHNICAL SKILL MATRIX
------------------------------------------------------------------------
* Security Operations: SOC Operations, SIEM, Security Monitoring, Alert Investigation,
                       Incident Response, Threat Detection, Threat Hunting, Detection Engineering.
* Microsoft Security:  Microsoft Sentinel, Microsoft Defender, Microsoft 365 Security,
                       Microsoft Entra, Identity Security, Conditional Access.
* Network Security:    Check Point, Fortinet, WatchGuard, Cisco Meraki, Firewall Security, VPN Security.
* Security Assessment: VAPT, Vulnerability Assessment, Security Auditing, Security Posture Assessment,
                       Risk Assessment, Compliance Mapping.
* Security Dev:        Cybersecurity Tool Development, Authentication, RBAC, Multi-Tenant Architecture,
                       Security Automation, Threat Intelligence Integration.

------------------------------------------------------------------------
VERIFIED CERTIFICATIONS & EDUCATION
------------------------------------------------------------------------
* Microsoft Copilot for Security [Completed — 2026]
* BSc (Hons) Cybersecurity & Digital Forensics — Kingston University London
* Cisco Certified Network Associate (CCNA 200-301) — Cisco
* Microsoft Azure Fundamentals (AZ-900) — Microsoft
* Advanced Diploma in Hardware & Networking Professional — Institute
* Certified Ethical Hacker (CEH) [In Progress]

------------------------------------------------------------------------
SECURITY PROJECTS PORTFOLIO
------------------------------------------------------------------------
1. Microsoft Sentinel SOC Architecture [SOC / SIEM] ★ FEATURED
   - Focus: SIEM • Detection • SOC Architecture
2. Port Scanner [Cybersecurity Tool] ★ FEATURED
   - Focus: Network Security • Security Tooling • Multi-Tenant Architecture
3. Security Reporting Platform [Cybersecurity Platform] ★ FEATURED
   - Focus: Security Assessments • Vulnerability Intelligence • Reporting
4. Wazuh SIEM Home Lab [SIEM / Security Monitoring]
5. SOC Implementation Roadmap [SOC / Security Operations]
6. SOCaaS Planning [Security Operations]
7. Microsoft Security Implementation [Microsoft Security]
8. Security Posture Assessment Framework [Security Assessment]
9. VAPT Documentation Framework [VAPT]
10. Incident Response Playbook Framework [Incident Response]
11. Detection Catalogue [Detection Engineering]
12. NESA Security Roadmap [Compliance / Security]
13. Threat Analysis Platform [Threat Intelligence / Security Analysis]
14. Web Application Security Lab [Application Security]
15. OSINT & Threat Intelligence Toolkit [Threat Intelligence]

========================================================================
STATUS: ACTIVE // CYBERSECURITY ANALYST // SUPERCAD (DUBAI, UAE)
========================================================================`;

        const blob = new Blob([cvText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Hameez_Cambal_Security_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}
