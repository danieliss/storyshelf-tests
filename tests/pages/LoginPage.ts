import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly erroMensagem: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.getByPlaceholder('Email')
    this.passwordInput = page.getByPlaceholder('Senha')
    this.submitButton = page.getByRole('button', { name: 'Entrar' })
    this.erroMensagem = page.locator('.erro')
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}