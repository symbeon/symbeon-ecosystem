# ✅ Checklist: Deploy na Polygon Mainnet

**Data**: 09 de Novembro de 2025  
**Status**: ⏳ **AGUARDANDO MATIC**

---

## 📋 **CHECKLIST PRÉ-DEPLOY**

### **1. Preparação de Saldo** ⏳
- [ ] Swap ETH → MATIC concluído
- [ ] Saldo de MATIC verificado (≥0.1 MATIC)
- [ ] Saldo suficiente para deploy + ativação (~0.2 MATIC recomendado)

### **2. Configuração** ✅
- [x] Rede Polygon configurada no MetaMask
- [x] .env configurado com PRIVATE_KEY
- [x] POLYGON_RPC_URL configurado (ou usar padrão)
- [x] Scripts atualizados e prontos

### **3. Verificação** ⏳
- [ ] Verificar saldo: `npx hardhat run scripts/check-balance-mainnet.js`
- [ ] Compilar contratos: `npm run compile`
- [ ] Verificar .env está correto

---

## 🚀 **EXECUÇÃO DO DEPLOY**

### **Passo 1: Deploy dos Contratos**
```bash
npm run deploy:polygon
```

**O que será feito**:
- [ ] Deploy SEVEToken
- [ ] Deploy SEVEProtocol (vinculado ao token)
- [ ] Deploy SEVEDAO (vinculado ao token)
- [ ] Salvar deployments em `deployments/polygon_deployments.json`

**Tempo estimado**: ~2-3 minutos  
**Custo**: ~$0.20 USD

---

### **Passo 2: Verificação no PolygonScan**
- [ ] Verificar SEVEToken no PolygonScan
- [ ] Verificar SEVEProtocol no PolygonScan
- [ ] Verificar SEVEDAO no PolygonScan
- [ ] Copiar endereços dos contratos

**Links**:
- PolygonScan: https://polygonscan.com/

---

### **Passo 3: Ativação de Monetização**
```bash
npm run monetization:activate:polygon
```

**O que será feito**:
- [ ] Adicionar versão v1.0.0 ao protocolo
- [ ] Criar primeira proposta no DAO
- [ ] Registrar primeiro agente de IA ética

**Tempo estimado**: ~1-2 minutos  
**Custo**: ~$0.014 USD

---

### **Passo 4: Validação Final**
- [ ] Verificar versão v1.0.0 no protocolo
- [ ] Verificar proposta criada no DAO
- [ ] Verificar agente registrado
- [ ] Testar transferência de token (opcional)
- [ ] Documentar endereços finais

---

## 📊 **RESULTADOS ESPERADOS**

### **Arquivos Gerados**
- `deployments/polygon_deployments.json` - Endereços dos contratos
- Logs de deploy com transaction hashes

### **Endereços dos Contratos**
- SEVEToken: `0x...`
- SEVEProtocol: `0x...`
- SEVEDAO: `0x...`

### **Transações de Ativação**
- Add Version: `0x...`
- Create Proposal: `0x...`
- Register Agent: `0x...`

---

## ⚠️ **POSSÍVEIS PROBLEMAS**

### **Erro: Insufficient funds**
- **Solução**: Adicionar mais MATIC
- **Verificar**: Saldo atual

### **Erro: Network timeout**
- **Solução**: Usar RPC mais confiável (Alchemy/Infura)
- **Verificar**: Conexão de internet

### **Erro: Nonce too high**
- **Solução**: Aguardar confirmação ou resetar nonce
- **Verificar**: Transações pendentes

---

## 🎉 **APÓS DEPLOY BEM-SUCEDIDO**

1. **Documentar**: Salvar endereços em documentação
2. **Anunciar**: Divulgar deploy nas redes sociais
3. **Monitorar**: Acompanhar transações e uso
4. **Próximo Marco**: Desenvolver portal web para compra de licenças

---

**Última Atualização**: 09 de Novembro de 2025  
**Status**: ⏳ **AGUARDANDO MATIC - SWAP EM ANDAMENTO**

