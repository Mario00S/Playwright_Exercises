import { Locator, Page } from "@playwright/test";

export class NavigationPage {

    //One idea how this can be structured, but with many locators and adding multiple lines of code
    //the POM might become dificult to navigate
    // Keeping it simple might be good for debuggin and fixing issues inside of the methods and avoid adding more complexitiy by introducing locators
    //property
    readonly page : Page;
    readonly formLayoutMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTabMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly toolTipMenuItem: Locator

    //constructor
    constructor(page: Page) {
        this.page = page
        this.formLayoutMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTabMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.toolTipMenuItem = page.getByText('Tooltip')
        
    }

    //this is a method
    async formLayoutsPage()  {
    await this.selectGroupMenuItem('Forms')
    await this.formLayoutMenuItem.click();        
    }

    async datePickerPage(){
    await this.selectGroupMenuItem('Forms')
    // await this.page.waitForTimeout(1000)
    await this.datePickerMenuItem.click();    
    }

    async smartTablePage(){
    await this.selectGroupMenuItem('Tables & Data')
    await this.smartTabMenuItem.click()
    }

    async toastrPage(){
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.toastrMenuItem.click();    
    }

    async tooltipPage(){
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.toolTipMenuItem.click();   
    }
    //methods

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        //condition inside the method
        if (expandedState == 'false') {
            await groupMenuItem.click();
        }
    }
}