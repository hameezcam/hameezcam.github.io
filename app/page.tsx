"use client";

import { useEffect, useState } from "react";

const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    featured: true,
    category: "soc-siem sec-ops ms-sec",
    icon: "fa-sitemap",
    bgText: "SENTINEL_SOC",
    tags: ["FEATURED ARCHITECTURE", "SOC / SIEM", "Microsoft Sentinel"],
    title: "01 — Microsoft Sentinel SOC Architecture",
    summary: "Designed a Microsoft Sentinel-based SOC architecture focused on centralized security monitoring, detection engineering, incident investigation, and scalable security operations.",
    techs: ["Microsoft Sentinel", "SIEM", "Log Analytics", "Detection Rules", "Analytics", "Incident Management"],
    focus: "SIEM • Detection • SOC Architecture",
    linkType: "private"
  },
  {
    id: 11,
    featured: true,
    category: "tools sec-assess",
    icon: "fa-network-wired",
    bgText: "PORT_SCANNER",
    tags: ["FEATURED TOOL", "Cybersecurity Tool", "Multi-Tenant"],
    title: "11 — Port Scanner",
    summary: "Built a multi-tenant network port scanning platform designed to discover exposed services and provide structured security visibility. Features an asynchronous scanning engine with RBAC and licensing tier controls.",
    techs: ["Python / AsyncIO", "RBAC", "Multi-Tenant Architecture", "Organization Management", "Licensing Engine"],
    focus: "Network Security • Security Tooling • Multi-Tenant Architecture",
    linkType: "tool"
  },
  {
    id: 12,
    featured: true,
    category: "tools sec-assess vapt",
    icon: "fa-file-shield",
    bgText: "SEC_REPORTING",
    tags: ["FEATURED PLATFORM", "Cybersecurity Platform", "Vulnerability Intel"],
    title: "12 — Security Reporting Platform",
    summary: "Built a cybersecurity assessment and reporting platform for organizing security findings, vulnerability intelligence, assessment workflows, and professional security reports.",
    techs: ["Vulnerability Intelligence", "NVD API", "CISA KEV Data", "PDF Reporting", "Workspace Management"],
    focus: "Security Assessments • Vulnerability Intelligence • Reporting",
    linkType: "platform"
  },
  {
    id: 2,
    featured: false,
    category: "soc-siem sec-ops",
    icon: "fa-tower-observation",
    bgText: "WAZUH_LAB",
    tags: ["SIEM / Security Monitoring", "Wazuh", "Sysmon"],
    title: "02 — Wazuh SIEM Home Lab",
    summary: "Built a security monitoring environment using Wazuh to collect, analyze, and investigate endpoint security telemetry.",
    techs: ["Wazuh", "Ubuntu", "Windows", "Sysmon", "FIM"],
    focus: "Endpoint Telemetry • Threat Detection • Event Correlation",
    linkType: "lab"
  },
  {
    id: 3,
    featured: false,
    category: "soc-siem sec-ops",
    icon: "fa-map",
    bgText: "SOC_ROADMAP",
    tags: ["SOC / Security Operations", "Architecture", "Governance"],
    title: "03 — SOC Implementation Roadmap",
    summary: "Developed a practical roadmap for establishing and maturing a Security Operations Center, covering architecture, technology, processes, detection, monitoring, incident response, and operational maturity.",
    techs: ["SOC Architecture", "SIEM Integration", "IR Playbooks", "Operational Metrics"],
    focus: "SOC Maturity • Operations Framework • Incident Response",
    linkType: "confidential"
  },
  {
    id: 4,
    featured: false,
    category: "sec-ops soc-siem",
    icon: "fa-cloud-arrow-up",
    bgText: "SOCAAS_PLAN",
    tags: ["Security Operations", "SOCaaS", "Managed Detection"],
    title: "04 — SOCaaS Planning",
    summary: "Developed a framework for planning a managed Security Operations service, including client onboarding, monitoring architecture, security tooling, operational workflows, detection capabilities, and service delivery.",
    techs: ["Multi-Tenant SIEM", "SLA Frameworks", "Escalation Matrix", "Telemetry Ingestion"],
    focus: "Managed SOC • Service Architecture • Telemetry Management",
    linkType: "confidential"
  },
  {
    id: 5,
    featured: false,
    category: "ms-sec sec-assess",
    icon: "fab fa-microsoft",
    bgText: "MS_HARDENING",
    tags: ["Microsoft Security", "Defender", "Entra ID"],
    title: "05 — Microsoft Security Implementation",
    summary: "Developed security implementation and hardening strategies across Microsoft security technologies including Defender, Entra ID, and Microsoft 365.",
    techs: ["Microsoft Defender", "Microsoft 365", "Entra ID", "MFA & Conditional Access"],
    focus: "Identity Protection • Endpoint Defense • Mailbox Hardening",
    linkType: "confidential"
  },
  {
    id: 6,
    featured: false,
    category: "sec-assess",
    icon: "fa-clipboard-check",
    bgText: "POSTURE_FRAME",
    tags: ["Security Assessment", "Posture Hardening", "Audit"],
    title: "06 — Security Posture Assessment Framework",
    summary: "Developed a structured security posture assessment methodology covering identity, endpoint, email, network, SIEM, administrative access, authentication, and security controls.",
    techs: ["Audit Matrix", "Identity Assessment", "Network Controls", "Remediation Roadmap"],
    focus: "Baseline Validation • Defense Gap Analysis • Risk Rating",
    linkType: "model"
  },
  {
    id: 7,
    featured: false,
    category: "vapt sec-assess",
    icon: "fa-file-contract",
    bgText: "VAPT_DOCS",
    tags: ["VAPT", "Technical Reporting", "Remediation"],
    title: "07 — VAPT Documentation Framework",
    summary: "Developed structured documentation and reporting workflows for vulnerability assessment and penetration testing activities, standardizing finding classifications and remediation steps.",
    techs: ["Finding Classification", "Evidence Logging", "Risk Ratings", "Remediation Tracking"],
    focus: "VAPT Workflows • Evidence Standardization • Risk Classification",
    linkType: "confidential"
  },
  {
    id: 8,
    featured: false,
    category: "sec-ops soc-siem",
    icon: "fa-book-skull",
    bgText: "IR_PLAYBOOKS",
    tags: ["Incident Response", "SOC", "Triage"],
    title: "08 — Incident Response Playbook Framework",
    summary: "Developed structured incident response playbooks covering common enterprise security incidents and investigation workflows, from initial alert through post-incident remediation.",
    techs: ["BEC Playbook", "Account Compromise", "PowerShell Analysis", "Containment Steps"],
    focus: "Incident Containment • Root Cause Analysis • Runbook Standardization",
    linkType: "private"
  },
  {
    id: 9,
    featured: false,
    category: "soc-siem sec-ops",
    icon: "fa-radar",
    bgText: "DETECTION_CAT",
    tags: ["Detection Engineering", "MITRE ATT&CK", "Telemetry"],
    title: "09 — Detection Catalogue",
    summary: "Developed a structured catalogue of security detections mapped to relevant threats, telemetry sources, investigation requirements, and recommended security controls.",
    techs: ["Detection Logic", "Data Sources", "Threat Scenarios", "Investigation Guidance"],
    focus: "Detection Engineering • MITRE Mapping • Gap Identification",
    linkType: "matrix"
  },
  {
    id: 10,
    featured: false,
    category: "sec-assess sec-ops",
    icon: "fa-stamp",
    bgText: "NESA_ROADMAP",
    tags: ["Compliance / Security", "Governance", "UAE Standards"],
    title: "10 — NESA Security Roadmap",
    summary: "Developed a structured cybersecurity roadmap aligned with UAE security governance and compliance requirements, translating control mandates into actionable technical milestones.",
    techs: ["NESA IAS Controls", "Gap Analysis", "Implementation Tracking", "Audit Evidence"],
    focus: "Governance Alignment • Control Mapping • Technical Milestones",
    linkType: "confidential"
  },
  {
    id: 13,
    featured: false,
    category: "threat-intel tools",
    icon: "fa-magnifying-glass-shield",
    bgText: "THREAT_INTEL",
    tags: ["Threat Intelligence", "Security Analysis", "Anti-Phishing"],
    title: "13 — Threat Analysis Platform",
    summary: "Built a cybersecurity analysis platform designed to help users assess potentially malicious URLs, messages, and digital content before interacting with them.",
    techs: ["URL & Domain Analysis", "SSRF Protection", "Threat Intelligence Feeds", "Risk Scoring"],
    focus: "Threat Intelligence • Digital Content Analysis • Attack Surface Visibility",
    linkType: "active"
  },
  {
    id: 14,
    featured: false,
    category: "app-sec vapt",
    icon: "fa-bug",
    bgText: "WEB_APP_SEC",
    tags: ["Application Security", "OWASP Top 10", "VAPT"],
    title: "14 — Web Application Security Lab",
    summary: "Built a controlled web application security testing environment using DVWA and OWASP Juice Shop to practice vulnerability discovery, exploitation, validation, and security reporting.",
    techs: ["Burp Suite", "OWASP Juice Shop", "DVWA", "SQL Injection & XSS"],
    focus: "Web Vulnerability Discovery • Input Sanitization • OWASP Validation",
    linkType: "lab"
  },
  {
    id: 15,
    featured: false,
    category: "threat-intel tools",
    icon: "fa-globe",
    bgText: "OSINT_TOOLKIT",
    tags: ["Threat Intelligence", "Python", "Exposure Analysis"],
    title: "15 — OSINT & Threat Intelligence Toolkit",
    summary: "Built an intelligence platform to discover publicly exposed organizational credentials, IP reputation indicators, domain exposure metrics, and risk calculation algorithms.",
    techs: ["Python / Flask", "VirusTotal API", "HaveIBeenPwned", "Risk Scoring"],
    focus: "External Exposure Assessment • Threat Intelligence • Risk Scoring",
    linkType: "github",
    githubUrl: "https://github.com/hameezcam/osint-data-exposure-tool"
  }
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
              <li><a href="#experience" className="nav-link" id="nav-experience">Experience</a></li>
              <li><a href="#security-work" className="nav-link" id="nav-work">Work</a></li>
              <li><a href="#projects" className="nav-link" id="nav-projects">Projects</a></li>
              <li><a href="#certifications" className="nav-link" id="nav-certifications">Certifications</a></li>
              <li><a href="#skills" className="nav-link" id="nav-skills">Skills</a></li>
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
                <span className="badge green-pulse"><i className="fas fa-circle"></i> ROLE: CYBERSECURITY_ANALYST</span>
                <span className="badge blue-accent">ORG: SUPERCAD (DUBAI, UAE)</span>
                <span className="badge purple-accent">2026 – PRESENT</span>
              </div>

              <h1 className="hero-title text-glow">
                Cybersecurity Analyst
              </h1>

              <h2 className="hero-subtitle">
                Security Operations • Detection • Defense
              </h2>

              <p className="hero-description">
                Cybersecurity Analyst focused on security operations, threat detection, incident response, vulnerability assessment, security monitoring, and building practical cybersecurity solutions.
              </p>

              <div className="hero-ctas">
                <a href="#experience" className="cyber-btn primary-btn">
                  <span className="btn-text"><i className="fas fa-shield-halved"></i> Experience</span>
                  <span className="btn-glow"></span>
                </a>
                <a href="#projects" className="cyber-btn secondary-btn">
                  <span className="btn-text"><i className="fas fa-project-diagram"></i> Security Projects</span>
                </a>
                <a href="/Hameez_Cambal_Resume.pdf" target="_blank" className="cyber-btn text-btn">
                  <span className="btn-text"><i className="fas fa-file-pdf"></i> Resume PDF</span>
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

            {/* Hero Visual */}
            <div className="hero-visual">
              <div className="cyber-shield-container">
                <div className="shield-ring outer-ring"></div>
                <div className="shield-ring middle-ring"></div>
                <div className="shield-ring inner-ring"></div>
                <div className="shield-icon-wrapper">
                  <img src="/hameez.jpg" alt="Hameez Cambal - Cybersecurity Analyst" className="hero-avatar" />
                </div>
              </div>
              <div className="stats-dashboard">
                <div className="stat-card glass-card">
                  <span className="stat-number cyber-accent-blue">05</span>
                  <span className="stat-label">Verified Certs</span>
                </div>
                <div className="stat-card glass-card">
                  <span className="stat-number cyber-accent-purple">15</span>
                  <span className="stat-label">Security Projects</span>
                </div>
                <div className="stat-card glass-card">
                  <span className="stat-number text-success">100%</span>
                  <span className="stat-label">Defense Ready</span>
                </div>
              </div>
            </div>
          </div>

          <a href="#about" className="scroll-indicator" aria-label="Scroll Down">
            <span className="mouse-icon"><span className="mouse-wheel"></span></span>
            <span className="scroll-text">DISCOVER_PROFILE</span>
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="about-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">PROFILE_CORE</span>
              <h2 className="section-title text-glow">About Me</h2>
            </div>

            <div className="about-grid">
              <div className="about-info glass-card">
                <h3 className="about-tagline">&quot;Security is about trust, resilience, and enabling organizations to operate securely in an increasingly connected world.&quot;</h3>
                <p className="about-mission">
                  I am a Cybersecurity Analyst working across security operations, threat detection, incident investigation, vulnerability assessment, security hardening, and cybersecurity tooling. My work combines practical enterprise security operations with the development of security frameworks, monitoring capabilities, assessment methodologies, and security-focused applications.
                </p>

                <div className="about-details">
                  <div className="detail-item">
                    <span className="detail-label">CURRENT ROLE:</span>
                    <span className="detail-val"><strong>Cybersecurity Analyst</strong> @ SuperCAD</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">EMPLOYMENT:</span>
                    <span className="detail-val">2026 – Present</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">LOCATION:</span>
                    <span className="detail-val"><i className="fas fa-map-marker-alt text-danger"></i> Dubai, UAE</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ACADEMIC BACKGROUND:</span>
                    <span className="detail-val"><strong>BSc (Hons) Cybersecurity &amp; Digital Forensics</strong></span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">OPERATIONAL STATUS:</span>
                    <span className="detail-val"><span className="badge green-pulse">Active // SuperCAD</span></span>
                  </div>
                </div>
              </div>

              <div className="about-focus">
                <h3 className="sub-section-title">Areas of Expertise</h3>
                <div className="badge-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "0.75rem" }}>
                  {[
                    { icon: "fa-eye", color: "cyber-accent-blue", name: "Security Operations" },
                    { icon: "fa-tower-broadcast", color: "cyber-accent-purple", name: "SIEM" },
                    { icon: "fa-crosshairs", color: "text-success", name: "Threat Detection" },
                    { icon: "fa-fire-extinguisher", color: "text-danger", name: "Incident Response" },
                    { icon: "fa-shield-virus", color: "cyber-accent-blue", name: "Vulnerability Assessment" },
                    { icon: "fa-bullseye", color: "cyber-accent-purple", name: "VAPT" },
                    { icon: "fab fa-microsoft", color: "text-success", name: "Microsoft Security" },
                    { icon: "fa-network-wired", color: "cyber-accent-blue", name: "Network Security" },
                    { icon: "fa-clipboard-check", color: "text-danger", name: "Security Auditing" },
                    { icon: "fa-code", color: "cyber-accent-purple", name: "Security Tool Development" },
                    { icon: "fa-sitemap", color: "text-success", name: "Security Architecture" },
                    { icon: "fa-file-shield", color: "cyber-accent-blue", name: "Security Documentation" },
                  ].map(exp => (
                    <div key={exp.name} className="expertise-tag glass-card hover-glow" style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
                      <i className={`fas ${exp.icon} ${exp.color}`}></i>
                      <span>{exp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">CAREER_EVOLUTION</span>
              <h2 className="section-title text-glow">Professional Experience</h2>
              <p className="section-subtitle">Operational track record spanning Security Operations, SIEM Monitoring, Threat Detection, Incident Response, and Security Assessments.</p>
            </div>

            <div className="timeline-container">
              <div className="timeline-line-indicator"></div>

              {/* SuperCAD Role */}
              <div className="timeline-item glass-card hover-glow">
                <div className="timeline-header">
                  <div className="timeline-title-group">
                    <span className="career-stage-tag"><i className="fas fa-certificate"></i> CURRENT PROFESSIONAL ROLE</span>
                    <h3>Cybersecurity Analyst</h3>
                    <span className="company-tag"><i className="fas fa-building"></i> SuperCAD — Dubai, UAE</span>
                  </div>
                  <span className="timeline-date"><i className="far fa-calendar-alt"></i> 2026 – Present</span>
                </div>

                <div className="timeline-body">
                  <p className="timeline-description">
                    Working across security operations, monitoring, security assessments, incident investigation, Microsoft security, network security, vulnerability management, and cybersecurity service development within a managed security environment.
                  </p>

                  <ul className="duties-list">
                    <li><i className="fas fa-shield-halved duty-icon"></i><span><strong>Security Alert Investigation &amp; Event Analysis:</strong> Investigating security alerts, correlating event logs, analyzing malicious indicators, and evaluating abnormal activity across client infrastructures.</span></li>
                    <li><i className="fas fa-tower-broadcast duty-icon"></i><span><strong>SIEM Monitoring &amp; Threat Detection:</strong> Monitoring real-time telemetry, detecting threat behaviors, identifying security anomalies, and assessing detection gaps across monitored assets.</span></li>
                    <li><i className="fas fa-fire-extinguisher duty-icon"></i><span><strong>Incident Investigation &amp; Response Playbooks:</strong> Conducting structured incident investigations, executing incident response playbooks for account compromise and phishing, and recommending immediate containment steps.</span></li>
                    <li><i className="fab fa-microsoft duty-icon"></i><span><strong>Microsoft Security Operations:</strong> Operating Microsoft Sentinel SIEM, Microsoft Defender suite, Microsoft 365 security controls, Entra ID identity policies, MFA enforcement, and Conditional Access rules.</span></li>
                    <li><i className="fas fa-network-wired duty-icon"></i><span><strong>Network Security Operations:</strong> Performing operational security administration across Check Point gateways, Fortinet firewalls, WatchGuard appliances, and conducting Cisco Meraki security assessments.</span></li>
                    <li><i className="fas fa-magnifying-glass-chart duty-icon"></i><span><strong>Security Assessments &amp; Vulnerability Management:</strong> Executing security posture assessments, vulnerability assessments, security audit activities, and technical VAPT documentation workflows.</span></li>
                    <li><i className="fas fa-file-shield duty-icon"></i><span><strong>SOC Architecture &amp; Service Planning:</strong> Developing detection gap assessments, threat detection documentation, SOC implementation roadmaps, and SOCaaS framework planning.</span></li>
                    <li><i className="fas fa-clipboard-check duty-icon"></i><span><strong>Client Reporting &amp; Remediation Tracking:</strong> Producing structured client security assessment reports, risk classification summaries, and tracking remediation milestones.</span></li>
                  </ul>
                </div>
              </div>

              {/* Security Projects Timeline */}
              <div className="timeline-item glass-card hover-glow">
                <div className="timeline-header">
                  <div className="timeline-title-group">
                    <span className="career-stage-tag"><i className="fas fa-flask"></i> SECURITY PROJECTS &amp; TOOLING</span>
                    <h3>Cybersecurity Solutions &amp; Detection Engineering</h3>
                    <span className="company-tag"><i className="fas fa-laptop-code"></i> Independent Tool Development &amp; Architecture</span>
                  </div>
                  <span className="timeline-date"><i className="far fa-calendar-alt"></i> Practical Engineering</span>
                </div>

                <div className="timeline-body">
                  <p className="timeline-description">
                    Designed and engineered practical security platforms, detection architectures, and testing environments:
                  </p>
                  <ul className="duties-list">
                    <li><i className="fas fa-sitemap duty-icon"></i><span><strong>Microsoft Sentinel SOC Architecture:</strong> Centralized log analytics, detection engineering, and incident response architecture.</span></li>
                    <li><i className="fas fa-network-wired duty-icon"></i><span><strong>Port Scanner Tool:</strong> Multi-tenant network scanning platform with RBAC, organization management, and security reporting.</span></li>
                    <li><i className="fas fa-file-invoice duty-icon"></i><span><strong>Security Reporting Platform:</strong> Assessment workflows, vulnerability intelligence (NVD, CISA KEV), and PDF report generator.</span></li>
                    <li><i className="fas fa-server duty-icon"></i><span><strong>Wazuh SIEM Environment:</strong> Multi-node telemetry collection with Sysmon, Windows Server, and Ubuntu detection.</span></li>
                  </ul>
                </div>
              </div>

              {/* Education Milestone */}
              <div className="timeline-item glass-card hover-glow">
                <div className="timeline-header">
                  <div className="timeline-title-group">
                    <span className="career-stage-tag"><i className="fas fa-graduation-cap"></i> EDUCATION &amp; TRAINING</span>
                    <h3>BSc (Hons) Cybersecurity &amp; Digital Forensics</h3>
                    <span className="company-tag"><i className="fas fa-university"></i> Kingston University</span>
                  </div>
                  <span className="timeline-date"><i className="far fa-calendar-alt"></i> Graduated</span>
                </div>

                <div className="timeline-body">
                  <p className="timeline-description">
                    Core academic foundation in network protocols, operating system architecture, digital forensics, incident investigation methodologies, cryptography, and security governance frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Security Work Section */}
        <section id="security-work" className="security-work-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">ENTERPRISE_OPERATIONS</span>
              <h2 className="section-title text-glow">Professional Security Work</h2>
              <p className="section-subtitle">Operational engagements, enterprise security architectures, assessments, and defensive engineering implemented across production environments.</p>
            </div>

            <div className="security-work-grid">
              <div className="work-category-card glass-card hover-glow">
                <div className="work-cat-header">
                  <div className="work-cat-icon blue-bg"><i className="fas fa-tower-broadcast"></i></div>
                  <h3 className="work-cat-title">Security Operations</h3>
                </div>
                <ul className="work-cat-list">
                  <li><i className="fas fa-check-circle"></i> SIEM monitoring</li>
                  <li><i className="fas fa-check-circle"></i> Security alert investigation</li>
                  <li><i className="fas fa-check-circle"></i> Authentication investigations</li>
                  <li><i className="fas fa-check-circle"></i> Threat detection</li>
                  <li><i className="fas fa-check-circle"></i> Incident analysis</li>
                  <li><i className="fas fa-check-circle"></i> Security event investigation</li>
                  <li><i className="fas fa-check-circle"></i> Detection gap assessment</li>
                </ul>
              </div>

              <div className="work-category-card glass-card hover-glow">
                <div className="work-cat-header">
                  <div className="work-cat-icon purple-bg"><i className="fas fa-shield-virus"></i></div>
                  <h3 className="work-cat-title">Security Assessments</h3>
                </div>
                <ul className="work-cat-list">
                  <li><i className="fas fa-check-circle"></i> Microsoft 365 security assessments</li>
                  <li><i className="fas fa-check-circle"></i> Microsoft Defender security assessments</li>
                  <li><i className="fas fa-check-circle"></i> Check Point security assessments</li>
                  <li><i className="fas fa-check-circle"></i> Cisco Meraki security audits</li>
                  <li><i className="fas fa-check-circle"></i> Fortinet security reviews</li>
                  <li><i className="fas fa-check-circle"></i> Network security assessments</li>
                  <li><i className="fas fa-check-circle"></i> Security posture assessments</li>
                </ul>
              </div>

              <div className="work-category-card glass-card hover-glow">
                <div className="work-cat-header">
                  <div className="work-cat-icon green-bg"><i className="fas fa-bullseye"></i></div>
                  <h3 className="work-cat-title">Vulnerability &amp; Security Testing</h3>
                </div>
                <ul className="work-cat-list">
                  <li><i className="fas fa-check-circle"></i> VAPT</li>
                  <li><i className="fas fa-check-circle"></i> Vulnerability identification</li>
                  <li><i className="fas fa-check-circle"></i> Risk classification</li>
                  <li><i className="fas fa-check-circle"></i> Technical evidence collection</li>
                  <li><i className="fas fa-check-circle"></i> Remediation recommendations</li>
                  <li><i className="fas fa-check-circle"></i> Security reporting</li>
                </ul>
              </div>

              <div className="work-category-card glass-card hover-glow">
                <div className="work-cat-header">
                  <div className="work-cat-icon red-bg"><i className="fas fa-file-shield"></i></div>
                  <h3 className="work-cat-title">Security Engineering &amp; Documentation</h3>
                </div>
                <ul className="work-cat-list">
                  <li><i className="fas fa-check-circle"></i> Incident response playbooks</li>
                  <li><i className="fas fa-check-circle"></i> Detection catalogues</li>
                  <li><i className="fas fa-check-circle"></i> Security assessment workbooks</li>
                  <li><i className="fas fa-check-circle"></i> Remediation documentation</li>
                  <li><i className="fas fa-check-circle"></i> SOC architecture planning</li>
                  <li><i className="fas fa-check-circle"></i> Security operational procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security Projects Section */}
        <section id="projects" className="projects-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">SECURITY_INITIATIVES</span>
              <h2 className="section-title text-glow">Security Projects</h2>
              <p className="section-subtitle">Technical security solutions, architectures, tooling platforms, and detection engineering frameworks developed to solve practical cybersecurity challenges.</p>
            </div>

            <div className="project-filters">
              <button className="filter-btn active" data-filter="all">All</button>
              <button className="filter-btn" data-filter="soc-siem">SOC &amp; SIEM</button>
              <button className="filter-btn" data-filter="sec-ops">Security Operations</button>
              <button className="filter-btn" data-filter="sec-assess">Security Assessment</button>
              <button className="filter-btn" data-filter="vapt">VAPT</button>
              <button className="filter-btn" data-filter="tools">Cybersecurity Tools</button>
              <button className="filter-btn" data-filter="threat-intel">Threat Intelligence</button>
              <button className="filter-btn" data-filter="app-sec">Application Security</button>
              <button className="filter-btn" data-filter="ms-sec">Microsoft Security</button>
            </div>

            <div className="projects-grid">
              {PORTFOLIO_PROJECTS.map(p => (
                <article
                  key={p.id}
                  className={`project-card glass-card hover-glow ${p.featured ? "featured-project-card" : ""}`}
                  data-category={p.category}
                >
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

                    <div className="project-tech-section">
                      <div className="project-tech-label">KEY TECHNOLOGIES:</div>
                      <div className="project-tags">
                        {p.techs.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>

                    <div className="project-focus-box">
                      <span className="project-focus-label">SECURITY FOCUS:</span>
                      <span className="project-focus-text">{p.focus}</span>
                    </div>

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
                      {p.linkType === 'tool' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(0,255,204,0.1)", borderColor: "rgba(0,255,204,0.3)", color: "var(--cyber-blue)" }}>
                          <span><i className="fas fa-cube"></i> Security Tooling</span>
                        </span>
                      )}
                      {p.linkType === 'platform' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(189,0,255,0.1)", borderColor: "rgba(189,0,255,0.3)", color: "var(--cyber-purple)" }}>
                          <span><i className="fas fa-shield"></i> Assessment Platform</span>
                        </span>
                      )}
                      {p.linkType === 'lab' && (
                        <span className="cyber-btn-sm" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}>
                          <span><i className="fas fa-flask"></i> Security Lab</span>
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="certifications-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">CREDENTIALS</span>
              <h2 className="section-title text-glow">Certifications</h2>
              <p className="section-subtitle">Verified technical credentials and active professional cybersecurity specializations.</p>
            </div>

            <div className="certifications-grid">
              {/* Copilot for Security (Completed 2026) */}
              <div className="cert-card glass-card hover-glow" style={{ border: "1px solid rgba(0,255,204,0.4)", boxShadow: "0 0 20px rgba(0,255,204,0.08)" }}>
                <div className="cert-badge-visual">
                  <i className="fab fa-microsoft cert-icon-big cyber-accent-blue"></i>
                  <span className="cert-issuer">MICROSOFT</span>
                </div>
                <div className="cert-info">
                  <span className="cert-status-tag status-verified">COMPLETED // 2026</span>
                  <h3>Microsoft Copilot for Security</h3>
                  <p className="cert-desc">AI-assisted security operations, threat intelligence investigation, incident response augmentation, and natural language KQL prompt engineering.</p>
                  <div className="cert-meta">
                    <span>Microsoft · Completed 2026</span>
                    <a href="javascript:void(0)" className="verify-cert-link" data-cert="copilot">View Details</a>
                  </div>
                </div>
              </div>

              {/* CCNA */}
              <div className="cert-card glass-card hover-glow">
                <div className="cert-badge-visual">
                  <i className="fas fa-network-wired cert-icon-big"></i>
                  <span className="cert-issuer">CISCO</span>
                </div>
                <div className="cert-info">
                  <span className="cert-status-tag status-verified">COMPLETED</span>
                  <h3>Cisco Certified Network Associate (CCNA 200-301)</h3>
                  <p className="cert-desc">Network fundamentals, IP connectivity, IP services, security fundamentals, and network automation.</p>
                  <div className="cert-meta">
                    <span>Cisco</span>
                    <a href="javascript:void(0)" className="verify-cert-link" data-cert="ccna">View Details</a>
                  </div>
                </div>
              </div>

              {/* AZ-900 */}
              <div className="cert-card glass-card hover-glow">
                <div className="cert-badge-visual">
                  <i className="fab fa-microsoft cert-icon-big"></i>
                  <span className="cert-issuer">MICROSOFT</span>
                </div>
                <div className="cert-info">
                  <span className="cert-status-tag status-verified">COMPLETED</span>
                  <h3>Microsoft Azure Fundamentals (AZ-900)</h3>
                  <p className="cert-desc">Cloud computing architecture, Azure security, identity concepts, privacy, compliance, and governance.</p>
                  <div className="cert-meta">
                    <span>Microsoft</span>
                    <a href="javascript:void(0)" className="verify-cert-link" data-cert="az900">View Details</a>
                  </div>
                </div>
              </div>

              {/* SOC Fundamentals */}
              <div className="cert-card glass-card hover-glow">
                <div className="cert-badge-visual">
                  <i className="fas fa-tower-observation cert-icon-big"></i>
                  <span className="cert-issuer">LETSDEFEND</span>
                </div>
                <div className="cert-info">
                  <span className="cert-status-tag status-verified">COMPLETED // 2026</span>
                  <h3>SOC Fundamentals</h3>
                  <p className="cert-desc">Hands-on SOC training covering alert triage, log analysis, threat detection, and real-world incident investigation workflows.</p>
                  <div className="cert-meta">
                    <span>LetsDefend · 2026</span>
                    <a href="javascript:void(0)" className="verify-cert-link" data-cert="letsdefend">View Badge</a>
                  </div>
                </div>
              </div>

              {/* Hardware & Networking */}
              <div className="cert-card glass-card hover-glow">
                <div className="cert-badge-visual">
                  <i className="fas fa-microchip cert-icon-big"></i>
                  <span className="cert-issuer">INSTITUTE</span>
                </div>
                <div className="cert-info">
                  <span className="cert-status-tag status-verified">COMPLETED</span>
                  <h3>Advanced Diploma in Hardware &amp; Networking</h3>
                  <p className="cert-desc">Hardware architecture, enterprise routing, switching infrastructure, system administration, and network troubleshooting.</p>
                  <div className="cert-meta">
                    <span>Hardware &amp; Networking Professional</span>
                    <a href="javascript:void(0)" className="verify-cert-link" data-cert="hardware">View Details</a>
                  </div>
                </div>
              </div>

              {/* CEH - In Progress */}
              <div className="cert-card glass-card hover-glow" style={{ border: "1px dashed rgba(255,204,0,0.4)" }}>
                <div className="cert-badge-visual">
                  <i className="fas fa-shield-halved cert-icon-big" style={{ color: "#ffcc00" }}></i>
                  <span className="cert-issuer">EC-COUNCIL</span>
                </div>
                <div className="cert-info">
                  <span className="cert-status-tag" style={{ background: "rgba(255,204,0,0.15)", color: "#ffcc00", border: "1px solid rgba(255,204,0,0.4)" }}>IN PROGRESS</span>
                  <h3>CEH — In Progress</h3>
                  <p className="cert-desc">Certified Ethical Hacker curriculum covering attack vectors, vulnerability analysis, system penetration testing, and defense evasion.</p>
                  <div className="cert-meta">
                    <span>EC-Council · In Progress</span>
                    <a href="javascript:void(0)" className="verify-cert-link" data-cert="ceh">Curriculum Focus</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="education-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">ACADEMIC_FOUNDATION</span>
              <h2 className="section-title text-glow">Education</h2>
              <p className="section-subtitle">Formal degree program in cybersecurity and digital forensics.</p>
            </div>

            <div style={{ maxWidth: "850px", margin: "0 auto" }}>
              <div className="timeline-item glass-card hover-glow" style={{ padding: "1.75rem 2rem" }}>
                <div className="timeline-header" style={{ marginBottom: "1rem" }}>
                  <div className="timeline-title-group">
                    <span className="career-stage-tag"><i className="fas fa-graduation-cap"></i> HIGHER EDUCATION</span>
                    <h3 style={{ fontSize: "1.35rem", margin: "0.25rem 0" }}>BSc (Hons) Cybersecurity &amp; Digital Forensics</h3>
                    <span className="company-tag"><i className="fas fa-university"></i> Kingston University</span>
                  </div>
                  <span className="timeline-date"><i className="far fa-calendar-alt"></i> Graduated</span>
                </div>
                <div className="timeline-body">
                  <p className="timeline-description" style={{ marginBottom: "0.75rem" }}>
                    Rigorous degree syllabus providing deep technical grounding across network security, digital forensics, cryptographic algorithms, malware analysis methodologies, operating system architecture, and security governance frameworks.
                  </p>
                  <div className="pillar-tech-chips" style={{ marginTop: "1rem" }}>
                    <span className="pillar-chip">Network Protocols</span>
                    <span className="pillar-chip">Digital Forensics</span>
                    <span className="pillar-chip">Incident Investigation</span>
                    <span className="pillar-chip">Cryptography</span>
                    <span className="pillar-chip">Malware Analysis</span>
                    <span className="pillar-chip">Security Governance</span>
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
              <h2 className="section-title text-glow">Technical Skills</h2>
              <p className="section-subtitle">Structured competencies across Security Operations, Microsoft Security, Network Security, Security Assessment, and Security Development.</p>
            </div>

            <div className="skills-wrapper glass-card">
              <div className="skills-tabs">
                <button className="tab-btn active" data-tab="secops"><i className="fas fa-shield-halved"></i> Security Operations</button>
                <button className="tab-btn" data-tab="ms-sec"><i className="fab fa-microsoft"></i> Microsoft Security</button>
                <button className="tab-btn" data-tab="net-sec"><i className="fas fa-network-wired"></i> Network Security</button>
                <button className="tab-btn" data-tab="sec-assess"><i className="fas fa-bullseye"></i> Security Assessment</button>
                <button className="tab-btn" data-tab="sec-dev"><i className="fas fa-code"></i> Security Development</button>
              </div>

              <div className="skills-content-wrapper">
                {/* 1. Security Operations */}
                <div className="tab-content active" id="secops">
                  <div className="skills-grid">
                    {[
                      { name: "SOC Operations & SIEM Monitoring", pct: 92 },
                      { name: "Security Monitoring & Alert Investigation", pct: 90 },
                      { name: "Incident Response & Investigation", pct: 92 },
                      { name: "Threat Detection & Threat Hunting", pct: 88 },
                      { name: "Detection Engineering & Telemetry Gap Analysis", pct: 86 },
                      { name: "Incident Response Playbook Frameworks", pct: 94 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill cyber-accent-blue-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Microsoft Security */}
                <div className="tab-content" id="ms-sec">
                  <div className="skills-grid">
                    {[
                      { name: "Microsoft Sentinel (SIEM / KQL Rules)", pct: 90 },
                      { name: "Microsoft Defender (Endpoint, O365, XDR)", pct: 88 },
                      { name: "Microsoft 365 Security & Tenant Hardening", pct: 92 },
                      { name: "Microsoft Entra & Identity Security", pct: 88 },
                      { name: "Conditional Access & Multi-Factor Authentication", pct: 90 },
                      { name: "Microsoft Secure Score & Baseline Standards", pct: 92 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill cyber-accent-purple-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Network Security */}
                <div className="tab-content" id="net-sec">
                  <div className="skills-grid">
                    {[
                      { name: "Check Point Security & Harmony Email", pct: 88 },
                      { name: "Fortinet Security Policies & FortiGate", pct: 86 },
                      { name: "WatchGuard Appliance Management", pct: 84 },
                      { name: "Cisco Meraki Security Assessments", pct: 88 },
                      { name: "Firewall Security & Access Control Lists (ACLs)", pct: 90 },
                      { name: "VPN Security (IPsec / SSL VPN Tunneling)", pct: 85 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill green-pulse-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Security Assessment */}
                <div className="tab-content" id="sec-assess">
                  <div className="skills-grid">
                    {[
                      { name: "Vulnerability Assessment & Penetration Testing (VAPT)", pct: 90 },
                      { name: "Vulnerability Assessment & CVE Prioritization", pct: 92 },
                      { name: "Security Auditing & Technical Verification", pct: 88 },
                      { name: "Security Posture Assessment Frameworks", pct: 90 },
                      { name: "Risk Assessment & Classification Workflows", pct: 90 },
                      { name: "Compliance Mapping (NESA IAS, ISO 27001)", pct: 86 },
                    ].map(s => (
                      <div key={s.name} className="skill-item">
                        <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percentage">{s.pct}%</span></div>
                        <div className="progress-bar-bg"><div className="progress-bar-fill cyber-accent-blue-bg" style={{ width: `${s.pct}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Security Development */}
                <div className="tab-content" id="sec-dev">
                  <div className="skills-grid">
                    {[
                      { name: "Cybersecurity Tool Development", pct: 90 },
                      { name: "Authentication & Session Security", pct: 92 },
                      { name: "Role-Based Access Control (RBAC)", pct: 90 },
                      { name: "Multi-Tenant Platform Architecture", pct: 88 },
                      { name: "Security Automation (Python & PowerShell)", pct: 90 },
                      { name: "Threat Intelligence API Integration", pct: 88 },
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

        {/* Cyber Terminal CLI Section */}
        <section id="terminal-section" className="terminal-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">INTERACTIVE_CLI</span>
              <h2 className="section-title text-glow">Hacker Console</h2>
              <p className="section-subtitle">Type shell commands directly to query credentials and inspect security architecture.</p>
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
                <div className="terminal-line system-msg">Host: Hameez Cambal Security Core // SuperCAD Node</div>
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

        {/* Contact Section */}
        <section id="contact" className="contact-section section-padding">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">COMMS_ESTABLISHMENT</span>
              <h2 className="section-title text-glow">Get In Touch</h2>
              <p className="section-subtitle">Establish a secure communication handshake. Connect for security discussions, collaboration, or professional opportunities.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-form-wrapper glass-card">
                <h3 className="comms-title"><i className="fas fa-key"></i> Encrypted Message Handshake</h3>

                <form id="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="form-name">SENDER_NAME:</label>
                      <input type="text" id="form-name" name="name" required placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email">SENDER_EMAIL:</label>
                      <input type="email" id="form-email" name="email" required placeholder="name@domain.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-subject">COMM_SUBJECT:</label>
                    <input type="text" id="form-subject" name="subject" required placeholder="e.g. Cybersecurity Analyst / Security Operations Inquiry" />
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
                  <div className="channel-info"><h4>LOCATION</h4><p>Dubai, United Arab Emirates</p></div>
                </div>
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon cyber-accent-blue"><i className="fas fa-envelope-open-text"></i></div>
                  <div className="channel-info"><h4>SECURE_EMAIL</h4><p><a href="mailto:hameez.cam@gmail.com">hameez.cam@gmail.com</a></p></div>
                </div>
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon cyber-accent-purple"><i className="fab fa-linkedin"></i></div>
                  <div className="channel-info"><h4>LINKEDIN</h4><p><a href="https://www.linkedin.com/in/hameez-cambal-988a2b314/" target="_blank">linkedin.com/in/hameez-cambal</a></p></div>
                </div>
                <div className="channel-card glass-card hover-glow">
                  <div className="channel-icon"><i className="fab fa-github"></i></div>
                  <div className="channel-info"><h4>GITHUB</h4><p><a href="https://github.com/hameezcam" target="_blank">github.com/hameezcam</a></p></div>
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
            <p className="footer-quote">&quot;Security is not just technology — it is trust, resilience, and continuous improvement.&quot;</p>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 Hameez Cambal · Cybersecurity Analyst. All rights secured.</p>
            <div className="footer-system-status">
              <span className="status-indicator-light"></span>
              <span className="status-text">CORE_SYSTEM: SECURE // SUPERCAD NODE</span>
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
