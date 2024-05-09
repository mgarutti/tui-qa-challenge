import { type Page } from '@playwright/test';

let localStorageContent:number;
let sessionStorageContent:number;

export class UtilsPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

  async clearBrowserSessionAndStorage(page:Page) {
    console.log('Cleaning session and local storage.');
    await page.evaluate(() => window.localStorage.clear());
    localStorageContent = (await page.evaluate(() => window.localStorage.length));
    await page.evaluate(() => window.sessionStorage.clear());
    sessionStorageContent = (await page.evaluate(() => window.sessionStorage.length));
     if ((localStorageContent && sessionStorageContent) === 0 ) {
        console.log('Session and local storage was cleaned successfully.')
     } else {
        console.log('Something went wrong, was not possible to clean session and local storage.')
     }
  }

  async validateIfUserTokenWasProperlyRemoved(page:Page) {
    localStorageContent = (await page.evaluate(() => window.localStorage.length));
     if (localStorageContent === 0) {
        console.log('Token was removed successfully.');
     } else {
        console.log('Something went wrong, token was not removed correctly.');
     }  
  }
    
}