# 🐙 GitHub Setup - Symbeon Ecosystem

## 🎯 **Criar Repositório no GitHub**

### **Opção 1: Via GitHub CLI** (Recomendado)
```bash
# Login (se necessário)
gh auth login

# Criar repositório
gh repo create symbeon/symbeon-ecosystem --public --source=. --remote=origin

# Push
git push -u origin main
```

### **Opção 2: Via Web**
1. Acesse https://github.com/new
2. Owner: `symbeon`
3. Repository name: `symbeon-ecosystem`
4. Description: "Ecossistema completo de monetização e certificação ética para IA"
5. Public
6. **NÃO** inicialize com README (já temos)
7. Create repository

Depois:
```bash
git remote add origin https://github.com/symbeon/symbeon-ecosystem.git
git branch -M main
git push -u origin main
```

---

## 🔐 **Secrets do GitHub**

Configure os seguintes secrets em:
**Settings → Secrets and variables → Actions**

### **Required Secrets**
```
DATABASE_URL
DB_PASSWORD
JWT_SECRET
ETHEREUM_RPC_URL
POLYGON_RPC_URL
PRIVATE_KEY
OPENAI_API_KEY
SMTP_HOST
SMTP_USER
SMTP_PASSWORD
```

---

## 🚀 **GitHub Actions**

### **CI/CD Workflows**

#### **Backend Rust**
`.github/workflows/rust-ci.yml`
```yaml
name: Rust CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  CARGO_TERM_COLOR: always

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Install Rust
      uses: actions-rs/toolbox@v1
      with:
        toolchain: stable
        override: true
    
    - name: Cache cargo
      uses: actions/cache@v3
      with:
        path: |
          ~/.cargo/registry
          ~/.cargo/git
          backend/rust-core/target
        key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
    
    - name: Build
      run: cd backend/rust-core && cargo build --verbose
    
    - name: Run tests
      run: cd backend/rust-core && cargo test --verbose
    
    - name: Clippy
      run: cd backend/rust-core && cargo clippy -- -D warnings
```

#### **Python Services**
`.github/workflows/python-ci.yml`
```yaml
name: Python CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Cache pip
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
    
    - name: Install dependencies
      run: |
        cd backend/python-services
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: |
        cd backend/python-services
        pytest --cov
```

#### **Smart Contracts**
`.github/workflows/contracts-ci.yml`
```yaml
name: Contracts CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd smart-contracts
        npm install
    
    - name: Compile contracts
      run: |
        cd smart-contracts
        npx hardhat compile
    
    - name: Run tests
      run: |
        cd smart-contracts
        npx hardhat test
    
    - name: Coverage
      run: |
        cd smart-contracts
        npx hardhat coverage
```

---

## 🏷️ **Branch Strategy**

### **Branches**
- `main`: Produção estável
- `develop`: Development/staging
- `feature/*`: Novas funcionalidades
- `fix/*`: Bug fixes
- `release/*`: Release candidates

### **Protection Rules (main)**
- ✅ Require pull request reviews (1+)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Do not allow force push

---

## 📦 **GitHub Packages**

### **Docker Images**
```yaml
# .github/workflows/docker-publish.yml
name: Docker Publish

on:
  push:
    tags:
      - 'v*'

jobs:
  push:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        file: infrastructure/docker/rust-core.Dockerfile
        push: true
        tags: ghcr.io/symbeon/api-gateway:latest
```

---

## 🎯 **GitHub Projects**

### **Criar Project Board**
1. Vá em **Projects** → **New project**
2. Nome: "Symbeon Ecosystem Roadmap"
3. Template: "Kanban"
4. Colunas:
   - 📋 Backlog
   - 🏗️ In Progress
   - 👀 In Review
   - ✅ Done

---

## 📊 **GitHub Insights**

### **Habilitar**
- Dependency graph
- Dependabot alerts
- Code scanning (CodeQL)
- Secret scanning

---

## 📝 **Documentação Adicional**

- Repository → About: Adicionar descrição e tags
- Wiki: Documentação completa
- Discussions: Ativar para comunidade

---

**Pronto para push!** 🚀


