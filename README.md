# 🧪 Projeto de Testes de Performance – API de Pedidos de resstaurante

## 📘 Visão Geral

Este projeto tem como objetivo avaliar e garantir a **performance da API de Pedidos** do sistema de restaurante, simulando diferentes níveis de carga e uso realista.  
Os testes permitem identificar **gargalos**, **limites de estabilidade** e **pontos de melhoria** para assegurar a **qualidade e escalabilidade** do backend.

---

## 🎯 Objetivos

- Validar o comportamento da API sob carga controlada.  
- Detectar falhas e lentidão em cenários de alto volume de usuários.  
- Garantir que o tempo de resposta permaneça dentro dos thresholds definidos.  
- Fornecer relatórios visuais para apoio à decisão técnica.  

---

## ⚙️ Ferramentas Utilizadas

| Ferramenta | Finalidade |
|-------------|-------------|
| **K6** | Execução de testes de carga e estresse |
| **Node.js** | Ambiente de execução dos scripts |
| **GitLab CI/CD** | Automação dos testes |
| **Prometheus + Grafana (opcional)** | Monitoramento e métricas em tempo real |

---

## 📁 Estrutura do Projeto

/tests
├── load_login_critical.test.js # Teste de carga no endpoint /login
├── load_pedido.test.js # Teste de estresse no endpoint /pedidos
├── results/
│ └── html-report.html # Relatório HTML gerado automaticamente
├── utils/
│ └── variaveis
└── README_PERFORMANCE.md # Documentação complementar
└── .gitignore


---

## 🚀 Como Executar os Testes

### 🔧 Pré-requisitos
- Node.js instalado  
- K6 instalado globalmente  
- Projeto clonado do repositório


# 👨‍💻 Autor

**Flavio Silva**  
Analista de Testes e Qualidade de Software  
📧 flavio148@hotmail.com  

🔗 [LinkedIn](https://www.linkedin.com/in/fl%C3%A1vio-silva-in/) | [GitHub](https://github.com/conectef)

---

## 📄 Licença

Este projeto é interno e restrito para fins de teste de performance da equipe de QA e desenvolvimento.  
Distribuição externa não autorizada.

### ▶️ Comandos Principais

```bash
# Executar teste de login com visualização do dashboard
K6_WEB_DASHBOARD=true k6 run tests/load_login_critical.test.js

# Exportar resultados em JSON
k6 run --out json=results.json tests/load_login_critical.test.js

# Exportar resultados em HTML
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/load_login_critical.test.js




