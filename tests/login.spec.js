import { test, expect } from '@playwright/test';

import { obterCodigo2FA } from '../support/db';

import { LoginPage } from '../pages/LoginPage';

test('Nao deve logar quando o codigo de autenticacao e invalido', async ({ page }) => {
  const loginPage = new LoginPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.acessaPagina();
  await loginPage.preencherCPF(usuario.cpf)
  await loginPage.preencherSenha(usuario.senha)
  await loginPage.preencherCodigo2FA('123456') // Código inválido

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar a conta do usuario', async ({ page }) => {

  const loginPage = new LoginPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.acessaPagina();
  await loginPage.preencherCPF(usuario.cpf)
  await loginPage.preencherSenha(usuario.senha)
  
  //temporario
  await page.waitForTimeout(4000)
  const code = await obterCodigo2FA()

  await loginPage.preencherCodigo2FA(code)  
  //temporario
  await page.waitForTimeout(2000)

  expect(await loginPage.obterSaldo()).toHaveText('R$ 5.000,00')
 
});