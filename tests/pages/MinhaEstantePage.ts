import { Page, Locator } from '@playwright/test'

export class MinhaEstantePage {
  readonly page: Page
  readonly isbnInput: Locator
  readonly adicionarButton: Locator
  readonly erroMensagem: Locator

  constructor(page: Page) {
    this.page = page
    this.isbnInput = page.getByPlaceholder('Digite o ISBN')
    this.adicionarButton = page.getByRole('button', { name: 'Adicionar' })
    this.erroMensagem = page.locator('.erro')
  }

  async goto() {
    await this.page.goto('/estante')
  }

  async adicionarLivro(isbn: string) {
    await this.isbnInput.fill(isbn)
    await this.adicionarButton.click()
  }

  livroCard(isbn: string): Locator {
    return this.page.getByTestId(`livro-${isbn}`)
  }

  async removerLivro(isbn: string) {
    const card = this.livroCard(isbn)
    await card.getByRole('button', { name: 'Remover' }).click()
  }
}