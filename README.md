# MCP Playwright Test

> Automação de testes com Playwright + MCP (Model Context Protocol) - Padrões de qualidade e boas práticas

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.48+-blue)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#license)

---

## 📋 Visão Geral

Este projeto é um **template de qualidade** para automação de testes com Playwright, seguindo boas práticas, padrões robustos e estrutura profissional.

**Recursos principais:**

- ✅ Padrões robustos de seletores (Prioridade 1, 2, 3)
- ✅ Variáveis de ambiente seguras (`.env.*`)
- ✅ Helper de evidências (screenshots automáticas)
- ✅ Estrutura modular e escalável
- ✅ Documentação completa em `docs/`
- ✅ Exemplos prontos para usar
- ✅ Scripts npm otimizados
- ✅ Configuração do Playwright pré-definida

---

## 🚀 Quick Start

### 1️⃣ Instalação

```bash
# Clonar ou baixar repositório
git clone <seu-repo>
cd mcp-playwright-test

# Instalar dependências
npm install

# Instalar browsers do Playwright
npx playwright install
```

### 2️⃣ Configurar Variáveis de Ambiente

```bash
# Copiar template
cp .env.example .env.sistema1

# Editar com suas credenciais
code .env.sistema1
```

**Arquivo `.env.sistema1`:**

```env
SISTEMA_BASE_URL=https://sua-app.com.br
SISTEMA_USER=seu_usuario@example.com
SISTEMA_PASSWORD=sua_senha_123
```

### 3️⃣ Executar Testes

```bash
# Todos os testes
npm test

# Com interface gráfica
npm run test:headed

# Modo debug
npm run test:debug

# Interface visual
npm run test:ui
```

### 4️⃣ Ver Relatório

```bash
npm run test:report
```

---

## 📁 Estrutura do Projeto

```
mcp-playwright-test/
├── docs/                          # Documentação completa
│   ├── 00-ARQUITETURA.md
│   ├── 01-BOAS_PRATICAS.md
│   ├── 02-SELETORES_ROBUSTOS.md
│   ├── 03-VARIAVEIS_AMBIENTE.md
│   └── 04-CHECKLIST_QUALIDADE.md
├── tests/
│   ├── helpers/
│   │   └── evidencia-helper.js
│   ├── hub-leitura/
│   │   └── contato-form.spec.js
│   ├── sistema1/
│   │   └── exemplo-login.spec.js
│   └── evidencias/               # Screenshots gerados
├── .env.example                  # Template
├── .env.sistema1                 # Credenciais (GITIGNORE)
├── package.json
├── playwright.config.js
└── README.md
```

---

## 📚 Documentação

- [00-ARQUITETURA.md](docs/00-ARQUITETURA.md) - Estrutura e decisões de design
- [01-BOAS_PRATICAS.md](docs/01-BOAS_PRATICAS.md) - Princípios, seletores, sincronização
- [02-SELETORES_ROBUSTOS.md](docs/02-SELETORES_ROBUSTOS.md) - Estratégias e padrões
- [03-VARIAVEIS_AMBIENTE.md](docs/03-VARIAVEIS_AMBIENTE.md) - Setup de `.env.*`
- [04-CHECKLIST_QUALIDADE.md](docs/04-CHECKLIST_QUALIDADE.md) - Validação de testes

---

## 🎯 Exemplo Rápido

```javascript
test('login bem-sucedido', async ({ page }, testInfo) => {
  const tiraFoto = await createEvidenciaHelper(page, testInfo);

  await page.goto('https://app.com');
  await page.getByLabel(/email/i).fill('user@example.com');
  await page.getByLabel(/senha/i).fill('password');
  await page.getByRole('button', { name: /entrar/i }).click();

  await expect(page).toHaveURL(/dashboard/);
  await tiraFoto('login-sucesso');
});
```

---

## 🛠️ Scripts npm

```bash
npm test                    # Rodar todos os testes
npm run test:headed         # Com navegador visível
npm run test:debug          # Modo debug
npm run test:ui             # Interface visual
npm run test:report         # Relatório HTML
npm run install:browsers    # Instalar browsers
npm run lint                # Code style
npm run format              # Formatar código
```

---

## 🔒 Segurança

- ✅ Credenciais em `.env.*` (não commitar)
- ✅ Usar `.env.example` como template
- ✅ Compartilhar credenciais por canais seguros
- ✅ Nenhuma credencial hardcoded no código

---

## 🚨 Troubleshooting

```bash
# Instalar dependências
npm install

# Instalar browsers
npx playwright install

# Copiar template de ambiente
cp .env.example .env.sistema1
```

---

## 📄 Referências

- [Playwright Docs](https://playwright.dev/)
- [MCP Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [GitHub - Playwright MCP](https://github.com/microsoft/playwright-mcp)

---

**Desenvolvido com ❤️ usando Playwright + MCP**
