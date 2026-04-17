# 🔐 Guia de Variáveis de Ambiente

## 📋 Visão Geral

Este projeto utiliza arquivos `.env` separados por sistema/projeto para gerenciar credenciais e configurações de forma segura.

## 🗂️ Estrutura de Arquivos

```
.env.example        # Template geral (commitar)
.env.sistema1       # Credenciais do Sistema 1 (NÃO commitar)
.env.sistema2       # Credenciais do Sistema 2 (NÃO commitar)
```

## 🚀 Como Usar

### 1. Configuração Inicial

Crie arquivos `.env.*` para cada sistema com suas credenciais reais:

```bash
# Exemplo: Editar credenciais do Sistema 1
nano .env.sistema1

# Ou use seu editor favorito
code .env.sistema1
```

### 2. Nos Testes

```typescript
import { loadEnv, validateEnv } from '../helpers/env-loader';

test.describe('Meu Teste', () => {
  test.beforeAll(() => {
    // Carregar variáveis do sistema específico
    loadEnv('sistema1');

    // Validar que variáveis obrigatórias existem
    validateEnv(['SISTEMA_USER', 'SISTEMA_PASSWORD']);
  });

  test('exemplo', async ({ page }) => {
    // Usar variáveis
    await page.goto(process.env.SISTEMA_BASE_URL!);
    await page.fill('input[name="user"]', process.env.SISTEMA_USER!);
    await page.fill('input[name="pass"]', process.env.SISTEMA_PASSWORD!);
  });
});
```

## 📝 Variáveis Disponíveis

### Sistema 1 (`.env.sistema1`)

- `SISTEMA_BASE_URL` - URL da aplicação
- `SISTEMA_USER` - Usuário de login
- `SISTEMA_PASSWORD` - Senha de login
- `SISTEMA_TIMEOUT` - Timeout customizado (opcional)
- `SISTEMA_EVIDENCIAS_DIR` - Pasta de evidências (opcional)

### Sistema 2 (`.env.sistema2`)

- `SISTEMA2_BASE_URL` - URL da aplicação
- `SISTEMA2_USER` - Usuário de login
- `SISTEMA2_PASSWORD` - Senha de login
- `SISTEMA2_TIMEOUT` - Timeout customizado (opcional)

### Adicionar Novos Sistemas

Siga o mesmo padrão `NOMEDOSISTEMA_VARIAVEL` para sistemas adicionais

## 🔒 Segurança

### ✅ O que FAZER:

- ✅ Manter arquivos `.env.*` no `.gitignore`
- ✅ Usar `.env.example` como template
- ✅ Compartilhar credenciais por canais seguros (Vault, 1Password, etc.)
- ✅ Rotacionar senhas periodicamente

### ❌ O que NÃO fazer:

- ❌ NUNCA commitar arquivos `.env.*` com credenciais reais
- ❌ NUNCA compartilhar credenciais em chat/email
- ❌ NUNCA usar credenciais de produção em testes

## 🧪 Teste de Configuração

Para verificar se suas variáveis estão carregadas corretamente:

```bash
# Executar teste de exemplo
npx playwright test tests/sansys/exemplo-com-env.spec.ts --headed
```

Se ver a mensagem:

```
✅ Variáveis de ambiente carregadas de .env.sansys
✅ Todas as variáveis obrigatórias estão presentes
```

Está tudo configurado! 🎉

## 🐛 Troubleshooting

### Erro: "Arquivo .env.xxx não encontrado"

**Solução:** Certifique-se de que o arquivo existe na raiz do projeto:

```bash
ls -la .env.*
```

### Erro: "Variáveis obrigatórias não encontradas"

**Solução:** Verifique se todas as variáveis necessárias estão definidas no arquivo `.env.*`

### Erro: "Cannot find module 'dotenv'"

**Solução:** Instale a dependência:

```bash
npm install --save-dev dotenv
```

## 📚 Referências

- [dotenv - NPM](https://www.npmjs.com/package/dotenv)
- [Twelve-Factor App - Config](https://12factor.net/config)
- [Playwright Environment Variables](https://playwright.dev/docs/test-parameterize)
