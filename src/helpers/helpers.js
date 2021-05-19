
export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

export const getOptionsByObj = (optionsObj) => {
    let content = [];

    for (let key in optionsObj) {
        content.push(
            <option key={key} value={optionsObj[key]}>
                {key}
            </option>
        )
    }
    return content;
}

export const ageIsValid = (age) => {
    return (age >= 0 && age <= 150) ? true : false;
}

export const inputHasError = (...args) => {
    let flag = false;
    args.forEach(input => {
        if (!input.length) {
            flag = true;
        }
    })
    return flag;
}

export const inputIsEmpty = (input) => {
    return input.length === 0 ? true : false;
}

export const resetInputFields = (...resetFunctions) => {
    resetFunctions.forEach(resetFunction => {
        resetFunction();
    })
}