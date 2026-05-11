import {test, expect  } from '@playwright/test';
import { PageManager } from "../page-object/pageManager";
import {NavigationPage} from '../page-object/navigationPage'
import { FormLayoutsPage } from "../page-object/formLayoutsPage";
import { DatePickerPage } from "../page-object/datePickerPage";


test.beforeEach(async ({page})=>
{
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page})=>{
    const pm = new PageManager(page)    
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()

})

test('parameterized methods', async ({page}) =>
{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'welcome1', 'option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true);
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(6, 15)
})