# 🌐 Configuração do Domínio symbeon.tech

## ✅ Status Atual

- **Domínio**: symbeon.tech
- **Status Vercel**: ✅ Adicionado ao projeto `showcase`
- **Ação Necessária**: Configurar DNS na Locaweb

---

## 🔧 Configuração DNS

### **Registro Necessário na Locaweb**

```
Tipo: A
Nome: @ (ou symbeon.tech)
Valor: 76.76.21.21
TTL: 3600
```

### **Passos**

1. Acesse: https://painel.locaweb.com.br
2. Vá em: **Domínios** → **Gerenciar DNS** → **symbeon.tech**
3. Adicione o registro A acima
4. Aguarde propagação (1-2 horas)
5. Vercel configurará SSL automaticamente

---

## 🔍 Verificação

```bash
# Ver status no Vercel
npx vercel domains inspect symbeon.tech

# Verificar DNS
# Acesse: https://dnschecker.org
# Digite: symbeon.tech
# Verifique se IP 76.76.21.21 aparece
```

---

## 📚 Documentação Completa

Veja: `docs/CONFIGURAR_DNS_LOCAWEB.md`

---

**Última Atualização**: 11 de Novembro de 2025

