# Hyeongmin Choi
**Department of Artificial Intelligence Engineering, Chosun University**
* Email: [chm62@naver.com](mailto:chm62@naver.com) | GitHub: [github.com/20233332choi](https://github.com/20233332choi)

---

## 🎓 Education

### **Chosun University**
* **B.S. in Artificial Intelligence Engineering (AI/SW School)**
  * *Period:* Mar. 2023 - Present (2nd Year, including 3-year enrollment period with military leave)
  * *Location:* Gwangju, South Korea
  * *Relevant Coursework:* Data Structures, C/C++ Programming, Python, Artificial Intelligence, Introduction to OSS (Open Source Software)
  * *Coursework Details:*
    * **Data Structures & Algorithms:** Studied fundamental concepts of data organization and core algorithm design to optimize data processing pipelines.
    * **Programming & Systems Foundations:** Gained essential computer systems and programming knowledge through practical projects in C, C++, and Python, exploring the interface between software programs and computer hardware.

---

## 🛠️ Skills

* **Core Competencies:** C++ Programming, Data Structures, Real-Time Data Ingestion
* **AI-Assisted Development:** Prompt Engineering, AI Agent Pairing, AI-Driven Prototyping (Vibe Coding)
* **Web Automation & Database:** Flask Backend, Selenium Automation, Pandas Data Wrangling, SQLite/MySQL
* **Tools & Infrastructure:** Docker, Docker Compose, Git, GitHub, Linux Environments

---

## 💼 Experience

### **Telemetry Infrastructure Lead** | Chosun University Racing Team
* *Period:* Mar. 2026 - Present
* Joined to bridge mechanical engineering & embedded systems with AI/SW components, focusing on vehicle dynamics and telemetrics.
* Identified data logging instability on physical telemetry hardware and designed C++ real-time packet filtering modules.
* Implemented low-latency data pipelines for sensor preprocessing, shifting unstable legacy structures to stable telemetry platforms.

### **System Administrator & Automation Developer** | Republic of Korea Army (Welfare Facility IT Automation)
* *Period:* Jan. 2025 - Apr. 2026
* **SCSS:** Decreased check-in administrative bottlenecks by 90% via Windows OS Kiosk interface and Docker Compose.
* **Restaurant Booking System:** Developed a Flask/SQLAlchemy reservation app. Implemented security parameters (CSRF, secure session cookies, rotating log handlers) and underwent military security clearance reviews.

---

## 🚀 Projects

### **ASC_TLMTSYS (Motorsport Telemetry & Analysis System)**
* *Period:* Sep. 2025 - Present
* *Role:* Sole Developer (Personal Project)
* Developed a real-time 'F1 Pit Wall Control' telemetry dashboard serving dynamic vehicle physics data over a FastAPI (Port 8000) backend.
* Built a high-performance UDP socket listener (Port 8001) in Python/C++ to ingest live simulator packet streams at zero lag.
* Engineered live analytics tracking tire core/IMO temps (81.7°C), brake temps (417°C), suspension load, ERS battery, and DRS lock states.
* *Future Roadmap:* Scaling to hardware telemetry, designing sensor-acquisition boards on student-built formula race cars to ingest real track telemetry.

### **SCSS (Self Check-in Integrated System) v2.0**
* *Period:* Jan. 2025 - Apr. 2026
* *Role:* Sole Developer / System Architect (Built during military service)
* Developed and operationalized a 24/7 unmanned self check-in kiosk interface on a Windows OS PC configured in Kiosk Mode.
* *Self-Taught & AI Collaboration:* Self-taught Python and network architectures, partnering with an AI agent to architect the program while serving as a Private First Class (PFC).
* Engineered an automated backend parser (Pandas & APScheduler) executing daily at 14:50 to process portal reservation Excel logs.
* Designed a modular plugin architecture since v1.0, enabling secondary utilities (e.g., cleaning checklist generator, network printing) to plug in seamlessly without altering core logic.
* Containerized the software stacks using Docker Compose, guaranteeing environment isolation and zero-downtime operations.

### **Honam-Univ.-POS (Real-Time POS & Mobile Order System)**
* *Period:* May 2026 - Present
* *Role:* Co-Developer / Backend & Database Architect (Festival Production Deployment)
* Co-developed and scaled a real-time POS and mobile ordering system for high-concurrency festival environments.
* Prevented SQLite database locks (`database is locked`) under heavy order traffic by implementing Write-Ahead Logging (WAL) and extending timeout to 30 seconds.
* Avoided lost update anomalies during peak order spikes via immediate transaction locking (`BEGIN IMMEDIATE`).
* Supported offline-capable, web-native mobile order interfaces utilizing Progressive Web App (PWA) configurations, serving real-time socket interfaces on Uvicorn (Port 3000).

---

## 🎯 Career Goal

* **Aspiring Race Data Engineer:** Leveraging solid software engineering foundations built from designing production-grade military IT automation systems to tackle new challenges in motorsport: developing low-latency telemetry pipelines (UDP/CAN) and optimizing real-time chassis dynamics.
