import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db.js';
import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis.js';


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
  const dashPage = new DashPage(page)


  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  // Limpar a fila de jobs antes do teste
  await cleanJobs()

  await loginPage.acessaPagina();
  await loginPage.preencherCPF(usuario.cpf)
  await loginPage.preencherSenha(usuario.senha)
  
  await page.getByRole('heading', { name: 'Verificação em duas etapas' })
    .waitFor({ timeout: 3000});

  const codigo = await getJob()
  
  //await page.waitForTimeout(4000)
  //const code = await obterCodigo2FA()

  await loginPage.preencherCodigo2FA(codigo)  
  
  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00')
//await expect(await dashPage.obterSaldo()).toContainText('R$ 5.000,00')
});