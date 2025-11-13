# 🚀 Passo a Passo: Deploy na Testnet Sepolia

**Status Atual**: ✅ Rede Sepolia | ✅ 0.2 SepoliaETH | ⚠️ Falta configurar chave privada

---

## ✅ **O QUE JÁ ESTÁ PRONTO**

- ✅ MetaMask na rede Sepolia
- ✅ Fundos suficientes (0.2 SepoliaETH)
- ✅ Alchemy URL configurada
- ✅ Contratos compilados
- ✅ Scripts de deploy prontos

---

## 🔐 **PASSO 1: EXPORTAR CHAVE PRIVADA**

### **Na MetaMask:**

1. **Clique no menu** (3 linhas no canto superior direito)
2. **Vá em "Configurações"** (Settings)
3. **Clique em "Segurança e Privacidade"** (Security & Privacy)
4. **Role até encontrar "Exportar Chave Privada"**
5. **Clique em "Exportar Chave Privada"**
6. **Digite sua senha da MetaMask**
7. **Copie a chave privada** (aparece com `0x` no início)

**⚠️ IMPORTANTE**:

- A chave privada é sensível
- Use apenas para testnet
- Não compartilhe com ninguém

---

## 📝 **PASSO 2: CONFIGURAR NO .ENV**

### **Opção A: Manual**

1. Abra o arquivo `.env` na raiz do projeto
2. Encontre a linha `PRIVATE_KEY=...`
3. Substitua pelo valor copiado, **removendo o `0x`**:

   ```bash
   PRIVATE_KEY=abc123def456... (sua chave sem o 0x)
   ```

4. Salve o arquivo

### **Opção B: Script Automatizado**

Execute no PowerShell:

```powershell
.\scripts\update-private-key.ps1 -PrivateKey 'sua_chave_com_ou_sem_0x'
```

O script automaticamente:

- Remove o `0x` se existir
- Valida o comprimento
- Atualiza o `.env`
- Verifica saldo

---

## ✅ **PASSO 3: VERIFICAR CONFIGURAÇÃO**

Execute:

```bash
npx hardhat run scripts/check-balance.js --network sepolia
```

**Resultado esperado:**

```text
📧 Endereço: 0x863de...6DA76 (seu endereço da MetaMask)
💰 Saldo: 0.2 ETH
✅ Saldo suficiente para deploy!
```

**Se aparecer:**

- ✅ Endereço corresponde à MetaMask → Continue para Passo 4
- ❌ Endereço diferente → Verifique se a chave está correta
- ❌ Saldo 0.0 → Verifique se está na rede Sepolia

---

## 🚀 **PASSO 4: EXECUTAR DEPLOY**

### **Opção A: Script Automatizado (Recomendado)**

```powershell
.\scripts\deploy-testnet.ps1 sepolia
```

O script irá:

1. ✅ Verificar configuração
2. ✅ Compilar contratos
3. ✅ Executar testes
4. ✅ Deploy do SEVEToken
5. ✅ Deploy do SEVEProtocol
6. ✅ Deploy do SEVEDAO
7. ✅ Salvar informações em `deployments/sepolia_deployments.json`

### **Opção B: Manual**

```bash

# 1. Deploy Token

npx hardhat run scripts/deploy-token.js --network sepolia

# 2. Deploy Protocol (lê token automaticamente)

npx hardhat run scripts/deploy-protocol.js --network sepolia

# 3. Deploy DAO (lê token automaticamente)

npx hardhat run scripts/deploy-dao.js --network sepolia
```

---

## 📊 **PASSO 5: VERIFICAR DEPLOY**

### **Verificar no Explorer**

1. Acesse: [https://sepolia.etherscan.io/](https://sepolia.etherscan.io/)
2. Busque pelos endereços dos contratos
3. Verifique as transações

### **Verificar Arquivo de Deployment**

Os endereços são salvos em:

```text
deployments/sepolia_deployments.json
```

Conteúdo:

```json
{
  "SEVEToken": {
    "address": "0x...",
    "transactionHash": "0x...",
    "network": "sepolia"
  },
  "SEVEProtocol": {
    "address": "0x...",
    "transactionHash": "0x..."
  },
  "SEVEDAO": {
    "address": "0x...",
    "transactionHash": "0x..."
  }
}
```

---

## ✅ **CHECKLIST FINAL**

- [ ] Chave privada exportada da MetaMask
- [ ] Chave adicionada no `.env` (sem `0x`)
- [ ] Saldo verificado (> 0.01 ETH)
- [ ] Endereço corresponde à MetaMask
- [ ] Deploy executado com sucesso
- [ ] Contratos verificados no explorer
- [ ] Arquivo de deployment salvo

---

## 🎉 **PRONTO!**

Após o deploy bem-sucedido, você terá:

- ✅ SEVEToken deployado
- ✅ SEVEProtocol deployado
- ✅ SEVEDAO deployado
- ✅ Endereços salvos para referência

**Próximos passos:**

- Verificar contratos no explorer
- Testar funcionalidades
- Configurar frontend (se aplicável)

---

## ⚠️ **TROUBLESHOOTING**

### **Erro: "insufficient funds"**

- Verifique se está na rede Sepolia
- Verifique saldo: `npx hardhat run scripts/check-balance.js --network sepolia`

### **Erro: "invalid private key"**

- Verifique se removeu o `0x`
- Verifique se a chave tem 64 caracteres

### **Erro: "nonce too high"**

- Aguarde algumas confirmações
- Ou resetar nonce na MetaMask

---

**Última Atualização**: 07 de Novembro de 2025
**Mantido por**: Equipe EON - Symbeon Tech
