const selectors = require('../selectors');
const changeTextInput = require('./changeTextInput');

async function fillTextFields(page, textFields) {
    const inputs = await page.$$(selectors.textInput);

    for(const input of inputs) {
        const id = await input.evaluate(el => el.id);
        const label = await page.$eval(`label[for="${id}"]`, el => el.innerText).catch(() => "");

        for(const [labelRegex, value] of Object.entries(textFields)) {
            if(new RegExp(labelRegex, "i").test(label)) {
                await changeTextInput(input, "", value.toString());
            }
        }
    }
}

module.exports = fillTextFields;
