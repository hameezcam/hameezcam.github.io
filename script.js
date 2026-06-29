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

/* --- Hero Section Typing Animation --- */
function initTypewriter() {
    const textTarget = document.getElementById('typed-text');
    if (!textTarget) return;

    const roles = [
        "Cybersecurity Analyst",
        "SOC Enthusiast",
        "Network Security Specialist"
    ];
    
    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const fullText = roles[currentRoleIdx];
        
        if (isDeleting) {
            textTarget.textContent = fullText.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typingSpeed = 50; // Faster deleting
        } else {
            textTarget.textContent = fullText.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typingSpeed = 100; // Normal typing
        }
        
        // Handle transitions
        if (!isDeleting && currentCharIdx === fullText.length) {
            typingSpeed = 2000; // Pause at the end of typing
            isDeleting = true;
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 500; // Pause before starting next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
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
    
    // Sticky Header Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active scrollspy highlight
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
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
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
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
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

/* --- Interactive CLI Terminal Shell Engine --- */
function initTerminal() {
    const termBody = document.getElementById('terminal-body');
    const termInput = document.getElementById('terminal-input');
    
    if (!termBody || !termInput) return;
    
    // Command database
    const commandResponses = {
        'help': `Available commands:
  <span class="terminal-highlight">about</span>      - Detail Hameez's background and core mission.
  <span class="terminal-highlight">skills</span>     - List technical matrices (Cybersecurity, Networking).
  <span class="terminal-highlight">projects</span>   - Display custom security tools and architectures.
  <span class="terminal-highlight">certs</span>      - View verified compliance & cybersecurity certs.
  <span class="terminal-highlight">services</span>   - Review freelance consulting/advisory services.
  <span class="terminal-highlight">contact</span>    - Output encrypted mail and profile handles.
  <span class="terminal-highlight">resume</span>     - Print download links for PDF and Text resumes.
  <span class="terminal-highlight">neofetch</span>   - Draw system spec block & ascii node banner.
  <span class="terminal-highlight">system</span>     - Display security parameters diagnostic report.
  <span class="terminal-highlight">hack</span>       - Simulates firewall penetration on current local node.
  <span class="terminal-highlight">clear</span>      - Clean console display buffer.`,
  
        'about': `Hameez Cambal - Cybersecurity Analyst | SOC Enthusiast | Network Security Specialist
  
  "Security is not just technology - it is trust, resilience, and continuous improvement."
  
  Focus Areas: Network hardening, GRC, Threat Hunting, ISMS design, and Incident Response.
  Currently located in the United Arab Emirates. Passionate about architecting defense-in-depth frameworks.`,
  
        'skills': `--- Technical Skill Matrix ---
  
  [Cybersecurity]
  * SIEM (Splunk, Chronicle) : [|||||||||||||||||...] 85%
  * OSINT (Shodan, Spiderfoot): [||||||||||||||||||...] 90%
  * Threat Hunting            : [||||||||||||||||...] 80%
  * Risk Assessment (ISO27001): [|||||||||||||||||||.] 95%
  
  [Networking]
  * TCP/IP Stack & Arch       : [||||||||||||||||||...] 90%
  * VPNs (IPsec, OpenVPN)     : [||||||||||||||||...] 80%
  * Hardening Firewalls/ACLs  : [||||||||||||||||||...] 90%
  
  [Programming]
  * Python (Automation, ML)   : [|||||||||||||||||...] 85%
  * Bash Scripting            : [||||||||||||||||...] 80%`,
  
        'certs': `--- Verified Credentials ---
  * SOC Fundamentals (LetsDefend) [COMPLETED 2026]
  * Cyber Security Fundamentals (University of London) [COMPLETED 2026]
  * CEH - Certified Ethical Hacker (EC-Council) [CERTIFIED]
  * Microsoft Cybersecurity Professional Certificate [CERTIFIED]
  * Google Cybersecurity Certificate (Google/Coursera) [CERTIFIED]`,
  
        'services': `--- Professional Services ---
  * Security Audits           - Infrastructure integrity assessments.
  * Risk Assessments          - Threat modeling and vulnerability scoping.
  * Vulnerability Assessment  - Passive/Active pentesting and patch planning.
  * ISMS Consulting (ISO27001)- ISO compliant framework drafting and design.
  * Network Security Solutions- Hardened firewall configurations, IPS setup, and segmentation.
  
  Use command "contact" to query communication pathways for consultations.`,
  
        'contact': `--- Comms Handshake Matrix ---
  * Email     : <a href="mailto:hameez.cam@gmail.com" class="terminal-highlight">hameez.cam@gmail.com</a>
  * LinkedIn  : <a href="https://www.linkedin.com/in/hameez-cambal-988a2b314/" target="_blank" class="terminal-highlight">linkedin.com/in/hameez-cambal-988a2b314</a>
  * GitHub    : <a href="https://github.com/hameezcam" target="_blank" class="terminal-highlight">github.com/hameezcam</a>
  * Location  : United Arab Emirates`,
  
        'resume': `--- Credentials Retrieval ---
  * PDF Resume : <a href="Hameez_Cambal_Resume.pdf" download="Hameez_Cambal_Resume.pdf" class="terminal-highlight">Download PDF CV</a>
  * Text Resume: <a href="javascript:void(0)" onclick="document.getElementById('download-cv-btn').click();" class="terminal-highlight">Download Text CV (.txt)</a>
  
  (Type <span class="terminal-highlight">projects</span> or <span class="terminal-highlight">certs</span> for detailed credential blocks.)`,
  
        'system': `--- UAE_NODE_09 System Report ---
  * Node Name    : HC-SEC-NODE-09
  * CPU Load     : Dynamic (Antigravity CPU Scale)
  * Network Band : Gigabit Fiber Handshake (SSL ON)
  * Integrity    : 100% OK
  * Threat Level : ZERO_EXPOSURE_DETECTED
  * Firewall     : ACTIVE // SHIELD GENERATORS ENGAGED`
    };

    function appendTermLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    // Interactive Terminal Commands parsing
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = termInput.value.trim().toLowerCase();
            termInput.value = '';
            
            if (!inputVal) return;
            
            // Print command echo
            appendTermLine(`guest@hc-sec-node:~$ ${inputVal}`, 'command-echo');
            
            // Command Logic
            if (inputVal === 'clear') {
                termBody.innerHTML = '';
                return;
            }
            
            if (inputVal === 'neofetch') {
                const browserOS = getBrowserOS();
                const neofetchOutput = `
                 <span class="cyber-accent-blue">.---.</span>          Hameez Cambal@HC-SEC-NODE
                <span class="cyber-accent-blue">/     \\</span>         -------------------------
                <span class="cyber-accent-blue">| <span class="cyber-accent-purple">●   ●</span> |</span>        OS: Antigravity Secure Shell (ASH v1.4.2)
                <span class="cyber-accent-blue">\\  <span class="cyber-accent-purple">===</span>  /</span>        Host: Web-Client-Node (${browserOS})
                 <span class="cyber-accent-blue">'---'</span>         Kernel: JS Engine v8.0.3
                               Uptime: ${Math.floor(performance.now() / 1000)}s
                               Shell: ASH (Terminal Sim)
                               Resolution: ${window.screen.width}x${window.screen.height}
                               Accents: <span class="cyber-accent-blue">Blue</span> // <span class="cyber-accent-purple">Purple</span>
                `;
                appendTermLine(neofetchOutput);
                return;
            }
            
            if (inputVal.startsWith('projects')) {
                const parts = inputVal.split(' ');
                if (parts.length === 1) {
                    appendTermLine(`--- Deployed Projects Directory ---
  1. Active Directory Red Team Lab [RED TEAM / SECURITY]
  2. SIEM-Based SOC Lab (Wazuh) [SOC / BLUE TEAM]
  3. OSINT-Based Data Exposure Assessment Tool [SECURITY]
  
  Type <span class="terminal-highlight">projects &lt;id&gt;</span> (e.g., <span class="terminal-highlight">projects 1</span>) to query detailed architecture notes.`);
                } else {
                    const id = parts[1];
                    const projectDetails = {
                        '1': `Project: Active Directory Red Team Lab
  * Purpose: Simulate corporate AD environment and conduct red team attacks.
  * Stack: Windows Server 2019/2008, VMware, PowerShell, BloodHound, SharpHound, Mimikatz, Rubeus, Inveigh, Hashcat.
  * Key Activities: Kerberoasting, password spraying, lateral movement, LLMNR poisoning, BloodHound attack path analysis.
  * Defense Focus: Event ID investigation, privilege escalation detection, and Group Policy hardening.`,
                        '2': `Project: SIEM-Based SOC Lab (Wazuh)
  * Purpose: Build a full Security Operations Center environment using Wazuh SIEM.
  * Stack: Wazuh SIEM, Ubuntu, Windows Server, Kali Linux.
  * Key Activities: Agent deployment, brute-force attack simulation, Event ID 4625 (failed login) investigation, log correlation, anomaly detection.
  * Output: SOC monitoring dashboards aligned with real-world workflows.`,
                        '3': `Project: OSINT-Based Data Exposure Assessment Tool
  * GitHub: https://github.com/hameezcam/osint-data-exposure-tool
  * Purpose: Identify publicly exposed information and assess cyber risks.
  * Stack: Python, Flask, SQLite, HaveIBeenPwned API, VirusTotal API, AbuseIPDB API.
  * Features: Email breach detection, IP reputation analysis, domain intelligence, threat analysis, real-time web dashboard.`
                    };
                    
                    if (projectDetails[id]) {
                        appendTermLine(projectDetails[id]);
                    } else {
                        appendTermLine(`Error: Project ID "${id}" not indexed. Valid range: [1-3]`, 'error-msg');
                    }
                }
                return;
            }
            
            if (inputVal === 'hack') {
                termInput.disabled = true;
                appendTermLine('[+] Initiating Local Network Audit...', 'system-msg');
                
                let steps = [
                    { t: 300, txt: '[-] Connecting to socket layer... established.' },
                    { t: 800, txt: '[-] Injecting tracer packets into local node gateway...' },
                    { t: 1400, txt: '[-] Resolving firewall headers... [WARNING: SECURITY STACK ACTIVE]' },
                    { t: 1900, txt: '[-] Bypass payload injected. Scanning port vectors...' },
                    { t: 2400, txt: '[!] Port 80 (HTTP): OPEN' },
                    { t: 2600, txt: '[!] Port 443 (HTTPS): OPEN' },
                    { t: 2800, txt: '[-] Extracting browser user agent: ' + navigator.userAgent.substring(0, 50) + '...' },
                    { t: 3200, txt: '[-] Decrypting temporary cache registries...' },
                    { t: 3800, txt: '[SUCCESS] Audit Complete. Vulnerabilities Found: 0. System Security Checked.' },
                    { t: 4200, txt: '<span class="text-glow" style="color: #00ff66; font-weight: bold;">UAE_NODE_09 // SECURED_BY_HAMEEZ_CAMBAL</span>' }
                ];
                
                steps.forEach(step => {
                    setTimeout(() => {
                        appendTermLine(step.txt);
                        if (step.txt.includes('SECURED_BY_HAMEEZ')) {
                            termInput.disabled = false;
                            termInput.focus();
                        }
                    }, step.t);
                });
                return;
            }
            
            // Standard static response
            if (commandResponses[inputVal]) {
                appendTermLine(commandResponses[inputVal]);
            } else {
                appendTermLine(`Command not found: "${inputVal}". Type <span class="terminal-highlight">help</span> for commands dictionary.`, 'error-msg');
            }
        }
    });

    // Helper for Neofetch
    function getBrowserOS() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Win") !== -1) return "Windows OS";
        if (userAgent.indexOf("Mac") !== -1) return "macOS";
        if (userAgent.indexOf("Linux") !== -1) return "Linux OS";
        if (userAgent.indexOf("Android") !== -1) return "Android OS";
        if (userAgent.indexOf("like Mac") !== -1) return "iOS";
        return "Unknown Node OS";
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

    // Projects Database
    const projectsData = {
        '1': {
            title: "Active Directory Red Team Lab",
            category: "Red Team / Active Directory Security",
            timeline: "2025 - 2026",
            tags: ["Windows Server 2019", "Windows Server 2008", "VMware", "PowerShell", "BloodHound", "SharpHound", "Mimikatz", "Rubeus", "Inveigh", "Hashcat", "John the Ripper", "SQL Server"],
            description: "Designed and deployed an enterprise-style Active Directory lab using multiple Windows Server and client virtual machines to simulate a real corporate environment. The lab was used to perform hands-on red team operations against a fully configured domain.",
            features: [
                "Configured Active Directory Domain Services (AD DS), DNS, Group Policy Objects (GPOs), and SQL Server across multiple VMs.",
                "Performed domain enumeration, privilege escalation, Kerberoasting, and password spraying attacks.",
                "Conducted lateral movement techniques and used BloodHound + SharpHound for complete attack path analysis.",
                "Simulated LLMNR/NBT-NS poisoning with Inveigh and cracked captured hashes using Hashcat and John the Ripper.",
                "Investigated Windows Security Event IDs (4625, 4768, 4769) to understand attacker footprints."
            ],
            architecture: "Multi-VM lab built in VMware: Windows Server 2019 (Domain Controller), Windows Server 2008 (legacy target), Windows 10 (client workstation), and Kali Linux (attacker node). PowerView used for AD recon; Rubeus for Kerberos ticket manipulation; Mimikatz for credential extraction."
        },
        '2': {
            title: "SIEM-Based SOC Lab (Wazuh)",
            category: "SOC Operations / Blue Team",
            timeline: "2025 - 2026",
            tags: ["Wazuh SIEM", "Ubuntu", "Windows Server", "Kali Linux", "Log Analysis", "SOC"],
            description: "Built and configured a complete Security Operations Center (SOC) environment using the open-source Wazuh SIEM platform. The lab simulates real-world blue team workflows including attack simulation, detection, and investigation.",
            features: [
                "Deployed Wazuh SIEM on Ubuntu server and integrated Windows Server endpoint agents for centralized monitoring.",
                "Simulated brute-force attacks from Kali Linux and detected them through Event ID 4625 (failed logins) analysis.",
                "Performed log correlation and anomaly detection to identify suspicious authentication patterns.",
                "Created custom monitoring dashboards aligned with real SOC analyst workflows.",
                "Investigated security events end-to-end from alert triage to root cause analysis."
            ],
            architecture: "Ubuntu server running Wazuh Manager + Elasticsearch + Kibana stack. Windows Server 2019 configured as an agent endpoint. Kali Linux used as the attack machine. All logs centralized and indexed in the Wazuh dashboard for real-time monitoring."
        },
        '3': {
            title: "OSINT-Based Data Exposure Assessment Tool",
            category: "Cybersecurity / OSINT",
            timeline: "2025 - 2026",
            tags: ["Python", "Flask", "SQLite", "HaveIBeenPwned API", "VirusTotal API", "AbuseIPDB API"],
            description: "Developed an OSINT platform to identify publicly exposed information and assess cyber risks for individuals and organizations. Features a real-time web dashboard displaying threat intelligence findings.",
            github: "https://github.com/hameezcam/osint-data-exposure-tool",
            features: [
                "Email breach detection via HaveIBeenPwned API — checks if credentials appear in known data breaches.",
                "IP reputation analysis using AbuseIPDB API to flag malicious or suspicious IP addresses.",
                "Domain intelligence gathering for WHOIS, DNS records, and associated threat indicators.",
                "VirusTotal API integration for multi-engine threat analysis on URLs, files, and domains.",
                "Real-time web dashboard built with Flask, presenting exposure scores and actionable findings."
            ],
            architecture: "Python backend with Flask REST API serving a dynamic web dashboard. SQLite database stores scan history and results. Modular API integration layer handles rate-limited calls to HaveIBeenPwned, VirusTotal, and AbuseIPDB. Results processed and displayed with risk scoring."
        }
    };

    // Certifications Badges Database
    const certsData = {
        'letsdefend': {
            title: "SOC Fundamentals",
            issuer: "LetsDefend",
            date: "Completed 2026",
            id: "LetsDefend · SOC Track",
            status: "COMPLETED // 2026",
            details: "Hands-on SOC analyst training platform. Covers alert triage, SIEM usage, log analysis, malware analysis, phishing investigation, and real-world incident response workflows based on actual attack scenarios."
        },
        'uol': {
            title: "Cyber Security Fundamentals",
            issuer: "University of London",
            date: "Completed 2026",
            id: "University of London · 2026",
            status: "COMPLETED // 2026",
            details: "Comprehensive cybersecurity foundations program from the University of London. Covers threat landscapes, cryptography principles, network security, risk management, and practical digital defence strategies."
        },
        'ceh': {
            title: "Certified Ethical Hacker (CEH)",
            issuer: "EC-Council",
            date: "EC-Council",
            id: "EC-Council CEH",
            status: "CERTIFIED",
            details: "Covers dynamic ethical hacking methodologies. Includes vulnerability scanning, reconnaissance (OSINT), system hacking, web application penetration, Trojan analyses, and firewall evasion techniques."
        },
        'microsoft': {
            title: "Microsoft Cybersecurity Professional Certificate",
            issuer: "Microsoft",
            date: "Microsoft",
            id: "Microsoft Professional Certificate",
            status: "CERTIFIED",
            details: "Microsoft's professional cybersecurity certificate program covering threat protection, security management, identity and access management (IAM), cloud security fundamentals, and compliance."
        },
        'google': {
            title: "Google Cybersecurity Certificate",
            issuer: "Google / Coursera",
            date: "Google / Coursera",
            id: "Google Professional Certificate",
            status: "CERTIFIED",
            details: "Professional program validating practical skills. Focuses on SIEM monitoring with Splunk, vulnerability scanning with Nmap, cybersecurity scripting with Python, and packet capture triage with Wireshark."
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
                <p>Entering the security operations center (SOC) requires a structured approach to systems, networks, and telemetry tracking. As a SOC analyst, your role is to act as the primary defense vector, identifying events before they become critical breaches.</p>
                
                <h4>1. Solidify Network Foundations</h4>
                <p>You cannot defend what you don't understand. A SOC analyst must comprehend how packets traverse networks. Focus on:</p>
                <ul>
                    <li>The TCP/IP model in depth (packet headers, Handshake sequences, windowing).</li>
                    <li>DNS operations, DHCP, ARP, and routing configurations.</li>
                    <li>Network scanning protocols using tools like Wireshark and TCPdump.</li>
                </ul>

                <h4>2. Master SIEM Operations</h4>
                <p>Security Information and Event Management (SIEM) systems act as the brain of the SOC. You must understand:</p>
                <ul>
                    <li>Log collection, normalization, and parsing formats.</li>
                    <li>Constructing correlation rules to trigger alerts under specific threat heuristics.</li>
                    <li>Running analysis scripts on platforms like Splunk or Chronicle.</li>
                </ul>

                <h4>3. Understand System Log Analysis</h4>
                <p>Learn how to read Windows Event Logs (Security, System, Application) and Linux syslog files. Focus on identifying lateral movements, privilege escalations, and abnormal service starts.</p>
            `
        },
        'siem-intro': {
            title: "Introduction to SIEM: Ingestion, Correlating, and Alerts",
            category: "SIEM",
            date: "May 2026",
            readTime: "6 min read",
            content: `
                <p>SIEM (Security Information and Event Management) forms the backbone of security analytics. By collecting data from multiple nodes, it provides an aggregated dashboard of security events.</p>
                
                <h4>Data Ingestion Pipelines</h4>
                <p>Logs from endpoints, firewalls, and active directories are sent to forwarders. The SIEM normalizes this data, translating disparate log formats into structured, queryable data fields.</p>

                <h4>Correlation Engines</h4>
                <p>Correlation rules map multiple events to detect threat structures. For example: if Node A experiences 50 failed SSH logins within 1 minute, followed by 1 successful login, and then initiates an outbound connection to an unknown IP - the correlation engine triggers a high-priority incident alert.</p>

                <h4>Best Practices for SIEM Rules</h4>
                <ul>
                    <li>Reduce Alert Fatigue: Continuously tune rules to minimize false positives.</li>
                    <li>Log Source Hardening: Ensure logging forwarders are secured and logs cannot be deleted by local attackers.</li>
                    <li>Performance Tuning: Optimize indexing queries to maintain dashboard responsiveness.</li>
                </ul>
            `
        },
        'threat-hunting': {
            title: "Threat Hunting Methodology: Detecting Hidden Adversaries",
            category: "Threat Hunting",
            date: "May 2026",
            readTime: "10 min read",
            content: `
                <p>Passive monitoring is no longer sufficient. Modern adversaries utilize advanced techniques to hide within legitimate traffic. Threat hunting is the proactive search for attackers who have bypassed traditional security layers.</p>
                
                <h4>The Threat Hunting Loop</h4>
                <p>1. Formulate Hypothesis: Assume a specific breach vector based on intelligence (e.g. 'Attackers are utilizing DNS tunneling to exfiltrate database records').</p>
                <p>2. Query Telemetry: Filter DNS query logs for anomalies (e.g. unusually long subdomains, TXT record queries, high volume queries to unknown registrars).</p>
                <p>3. Analyze Anomalies: Triage findings using Wireshark to inspect packet content.</p>
                <p>4. Remediate & Automate: Block threat nodes and translate the hunting query into a permanent SIEM correlation rule.</p>

                <h4>Key Indicators of Compromise (IOCs)</h4>
                <ul>
                    <li>Unexpected outward network traffic spikes.</li>
                    <li>Unusual user login times and geographical origins.</li>
                    <li>Modification of core system files (hashes changed).</li>
                </ul>
            `
        },
        'ad-security': {
            title: "Active Directory Security Basics: Common Weaknesses",
            category: "Active Directory",
            date: "April 2026",
            readTime: "7 min read",
            content: `
                <p>Active Directory (AD) manages assets and access inside corporate networks, making it the highest-value target for adversaries seeking domain domination.</p>
                
                <h4>Common AD Attack Vectors</h4>
                <p><strong>Kerberoasting:</strong> Attackers request Kerberos service tickets for accounts linked to Service Principal Names (SPNs) and attempt to crack user passwords offline.</p>
                <p><strong>LLMNR/NBT-NS Poisoning:</strong> Attackers listen to multicast resolution queries and poison responses to capture credentials hashes.</p>
                <p><strong>Over-Privileged Accounts:</strong> Service accounts with domain administrator access present an easy compromise vector if password hygiene is weak.</p>

                <h4>Defensive Mitigations</h4>
                <ul>
                    <li>Implement Least Privilege access control models.</li>
                    <li>Enforce strong, long passwords for SPN service accounts and rotate keys regularly.</li>
                    <li>Disable LLMNR and NetBIOS protocols on local servers.</li>
                </ul>
            `
        },
        'osint-techniques': {
            title: "OSINT Techniques for Security Audits & Reconnaissance",
            category: "OSINT",
            date: "March 2026",
            readTime: "5 min read",
            content: `
                <p>OSINT (Open Source Intelligence) is the collection and analysis of publicly available data. In security audits, OSINT is used to identify exposed data vectors before malicious actors exploit them.</p>
                
                <h4>Key OSINT Datasets</h4>
                <p><strong>Domain Mapping:</strong> Utilizing sub-domain enumerators to discover forgotten staging sites and testing portals.</p>
                <p><strong>Metadata Extraction:</strong> Scanning corporate PDFs and files for software versions, hostnames, and employee emails.</p>
                <p><strong>Search Engine Dorking:</strong> Using advanced operators (e.g., 'filetype:sql' or 'inurl:admin') to isolate database backups or open admin portals.</p>

                <h4>Defensive Applications</h4>
                <p>Conduct regular self-auditing OSINT campaigns to map public footprints and promptly take down exposed code repositories or development folders.</p>
            `
        }
    };

    // Open Project Modals
    const projectTriggers = document.querySelectorAll('.open-project-modal');
    projectTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const id = trigger.getAttribute('data-project');
            const data = projectsData[id];
            
            if (data) {
                let tagsHtml = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
                let featuresHtml = data.features.map(f => `<li><i class="fas fa-check-circle"></i> <span>${f}</span></li>`).join('');
                
                projectModalBody.innerHTML = `
                    <h3 class="modal-project-title">${data.title}</h3>
                    <div class="modal-project-meta">
                        <span><i class="fas fa-folder"></i> ${data.category}</span>
                        <span><i class="far fa-calendar-alt"></i> ${data.timeline}</span>
                    </div>
                    <div class="modal-project-tags">${tagsHtml}</div>
                    <div class="modal-project-body">
                        <h4>PROJECT DESCRIPTION</h4>
                        <p>${data.description}</p>
                        
                        <h4>KEY FEATURES</h4>
                        <ul>${featuresHtml}</ul>
                        
                        <h4>SYSTEM ARCHITECTURE</h4>
                        <p>${data.architecture}</p>
                    </div>
                    <div class="modal-project-actions">
                        <a href="https://github.com" target="_blank" class="cyber-btn primary-btn"><span class="btn-text"><i class="fab fa-github"></i> Repository</span></a>
                        <button class="cyber-btn secondary-btnClose modal-close-action"><span class="btn-text">Close</span></button>
                    </div>
                `;
                
                // Add closing trigger inside modal
                projectModalBody.querySelector('.modal-close-action').addEventListener('click', () => {
                    projectModal.classList.remove('active');
                });
                
                projectModal.classList.add('active');
            }
        });
    });

    // Open Certifications Modals
    const certTriggers = document.querySelectorAll('.verify-cert-link');
    certTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const id = trigger.getAttribute('data-cert');
            const data = certsData[id];
            
            if (data) {
                let iconClass = 'fa-shield-halved';
                if (id === 'cisco') iconClass = 'fa-network-wired';
                if (id === 'google') iconClass = 'fa-google';
                
                certModalBody.innerHTML = `
                    <div class="modal-cert-body">
                        <div class="modal-cert-badge-wrapper">
                            <i class="fas ${iconClass}"></i>
                        </div>
                        <h3>${data.title}</h3>
                        <p class="cert-desc" style="font-size: 0.95rem;">${data.details}</p>
                        
                        <div class="modal-cert-details">
                            <div class="row">
                                <span class="label">ISSUER:</span>
                                <span class="val">${data.issuer}</span>
                            </div>
                            <div class="row">
                                <span class="label">DATE:</span>
                                <span class="val">${data.date}</span>
                            </div>
                            <div class="row">
                                <span class="label">CREDENTIAL_ID:</span>
                                <span class="val">${data.id}</span>
                            </div>
                            <div class="row">
                                <span class="label">STATUS:</span>
                                <span class="val text-success">${data.status}</span>
                            </div>
                        </div>
                        
                        <div class="modal-project-actions" style="margin-top: 10px; width: 100%; display: flex; justify-content: center;">
                            <button class="cyber-btn primary-btn cert-close-action"><span class="btn-text">Done Verification</span></button>
                        </div>
                    </div>
                `;
                
                certModalBody.querySelector('.cert-close-action').addEventListener('click', () => {
                    certModal.classList.remove('remove');
                    certModal.classList.remove('active');
                });
                
                certModal.classList.add('active');
            }
        });
    });

    // Open Blog Modals
    const blogTriggers = document.querySelectorAll('.read-blog-btn');
    blogTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const id = trigger.getAttribute('data-post');
            const data = blogData[id];
            
            if (data) {
                blogModalBody.innerHTML = `
                    <h3 class="modal-project-title">${data.title}</h3>
                    <div class="modal-project-meta">
                        <span><i class="fas fa-tag"></i> ${data.category}</span>
                        <span><i class="far fa-calendar-alt"></i> ${data.date}</span>
                        <span><i class="far fa-clock"></i> ${data.readTime}</span>
                    </div>
                    <div class="modal-project-body blog-modal-text-flow">
                        ${data.content}
                    </div>
                    <div class="modal-project-actions">
                        <button class="cyber-btn primary-btn blog-close-action"><span class="btn-text">Finished Reading</span></button>
                    </div>
                `;
                
                blogModalBody.querySelector('.blog-close-action').addEventListener('click', () => {
                    blogModal.classList.remove('active');
                });
                
                blogModal.classList.add('active');
            }
        });
    });

    // Close Modals triggers
    [projectClose, certClose, blogClose].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                projectModal.classList.remove('active');
                certModal.classList.remove('active');
                blogModal.classList.remove('active');
            });
        }
    });

    // Close modals on clicking overlay background
    [projectModal, certModal, blogModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });

    // Press escape key to close active modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectModal.classList.remove('active');
            certModal.classList.remove('active');
            blogModal.classList.remove('active');
        }
    });
}

/* --- Contact Form Handling & Math verification --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const logsBox = document.getElementById('contact-log-box');
    const logStatusText = document.getElementById('log-transmitting-status');
    const submitBtn = document.getElementById('contact-submit-btn');
    
    const captchaNum1 = document.getElementById('challenge-num1');
    const captchaNum2 = document.getElementById('challenge-num2');
    const captchaInput = document.getElementById('form-captcha');
    
    // Direct inquiry from services list
    const serviceButtons = document.querySelectorAll('.service-action-btn');
    const subjectInput = document.getElementById('form-subject');
    
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            if (subjectInput && serviceName) {
                subjectInput.value = `Inquiry: ${serviceName}`;
            }
        });
    });

    if (!form || !captchaNum1 || !captchaNum2) return;

    let num1 = 0;
    let num2 = 0;

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
        logStatusText.textContent = '&gt; Connecting to Node UAE_NODE_09...';
        
        let sequences = [
            { t: 800, txt: '&gt; Socket connection established. Exchanging certificates...' },
            { t: 1500, txt: '&gt; Tunnel established. Encrypting message bytes via AES-256...' },
            { t: 2300, txt: '&gt; Transmitting payload hashes... 100%' },
            { t: 3000, txt: '&gt; Transmission successful! Response code: 200 OK.' },
            { t: 3500, txt: '&gt; Message sent securely. Hameez will review the packet shortly.' }
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
                      HAMEEZ CAMBAL - SECURITY CV
========================================================================
Title: Cybersecurity Analyst | SOC Enthusiast | Network Security Specialist
Location: United Arab Emirates
Contact: hameez.cam@gmail.com
Website: https://hameezcambal.cyber
GitHub: https://github.com/hameezcam
LinkedIn: https://www.linkedin.com/in/hameez-cambal-988a2b314/

------------------------------------------------------------------------
MISSION STATEMENT
------------------------------------------------------------------------
Cybersecurity is about trust, resilience, and enabling organizations 
to operate securely in an increasingly connected world. I am passionate 
about solving complex problems, building practical solutions, and 
continuously improving my knowledge to help organizations strengthen 
their security posture.

------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
------------------------------------------------------------------------
Junior Network Security Specialist | Technology Infrastructure Node
Timeline: Present
Focus: Enterprise Defense, Risk Management, Hardening Protocols
Duties & Achievements:
- Security Audits: Conducted configuration and code reviews, identifying
  asset vulnerabilities and misconfigured services.
- Risk Assessments: Modeled threat profiles, calculated exposure indexes,
  and presented business mitigation paths.
- Disaster Recovery: Drafted business continuity blueprints and data recovery
  playbooks for critical network segments.
- ISMS Design: Co-designed Information Security Management Systems aligned
  with ISO/IEC 27001 compliance criteria.
- Security Integration: Deployed hardware/software security controls (Firewalls,
  VPN tunnels, IDS sensors).

------------------------------------------------------------------------
TECHNICAL SKILL MATRIX
------------------------------------------------------------------------
- Cybersecurity: SIEM, OSINT, Threat Hunting, Incident Response, 
                 Vulnerability Assessment, Risk Assessment, ISMS (ISO 27001)
- Networking:    TCP/IP, Routing & Switching, VPN, DNS, Firewalls
- Toolset:       Splunk, Wireshark, Nmap, Burp Suite, Nessus, Shodan, Metasploit
- Programming:   Python, Flask, JavaScript, SQL

------------------------------------------------------------------------
VERIFIED CERTIFICATIONS
------------------------------------------------------------------------
- ISC2 Certified in Cybersecurity (CC)        [ID: ISC2-CC-83921]
- CompTIA Security+                           [ID: COMP-SEC-92019]
- Certified Ethical Hacker (CEH)              [ID: ECC-CEH-39103]
- Cisco Certified Network Associate (CCNA)     [ID: CISCO-CS-38291]
- Google Professional Cybersecurity Certificate [ID: GOOG-CYBER-71029]

------------------------------------------------------------------------
FEATURED PROJECTS
------------------------------------------------------------------------
1. OSINT Data Exposure Assessment Tool
   - Real-time leak scanning, ML threat scoring, Differential Privacy.
2. WhatsApp Business Automation Bot
   - Webhook parsing, automated operator fallbacks, CRM sync logic.
3. Secure Encrypted Chat Application
   - TCP Socket multi-client transport using AES-256 and RSA key sync.
4. IoT mesh networking Research
   - NS-3 simulated mesh routing persistence in remote telemetry zones.

========================================================================
STATUS: SECURED // VERIFIED // UAE_NODE_09
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
