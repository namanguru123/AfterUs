🚀 AfterUs – Digital Life Access & Legacy Manager

AfterUs is a privacy-first digital legacy platform that allows users to securely store, organize, and conditionally transfer access to their digital assets, documents, and instructions to trusted contacts in case of inactivity or emergencies.

🌍 Problem Statement

In today’s digital world, people own critical assets such as:

Bank accounts
Crypto wallets
Important documents
Social media accounts
Personal instructions

But no structured system exists to securely transfer access to these assets when a user is no longer active or available.

💡 Solution

AfterUs provides a secure and condition-based access system where:

Users define conditions (e.g., inactivity for X days)
Assign trusted contacts
Link digital assets
System automatically grants access when conditions are fulfilled
🧠 Core Features (MVP)
🔐 Authentication & Security
JWT-based authentication
Secure session handling
No raw password storage
Protected API routes
📁 Digital Asset Management
Store sensitive assets (documents, credentials, notes)
Organized asset structure
Secure access control
👥 Trusted Contacts
Add and manage trusted people
Assign access permissions
⚙️ Condition-Based Access
Create conditions (e.g., inactivity trigger)
Link assets + trusted contacts to conditions
Automatic execution logic
📜 Activity Logs
Track all major actions
Maintain auditability
🏗️ Architecture Overview

⚠️ Important: AfterUs follows a Condition-Centric Architecture

🔹 Condition (Core Model)
Central entity of the system
Contains:
linkedAssets
trustedPeople
trigger configuration
🔹 AccessRule (Execution Layer)
Created only when a condition is fulfilled
Used for runtime access checks
Not user-configurable
🛠️ Tech Stack
Layer	Technology
Frontend	React.js
Backend	Node.js + Express.js
Database	MongoDB
Auth	JWT
Deployment	Docker + Cloud (AWS planned)
🔐 Security Principles

AfterUs is built with security by design:

❌ No plaintext passwords
❌ No unnecessary data collection
❌ No hidden access or dark patterns
✅ Encryption-ready architecture
✅ Explicit user consent
✅ Conditional access only
✅ Full audit logs
⚙️ Project Structure
AfterUs/
│
├── client/                # React frontend
│
├── server/
│   ├── models/            # MongoDB schemas
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & validation
│   ├── utils/             # Helpers (logging, etc.)
│
├── docker/                # Docker configs
├── .github/workflows/     # CI/CD pipelines
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/afterus.git
cd afterus
2️⃣ Install Dependencies
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
3️⃣ Environment Variables

Create a .env file in /server:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
4️⃣ Run the Application
# Backend
cd server
npm run dev

# Frontend
cd client
npm start
🧪 Key Workflows
🔁 Condition Execution Flow
User creates condition
Links assets + trusted contacts
System monitors inactivity
Condition triggers
AccessRule is generated
Trusted user gets access
🧱 Development Phases
✅ Phase 1 (Completed / Ongoing)
Auth system
Asset management
Conditions logic
Trusted contacts
Activity logs
🚧 Phase 2 (Next)
Encryption layer (per asset)
Email notifications
Dead-man switch logic
🔮 Future Scope
Multi-device inactivity detection
Legal will integration
AI-based reminders
Mobile app
⚠️ Ethical Considerations

AfterUs is designed with strong ethical boundaries:

Users retain full control
No automatic data sharing without consent
Transparent access rules
Privacy-first architecture
👨‍💻 Author

Naman Sharma
B.Tech CSE – Medicaps University, Indore

MERN Stack Developer
Building startup-grade products
⭐ Vision

AfterUs aims to become a global digital legacy infrastructure, ensuring that:

“Your digital life doesn’t get lost… it gets passed on, securely.”
