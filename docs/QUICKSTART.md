# 🚀 Quickstart - Symbeon Ecosystem

## ⚡ **Setup Rápido**

### **1. Pré-requisitos**
```bash
# Verificar versões
rust --version    # 1.70+
python --version  # 3.11+
node --version    # 18+
docker --version  # 20+
```

### **2. Clone e Setup**
```bash
# Clone
git clone https://github.com/symbeon/symbeon-ecosystem.git
cd symbeon-ecosystem

# Configure .env
cp .env.example .env
# Edite .env com suas credenciais

# Inicie serviços
docker-compose up -d
```

### **3. Verificar**
```bash
# PostgreSQL
docker-compose exec postgres psql -U symbeon -d symbeon_ecosystem -c "SELECT 1;"

# Redis
docker-compose exec redis redis-cli ping

# API Gateway
curl http://localhost:8000/health

# Funnel Engine
curl http://localhost:8001/

# Frontend
open http://localhost:3000
```

---

## 🔧 **Development**

### **Backend Rust**
```bash
cd backend/rust-core
cargo build
cargo test
cargo run --bin api-gateway
```

### **Python Services**
```bash
cd backend/python-services/funnel-engine
pip install -r ../requirements.txt
uvicorn main:app --reload --port 8001
```

### **Smart Contracts**
```bash
cd smart-contracts
npm install
npx hardhat compile
npx hardhat test
```

### **Frontend**
```bash
cd frontend/symbeon-showcase
npm install
npm run dev
```

---

## 📊 **Database Setup**

### **Rodar Migrations**
```bash
docker-compose exec postgres psql -U symbeon -d symbeon_ecosystem -f /docker-entrypoint-initdb.d/001_initial_schema.sql
```

### **Verificar Schema**
```bash
docker-compose exec postgres psql -U symbeon -d symbeon_ecosystem -c "\dt"
```

---

## 🔐 **Configuração de Secrets**

### **.env file**
```env
# Database
DATABASE_URL=postgresql://symbeon:senha_forte@localhost:5432/symbeon_ecosystem
DB_PASSWORD=senha_forte

# JWT
JWT_SECRET=seu_secret_aqui_use_openssl_rand_base64_32

# Blockchain
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/SUA_API_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/SUA_API_KEY
PRIVATE_KEY=sua_private_key

# AI
OPENAI_API_KEY=sk-...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=contato@symbeon.tech
SMTP_PASSWORD=sua_senha_app
```

---

## 🧪 **Testing**

### **Backend**
```bash
# Rust
cargo test --workspace

# Python
pytest backend/python-services/
```

### **Contracts**
```bash
npx hardhat test
npx hardhat coverage
```

---

## 📈 **Monitoring**

### **Logs**
```bash
# API Gateway
docker-compose logs -f rust-api-gateway

# Funnel Engine
docker-compose logs -f python-funnel

# Database
docker-compose logs -f postgres
```

### **Health Checks**
```bash
curl http://localhost:8000/health
curl http://localhost:8001/
curl http://localhost:8002/
```

---

## 🐛 **Troubleshooting**

### **Postgres não conecta**
```bash
docker-compose down -v
docker-compose up -d postgres
docker-compose exec postgres pg_isready
```

### **Rust build falha**
```bash
cargo clean
cargo build
```

### **Python dependencies**
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

---

## 📚 **Próximos Passos**

1. [Ler Arquitetura](ARCHITECTURE.md)
2. [Configurar GitHub Actions](../.github/workflows/)
3. [Deploy em Produção](DEPLOYMENT.md)
4. [Explorar APIs](API.md)


