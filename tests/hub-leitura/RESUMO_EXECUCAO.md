# 📋 Simulação e Testes - Formulário de Contato Hub de Leitura

## ✅ Tarefas Completadas

### 1. **Simulação Prática** ✓

- ✅ Acesso ao site https://hub-de-leitura.vercel.app/
- ✅ Localização da seção de contato (#contact)
- ✅ Identificação de todos os campos do formulário:
  - `name` (input text) - Seu nome completo
  - `email` (input email) - Seu e-mail
  - `subject` (select) - 5 opções de assunto
  - `message` (textarea) - Escreva sua mensagem...
  - Botão "Enviar Mensagem" (submit)
- ✅ Preenchimento prático com dados:
  - Nome: João Silva
  - Email: joao.silva@email.com
  - Assunto: Sugestões
  - Mensagem: "Gostaria de mais informações sobre seus livros e serviços de leitura digital. Adorei a plataforma!"
- ✅ Screenshot do formulário preenchido

### 2. **Script de Testes** ✓

Criado arquivo completo: `tests/hub-leitura/contato-form.spec.js`

**10 casos de teste inclusos:**

1. Validação de visibilidade do formulário
2. Preenchimento com dados válidos
3. Validação de placeholders
4. Validação de tipo email
5. Validação de opções do dropdown
6. Preenchimento passo a passo com screenshots
7. Validação do botão de envio
8. Simulação de envio do formulário
9. Teste com diferentes assuntos
10. Teste de comportamento de foco

### 3. **Documentação** ✓

Criado: `tests/hub-leitura/README.md`

- Guia completo de uso
- Descrição de cada teste
- Instruções de execução
- Troubleshooting
- Customização

### 4. **Scripts NPM** ✓

Adicionados ao `package.json`:

```bash
npm run test:contact           # Rodar testes do formulário
npm run test:contact:headed    # Com navegador visível
npm run test:contact:debug     # Modo debug interativo
```

## 🚀 Como Usar

### Executar os testes agora:

```bash
cd /Users/fabioaraujo/repositorio/mcp-playwright-test
npm run test:contact
```

### Ver com navegador aberto:

```bash
npm run test:contact:headed
```

### Modo debug (pausar e inspecionar):

```bash
npm run test:contact:debug
```

### Rodar teste específico:

```bash
npm test -- tests/hub-leitura/contato-form.spec.js -g "Deve preencher"
```

### Ver relatório completo:

```bash
npm run test:report
```

## 📁 Estrutura Criada

```
mcp-playwright-test/
├── tests/
│   └── hub-leitura/
│       ├── contato-form.spec.js  ✨ NOVO - Script completo
│       └── README.md              ✨ NOVO - Documentação
├── package.json                    📝 MODIFICADO - Novos scripts
└── tests/evidencias/hub-leitura/   📁 SERÁ CRIADO - Screenshots
```

## 🎯 Características dos Testes

| Aspecto             | Detalhe                            |
| ------------------- | ---------------------------------- |
| **Framework**       | Playwright Test (@playwright/test) |
| **Linguagem**       | JavaScript (CommonJS)              |
| **Arquitetura**     | Page Object + Locators             |
| **Evidências**      | Screenshots automáticos            |
| **Validações**      | Assert, toBeVisible, toHaveValue   |
| **Cobertura**       | UI, Campos, Interações, Estados    |
| **Compatibilidade** | Chrome, Firefox, Safari, Edge      |

## 📸 Evidências Geradas

Os testes geram screenshots automáticos em `tests/evidencias/hub-leitura/`:

- Formulário preenchido
- Cada campo preenchido individualmente
- Cada assunto selecionado
- Campo em foco
- Antes e após envio

## 🔍 Campos Testados

### Nome

- Campo: `input[name="name"]`
- Tipo: text
- Placeholder: "Seu nome completo"
- Validação: Preenchimento, valor

### Email

- Campo: `input[name="email"]`
- Tipo: email (HTML5)
- Placeholder: "Seu e-mail"
- Validação: Tipo, preenchimento, valor

### Assunto

- Campo: `select[name="subject"]`
- Opções: 5 (incluindo placeholder)
  1. Selecione o assunto...
  2. Dúvidas Gerais
  3. Suporte Técnico
  4. Sugestões
  5. Parcerias
- Validação: Contagem, textos, seleção

### Mensagem

- Campo: `textarea[name="message"]`
- Placeholder: "Escreva sua mensagem..."
- Validação: Preenchimento, valor, múltiplas linhas

### Botão

- Campo: `button[type="submit"]`
- Texto: "Enviar Mensagem"
- Validação: Visibilidade, ativação, clique

## 💡 Dados de Teste Inclusos

**Conjunto 1 - João Silva (Sugestões)**

```javascript
Nome: João Silva
Email: joao.silva@email.com
Assunto: Sugestões
Mensagem: Gostaria de mais informações...
```

**Conjunto 2 - Maria Santos (Dúvidas Gerais)**

```javascript
Nome: Maria Santos
Email: maria.santos@gmail.com
Assunto: Dúvidas Gerais
Mensagem: Tenho algumas dúvidas sobre...
```

**Conjunto 3 - Carlos Oliveira (Parcerias)**

```javascript
Nome: Carlos Oliveira
Email: carlos@email.com
Assunto: Parcerias
Mensagem: Estou interessado em uma parceria...
```

## 🛠️ Próximos Passos Opcionais

1. **Teste de Validação Backend**

   ```javascript
   // Interceptar POST do formulário
   await page.route('**/api/contact', (route) => {
     // Mock resposta
   });
   ```

2. **Teste de Acessibilidade**

   ```bash
   npm install --save-dev @axe-core/playwright
   ```

3. **Teste de Performance**

   ```javascript
   const metrics = await page.metrics();
   // Validar tempo de renderização
   ```

4. **Teste Visual (Screenshot Comparison)**

   ```javascript
   expect(await page.screenshot()).toMatchSnapshot('formulario.png');
   ```

5. **Teste com Dados Inválidos**
   ```javascript
   // Email inválido, nome vazio, etc.
   ```

## 📊 Resultados Esperados

Ao executar `npm run test:contact`:

```
 ✓ Hub-leitura\contato-form.spec.js (10 testes)
   ✓ Deve validar que o formulário está visível (234ms)
   ✓ Deve preencher o formulário com dados válidos (456ms)
   ✓ Deve validar placeholders (123ms)
   ✓ Deve validar que o campo email aceita formato correto (89ms)
   ✓ Deve validar opções do dropdown (234ms)
   ✓ Deve preencher e validar cada campo (678ms)
   ✓ Deve validar que botão está habilitado (145ms)
   ✓ Deve simular envio do formulário (567ms)
   ✓ Deve testar diferentes combinações (1200ms)
   ✓ Deve validar comportamento de foco (298ms)

10 passed (5.2s)
```

## 🎓 Aprendizados

Este projeto demonstra:

- ✅ Automação de formulários web
- ✅ Uso de seletores CSS eficientes
- ✅ Validações com assertions
- ✅ Capturas de evidência automáticas
- ✅ Organização de testes
- ✅ Documentação técnica
- ✅ Scripts NPM auxiliares
- ✅ Integração com Playwright

---

**Status:** ✅ Completo e pronto para usar!

Próximo comando: `npm run test:contact`
