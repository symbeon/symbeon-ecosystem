# 🔧 Configurar DNS symbeon.tech na Locaweb

**Status**: Domínio adicionado ao Vercel ✅  
**Registrador**: Locaweb  
**Ação Necessária**: Configurar DNS

---

## 🎯 **OPÇÕES DE CONFIGURAÇÃO**

Você tem **2 opções**. Recomendo a **Opção 1** (mais simples).

---

## ✅ **OPÇÃO 1: Adicionar Registro A (Recomendado)**

### **Passo a Passo na Locaweb**

1. **Acesse o Painel da Locaweb**
   - Login em: https://painel.locaweb.com.br
   - Vá em **Domínios** → **Gerenciar DNS**

2. **Encontre o domínio symbeon.tech**
   - Clique em **symbeon.tech**
   - Vá na aba **Zona DNS** ou **DNS**

3. **Adicione o Registro A**
   - Clique em **Adicionar Registro** ou **Novo Registro**
   - Configure:
     ```
     Tipo: A
     Nome/Host: @ (ou deixe em branco, ou symbeon.tech)
     TTL: 3600 (ou padrão)
     Valor/IP: 76.76.21.21
     ```
   - Salve

4. **Adicione Registro CNAME para www (Opcional)**
   - Tipo: CNAME
   - Nome: www
   - Valor: cname.vercel-dns.com
   - Salve

5. **Aguarde Propagação**
   - 5 minutos a 2 horas
   - Verifique em: https://dnschecker.org

---

## ✅ **OPÇÃO 2: Mudar Nameservers (Alternativa)**

Se preferir usar os nameservers do Vercel:

1. **No Painel Locaweb**
   - Vá em **Domínios** → **symbeon.tech**
   - Procure por **Nameservers** ou **Servidores DNS**

2. **Altere para:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

3. **Salve e Aguarde**
   - Pode levar até 48 horas
   - Vercel gerenciará todo o DNS

---

## 🔍 **VERIFICAÇÃO**

### **1. Verificar DNS**

Após configurar, verifique em:
- https://dnschecker.org
- Digite: `symbeon.tech`
- Verifique se o IP `76.76.21.21` aparece

### **2. Verificar no Vercel**

```bash
# Verificar status do domínio
npx vercel domains ls

# Ver detalhes
npx vercel domains inspect symbeon.tech
```

### **3. Testar Acesso**

Após propagação (1-2 horas):
- Acesse: `https://symbeon.tech`
- Deve mostrar o showcase

---

## ⚠️ **IMPORTANTE**

- **Não remova** outros registros DNS existentes (se houver)
- **Aguarde** a propagação DNS (pode levar tempo)
- O Vercel configurará **SSL automaticamente** após DNS propagar
- Você receberá um **email do Vercel** quando estiver configurado

---

## 🐛 **PROBLEMAS COMUNS**

### **DNS não propaga**

**Solução**:
- Aguarde até 48 horas
- Verifique se o registro A está correto: `76.76.21.21`
- Limpe cache DNS: `ipconfig /flushdns` (Windows)

### **Vercel mostra "Not Configured"**

**Solução**:
- Verifique se o registro A foi adicionado corretamente
- Aguarde propagação DNS
- Verifique em https://dnschecker.org

### **SSL não funciona**

**Solução**:
- Aguarde alguns minutos após DNS propagar
- Vercel configura SSL automaticamente
- Pode levar até 1 hora após DNS estar correto

---

## 📋 **CHECKLIST**

- [x] Domínio adicionado ao Vercel ✅
- [ ] Registro A adicionado na Locaweb (`76.76.21.21`)
- [ ] Aguardando propagação DNS
- [ ] Verificado em dnschecker.org
- [ ] SSL configurado automaticamente
- [ ] Acesso funcionando em symbeon.tech

---

## 📞 **SUPORTE**

Se tiver problemas:
- **Locaweb**: Suporte via painel
- **Vercel**: https://vercel.com/support
- **Documentação**: https://vercel.com/docs/concepts/projects/domains

---

**Última Atualização**: 11 de Novembro de 2025

