const { test, expect } = require('@playwright/test');
const { createEvidenciaHelper } = require('../helpers/evidencia-helper');

/**
 * Testes do Formulário de Contato - Hub de Leitura
 * URL: https://hub-de-leitura.vercel.app/
 *
 * Testa o preenchimento e envio do formulário de contato da página
 */

const BASE_URL = process.env.HUB_BASE_URL || 'https://hub-de-leitura.vercel.app';
const CONTACT_FORM_LOCATORS = {
  form: 'form#contactForm',
  nameInput: 'input[name="name"]',
  emailInput: 'input[name="email"]',
  subjectSelect: 'select[name="subject"]',
  messageTextarea: 'textarea[name="message"]',
  submitButton: 'button[type="submit"]',
};

test.describe('Formulário de Contato - Hub de Leitura', () => {
  test.beforeEach(async ({ page }) => {
    /**
     * Navegação inicial para a página de contato
     * Rola para a seção de contato usando a âncora #contact
     */
    await page.goto(`${BASE_URL}/`);

    // Aguardar carregamento da página
    await page.waitForLoadState('domcontentloaded');

    // Scroll para a seção de contato
    const contactSection = page.locator('[id*="contact"], section:has(form)').first();
    await contactSection.scrollIntoViewIfNeeded();
  });

  test('Deve validar que o formulário está visível na página', async ({ page }) => {
    /**
     * Valida que o formulário de contato existe e está visível
     */
    const form = page.locator(CONTACT_FORM_LOCATORS.form);
    await expect(form).toBeVisible();

    // Validar que todos os campos obrigatórios estão visíveis
    await expect(page.locator(CONTACT_FORM_LOCATORS.nameInput)).toBeVisible();
    await expect(page.locator(CONTACT_FORM_LOCATORS.emailInput)).toBeVisible();
    await expect(page.locator(CONTACT_FORM_LOCATORS.subjectSelect)).toBeVisible();
    await expect(page.locator(CONTACT_FORM_LOCATORS.messageTextarea)).toBeVisible();
  });

  test('Deve preencher o formulário com dados válidos', async ({ page }, testInfo) => {
    /**
     * Preenche todos os campos do formulário com dados válidos
     * Campos preenchidos:
     * - Nome: João Silva
     * - Email: joao.silva@email.com
     * - Assunto: Sugestões
     * - Mensagem: Mensagem de contato completa
     */
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'hub-leitura');
    const nameInput = page.locator(CONTACT_FORM_LOCATORS.nameInput);
    await nameInput.click();
    await nameInput.fill('João Silva');
    await expect(nameInput).toHaveValue('João Silva');

    // Preencher campo de email
    const emailInput = page.locator(CONTACT_FORM_LOCATORS.emailInput);
    await emailInput.click();
    await emailInput.fill('joao.silva@email.com');
    await expect(emailInput).toHaveValue('joao.silva@email.com');

    // Selecionar assunto
    const subjectSelect = page.locator(CONTACT_FORM_LOCATORS.subjectSelect);
    await subjectSelect.selectOption('Sugestões');
    await expect(subjectSelect).toHaveValue('Sugestões'); // Validar que foi selecionado

    // Preencher mensagem
    const messageTextarea = page.locator(CONTACT_FORM_LOCATORS.messageTextarea);
    await messageTextarea.click();
    await messageTextarea.fill(
      'Gostaria de mais informações sobre seus livros e serviços de leitura digital. Adorei a plataforma!',
    );
    await expect(messageTextarea).toHaveValue(
      'Gostaria de mais informações sobre seus livros e serviços de leitura digital. Adorei a plataforma!',
    );

    // Capturar evidência do formulário preenchido
    await tiraFoto('formulario_preenchido');
  });

  test('Deve validar placeholders dos campos do formulário', async ({ page }) => {
    /**
     * Verifica que os placeholders estão configurados corretamente
     * para guiar o usuário no preenchimento
     */

    await expect(page.locator(CONTACT_FORM_LOCATORS.nameInput)).toHaveAttribute(
      'placeholder',
      'Seu nome completo',
    );

    await expect(page.locator(CONTACT_FORM_LOCATORS.emailInput)).toHaveAttribute(
      'placeholder',
      'Seu e-mail',
    );

    await expect(page.locator(CONTACT_FORM_LOCATORS.messageTextarea)).toHaveAttribute(
      'placeholder',
      'Escreva sua mensagem...',
    );
  });

  test('Deve validar que o campo email aceita formato correto', async ({ page }) => {
    /**
     * Verifica que o campo email é do tipo email (HTML5 validation)
     */

    const emailInput = page.locator(CONTACT_FORM_LOCATORS.emailInput);
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('Deve validar opções do dropdown de assunto', async ({ page }) => {
    /**
     * Valida que o dropdown possui todas as opções esperadas:
     * - Selecione o assunto...
     * - Dúvidas Gerais
     * - Suporte Técnico
     * - Sugestões
     * - Parcerias
     */

    const subjectSelect = page.locator(CONTACT_FORM_LOCATORS.subjectSelect);
    const options = subjectSelect.locator('option');

    // Contar opções
    await expect(options).toHaveCount(5);

    // Validar textos das opções
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toContain('Selecione o assunto...');
    expect(optionTexts).toContain('Dúvidas Gerais');
    expect(optionTexts).toContain('Suporte Técnico');
    expect(optionTexts).toContain('Sugestões');
    expect(optionTexts).toContain('Parcerias');
  });

  test('Deve preencher e validar cada campo individualmente', async ({ page }, testInfo) => {
    /**
     * Realiza validações passo a passo do preenchimento
     * com capturas de evidência entre cada passo
     */
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'hub-leitura');

    // Step 1: Preencher nome
    await test.step('Preencher campo Nome', async () => {
      const nameInput = page.locator(CONTACT_FORM_LOCATORS.nameInput);
      await nameInput.fill('Maria Santos');
      await expect(nameInput).toHaveValue('Maria Santos');
      await tiraFoto('step01_nome_preenchido');
    });

    // Step 2: Preencher email
    await test.step('Preencher campo E-mail', async () => {
      const emailInput = page.locator(CONTACT_FORM_LOCATORS.emailInput);
      await emailInput.fill('maria.santos@gmail.com');
      await expect(emailInput).toHaveValue('maria.santos@gmail.com');
      await tiraFoto('step02_email_preenchido');
    });

    // Step 3: Selecionar assunto
    await test.step('Selecionar Assunto', async () => {
      const subjectSelect = page.locator(CONTACT_FORM_LOCATORS.subjectSelect);
      await subjectSelect.selectOption('Dúvidas Gerais');
      await tiraFoto('step03_assunto_selecionado');
    });

    // Step 4: Preencher mensagem
    await test.step('Preencher Mensagem', async () => {
      const messageTextarea = page.locator(CONTACT_FORM_LOCATORS.messageTextarea);
      await messageTextarea.fill(
        'Tenho algumas dúvidas sobre como funciona o empréstimo de livros digitais. Pode me ajudar?',
      );
      await expect(messageTextarea).toHaveValue(
        'Tenho algumas dúvidas sobre como funciona o empréstimo de livros digitais. Pode me ajudar?',
      );
      await tiraFoto('step04_mensagem_preenchida');
    });
  });

  test('Deve validar que botão de envio está habilitado', async ({ page }) => {
    /**
     * Verifica que o botão de envio está visível e habilitado
     */

    const submitButton = page.locator(CONTACT_FORM_LOCATORS.submitButton);
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    // Validar texto do botão
    await expect(submitButton).toContainText('Enviar Mensagem');
  });

  test('Deve simular envio do formulário (sem validação de backend)', async ({
    page,
  }, testInfo) => {
    /**
     * Preenche todos os campos e clica no botão de envio
     * Nota: Este teste não valida a resposta do backend,
     * apenas que o formulário pode ser submetido
     */
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'hub-leitura');

    // Preencher campos
    await page.locator(CONTACT_FORM_LOCATORS.nameInput).fill('Carlos Oliveira');
    await page.locator(CONTACT_FORM_LOCATORS.emailInput).fill('carlos@email.com');
    await page.locator(CONTACT_FORM_LOCATORS.subjectSelect).selectOption('Parcerias');
    await page
      .locator(CONTACT_FORM_LOCATORS.messageTextarea)
      .fill('Estou interessado em uma parceria com sua plataforma!');

    // Capturar formulário preenchido antes de enviar
    await tiraFoto('antes_do_envio');

    // Clique no botão de envio
    const submitButton = page.locator(CONTACT_FORM_LOCATORS.submitButton);
    await submitButton.click();

    // Aguardar processamento e resposta da submissão
    await page.waitForLoadState('domcontentloaded');
    // Validar que a página continua acessível após o envio
    await expect(page).not.toHaveURL(/error|404|500/);
    // Capturar após envio
    await tiraFoto('apos_envio');
  });

  test('Deve testar diferentes combinações de assuntos', async ({ page }, testInfo) => {
    /**
     * Testa a seleção de diferentes assuntos e captura evidências
     */
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'hub-leitura');

    const subjects = ['Dúvidas Gerais', 'Suporte Técnico', 'Sugestões', 'Parcerias'];

    const nameInput = page.locator(CONTACT_FORM_LOCATORS.nameInput);
    const emailInput = page.locator(CONTACT_FORM_LOCATORS.emailInput);
    const subjectSelect = page.locator(CONTACT_FORM_LOCATORS.subjectSelect);
    const messageTextarea = page.locator(CONTACT_FORM_LOCATORS.messageTextarea);

    for (const subject of subjects) {
      await test.step(`Testar assunto: ${subject}`, async () => {
        // Limpar formulário
        await nameInput.clear();
        await emailInput.clear();
        await messageTextarea.clear();

        // Preencher novamente
        await nameInput.fill(`Teste ${subject}`);
        await emailInput.fill(`teste.${subject.toLowerCase().replace(/\s/g, '')}@email.com`);
        await subjectSelect.selectOption(subject);
        await messageTextarea.fill(`Teste de contato para: ${subject}`);

        // Validar seleção
        const selectedText = await subjectSelect.locator('option:checked').textContent();
        expect(selectedText).toContain(subject);

        await tiraFoto(`assunto_${subject.replace(/\s/g, '_')}`);
      });
    }
  });

  test('Deve validar comportamento do formulário ao focar nos campos', async ({
    page,
  }, testInfo) => {
    /**
     * Testa interações de foco (focus) e desfoque (blur) dos campos
     */

    const nameInput = page.locator(CONTACT_FORM_LOCATORS.nameInput);

    // Focar no campo
    await nameInput.focus();

    // Validar que tem classe ou atributo de foco
    await expect(nameInput).toBeFocused();

    // Preencher enquanto focado simulando digitação real
    await nameInput.pressSequentially('João da Silva', { delay: 100 });

    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'hub-leitura');
    await tiraFoto('campo_em_foco');
  });
});
