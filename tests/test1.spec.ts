import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  
    //await page.pause();

    // Unregistered user login
    await page.getByPlaceholder('Email').fill('shaked@gmail.com');
    await page.getByPlaceholder('Password').fill('11111A');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Log in Create an account')).toContainText('Password are not correct');

    // The sign-up page
    await page.getByRole('link', { name: 'Create an account' }).click();
    await expect(page).toHaveURL("http://localhost:4200/logIn/signUp");
    
    // Illegal sign-up
    await page.getByPlaceholder('Email').fill('shaked');
    await page.locator('input[name="password"]').fill('111');
    await page.getByPlaceholder('Repeat your password').fill('1');
    await expect(page.locator('form')).toContainText('Email is invalid');
    await expect(page.locator('form')).toContainText('Password length should be at least 6 letters');
    await expect(page.locator('form')).toContainText('Password should contain at least 1 capital letter');
    await expect(page.locator('form')).toContainText('Confirm password should be equal to the password');

    // Legal sign-up
    await page.getByPlaceholder('Email').fill('shaked@gmail.com');
    await page.locator('input[name="password"]').fill('11111A');
    await page.getByPlaceholder('Repeat your password').fill('11111A');
    await page.getByRole('button', { name: 'Register' }).click();

    // Success login
    await expect(page).toHaveURL("http://localhost:4200/logIn");
    await page.getByPlaceholder('Email').fill('shaked@gmail.com');
    await page.getByPlaceholder('Password').fill('11111A');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Products page
    await expect(page).toHaveURL("http://localhost:4200/products");
    await page.getByRole('link', { name: 'Cart' }).click();

    // Cart should be empty
    await expect(page).toHaveURL("http://localhost:4200/cart");
    await expect(page.locator('body')).toContainText('The cart is empty!!');

    // Products page - add products to the cart
    await page.getByRole('link', { name: 'Products' }).click(); 
    await page.getByRole('paragraph').filter({ hasText: 'price: 109.95$ Add' }).getByRole('button', { name: 'Add' }).click();
    await page.getByRole('paragraph').filter({ hasText: 'price: 999.99$ Add' }).getByRole('button', { name: 'Add' }).click();

    // Cart Page
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('body')).toContainText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    await expect(page.locator('body')).toContainText('Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED');
    
    await page.getByRole('row', { name: 'Fjallraven - Foldsack No. 1 Backpack'}).getByRole('button').click();
    await page.getByRole('row', { name: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor'}).getByRole('button').click();
    await expect(page.locator('body')).toContainText('The cart is empty!!');

});