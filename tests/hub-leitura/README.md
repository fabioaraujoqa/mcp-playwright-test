# Testes do Formulário de Contato - Hub de Leitura

## 📋 Sobre

Script automático que testa o formulário de contato do site **Hub de Leitura** (https://hub-de-leitura.vercel.app/).

## 🎯 Funcionalidades dos Testes

- ✅ Validação de visibilidade do formulário
- ✅ Preenchimento com dados válidos
- ✅ Validação de placeholders
- ✅ Validação de tipos de campos (email, select, textarea)
- ✅ Teste de todas as opções do dropdown
- ✅ Teste com múltiplos assuntos
- ✅ Validação de botão de envio
- ✅ Captura de evidências (screenshots) em cada etapa
- ✅ Teste de interações (foco, tipo de texto)

## 🚀 Como Executar

### Executar todos os testes do formulário:

```bash
npm test -- tests/hub-leitura/contato-form.spec.js
```

### Executar com navegador visível:

```bash
npm run test:headed -- tests/hub-leitura/contato-form.spec.js
```

### Executar modo debug:

```bash
npm run test:debug -- tests/hub-leitura/contato-form.spec.js
```

### Executar modo interativo (UI):

```bash
npm run test:ui -- tests/hub-leitura/contato-form.spec.js
```

### Executar um teste específico:

```bash
npm test -- tests/hub-leitura/contato-form.spec.js -g "Deve preencher o formulário"
```

## 📊 Resultados

Após executar, os resultados estarão em:

- `test-results/` - Artefatos de falha (screenshot/vídeo/trace)
- `tests/evidencias/hub-leitura/` - Screenshots de evidência dos testes
- `playwright-report/` - Report HTML completo

Para visualizar o report:

```bash
npm run test:report
```

## 🧪 Testes Inclusos

### 1. **Validação de Visibilidade**

Verifica que o formulário e todos seus campos estão visíveis na página.

### 2. **Preenchimento com Dados Válidos**

Preenche o formulário com dados válidos e valida cada campo.

**Dados de teste:**

- Nome: João Silva
- Email: joao.silva@email.com
- Assunto: Sugestões
- Mensagem: Mensagem de contato completa

### 3. **Validação de Placeholders**

Confirma que os placeholders orientam corretamente o usuário:

- "Seu nome completo"
- "Seu e-mail"
- "Escreva sua mensagem..."

### 4. **Validação de Tipo de Email**

Verifica que o campo email tem validação HTML5.

### 5. **Teste de Opções do Dropdown**

Valida todas as 5 opções:

- Selecione o assunto...
- Dúvidas Gerais
- Suporte Técnico
- Sugestões
- Parcerias

### 6. **Preenchimento Passo a Passo**

Preenche cada campo individual com screenshots de cada etapa:

1. Nome
2. Email
3. Assunto
4. Mensagem

### 7. **Validação do Botão**

Verifica que o botão "Enviar Mensagem" está visível e habilitado.

### 8. **Simulação de Envio**

Preenche e envia o formulário com dados de teste:

- Nome: Carlos Oliveira
- Email: carlos@email.com
- Assunto: Parcerias
- Mensagem: Mensagem de parceria

### 9. **Teste de Múltiplos Assuntos**

Testa o preenchimento com cada uma das opções de assunto.

### 10. **Teste de Foco**

Valida o comportamento de foco e desfoque nos campos.

## 🎬 Campos do Formulário

| Campo   | Tipo         | Placeholder             | Obrigatório |
| ------- | ------------ | ----------------------- | ----------- |
| name    | input[text]  | Seu nome completo       | Sim         |
| email   | input[email] | Seu e-mail              | Sim         |
| subject | select       | Selecione o assunto...  | Sim         |
| message | textarea     | Escreva sua mensagem... | Sim         |

## 📸 Evidências

Todos os testes geram screenshots automaticamente em `tests/evidencias/hub-leitura/`:

- `formulario_preenchido_[timestamp].png`
- `step01_nome_preenchido_[timestamp].png`
- `step02_email_preenchido_[timestamp].png`
- `step03_assunto_selecionado_[timestamp].png`
- `step04_mensagem_preenchida_[timestamp].png`
- `assunto_[assunto]_[timestamp].png`
- `campo_em_foco_[timestamp].png`
- `antes_do_envio_[timestamp].png`
- `apos_envio_[timestamp].png`

## 🔧 Localizadores Utilizados

```javascript
const CONTACT_FORM_LOCATORS = {
  form: 'form#contactForm',
  nameInput: 'input[name="name"]',
  emailInput: 'input[name="email"]',
  subjectSelect: 'select[name="subject"]',
  messageTextarea: 'textarea[name="message"]',
  submitButton: 'button[type="submit"]',
};
```

## ✏️ Customização

Para modificar os dados de teste, edite as strings dentro de cada `test()`:

```javascript
// Exemplo: Mudar nome do teste
await nameInput.fill('Seu Nome Aqui');
```

## 🐛 Troubleshooting

### Timeout no elemento

Se receber erro de timeout, a página pode estar lenta:

```bash
npm test -- tests/hub-leitura/contato-form.spec.js --timeout=60000
```

### URL não responde

Verifique se o site está online:

```bash
curl https://hub-de-leitura.vercel.app/
```

### Seletores não encontrados

Verifique se o HTML da página mudou executando com debug:

```bash
npm run test:debug
```

## 📝 Notas

- Os testes não validam resposta do backend, apenas interação com o formulário
- Capturas de tela são automaticamente anexadas aos relatórios
- Cada execução limpa dados anteriores
- Requer conexão com internet (teste acessa URL remota)

## 🔗 URLs Relacionadas

- **Site testado:** https://hub-de-leitura.vercel.app/
- **Documentação Playwright:** https://playwright.dev/
- **Documentação do Projeto:** Ver `docs/` na raiz

## ✨ Extras

Para melhorar ainda mais os testes, você pode:

1. **Testar validação do backend** - Interceptar requests com `page.route()`
2. **Mock de envios** - Usar `MockServiceWorker` para respostas
3. **Testes visuais** - Usar `@playwright/test` visual comparison
4. **Performance** - Medir tempo de renderização e interações
5. **Acessibilidade** - Usar `@axe-core/playwright` para validar a11y

---

**Criado com ❤️ usando Playwright** 🎭
