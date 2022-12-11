import { test, expect } from '@playwright/test';

test('test2', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  
    //await page.pause();

    // Unregistered user login
    await page.getByPlaceholder('Email').fill('asdfg@asdf.co');
    await page.getByPlaceholder('Password').fill('1234');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Log in Create an account')).toContainText('Password are not correct');

    // The sign-up page
    await page.getByRole('link', { name: 'Create an account' }).click();
    await expect(page).toHaveURL("http://localhost:4200/logIn/signUp");
    
    // Illegal sign-up
    await page.getByPlaceholder('Email').fill('asdfg@asdf');
    await page.locator('input[name="password"]').fill('1111111');
    await page.getByPlaceholder('Repeat your password').fill('1111111');
    await expect(page.locator('form')).toContainText('Email is invalid');
    await expect(page.locator('form')).toContainText('Password should contain at least 1 capital letter');

    // Illegal sign-up2
    await page.getByPlaceholder('Email').fill('asdf@.co');
    await page.locator('input[name="password"]').fill('AA');
    await expect(page.locator('form')).toContainText('Email is invalid');
    await expect(page.locator('form')).toContainText('Password length should be at least 6 letters');
    await expect(page.locator('form')).toContainText('Confirm password should be equal to the password');

    // Legal sign-up
    await page.getByPlaceholder('Email').fill('asdfg@asdf.co');
    await page.locator('input[name="password"]').fill('AAAAAA');
    await page.getByPlaceholder('Repeat your password').fill('AAAAAA');
    await page.getByRole('button', { name: 'Register' }).click();

    // Success login
    await expect(page).toHaveURL("http://localhost:4200/logIn");
    await page.getByPlaceholder('Email').fill('asdfg@asdf.co');
    await page.getByPlaceholder('Password').fill('AAAAAA');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Products page
    await expect(page).toHaveURL("http://localhost:4200/products");
    await page.getByRole('link', { name: 'Products' }).click(); 
    await page.getByRole('paragraph').filter({ hasText: 'price: 168$ Add' }).getByRole('button', { name: 'Add' }).click();

    // Cart Page
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('body')).toContainText('Solid Gold Petite Micropave');
    
    await page.getByRole('row', { name: 'Solid Gold Petite Micropave'}).getByRole('button').click();
    await expect(page.locator('body')).toContainText('The cart is empty!!');

});