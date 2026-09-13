"use client";

import { useEffect, useState } from "react";

const PORTFOLIO_PROJECTS = [
  { id: 1, category: "soc", icon: "fa-map", bgText: "SOC_ROADMAP", tags: ["SOC", "SOCaaS", "SIEM", "Incident Response", "Security Operations", "SOC Architecture"], title: "In-House SOC Implementation Roadmap", summary: "Designed a phased roadmap for establishing an in-house Security Operations Center, covering SOC architecture, technology selection, monitoring operations, incident response, staffing, and scalability from business-hours monitoring toward 24/7 operations.", linkType: "confidential" },
  { id: 2, category: "soc", icon: "fa-sitemap", bgText: "MS_SENTINEL", tags: ["Microsoft Sentinel", "SIEM", "SOAR", "KQL", "Microsoft Defender", "Cloud Security"], title: "Microsoft Sentinel SOC Architecture", summary: "Designed a Microsoft Sentinel-based SOC architecture for centralized security monitoring, threat detection, investigation, and response. Planned integration with Microsoft Defender and cloud security services to support a scalable SOC environment.", linkType: "private" },
  { id: 3, category: "soc", icon: "fa-tower-broadcast", bgText: "WAZUH_LAB", tags: ["Wazuh", "SIEM", "Sysmon", "Windows Server", "Ubuntu", "VMware", "Threat Detection"], title: "Wazuh SIEM Home Lab", summary: "Built a hands-on SIEM lab using Wazuh, Ubuntu Server, Windows Server 2022, Sysmon, and VMware. Configured endpoint monitoring and security telemetry to simulate real-world SOC detection and investigation workflows.", linkType: "github_pending" },
  { id: 4, category: "security", icon: "fa-shield-halved", bgText: "M365_SEC", tags: ["Microsoft 365", "Defender for Office 365", "Anti-Phishing", "DLP", "Email Security", "Identity Protection"], title: "Microsoft 365 Security Hardening", summary: "Implemented and documented Microsoft 365 security controls focused on email and identity protection, including anti-phishing, impersonation protection, mailbox intelligence, phishing thresholds, quarantine policies, and DLP controls.", linkType: "confidential" },
  { id: 5, category: "security", icon: "fa-envelope", bgText: "CHECK_POINT", tags: ["Check Point", "Email Security", "Anti-Phishing", "DMARC", "Impersonation Protection"], title: "Check Point Email Security Hardening", summary: "Configured and documented Check Point email security controls across multiple client environments, including impersonation detection, newly registered domain protection, DMARC failure handling, phishing workflows, and email security policies.", linkType: "confidential" },
  { id: 6, category: "soc", icon: "fa-book-skull", bgText: "IR_PLAYBOOKS", tags: ["Incident Response", "SOC", "MITRE ATT&CK", "Malware Detection", "Account Compromise", "Threat Investigation"], title: "Incident Response Playbook Framework", summary: "Developed structured incident response playbooks for common SOC scenarios, including malware detection and account compromise. Defined investigation, containment, eradication, recovery, escalation, and documentation procedures.", linkType: "private" },
  { id: 7, category: "soc", icon: "fa-magnifying-glass-chart", bgText: "INCIDENT_INV", tags: ["Incident Investigation", "Windows Server", "Event Logs", "NTLM Authentication", "SOC"], title: "Security Incident Investigation", summary: "Investigated repeated Windows authentication failures involving an Administrator account, analyzing NTLM authentication events, Logon Type 3 activity, error codes, and recurring login patterns to determine whether the activity represented an attack or an underlying server issue.", linkType: "confidential" },
  { id: 8, category: "redteam", icon: "fa-file-shield", bgText: "VAPT_FRAMEWORK", tags: ["VAPT", "Penetration Testing", "OWASP", "Security Assessment", "Reporting", "Retesting"], title: "VAPT Assessment Framework", summary: "Developed a professional VAPT framework covering assessment methodology, scope definition, client questionnaires, proposals, reporting, remediation validation, and retesting. Structured the process for delivering repeatable penetration testing engagements.", linkType: "private" },
  { id: 9, category: "redteam", icon: "fa-bug", bgText: "WEB_APP_SEC", tags: ["DVWA", "OWASP Juice Shop", "Web Security", "VAPT", "OWASP", "Penetration Testing"], title: "Web Application Security Lab", summary: "Built a controlled web application security testing environment using DVWA and OWASP Juice Shop to practice vulnerability discovery, exploitation, validation, and security reporting against intentionally vulnerable applications.", linkType: "none" },
  { id: 10, category: "soc", icon: "fa-network-wired", bgText: "MITRE_ATTACK", tags: ["MITRE ATT&CK", "Threat Detection", "Detection Engineering", "SOC", "Threat Intelligence"], title: "MITRE ATT&CK Detection Mapping", summary: "Developed a structured MITRE ATT&CK mapping framework to associate security detections, attack behaviors, and defensive controls with relevant adversary techniques and tactics.", linkType: "none" },
  { id: 11, category: "security", icon: "fa-microchip", bgText: "OSINT_CORE_V1", tags: ["Python", "Flask", "SQLite", "HaveIBeenPwned API", "VirusTotal API", "AbuseIPDB API", "OSINT"], title: "OSINT-Based Data Exposure Assessment Tool", summary: "Platform to identify publicly exposed information — email breach detection, IP reputation, domain intelligence, and real-time threat dashboard with risk scoring.", linkType: "github", githubUrl: "https://github.com/hameezcam/osint-data-exposure-tool" },
  { id: 12, category: "redteam", icon: "fa-sitemap", bgText: "AD_REDTEAM_LAB", tags: ["Windows Server 2019", "Active Directory", "BloodHound", "Kerberoasting", "Mimikatz", "PowerShell", "Red Team"], title: "Active Directory Red Team Lab", summary: "Enterprise-style AD environment with multi-VM setup simulating real-world attacks — Kerberoasting, lateral movement, privilege escalation, and BloodHound attack path analysis.", linkType: "lab" },
  { id: 13, category: "soc", icon: "fa-server", bgText: "SOC_SCALING", tags: ["SOC Architecture", "SIEM", "Infrastructure", "Scalability", "Security Ops"], title: "SOC Infrastructure Scaling Architecture", summary: "Designed scalable SOC architecture concepts for environments ranging from 50 to 400 users, evaluating monitoring requirements, infrastructure, SIEM capacity, and telemetry bandwidth.", linkType: "private" },
  { id: 14, category: "security", icon: "fa-folder-tree", bgText: "SOC_DOCS", tags: ["Security Docs", "SOC", "Checklists", "Version Control", "ISO 27001"], title: "Security Operations Documentation Framework", summary: "Created standardized documentation structures for client security configurations, security checklists, version control, ticket resolutions, and recurring SOC operational procedures.", linkType: "confidential" }
];

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load Font Awesome
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(fa);

    // Load existing style.css from public
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/style.css";
    document.head.appendChild(css);

    // Load Google Fonts
    const gf1 = document.createElement("link");
    gf1.rel = "preconnect";
    gf1.href = "https://fonts.googleapis.com";
    document.head.appendChild(gf1);

    const gf2 = document.createElement("link");
    gf2.rel = "preconnect";
    (gf2 as any).crossOrigin = "anonymous";
    gf2.href = "https://fonts.gstatic.com";
    document.head.appendChild(gf2);

    const gf3 = document.createElement("link");
    gf3.rel = "stylesheet";
    gf3.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Space+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(gf3);

    // Add cyber-theme class to body
    document.body.classList.add("cyber-theme");

    // Load script.js from public
    const script = document.createElement("script");
    script.src = "/script.js";
    script.defer = true;
    script.onload = () => {
      // @ts-ignore
      if (window.initCyberApp) window.initCyberApp();
    };
    document.body.appendChild(script);

    return () => {
      document.body.classList.remove("cyber-theme");
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Background Canvas for Particles */}
      <canvas id="plexus-canvas"></canvas>

      {/* Cyberpunk grid & scanline overlays */}
      <div className="cyber-grid"></div>
      <div className="scanlines"></div>
      <div className="cyber-terminal-overlay"></div>

      {/* Navigation Header */}
      <header className="main-header" id="navbar">
        <div className="header-container">
          <a href="#home" className="logo">
            <span className="cyber-accent-blue">&lt;</span>H.CAMBAL
            <span className="cursor-blink">_</span>
            <span className="cyber-accent-purple">/&gt;</span>
          </a>

          <nav className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li><a href="#home" className="nav-link active" id="nav-home">Home</a></li>
              <li><a href="#about" className="nav-link" id="nav-about">About</a></li>
              <li><a href="#skills" className="nav-link" id="nav-skills">Skills</a></li>
              <li><a href="#experience" className="nav-link" id="nav-experience">Experience</a></li>
              <li><a href="#projects" className="nav-link" id="nav-projects">Projects</a></li>
              <li><a href="#services" className="nav-link" id="nav-services">Services</a></li>
              <li><a href="#certifications" className="nav-link" id="nav-certifications">Certifications</a></li>
              <li><a href="#blog" className="nav-link" id="nav-blog">Blog</a></li>
              <li><a href="#contact" className="nav-link" id="nav-contact">Contact</a></li>
            </ul>
            <div className="mobile-socials">
              <a href="https://www.linkedin.com/in/hameez-cambal-988a2b314/" target="_blank" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://github.com/hameezcam" target="_blank" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="mailto:hameez.cam@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
            </div>
          </nav>

          <div className="header-actions">
            <a href="#terminal-section" className="terminal-btn-nav" title="Launch CLI Terminal">
              <i className="fas fa-terminal"></i> Terminal
            </a>
            <button className="hamburger-menu" id="menu-toggle" aria-label="Toggle navigation menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="terminal-tag">
                <span className="badge green-pulse"><i className="fas fa-circle"></i> SECURE_CONNECTION_ESTABLISHED</span>
                <span className="badge blue-accent">LOC: UAE_NODE_09</span>
              </div>

              <h1 className="hero-title text-glow">
                <span className="light-text">Hameez</span> Cambal
              </h1>

              <h2 className="hero-subtitle">
                <span id="typed-text"></span><span className="cursor-blink">|</span>
              </h2>

              <p className="hero-description">
                Cybersecurity professional with experience in network security, risk assessments, information security management systems, and security operations. Passionate about building solutions and helping organizations strengthen their security posture.
              </p>

              <div className="hero-ctas">
                <a href="/Hameez_Cambal_Resume.pdf" target="_blank" className="cyber-btn primary-btn">
                  <span className="btn-text"><i className="fas fa-file-pdf"></i> Download PDF CV</span>
                  <span className="btn-glow"></span>
                </a>
                <a href="#projects" className="cyber-btn secondary-btn">
                  <span className="btn-text"><i className="fas fa-project-diagram"></i> View Projects</span>
                </a>
                <a href="javascript:void(0)" className="cyber-btn text-btn" id="download-cv-btn">
                  <span className="btn-text"><i className="fas fa-terminal"></i> Terminal CV (.txt)</span>
                </a>
              </div>

              <div className="hero-socials">
                <span className="social-label">SECURE_CHANNELS:</span>
                <a href="https://www.linkedin.com/in/hameez-cambal-988a2b314/" target="_blank" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/hameezcam" target="_blank" className="social-icon" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="mailto:hameez.cam@gmail.com" className="social-icon" aria-label="Email"><i className="fas fa-envelope"></i></a>
              </div>
            </div>

            {/* Hero Visual / Cyber Dashboard */}
            <div className="hero-visual">
              <div className="cyber-shield-container">
                <div className="shield-ring outer-ring"></div>
                <div className="shield-ring middle-ring"></div>
                <div className="shield-ring inner-ring"></div>
                <div className="shield-icon-wrapper">
                  <img src="/hameez.jpg" alt="Hameez Cambal" className="hero-avatar" />
                </div>
              </div>
              <div className="stats-dashboard">
                <div className="stat-card glass-card">
                  <span className="stat-number cyber-accent-blue">05</span>
                  <span className="stat-label">Verified Certs</span>
                </div>
                <div className="stat-card glass-card">
                  <span className="stat-number cyber-accent-purple">14</span>
                  <span className="stat-label">Core Projects</span>
                </div>
                <div className="stat-card glass-card">
                  <span className="stat-number text-success">100%</span>
                  <span className="stat-label">Resilience Mindset</span>
                </div>
              </div>
            </div>
          </div>

          <a href="#terminal-section" className="scroll-indicator" aria-label="Scroll Down">
            <span className="mouse-icon"><span className="mouse-wheel"></span></span>
            <span className="scroll-text">SYSTEM_DIAGNOSTICS</span>
          </a>
        </section>

        {/* Cyber Terminal CLI Section */}
        <section id="terminal-section" className="terminal-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">INTERACTIVE_CLI</span>
              <h2 className="section-title text-glow">Hacker Console</h2>
              <p className="section-subtitle">Type shell commands directly to query credentials and simulate security audits.</p>
            </div>

            <div className="terminal-wrapper glass-card">
              <div className="terminal-bar">
                <div className="terminal-buttons">
                  <span className="t-btn t-close"></span>
                  <span className="t-btn t-minimize"></span>
                  <span className="t-btn t-maximize"></span>
                </div>
                <div className="terminal-title">guest@hc-sec-node:~</div>
                <div className="terminal-status">
                  <span className="stat-badge"><i className="fas fa-shield"></i> SSL_ON</span>
                </div>
              </div>

              <div className="terminal-body" id="terminal-body">
                <div className="terminal-line system-msg">Initializing Antigravity Secure Shell (ASH v1.4.2)...</div>
                <div className="terminal-line system-msg">Host: Hameez Cambal Security Core</div>
                <div className="terminal-line system-msg">Date: <span className="current-date-placeholder"></span> | Node status: ONLINE</div>
                <div className="terminal-line system-msg">Type <span className="terminal-highlight">help</span> to view list of available core commands.</div>
                <div className="terminal-line">&nbsp;</div>
              </div>

              <div className="terminal-input-line">
                <span className="terminal-prompt">guest@hc-sec-node:~$</span>
                <input type="text" id="terminal-input" autoComplete="off" placeholder="Type 'help' here..." />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">PERSONA_PROFILE</span>
              <h2 className="section-title text-glow">About Me</h2>
            </div>

            <div className="about-grid">
              <div className="about-info glass-card">
                <h3 className="about-tagline">&quot;Security is about trust, resilience, and enabling organizations to operate securely in an increasingly connected world.&quot;</h3>
                <p className="about-mission">
                  I am Hameez Cambal. I am passionate about solving complex problems, building practical security solutions, and continuously improving my knowledge to help organizations strengthen their overall security posture. By blending structural risk assessments with tactical security operations and network hardening, my goal is to construct robust defense-in-depth architectures.
                </p>

                <div className="about-details">
                  <div className="detail-item">
                    <span className="detail-label">LOCATION:</span>
                    <span className="detail-val"><i className="fas fa-map-marker-alt text-danger"></i> United Arab Emirates</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">FOCUS AREAS:</span>
                    <span className="detail-val">Security Operations (SOC), GRC, ISMS Frameworks</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">STATUS:</span>
                    <span className="detail-val"><span className="badge green-pulse">Open for Roles / Consulting</span></span>
                  </div>
                </div>
              </div>

              <div className="about-focus">
                <h3 className="sub-section-title">Core Competencies</h3>
                <div className="focus-grid">
                  <div className="focus-card glass-card hover-glow">
                    <div className="focus-icon-wrapper cyber-accent-blue-bg"><i className="fas fa-network-wired"></i></div>
                    <h4>Network Security</h4>
                    <p>Hardening network infrastructure, setting up firewalls, zoning, and securing VPNs.</p>
                    <span className="focus-status">DEFENSE LEVEL: STRENGTHENED</span>
                  </div>
                  <div className="focus-card glass-card hover-glow">
                    <div className="focus-icon-wrapper cyber-accent-purple-bg"><i className="fas fa-eye"></i></div>
                    <h4>SOC Operations</h4>
                    <p>Security analysis, alert triaging, log analysis, threat intelligence integration.</p>
                    <span className="focus-status">MONITORING: ACTIVE</span>
                  </div>
                  <div className="focus-card glass-card hover-glow">
                    <div className="focus-icon-wrapper green-bg"><i className="fas fa-crosshairs"></i></div>
                    <h4>Threat Hunting</h4>
                    <p>Proactively identifying advanced threats hiding inside network telemetry.</p>
                    <span className="focus-status">SEARCH: DEPLOYED</span>
                  </div>
                  <div className="focus-card glass-card hover-glow">
                    <div className="focus-icon-wrapper yellow-bg"><i className="fas fa-clipboard-check"></i></div>
                    <h4>Risk Assessment</h4>
                    <p>Quantifying security risks, identifying vulnerabilities, and detailing mitigations.</p>
                    <span className="focus-status">COMPLIANCE: ALIGNED</span>
                  </div>
                  <div className="focus-card glass-card hover-glow">
                    <div className="focus-icon-wrapper red-bg"><i className="fas fa-fire-extinguisher"></i></div>
                    <h4>Incident Response</h4>
                    <p>Triaging containment, eradication, and post-incident system recoveries.</p>
                    <span className="focus-status">STANDBY: READY</span>
                  </div>
                  <div className="focus-card glass-card hover-glow">
                    <div className="focus-icon-wrapper blue-bg"><i className="fas fa-scroll"></i></div>
                    <h4>ISMS Planning</h4>
                    <p>Designing frameworks based on ISO 27001 to safeguard digital assets.</p>
                    <span className="focus-status">FRAMEWORK: INTEGRATED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">SKILLSET_MATRIX</span>
              <h2 className="section-title text-glow">Technical Capabilities</h2>
              <p className="section-subtitle">Categorized breakdown of technical proficiency, systems, and specialized tooling.</p>
            </div>

            <div className="core-expertise glass-card" style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.8rem", letterSpacing: "0.15em", color: "var(--cyber-blue)", textTransform: "uppercase", marginBottom: "1rem" }}><i className="fas fa-crosshairs" style={{ marginRight: "0.5rem" }}></i>Core Expertise</h3>
              <div className="badge-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "0.6rem" }}>
                {["SOC Operations","Threat Detection","SIEM Monitoring","Active Directory Security","Blue Team Operations","Red Team Labs","Incident Response","OSINT Investigations","Risk Assessment","Vulnerability Assessment","Threat Intelligence","Windows Security","Identity & Access Mgmt","Log Analysis"].map(tag => (
                  <span key={tag} className="expertise-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="skills-wrapper glass-card">
              <div className="skills-tabs">
                <button className="tab-btn active" data-tab="cybersecurity"><i className="fas fa-shield-halved"></i> Cybersecurity</button>
                <button className="tab-btn" data-tab="networking"><i className="fas fa-network-wired"></i> Networking</button>
                <button className="tab-btn" data-tab="tools"><i className="fas fa-wrench"></i> Security Tools</button>
                <button className="tab-btn" data-tab="programming"><i className="fas fa-code"></i> Programming</button>
                <button className="tab-btn" data-tab="platforms"><i className="fas fa-server"></i> Platforms</button>
              </div>

              <div className="skills-content-wrapper">
                {/* Cybersecurity Tab */}
                <div className="tab-content active" id="cybersecurity">
                  <div className="skills-grid">
                    {[
                      { name: "SIEM Monitoring (Wazuh)", pct: 90 },
                      { name: "SOC Operations & Threat Detection", pct: 88 },
                      { name: "Active Directory Security & Attack Paths", pct: 85 },
                      { name: "OSINT Investigations", pct: 90 },
                      { name: "Incident Response & Log Analysis", pct: 87 },
                      { name: "Vulnerability Assessment", pct: 88 },
                      { name: "Risk Assessment", pct: 92 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill cyber-accent-blue-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Networking Tab */}
                <div className="tab-content" id="networking">
                  <div className="skills-grid">
                    {[
                      { name: "TCP/IP Stack Architecture", pct: 90 },
                      { name: "Routing & Switching", pct: 85 },
                      { name: "VPN (IPsec / SSL VPNs)", pct: 80 },
                      { name: "DNS Infrastructure & Hardening", pct: 85 },
                      { name: "Firewalls & ACL Configurations", pct: 90 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill cyber-accent-purple-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools Tab */}
                <div className="tab-content" id="tools">
                  <div className="badge-grid">
                    {[
                      { icon: "fa-shield-halved", name: "Wazuh", sub: "SIEM Platform" },
                      { icon: "fa-circle-nodes", name: "BloodHound", sub: "AD Attack Paths" },
                      { icon: "fa-crosshairs", name: "SharpHound", sub: "AD Enumeration" },
                      { icon: "fa-eye", name: "PowerView", sub: "AD Recon" },
                      { icon: "fa-skull-crossbones", name: "Mimikatz", sub: "Credential Dumping" },
                      { icon: "fa-ticket", name: "Rubeus", sub: "Kerberos Attacks" },
                      { icon: "fa-wifi", name: "Inveigh", sub: "LLMNR Poisoning" },
                      { icon: "fa-lock-open", name: "Hashcat", sub: "Password Cracking" },
                      { icon: "fa-key", name: "John the Ripper", sub: "Hash Cracking" },
                      { icon: "fa-dragon", name: "Kali Linux", sub: "Pentesting OS" },
                      { icon: "fa-bug", name: "VirusTotal", sub: "Threat Intelligence" },
                      { icon: "fa-ban", name: "AbuseIPDB", sub: "IP Reputation" },
                    ].map(t => (
                      <div key={t.name} className="tool-badge glass-card hover-glow">
                        <i className={`fas ${t.icon}`}></i>
                        <span>{t.name}</span>
                        <small>{t.sub}</small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Programming Tab */}
                <div className="tab-content" id="programming">
                  <div className="skills-grid">
                    {[
                      { name: "Python (Automation, OSINT, Flask)", pct: 88 },
                      { name: "PowerShell (AD Administration & Scripting)", pct: 85 },
                      { name: "Flask (Web Dashboards & REST APIs)", pct: 80 },
                      { name: "SQL (Database Querying & Injection Defenses)", pct: 80 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill green-pulse-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platforms Tab */}
                <div className="tab-content" id="platforms">
                  <div className="skills-grid">
                    {[
                      { name: "Windows Server 2019 / 2008", pct: 90 },
                      { name: "Active Directory, DNS & Group Policy", pct: 88 },
                      { name: "Ubuntu / Linux Server", pct: 85 },
                      { name: "VMware (Virtualization Labs)", pct: 87 },
                      { name: "SQL Server", pct: 78 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill cyber-accent-purple-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">TIMELINE_LOGS</span>
              <h2 className="section-title text-glow">Professional Experience</h2>
            </div>

            <div className="timeline-container">
              <div className="timeline-line-indicator"></div>
              <div className="timeline-item glass-card hover-glow">
                <div className="timeline-header">
                  <div className="timeline-title-group">
                    <h3>Cyber Security Intern</h3>
                    <span className="company-tag"><i className="fas fa-building"></i> Supercad Trading LLC</span>
                  </div>
                  <span className="timeline-date"><i className="far fa-calendar-alt"></i> Present</span>
                </div>
                <div className="timeline-body">
                  <p className="timeline-description">
                    Dedicated focus on engineering security defenses, orchestrating structural risk mitigations, and hardening system designs across complex networks.
                  </p>
                  <ul className="duties-list">
                    <li><i className="fas fa-shield-halved duty-icon"></i><span><strong>Security Audits:</strong> Conducting systematic analysis of client infrastructure configurations to uncover vulnerabilities and structural misconfigurations.</span></li>
                    <li><i className="fas fa-triangle-exclamation duty-icon"></i><span><strong>Risk Assessments:</strong> Developing risk matrix documents to identify assets, assess threat vectors, and detail business mitigation paths.</span></li>
                    <li><i className="fas fa-rotate duty-icon"></i><span><strong>Disaster Recovery Planning:</strong> Architecting business continuity models to ensure swift disaster recovery in threat scenarios.</span></li>
                    <li><i className="fas fa-lock duty-icon"></i><span><strong>ISMS Design:</strong> Constructing Information Security Management Systems aligned with international industry compliance frameworks (ISO/IEC 27001).</span></li>
                    <li><i className="fas fa-gears duty-icon"></i><span><strong>Solution Implementation:</strong> Integrating security controls including Firewalls, VPN gateways, logging nodes, and access control policies.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="projects-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">DEPLOYED_BUILD_LOGS</span>
              <h2 className="section-title text-glow">Featured Work</h2>
              <p className="section-subtitle">Technical security solutions and code architectures developed to address specific threat models.</p>
            </div>

            <div className="project-filters">
              <button className="filter-btn active" data-filter="all">ALL_BUILDS</button>
              <button className="filter-btn" data-filter="security">SECURITY</button>
              <button className="filter-btn" data-filter="soc">SOC / BLUE TEAM</button>
              <button className="filter-btn" data-filter="redteam">RED TEAM</button>
            </div>

            <div className="projects-grid">
              {PORTFOLIO_PROJECTS.map(p => (
                <article key={p.id} className="project-card glass-card hover-glow" data-category={p.category}>
                  <div className="project-media">
                    <div className="cyber-scan-effect"></div>
                    <div className="media-placeholder">
                      <i className={`fas ${p.icon}`}></i>
                      <span className="grid-text-bg">{p.bgText}</span>
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-tags">
                      {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-summary">{p.summary}</p>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginTop: "auto" }}>
                      <button className="cyber-btn-sm open-project-modal" data-project={p.id}>
                        <span>DEEP_DIVE <i className="fas fa-arrow-right"></i></span>
                      </button>
                      {(p as any).githubUrl && (
                        <a href={(p as any).githubUrl} target="_blank" rel="noopener" className="cyber-btn-sm" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}>
                          <span><i className="fab fa-github"></i> GitHub</span>
                        </a>
                      )}
                      {p.linkType === 'confidential' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", opacity: 0.7, cursor: "not-allowed" }}>
                          <span><i className="fas fa-lock"></i> Confidential</span>
                        </span>
                      )}
                      {p.linkType === 'private' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", opacity: 0.7, cursor: "not-allowed" }}>
                          <span><i className="fas fa-eye-slash"></i> Private</span>
                        </span>
                      )}
                      {p.linkType === 'lab' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}>
                          <span><i className="fas fa-cubes"></i> Lab Setup</span>
                        </span>
                      )}
                      {p.linkType === 'github_pending' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}>
                          <span><i className="fab fa-github"></i> Coming Soon</span>
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">SERVICES_DIRECTORY</span>
              <h2 className="section-title text-glow">Professional Offerings</h2>
              <p className="section-subtitle">How I help organizations mitigate cyber risk and secure their network architectures.</p>
            </div>

            <div className="services-grid">
              {[
                { icon: "fa-file-shield", title: "Security Audits", desc: "Thorough evaluation of systems, networks, access patterns, and codebases to ensure maximum compliance and security posture alignment.", svc: "Security Audits" },
                { icon: "fa-circle-exclamation", title: "Risk Assessments", desc: "Detailed identifying and mapping of potential organizational security threats and vulnerabilities, complete with mitigation planning.", svc: "Risk Assessments" },
                { icon: "fa-magnifying-glass-dot", title: "Vulnerability Assessments", desc: "Scanning systems for exploitable loopholes, prioritizing CVE vectors, and recommending patch remediation pathways.", svc: "Vulnerability Assessments" },
                { icon: "fa-clipboard-list", title: "ISMS Consulting", desc: "Designing and constructing complete ISO/IEC 27001 information security programs, from asset inventories to threat policies.", svc: "ISMS Consulting" },
                { icon: "fa-chess-knight", title: "Cybersecurity Advisory", desc: "Strategic consultation services for executives, providing advisory on emerging threat profiles, tech stacks, and team training.", svc: "Cybersecurity Advisory" },
                { icon: "fa-network-wired", title: "Network Security Solutions", desc: "Implementation of firewalls, Intrusion Detection Systems (IDS/IPS), VPN infrastructure, and network segmentation designs.", svc: "Network Security Solutions" },
              ].map(s => (
                <div key={s.title} className="service-card glass-card hover-glow">
                  <div className="service-icon"><i className={`fas ${s.icon}`}></i></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a href="#contact" className="service-action-btn" data-service={s.svc}>Inquire <i className="fas fa-chevron-right"></i></a>
                </div>
              ))}
            </div>

            <div className="services-banner glass-card">
              <p className="banner-text">Contact me for a consultation to discuss your specific security requirements.</p>
              <a href="#contact" className="cyber-btn primary-btn">
                <span className="btn-text"><i className="fas fa-calendar-check"></i> Book Consultation</span>
              </a>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="certifications-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">CREDENTIALS</span>
              <h2 className="section-title text-glow">Certifications</h2>
            </div>

            <div className="certifications-grid">
              {[
                { icon: "fa-tower-observation", issuer: "LETSDEFEND", status: "COMPLETED // 2026", title: "SOC Fundamentals", desc: "Hands-on SOC training covering alert triage, log analysis, threat detection, and real-world incident investigation workflows.", meta: "LetsDefend · 2026", cert: "letsdefend" },
                { icon: "fa-graduation-cap", issuer: "UNIV. LONDON", status: "COMPLETED // 2026", title: "Cyber Security Fundamentals", desc: "Comprehensive cybersecurity foundations from the University of London — covering threat landscapes, security principles, and digital defence strategies.", meta: "University of London · 2026", cert: "uol" },
                { icon: "fa-shield-halved", issuer: "EC-COUNCIL", status: "CERTIFIED", title: "Certified Ethical Hacker (CEH)", desc: "Offensive scanning, system exploitation, web application hacking, Trojan analysis, and network packet analysis.", meta: "EC-Council", cert: "ceh" },
                { icon: "fa-brands fa-microsoft", issuer: "MICROSOFT", status: "CERTIFIED", title: "Microsoft Cybersecurity Professional Certificate", desc: "Microsoft's professional cybersecurity program covering threat protection, identity management, and cloud security fundamentals.", meta: "Microsoft", cert: "microsoft" },
                { icon: "fa-brands fa-google", issuer: "GOOGLE", status: "CERTIFIED", title: "Google Cybersecurity Certificate", desc: "SIEM monitoring with Splunk and Chronicle, log tracking, IDS alerting, vulnerability scanning, and Python scripting.", meta: "Google / Coursera", cert: "google" },
              ].map(c => (
                <div key={c.title} className="cert-card glass-card hover-glow">
                  <div className="cert-badge-visual">
                    <i className={`fas ${c.icon} cert-icon-big`}></i>
                    <span className="cert-issuer">{c.issuer}</span>
                  </div>
                  <div className="cert-info">
                    <span className="cert-status-tag status-verified">{c.status}</span>
                    <h3>{c.title}</h3>
                    <p className="cert-desc">{c.desc}</p>
                    <div className="cert-meta">
                      <span>{c.meta}</span>
                      <a href="javascript:void(0)" className="verify-cert-link" data-cert={c.cert}>View Badge</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="blog-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">INTELLIGENCE_FEEDS</span>
              <h2 className="section-title text-glow">Security Insights</h2>
              <p className="section-subtitle">Documenting concepts, technical blueprints, and active research findings.</p>
            </div>

            <div className="blog-grid">
              {[
                { gradient: "blue-gradient", icon: "fa-road", category: "Roadmaps", date: "June 2026", read: "8 min read", title: "SOC Analyst Roadmap", excerpt: "An actionable blueprint detailing essential skills, threat hunting paradigms, incident response protocols, and tools needed to secure a SOC Analyst position.", post: "soc-roadmap" },
                { gradient: "purple-gradient", icon: "fa-magnifying-glass-chart", category: "SIEM", date: "May 2026", read: "6 min read", title: "Introduction to SIEM", excerpt: "Deep dive into Security Information and Event Management systems. Learn ingestion structures, correlation rules creation, and parsing techniques using Splunk.", post: "siem-intro" },
                { gradient: "dark-gradient", icon: "fa-crosshairs", category: "Threat Hunting", date: "May 2026", read: "10 min read", title: "Threat Hunting Methodology", excerpt: "Proactive defense modeling. Understanding IOCs, behavior heuristics, the cyber kill chain, and using Wireshark and Nmap to detect hidden adversaries.", post: "threat-hunting" },
                { gradient: "blue-gradient", icon: "fa-network-wired", category: "Active Directory", date: "April 2026", read: "7 min read", title: "Active Directory Security Basics", excerpt: "An overview of vulnerability surfaces in AD environments including Kerberoasting, LLMNR poisoning, and access privilege misconfigurations.", post: "ad-security" },
                { gradient: "purple-gradient", icon: "fa-globe", category: "OSINT", date: "March 2026", read: "5 min read", title: "OSINT Techniques", excerpt: "Information gathering mechanisms using domain histories, WHOIS indexing, Shodan search operators, and social engineering maps.", post: "osint-techniques" },
              ].map(b => (
                <article key={b.title} className="blog-card glass-card hover-glow">
                  <div className="blog-image">
                    <div className={`blog-card-visual ${b.gradient}`}><i className={`fas ${b.icon}`}></i></div>
                    <span className="blog-category">{b.category}</span>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-date"><i className="far fa-calendar"></i> {b.date}</span>
                      <span className="blog-read-time"><i className="far fa-clock"></i> {b.read}</span>
                    </div>
                    <h3 className="blog-title">{b.title}</h3>
                    <p className="blog-excerpt">{b.excerpt}</p>
                    <a href="javascript:void(0)" className="read-blog-btn" data-post={b.post}>Read Article <i className="fas fa-chevron-right"></i></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">COMMS_ESTABLISHMENT</span>
              <h2 className="section-title text-glow">Get In Touch</h2>
              <p className="section-subtitle">Establish a secure communications handshake. Drop a message for collaborations, consultation, or opportunities.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-form-wrapper glass-card">
                <h3 className="comms-title"><i className="fas fa-key"></i> Encrypted Message Handshake</h3>

                <form id="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="form-name">CLIENT_NAME:</label>
                      <input type="text" id="form-name" name="name" required placeholder="Hacker/Recruiter Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email">CLIENT_EMAIL:</label>
                      <input type="email" id="form-email" name="email" required placeholder="name@domain.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-subject">COMM_SUBJECT:</label>
                    <input type="text" id="form-subject" name="subject" required placeholder="e.g. SOC Position Inquiry" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-message">MESSAGE_PAYLOAD:</label>
                    <textarea id="form-message" name="message" required rows={5} placeholder="Write your message payload here..."></textarea>
                  </div>

                  <div className="form-security-challenge">
                    <div className="sec-challenge-label">ANTI_BOT_VERIFICATION: Solve equation</div>
                    <div className="challenge-math">
                      <span id="challenge-num1">5</span> + <span id="challenge-num2">9</span> =
                      <input type="number" id="form-captcha" required placeholder="?" />
                    </div>
                  </div>

                  <button type="submit" className="cyber-btn primary-btn block-btn" id="contact-submit-btn">
                    <span className="btn-text"><i className="fas fa-paper-plane"></i> Transmit Packet</span>
                    <span className="btn-glow"></span>
                  </button>
                </form>

                <div className="contact-log-box" id="contact-log-box" style={{ display: "none" }}>
                  <div className="log-line text-success">&gt; Initializing encryption protocols... [DONE]</div>
                  <div className="log-line text-success">&gt; Hashing message payload... SHA-256 [COMPLETED]</div>
                  <div className="log-line text-success">&gt; Transmitting secure data packets to UAE Node...</div>
                  <div className="log-line text-glow" id="log-transmitting-status">&gt; Connecting...</div>
                </div>
              </div>

              <div className="contact-channels">
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon text-success"><i className="fas fa-map-location-dot"></i></div>
                  <div className="channel-info"><h4>NODE_LOCATION</h4><p>United Arab Emirates</p></div>
                </div>
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon cyber-accent-blue"><i className="fas fa-envelope-open-text"></i></div>
                  <div className="channel-info"><h4>SECURE_EMAIL</h4><p><a href="mailto:hameez.cam@gmail.com">hameez.cam@gmail.com</a></p></div>
                </div>
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon cyber-accent-purple"><i className="fab fa-linkedin"></i></div>
                  <div className="channel-info"><h4>PROFESSIONAL_GRAPH</h4><p><a href="https://www.linkedin.com/in/hameez-cambal-988a2b314/" target="_blank">linkedin.com/in/hameez-cambal</a></p></div>
                </div>
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon"><i className="fab fa-github"></i></div>
                  <div className="channel-info"><h4>REPOSITORY_CORE</h4><p><a href="https://github.com/hameezcam" target="_blank">github.com/hameezcam</a></p></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-quote-section">
            <p className="footer-quote">&quot;Security is not just technology—it is trust, resilience, and continuous improvement.&quot;</p>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 Hameez Cambal. All rights secured.</p>
            <div className="footer-system-status">
              <span className="status-indicator-light"></span>
              <span className="status-text">CORE_SYSTEM: SECURE // ONLINE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <div className="modal-overlay" id="project-modal">
        <div className="modal-box glass-card">
          <button className="modal-close" id="project-modal-close" aria-label="Close modal">&times;</button>
          <div className="modal-body-content" id="project-modal-body"></div>
        </div>
      </div>

      <div className="modal-overlay" id="cert-modal">
        <div className="modal-box glass-card small-modal">
          <button className="modal-close" id="cert-modal-close" aria-label="Close modal">&times;</button>
          <div className="modal-body-content" id="cert-modal-body"></div>
        </div>
      </div>

      <div className="modal-overlay" id="blog-modal">
        <div className="modal-box glass-card large-modal">
          <button className="modal-close" id="blog-modal-close" aria-label="Close modal">&times;</button>
          <div className="modal-body-content" id="blog-modal-body"></div>
        </div>
      </div>

      {/* Back to top */}
      <a href="#" className="back-to-top-btn" id="back-to-top" aria-label="Back to Top"><i className="fas fa-chevron-up"></i></a>
    </>
  );
}
