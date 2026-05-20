import {test,expect} from '@playwright/test'

test("verify ndosi automation title",async({page})=>{

    await page.goto("https://ndosisimplifiedautomation.vercel.app/")

    await expect(page).toHaveTitle("Ndosi Test Automation")
    
})