// This function is created to exctract only numbers from using string
export function extractNumberFromStr(str) {
    const match = str.match(/\$([\d.]+)/);
    let number;
    if (match) {
        const numberString = match[1];
        number = parseFloat(numberString);
    }
    return number;
}

// This method is created to generate random unic indexes
export function arrayOfRandomItemIndex(numberOfItemsOnPage) {
    const randomItemIndex = [];
    // Create an array of random item indexes from 0 to the index of the last item on the page
    for (let i = 0; i < numberOfItemsOnPage; i += 1) {
        const randomItem = Math.floor(Math.random() * numberOfItemsOnPage);
        randomItemIndex.push(randomItem);
    }
    // Exctract only unic numbers from received array
    const unicRandomIndex = [...new Set(randomItemIndex)];
    // Return array of random idexes and sort them from High to Low to add all of them
    // where element in array is index of product on page and length - quantity of added products
    return unicRandomIndex.sort((a, b) => b - a);
}
