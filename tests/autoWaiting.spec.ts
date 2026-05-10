import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}, testinfo) =>
{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click();
    testinfo.setTimeout(testinfo.timeout + 2000)
})

test('auto waiting', async ({page}) =>{
    const successButton = page.locator('.bg-success')

    await successButton.click()

    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()


    // const text = await successButton.textContent()


    // expect(text).toEqual('Data loaded with AJAX get request.')
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});
})

test('alternative waits', async ({page}) =>
{
    const successButton = page.locator('.bg-success')

    //wait for element
    await page.waitForSelector('.bg-success');

    //wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be completed ('not recomended')
    //if some of the api calls are stuck the test may fail, and those api calls might not be important for that case
    await page.waitForLoadState('networkidle')

    //not recomended as well
    await page.waitForTimeout(5000)

    const text = await successButton.textContent()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test('timeouts', async ({page}) =>
{
    // test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')

    //wait for element
    await successButton.click({timeout: 160000});
})