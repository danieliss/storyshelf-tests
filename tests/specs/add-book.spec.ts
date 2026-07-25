import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { MinhaEstantePage } from '../pages/MinhaEstantePage'
import { usuarioTeste } from '../data/testUsers'

test.describe('Adicionar livro', () => {
  let estantePage: MinhaEstantePage

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(usuarioTeste.email, usuarioTeste.password)

    estantePage = new MinhaEstantePage(page)
  })

  test('adicionar livro com ISBN válido exibe o livro na estante', async ({ page }) => {
    const isbn = '6555320354'
  
    await estantePage.adicionarLivro(isbn)
  
    const card = estantePage.livroCard(isbn)
    await expect(card).toBeVisible()
  
    await estantePage.removerLivro(isbn)
    await expect(page.getByTestId(`livro-${isbn}`)).toHaveCount(0)
  })
  
  test('adicionar livro com ISBN inexistente mostra mensagem de erro', async ({ page }) => {
    await estantePage.adicionarLivro('655514444320354')

    await expect(estantePage.erroMensagem).toHaveText('ISBN não encontrado.')
  })
})