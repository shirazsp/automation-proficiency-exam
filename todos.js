const SeleniumInfra = require('./seleniumInfra');
const seleniumInfra = new SeleniumInfra();

class TodosPage {
    constructor(URL) {
        seleniumInfra.getURL(URL);
    }

    async insertAndDelete(todoText) {
        try {
            await seleniumInfra.write(todoText, "id", "todo-input"); // insert todoText to the input field
            await seleniumInfra.clickElement("id", "addToDo"); // click the Add button

            let isExists = await seleniumInfra.isElementExists("xpath", "/html/body/div[2]/div"); // check if the new div was added
            if (isExists) { // if the new div was added
                console.log("found a new div");
                let divText = await seleniumInfra.getTextFromElement("xpath", "/html/body/div[2]/div"); // find the text of the new div
                if (divText === todoText) { // check if the new div has the same text like todoText
                    console.log("New div has the same text");
                }
                else {
                    console.log("Error: New div does not has the same text");
                }
            }
            else { // if the new div was NOT added
                console.log("Error: Can’t find a new div");
            }

            await seleniumInfra.clickElement("xpath", "/html/body/div[2]/div/span[2]/i"); // click the delete (red) button

            isExists = await seleniumInfra.isElementExists("xpath", "/html/body/div[2]/div"); // check if the new div is still exists
            if (isExists) { // if the div was Not deleted
                console.log("the div was not deleted");
            }
            else { // if the div was deleted
                console.log("the div was deleted");
            }
            console.log(`Add "${todoText}" and then delete it's div`); // try message
        }
        catch (error) {
            console.error(`Got error while trying to add "${todoText}" and then delete it's div`); // catch message
            console.log(error);
        }
    }

    async insertAndComplete(todoText) {
        try {
            await seleniumInfra.write(todoText, "id", "todo-input"); // insert todoText to the input field
            await seleniumInfra.clickElement("id", "addToDo"); // click the Add button

            let newDiv = await seleniumInfra.findElementBy("xpath", "/html/body/div[2]/div"); // find the new div that was inserted
            if (newDiv) { // the new div was found
                console.log("found a new div");
            }
            else { // the new div was Not found
                console.log("Error: Can’t find a new div");
            }

            await seleniumInfra.clickElement("xpath", "/html/body/div[2]/div/i"); // click the “check” (green) button

            await seleniumInfra.driver.sleep(3000);

            // // solution #1 for check validation:
            // let newDivClasses = await seleniumInfra.findElementListBy("className", "complete");
            // if (newDivClasses[0] == newDiv){
            //     console.log("the new div was checked");
            // }
            // else { // the div was Not checked
            //     console.log("Error: the new div was NOT checked");
            // }

            // solution #2 for check validation:
            let wasChecked = newDiv.classList.contains("complete"); // check if the div was checked
            if (wasChecked) { // the div was checked
                console.log("the new div was checked");
            }
            else { // the div was Not checked
                console.log("Error: the new div was NOT checked");
            }

            console.log(`Insert "${todoText}" and then complete it`);
        }
        catch (error) {
            console.error(`Got error while trying to insert "${todoText}" and then complete it`);
            console.log(error);
        }
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        try {
            await seleniumInfra.write(todoText1, "id", "todo-input"); // insert todoText1 to the input field
            await seleniumInfra.clickElement("id", "addToDo"); // click the Add button

            let firstDiv = await seleniumInfra.findElementBy("xpath", "/html/body/div[2]/div"); // find the first div that was inserted
            if (firstDiv) { // the first div was found
                console.log("found a new div");
            }
            else { // the first div was NOT found
                console.log("Error: Can’t find a new div");
            }

            await seleniumInfra.write(todoText2, "id", "todo-input"); // insert todoText2 to the input field
            await seleniumInfra.clickElement("id", "addToDo"); // click the Add button

            let secondDiv = await seleniumInfra.findElementBy("xpath", "/html/body/div[2]/div[2]"); // find the second div that was inserted
            if (secondDiv) { // the second div was found
                console.log("found a new div");
            }
            else { // the second div was NOT found
                console.log("Error: Can’t find a new div");
            }

            await seleniumInfra.clickElement("xpath", "/html/body/div[2]/div/span[2]/i"); // click the delete (red) button on the first task
            let firstDivText = await seleniumInfra.getTextFromElement("xpath", "/html/body/div[2]/div"); // get the test of the current first div
            if (firstDivText === todoText1) { // todoText1 is the text of the first div
                console.log("Error: the first div was NOT deleted");
            }
            else { // todoText1 is NO LONGER the text of the first div
                console.log("the first div was deleted");
            }
            console.log(`Insert "${todoText1}" and "${todoText2}" and then delete the first div`);
        }
        catch (error) {
            console.error(`Got error while trying to insert "${todoText1}" and "${todoText2}" and then delete the first div`);
            console.log(error);
        }
    }
}

module.exports = TodosPage;