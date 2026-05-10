import {test, expect} from '@playwright/test'

// test('drag and drop with iFrame', async ({page})=>
// {
//     await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

//     const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

//     await frame.locator('.li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'));
// })

test('drag and drop with iframe', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
  const photo = frame.locator('li', { hasText: 'High Tatras 2' });
  const trash = frame.locator('#trash');

  await photo.dragTo(trash);

  await expect(trash).toContainText('High Tatras 2');

  //more precise control
  await frame.locator('li', { hasText: 'High Tatras 4' }).hover();
  await page.mouse.down()
  await trash.hover()
  await page.mouse.up();

  await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
});