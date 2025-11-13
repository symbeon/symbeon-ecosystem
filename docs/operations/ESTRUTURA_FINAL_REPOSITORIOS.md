# 📁 Estrutura Final dos Repositórios Symbeon

**Data**: 13 de Novembro de 2025

---

## 🎯 **ESTRUTURA RECOMENDADA**

### **SEVE-FRAMEWORK** (Framework Core Python)
```
seve-framework/
├── src/
│   ├── seve/                   # Core modules
│   │   ├── __init__.py
│   │   ├── core.py
│   │   ├── empathy.py
│   │   ├── ethics.py
│   │   ├── link.py
│   │   ├── personality.py
│   │   ├── sense.py
│   │   └── vision.py
│   │
│   └── seve_framework/         # Complete framework
│       ├── __init__.py
│       ├── core.py
│       ├── universal/
│       │   ├── __init__.py
│       │   ├── core.py
│       │   └── adapters.py
│       └── ...
│
├── tests/                      # Framework tests
├── examples/                   # Usage examples
├── docs/                       # Framework documentation
│   ├── technical/
│   ├── api/
│   └── ...
│
├── pyproject.toml
├── requirements.txt
├── README.md
└── LICENSE

FOCO: Framework Python puro (biblioteca)
```

---

### **SYMBEON-ECOSYSTEM** (Produto Completo)
```
symbeon-ecosystem/
├── backend/
│   ├── rust-core/              # Backend services (Axum)
│   └── python-services/        # ML/AI services (FastAPI)
│
├── smart-contracts/            # TODOS os contratos
│   ├── contracts/
│   │   ├── SEVEToken.sol           ← MOVER do SEVE-FRAMEWORK
│   │   ├── SEVEProtocol.sol        ← MOVER do SEVE-FRAMEWORK
│   │   ├── SEVEDAO.sol             ← MOVER do SEVE-FRAMEWORK
│   │   ├── SEVEDonation.sol        ✅ Já criado
│   │   └── SEVECertification.sol   ✅ Já criado
│   ├── scripts/
│   ├── test/
│   ├── hardhat.config.js           ← MOVER do SEVE-FRAMEWORK
│   └── package.json
│
├── frontend/
│   └── symbeon-showcase/       ← MOVER de SEVE-FRAMEWORK/showcase
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── ...
│
├── database/                   ✅ Já criado
├── infrastructure/             ✅ Já criado
│
├── docs/
│   ├── ecosystem/              # Docs do ecosystem
│   ├── api/                    # API docs
│   └── guides/                 # Guias
│
└── README.md

FOCO: Produto completo (frontend + backend + contracts + infraestrutura)
```

---

## 🔗 **CONEXÃO ENTRE REPOSITÓRIOS**

### **SYMBEON-ECOSYSTEM usa SEVE-FRAMEWORK**

**No `SYMBEON-ECOSYSTEM/backend/python-services/requirements.txt`**:
```python
# SEVE Framework (core)
seve-framework @ git+https://github.com/symbeon/seve-framework.git
```

**Ou como submodule**:
```bash
cd SYMBEON-ECOSYSTEM
git submodule add https://github.com/symbeon/seve-framework.git framework
```

---

## 📊 **SEPARAÇÃO CLARA**

| O Que | Onde | Por Quê |
|-------|------|---------|
| **Framework Python** | SEVE-FRAMEWORK | Core tecnológico reutilizável |
| **Showcase/Website** | SYMBEON-ECOSYSTEM | Produto completo |
| **Backend Rust** | SYMBEON-ECOSYSTEM | Serviços de produção |
| **Backend Python** | SYMBEON-ECOSYSTEM | ML/AI services |
| **Smart Contracts** | SYMBEON-ECOSYSTEM | Blockchain completo |
| **Documentação Framework** | SEVE-FRAMEWORK | Docs técnicas do framework |
| **Documentação Ecosystem** | SYMBEON-ECOSYSTEM | Docs do produto |

---

## ✅ **BENEFÍCIOS**

1. **Clareza**: Framework separado do produto
2. **Manutenção**: Fácil atualizar cada parte
3. **Reutilização**: Framework pode ser usado em outros projetos
4. **Versionamento**: Independente
5. **Deploy**: Showcase deploy separado do framework

---

**Próxima ação**: Executar reorganização e commit/push

