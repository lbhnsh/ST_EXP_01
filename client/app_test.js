import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'assert';

async function runTests() {
    const driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        // Test 1: Display Student Details
        await driver.get('http://localhost:5173/');
        const tableRows = await driver.findElements(By.tagName('tr'));

        // Assuming the table header is also a <tr> element
        assert.strictEqual(
            tableRows.length > 1,
            true,
            `Table should have rows. Found: ${tableRows.length}`
        );

        await driver.sleep(1000); // Just a small pause

        // Test 2: Add a New Student
        await driver.findElement(By.id('name')).sendKeys('Monkey D Luffy');
        await driver.findElement(By.id('course')).sendKeys('Math');
        await driver.findElement(By.id('fee')).sendKeys('1000');
        await driver.findElement(By.id('mobile')).sendKeys('1234567890');
        await driver.findElement(By.id('registerBtn')).click();

        // Handle registration alert
        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert().accept();

        await driver.sleep(1000); // Optional pause

        // Test 3: Edit a Student
        await driver
            .findElement(
                By.xpath(
                    '//td[text()="Monkey D Luffy"]/following-sibling::td/button[text()="Edit"]'
                )
            )
            .click();

        await driver.findElement(By.id('course')).clear();
        await driver.findElement(By.id('course')).sendKeys('Physics');
        await driver.findElement(By.id('updateBtn')).click();

        // Handle update alert
        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert().accept();

        await driver.sleep(1000); // Optional pause

        // Test 4: Delete a Student
        await driver
            .findElement(
                By.xpath(
                    '//td[text()="Monkey D Luffy"]/following-sibling::td/button[text()="Delete"]'
                )
            )
            .click();

        // Handle delete alert
        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert().accept();

        await driver.sleep(1000); // Optional pause

        console.log('All tests passed successfully.');

    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await driver.quit();
    }
}

// Run the tests
runTests();
