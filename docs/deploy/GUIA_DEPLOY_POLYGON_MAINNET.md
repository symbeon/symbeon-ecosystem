# 🚀 Guia Completo: Deploy SEVE Framework na Polygon Mainnet

**Data**: 09 de Novembro de 2025  
**Objetivo**: Deploy completo na Polygon Mainnet para produção comercial  
**Custo Total**: ~$0.21 USD

---

## 📋 **PRÉ-REQUISITOS**

### **1. Saldo de MATIC**
- **Necessário**: Mínimo 0.1 MATIC (~$0.08 USD)
- **Recomendado**: 0.2 MATIC (~$0.16 USD) para margem de segurança

### **2. Como Obter MATIC**

#### **Opção 1: Comprar em Exchange**
1. Comprar MATIC em exchange (Binance, Coinbase, etc.)
2. Enviar para sua wallet MetaMask
3. Adicionar rede Polygon no MetaMask

#### **Opção 2: Bridge de Ethereum**
1. Ter ETH na Ethereum Mainnet
2. Usar bridge oficial: https://portal.polygon.technology/
3. Fazer bridge ETH → MATIC (Polygon)

#### **Opção 3: Swap Direto**
1. Usar DEX na Polygon (QuickSwap, SushiSwap)
2. Trocar outros tokens por MATIC

### **3. Configurar Rede Polygon no MetaMask**

**Configuração Manual**:
- **Network Name**: Polygon Mainnet
- **RPC URL**: `https://polygon-rpc.com` ou `https://rpc.ankr.com/polygon`
- **Chain ID**: 137
- **Currency Symbol**: MATIC
- **Block Explorer**: https://polygonscan.com

**Ou usar**: https://chainlist.org/chain/137 (adicionar automaticamente)

---

## 🔧 **CONFIGURAÇÃO DO PROJETO**

### **1. Atualizar .env**

```bash
# Polygon Mainnet RPC
POLYGON_RPC_URL=https://polygon-rpc.com
# Ou usar Alchemy/Infura para melhor performance
# POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Private Key (NUNCA commitar!)
PRIVATE_KEY=sua_chave_privada_aqui
```

### **2. Verificar hardhat.config.js**

Certifique-se de que a configuração Polygon está correta:

```javascript
polygon: {
  url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  chainId: 137,
  gasPrice: 30000000000, // 30 gwei
  timeout: 120000
}
```

---

## 🚀 **PASSO A PASSO DO DEPLOY**

### **Passo 1: Verificar Saldo**

```bash
npx hardhat run scripts/check-balance-mainnet.js
```

**Verificar se tem pelo menos 0.1 MATIC**

---

### **Passo 2: Compilar Contratos**

```bash
npm run compile
```

**Garantir que compilação foi bem-sucedida**

---

### **Passo 3: Deploy do Token**

```bash
npx hardhat run scripts/deploy-token.js --network polygon
```

**Resultado Esperado**:
- ✅ Token deployado
- ✅ Endereço salvo em `deployments/polygon_deployments.json`
- ✅ Transaction hash exibido

**Copiar o endereço do token para próximo passo**

---

### **Passo 4: Deploy do Protocol**

```bash
# Opção 1: Passar endereço do token como argumento
npx hardhat run scripts/deploy-protocol.js --network polygon -- --token 0x...

# Opção 2: Script lê automaticamente do deployments/polygon_deployments.json
npx hardhat run scripts/deploy-protocol.js --network polygon
```

**Resultado Esperado**:
- ✅ Protocol deployado
- ✅ Endereço salvo em `deployments/polygon_deployments.json`
- ✅ Token address vinculado

---

### **Passo 5: Deploy do DAO**

```bash
# Opção 1: Passar endereço do token como argumento
npx hardhat run scripts/deploy-dao.js --network polygon -- --token 0x...

# Opção 2: Script lê automaticamente do deployments/polygon_deployments.json
npx hardhat run scripts/deploy-dao.js --network polygon
```

**Resultado Esperado**:
- ✅ DAO deployado
- ✅ Endereço salvo em `deployments/polygon_deployments.json`
- ✅ Token address vinculado

---

### **Passo 6: Ativar Monetização**

```bash
# Atualizar scripts para usar rede polygon
# Modificar scripts/add-version-v1.js para usar polygon_deployments.json

npx hardhat run scripts/add-version-v1.js --network polygon
npx hardhat run scripts/create-dao-proposal.js --network polygon
npx hardhat run scripts/register-first-agent.js --network polygon
```

---

## 📊 **VERIFICAÇÃO PÓS-DEPLOY**

### **1. Verificar no PolygonScan**

Para cada contrato deployado:
- Acessar: https://polygonscan.com/address/[CONTRACT_ADDRESS]
- Verificar código fonte (se verificado)
- Verificar transações

### **2. Testar Funcionalidades**

```bash
# Testar transferência de token
# Testar compra de licença
# Testar votação no DAO
```

---

## ⚠️ **TROUBLESHOOTING**

### **Erro: Insufficient funds**
- **Solução**: Adicionar mais MATIC à wallet
- **Verificar**: Saldo atual e gas price

### **Erro: Network timeout**
- **Solução**: Usar RPC mais confiável (Alchemy/Infura)
- **Verificar**: Conexão de internet

### **Erro: Nonce too high**
- **Solução**: Resetar nonce ou aguardar confirmação
- **Verificar**: Transações pendentes

### **Erro: Contract verification failed**
- **Solução**: Verificar manualmente no PolygonScan
- **Verificar**: Parâmetros de compilação

---

## 💰 **CUSTOS DETALHADOS**

### **Deploy**
- SEVEToken: ~$0.06 USD
- SEVEProtocol: ~$0.07 USD
- SEVEDAO: ~$0.07 USD
- **Subtotal**: ~$0.20 USD

### **Ativação**
- Add Version: ~$0.002 USD
- Create Proposal: ~$0.01 USD
- Register Agent: ~$0.002 USD
- **Subtotal**: ~$0.014 USD

### **Total**: ~$0.21 USD

**Comparação**:
- Ethereum: ~$500-1,245 USD
- Polygon: ~$0.21 USD
- **Economia**: 99.98%!

---

## ✅ **CHECKLIST FINAL**

- [ ] Saldo de MATIC verificado (≥0.1 MATIC)
- [ ] Rede Polygon configurada no MetaMask
- [ ] .env configurado com PRIVATE_KEY e RPC URL
- [ ] Contratos compilados
- [ ] Token deployado
- [ ] Protocol deployado
- [ ] DAO deployado
- [ ] Versão v1.0.0 adicionada
- [ ] Proposta criada no DAO
- [ ] Agente registrado
- [ ] Contratos verificados no PolygonScan
- [ ] Funcionalidades testadas

---

## 🎉 **APÓS DEPLOY BEM-SUCEDIDO**

1. **Documentar Endereços**: Salvar em documentação
2. **Anunciar Deploy**: Divulgar em redes sociais
3. **Ativar Marketing**: Começar a vender licenças
4. **Monitorar**: Acompanhar transações e uso

---

**Última Atualização**: 09 de Novembro de 2025

