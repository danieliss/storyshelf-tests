import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { usuarioTeste } from '../data/testUsers'

test.describe('Autenticação', () => {
  test('login com credenciais válidas redireciona para a estante', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login(usuarioTeste.email, usuarioTeste.password)

    await expect(page).toHaveURL(/\/estante/)
    await expect(page.getByRole('heading', { name: 'Minha Estante' })).toBeVisible()
  })

  test('login com credenciais inválidas mostra mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('email-invalido@teste.com', 'senhaErrada123')

    await expect(loginPage.erroMensagem).toBeVisible()
    await expect(loginPage.erroMensagem).toHaveText('Email ou senha inválidos.')
    await expect(page).toHaveURL(/\/login/)
  })
})