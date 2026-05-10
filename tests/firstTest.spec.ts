import {expect, test} from '@playwright/test'

// test.beforeAll(() =>
// {

// })

// using hooks to remove duplication
test.beforeEach(async ({page}) =>
{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('locator synatx rules', async ({page}) =>
{
    //Locator by tag name
    page.locator('input').first().click();

    //by id
    page.locator('#inputEmail1');

    //by class
    page.locator('.shape-rectangle ');

    //by atribute
    page.locator('[placeholder="Email"]');

    //by entire class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    //combine different selectors
    page.locator('input[placeholder="Email"] [nbinput]')

    //by xPath -- not recomended
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match   
    page.locator('text-is("Using the Grid")')
});

test("User facing locators", async ({page}) =>{
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "Sign in"}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();

    //mnogu bitno ako moze da go pisuvame kodot nie:
    //<button data-testid="SignIn" type="submit" nbButton status="primary">Sign in</button>
    // ova e rezervirano za playwright data-testid="SignIn"
    await page.getByTestId('SignIn').click();

    await page.getByTitle('IoT Dashboard').click();
});

test('locating child elements', async ({page}) =>
{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")');

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();

    //try avoiding selecting elements by index
    await page.locator("nb-card").nth(3).getByRole('button').click();
})

test('locating parent elements', async ({page}) =>
{
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"Password"}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click();

    await page.locator(':text-is("Using the Grid")').locator('..')
    .getByRole('textbox', {name: "Email"}).click();
})

test('reusing the locators', async ({page}) =>
{
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicForm.getByRole('textbox', {name: "Email"});

    await emailField.fill('test@test.com');
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com');
})

test('extracting values', async ({page}) =>
{
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const buttonText = await basicForm.locator('button').textContent();
    expect (buttonText).toEqual('Submit');

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonsLabels).toContain('Option 1');

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect (emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    console.log(expect(placeholderValue).toEqual('Email'))
})


test('assertions', async ({page}) =>
{
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
    //general assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion -- this is a locator assertion so we need to provide await
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion -- if the value is for e.g. Submit5 the test will continue regardless of that the step is failing
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click();
})


/*
Rarely used
test.afterAll(() =>{})
test.afterEach(() =>{})
*/