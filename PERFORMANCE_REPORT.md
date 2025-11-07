# 🧪 Performance Report — Endpoint `/api/login`

**Projeto:** Pedido API
**Teste executado com:** k6
**Data do teste:** _07/11/2025
**Ambiente:** Localhost (Banco em Memória)
**Usuários virtuais (VUs):** 120
**Ferramenta de relatório:** K6 Web Dashboard

---

## ⚙️ Resumo do Teste

| Métrica | Valor | Interpretação |
|----------|--------|---------------|
| **http_req_duration (média)** | **431 ms** | Tempo médio de resposta do login — excelente. |
| **http_req_duration (p99)** | **3 s** | 1% das requisições levaram até 3s — indica picos de lentidão. |
| **http_req_failed** | **22.7 %** ⚠️ | Alta taxa de falhas — possível gargalo ou perda de conexão. |
| **checks** | **90.7 %** | 9% das respostas não atenderam o esperado. |
| **taxa_sucesso_login** | **100 %** ✅ | Todos os logins válidos tiveram sucesso. |
| **vus_max** | **120** | Carga máxima atingida conforme planejado. |
| **iteration_duration (p95)** | **5 s** | 95% das iterações concluíram em até 5 segundos. |

---

## 📊 Interpretação dos Resultados

### ✅ Pontos Positivos
- **Tempo médio baixo (431 ms)**: ótimo desempenho sob carga moderada.
- **Login válido estável (100% de sucesso)**: autenticação funcional.
- **Distribuição consistente até o p95**: boa estabilidade até alto volume.

### ⚠️ Pontos Críticos
1. **Alta taxa de falhas (22.7%)**
   - Causa provável: sobrecarga no servidor, reinicialização do banco em memória, ou timeouts.
   - Ações sugeridas:
     - Verificar logs do servidor (status 429, 500 ou 503).
     - Reduzir a taxa de requisições simultâneas ou usar banco persistente.

2. **Latência no p99 (3 segundos)**
   - Pode afetar a experiência do usuário em picos.
   - Ações sugeridas:
     - Monitorar uso de CPU e memória durante o teste.
     - Revisar middleware de autenticação e dependências (ex: bcrypt, JWT).

3. **Banco em Memória**
   - Ideal para testes unitários, **não confiável para stress realista**.
   - Recomenda-se usar SQLite, PostgreSQL ou MongoDB para simulações de carga.

---

## 🚀 Recomendações Técnicas

### 1️⃣ Executar com banco persistente
Simular ambiente mais próximo do real — memória volátil mascara gargalos de I/O e concorrência.

### 2️⃣ Adicionar ramp-up controlado
Evita sobrecarga instantânea no servidor:
```js
export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 60 },
    { duration: '1m', target: 120 },
    { duration: '30s', target: 0 },
  ],
};

# 📊 Resumo Final

A API de login demonstra bom desempenho médio, porém com **22% de falhas sob carga alta**.

Para uma validação realista, recomenda-se:

- Migrar para um **banco persistente**
- Ajustar o **ramp-up** de usuários
- Monitorar métricas do **servidor e da API** em paralelo

