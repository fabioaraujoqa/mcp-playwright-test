# 🎬 Prompts para Live Demo — MCP + Playwright

### Guia do apresentador: o que digitar, o que esperar, o que comentar

> Use este arquivo aberto no terminal durante a apresentação.  
> Cada bloco tem: **prompt**, **o que a IA vai fazer**, **o que você fala para a plateia**.

---

## 🔧 PRÉ-DEMO: Setup ao vivo (mostrar antes de tudo)

```json
// mcp.json — configuração mínima
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

**Fala para a plateia:**

> _"Isso é tudo. Sem instalar framework, sem configurar WebDriver, sem baixar chromedriver.  
> Um JSON de 8 linhas e você tem um navegador controlado por IA."_

---

---

# 🔴 DEMO 1 — Criação de Conta no devreferencias.com.br

## Antes de rodar: contexto para a plateia

**Fala:**

> \*"Vou pedir para a IA criar uma conta real num site real.  
> Quero que vocês observem TRÊS coisas:
>
> 1. A IA nunca viu esse site antes
> 2. Ela vai explorar a interface sozinha
> 3. E eu não vou escrever nenhum seletor"\*

---

### 📍 PROMPT 1.1 — Exploração antes de agir

**O que digitar:**

```
Acesse https://devreferencias.com.br e me descreva:
1. O que esse site faz
2. Onde fica o fluxo de cadastro/criação de conta
3. Quais campos são obrigatórios no formulário de registro
NÃO preencha nada ainda. Só observe e me relate.
```

**O que a IA vai fazer:**

- Navegar para o site
- Tirar um snapshot de acessibilidade
- Identificar links de login/cadastro
- Explorar o formulário
- Retornar um relatório descritivo

**O que você comenta:**

> _"Percebam que pedi PRIMEIRO que ela olhasse antes de agir.  
> Esse é um padrão importante: IA exploratória antes de IA executora.  
> Evita ações destrutivas ou erros por falta de contexto."_

---

### 📍 PROMPT 1.2 — Criação de conta supervisionada

**O que digitar:**

```
Agora crie uma conta no devreferencias.com.br com os seguintes dados:
- Nome: QA Demo
- Email: qa.demo.apresentacao@tempmail.com
- Senha: MinhaDemo@2025

Siga as etapas uma por uma e me informe o que está fazendo em cada passo.
Tire um screenshot ANTES e DEPOIS de submeter o formulário.
Se aparecer algum erro ou validação, me mostre exatamente o que está na tela.
```

**O que a IA vai fazer:**

1. Navegar para a página de cadastro
2. Localizar campos por accessibility tree (não por XPath!)
3. Preencher cada campo
4. Submeter o formulário
5. Capturar screenshots
6. Reportar o resultado — sucesso, erro de validação, email de confirmação, etc.

**O que você comenta enquanto acontece:**

> _"Notem que ela está usando o accessibility tree, não seletores CSS.  
> É por isso que o MCP é mais resiliente a mudanças de frontend —  
> se a classe CSS mudar, o label 'Email' continua sendo 'Email'."_

---

### 📍 PROMPT 1.3 — Teste de validação (o caso de erro)

**O que digitar:**

```
Agora tente criar outra conta no devreferencias.com.br
com um email inválido: "isso-nao-e-um-email"
e senha muito curta: "123"

Me diga quais mensagens de erro aparecem e se são claras para o usuário.
Avalie a qualidade do feedback de validação de 1 a 5.
```

**O que a IA vai fazer:**

- Tentar submeter dados inválidos
- Capturar as mensagens de erro
- Analisar a qualidade do UX das mensagens
- Dar uma avaliação

**O que você comenta:**

> _"Isso é teste exploratório + análise de UX em um único prompt.  
> Antes, você precisaria de um QA sênior para opinar sobre a qualidade do feedback.  
> Agora você tem isso como parte do relatório automático."_

---

### 📍 PROMPT 1.4 — ARMADILHA PEDAGÓGICA 🪤 (momento de debate)

**O que digitar (e parar antes de apertar enter):**

```
Use as seguintes credenciais para criar a conta:
- Email: meu.email.real@empresa.com
- Senha: SenhaReal123!
```

**PARE. Não aperte enter.**

**Fala para a plateia:**

> _"Quem aqui percebeu o problema?"_  
> _(esperar respostas)_
>
> _"Acabei de digitar uma credencial real no prompt.  
> Isso vai para o contexto do modelo. Pode aparecer em logs.  
> Pode ser exposto se você usar um cliente cloud.  
> NUNCA coloque credenciais reais no prompt."_

**A versão segura:**

```
Use as credenciais definidas no arquivo .env.staging
(variáveis: APP_USER e APP_PASSWORD)
para fazer login no devreferencias.com.br
```

> _"A IA não precisa ver a senha. Ela só precisa saber onde buscar."_

---

---

# 🔵 DEMO 2 — Análise de Acessibilidade

## Por que acessibilidade é um caso de uso perfeito para MCP

**Fala antes da demo:**

> _"Acessibilidade é uma das áreas mais negligenciadas em QA.  
> Por quê? Porque é trabalhosa, subjetiva, e a maioria do time não sabe por onde começar.  
> MCP + Playwright muda isso. O modelo conhece WCAG. Você só precisa pedir."_

---

### 📍 PROMPT 2.1 — Análise rápida e direta

**O que digitar:**

```
Acesse https://www.fiap.com.br e faça uma análise de acessibilidade da homepage.

Verifique:
1. Imagens têm texto alternativo (alt text)?
2. Os botões têm labels descritivos ou são só ícones sem contexto?
3. A hierarquia de headings (H1, H2, H3) faz sentido?
4. Campos de formulário têm labels associados?
5. O contraste visual parece adequado para as CTAs principais?

Me retorne um relatório no formato:
✅ OK | ⚠️ Atenção | ❌ Problema
Com uma linha de explicação para cada item.
```

**O que a IA vai fazer:**

- Navegar para a FIAP
- Usar o accessibility tree para inspecionar elementos
- Verificar cada critério
- Retornar um relatório estruturado

**O que você comenta:**

> _"O accessibility tree que o MCP usa é o MESMO que leitores de tela como NVDA e JAWS usam.  
> Então quando a IA diz 'esse botão não tem label', um usuário cego também não consegue usar."_

---

### 📍 PROMPT 2.2 — Indo mais fundo num problema específico

**O que digitar (após ver o relatório):**

```
Você mencionou [problema encontrado no relatório anterior].
Pode me mostrar os 3 elementos mais críticos com esse problema?
Para cada um, me diga:
- Onde na página está (header, hero, footer...)
- Qual seria o impacto para um usuário com deficiência visual
- Como deveria ser corrigido

```

**O que você comenta:**

> _"Isso é o ciclo completo de QA de acessibilidade:  
> descoberta → impacto → recomendação.  
> Em 30 segundos, com um prompt."_

---

### 📍 PROMPT 2.3 — Comparação entre páginas

**O que digitar:**

```
Compare a acessibilidade da homepage com a página de contato da FIAP.
Acesse https://www.fiap.com.br/contato

Qual das duas tem melhor score de acessibilidade percebida?
O formulário de contato é acessível? Consigo preencher apenas com teclado?
Tente navegar pelo formulário usando Tab e me diga a experiência.
```

**O que a IA vai fazer:**

- Navegar para a página de contato
- Testar navegação por teclado (via browser_key_press)
- Comparar com a análise anterior
- Dar um parecer

**O que você comenta:**

> _"Teste de navegação por teclado é um dos critérios WCAG 2.1 mais importantes  
> e um dos menos testados. A IA acabou de fazer isso em segundos."_

---

### 📍 PROMPT 2.4 — Screenshot com contexto (evidência)

**O que digitar:**

```
Tire um screenshot da homepage da FIAP e destaque (descreva na resposta)
onde estão os 2 maiores problemas de acessibilidade que você encontrou.
Salve o screenshot como evidencia-acessibilidade-fiap.png
```

**O que você comenta:**

> _"Evidência com contexto. Não é só um print —  
> é um print com uma análise de especialista acoplada.  
> Isso vai direto para o bug report."_

---

---

# 🟡 DEMO 3 — BÔNUS: O Prompt que Gera o Teste Estruturado

> Use isso se sobrar tempo ou se a plateia quiser ver como sair do MCP para código

**Contexto para a plateia:**

> _"Tudo que fizemos até agora foi exploratório — a IA agindo em tempo real.  
> Mas e se eu quiser um teste Playwright tradicional que rode no CI?  
> Eu posso pedir para a IA gerar esse código a partir do que ela explorou."_

**O que digitar:**

```
Com base no que você explorou no devreferencias.com.br,
gere um arquivo Playwright test (.spec.js) que testa o fluxo de criação de conta.

Use os dados do arquivo .env (variáveis: TEST_EMAIL e TEST_PASSWORD).
O teste deve:
1. Navegar para a página de cadastro
2. Preencher o formulário
3. Submeter
4. Verificar que a conta foi criada com sucesso (ou que o erro esperado aparece)
5. Tirar screenshot ao final

Use seletores por role/label, não por CSS ou XPath.
Siga o padrão Playwright com async/await.
```

**O que você comenta:**

> _"O modelo acabou de usar o que explorou para gerar código reproduzível.  
> Esse é o loop completo:  
> exploração via MCP → descoberta → geração de teste estruturado → CI.  
> E notem: pedi seletores por role, não CSS. Por quê?"_
>
> _(esperar resposta da plateia)_
>
> _"Porque role é semântico. É o que o MCP já usa internamente.  
> É mais estável, mais acessível, e mais alinhado com boas práticas WCAG."_

---

---

# 📋 CHEAT SHEET — Padrões de Prompt que Funcionam

## ✅ Padrões que dão bons resultados

```
# 1. EXPLORE ANTES DE AGIR
"Acesse X e me descreva o que vê. NÃO faça nada ainda."

# 2. PASSO A PASSO COM RELATÓRIO
"Faça X, me informando cada etapa. Se algo der errado, pare e me diga."

# 3. CRITÉRIOS EXPLÍCITOS
"Verifique se: 1)... 2)... 3)... Retorne ✅/⚠️/❌ para cada item."

# 4. EVIDÊNCIA OBRIGATÓRIA
"Tire um screenshot antes e depois. Me mostre o conteúdo exato do elemento."

# 5. GUARDRAIL EXPLÍCITO
"NÃO execute nenhuma ação destrutiva sem minha confirmação."

# 6. CREDENCIAIS SEGURAS
"Use as credenciais do .env (variável: APP_USER e APP_PASSWORD)"
```

## ❌ Padrões que geram problemas

```
# Credencial no prompt
"Use email: real@empresa.com senha: MinhaS3nha" ← NUNCA

# Sem guardrail em ambiente sensível
"Delete os registros de teste do banco" ← sem confirmação = risco real

# Prompt vago sem critério de sucesso
"Teste o site" ← a IA vai testar algo, mas você não sabe o quê

# Assumir que "passou" é confiável
Sempre peça evidência — screenshot, conteúdo do elemento, log
```

---

# 🎙️ Frases de ouro para usar durante a demo

> _"A IA não está lendo CSS. Ela está lendo o mesmo tree que um leitor de tela usa."_

> _"Eu não escrevi nenhum seletor. E o teste funcionou."_

> _"Se a página mudar o CSS mas manter o label, o teste continua passando."_

> _"O prompt é o novo código. Ele precisa de revisão, versionamento e cuidado."_

> _"Você não eliminou boas práticas. Você mudou quem as implementa."_

> _"O QA do futuro não escreve menos — ele pensa mais."_

---

# 🚨 Plano B — Se a demo travar

Coisas que podem dar errado e como contornar:

| Problema             | Contorno                                                                     |
| -------------------- | ---------------------------------------------------------------------------- |
| Site lento / timeout | "Isso é real — a IA lida com isso também. Vou aumentar o timeout no config." |
| Site mudou o layout  | "Exatamente o ponto — seletores CSS quebrariam. O accessibility tree não."   |
| IA se perde no fluxo | "Isso acontece. Vou refinar o prompt — prompt engineering é uma skill."      |
| Screenshot não salva | Mostrar o snapshot de acessibilidade no terminal como alternativa            |
| Rate limit da API    | Ter uma sessão gravada previamente como fallback                             |

**Dica:** Grave a demo completa antes da apresentação. Se travar ao vivo, passa o vídeo e comenta em cima.

---

_Arquivo de apoio para apresentação MCP + Playwright_  
_Mantenha aberto no terminal durante a demo_
