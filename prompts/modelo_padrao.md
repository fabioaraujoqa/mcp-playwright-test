# Modelo Padrão – Boas Práticas e Helper de Evidências

Este arquivo define o **modelo padrão** que deve ser incorporado em todos os testes gerados pelo MCP.  
Ele contém boas práticas comuns e um helper reutilizável para evidências.

---

## Boas Práticas Gerais

### **Validação de Pré-requisitos**

- **Sempre verificar** variáveis de ambiente antes do teste
- **Validar conectividade** com o sistema antes de iniciar
- **Confirmar permissões** do usuário de teste

### **Seletores**

- Priorizar: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`.
- Depois: atributos semânticos estáveis (`[aria-label]`, `[title]`, `[data-*]`).
- Evitar: seletores frágeis como `nth-child`, `div > span`, ou IDs isolados.

- **Regex sempre case-insensitive**
  - Exemplo:
    ```ts
    page.getByRole('button', { name: /entrar/i });
    ```

- **Sincronização**
  - Nunca usar `waitForTimeout`.
  - Sempre usar asserts sincronizados:
    - `toBeVisible`
    - `toHaveURL`
    - `toHaveText`
    - `expect.poll`

- **Clareza nos passos**
  - Cada ação deve estar dentro de um `test.step`.
  - Todo step precisa ter um objetivo verificável (assert ou evidência).

---

## Helper de Evidências (Node + Playwright)

Este helper deve ser **importado no início de cada teste**.  
Ele cria uma pasta de evidências, salva screenshots e anexa no relatório Playwright.

```ts
import * as fs from 'node:fs/promises';

async function createEvidenciaHelper(page, testInfo, sistema = 'geral') {
  const pasta = `tests/evidencias/${sistema}`;
  await fs.mkdir(pasta, { recursive: true });

  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  let seq = 1;

  return async (rotulo: string) => {
    const base = `${String(seq).padStart(2,'0')}-${ts}-${rotulo.replace(/[^a-z0-9-_]/gi,'_')}.png`;
    const file = `${pasta}/${base}`;
    await page.screenshot({ path: file, fullPage: true });
    await testInfo.attach(`evidencia-${String(seq).padStart(2,'0')}-${rotulo}`, {
      path: file,
      contentType: 'image/png'
    });
    seq++;
  };
}

export { createEvidenciaHelper };

---

## 🔄 Fechamento Obrigatório do Navegador

**IMPORTANTE**: Todos os testes devem incluir o fechamento do navegador como etapa final:

### Padrão de Finalização
1. Após completar todos os passos do teste
2. Capturar evidências finais necessárias
3. **Executar** `mcp_playwright_browser_close`
4. **Confirmar** fechamento bem-sucedido

### Benefícios
- Libera recursos do sistema
- Evita interferência entre testes
- Mantém ambiente limpo
- Garante isolamento adequado

**Esta prática deve ser seguida em TODOS os testes sem exceção.**
```
