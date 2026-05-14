import { test, expect } from '@playwright/test';

test('has title and can enter api key', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AgentMesh/);

  // Check if API key input exists
  const apiKeyInput = page.locator('input[placeholder*="Enter Gemini API Key"]');
  await expect(apiKeyInput).toBeVisible();

  // Check for preset topics
  const topicButton = page.locator('button:has-text("REST vs GraphQL")');
  await expect(topicButton).toBeVisible();
});

test('start button is disabled without api key', async ({ page }) => {
  await page.goto('/');
  const startBtn = page.locator('button:has-text("Run Debate")');
  await expect(startBtn).toBeDisabled();
});
