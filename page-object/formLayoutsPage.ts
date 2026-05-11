import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    constructor(page:Page) {
        super(page);
        
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
       const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});
       await usingTheGridForm.getByRole('textbox', {name: "email"}).fill(email)
       await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
       await usingTheGridForm.getByLabel('Option 1').check({force: true});
       await usingTheGridForm.getByRole('button').click();   
    }

    //will be displayed in the intelisense when describing the method when used
    /**
     * This method parameters:
     * @param name - first + last name
     * @param email -valid email for test user
     * @param rememberMe -true or false for the session
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
       const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});
       await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
       await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
       
       if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({force: true})
            await inlineForm.getByRole('button').click()
       }
    }     
}