import { useState } from 'react'

const useAgeInputField = (initialValue = '') => {

    const [inputValue, setInputValue] = useState(initialValue)
    const onChangeHandler = (event) => {
        if (event.target.value.length > 0 &&
            event.target.value.length < 4) {
            setInputValue(Math.abs(event.target.value).toString());
        } else {
            onResetHandler();
        }
    }

    const onResetHandler = () => {
        setInputValue('')
    }

    return [inputValue, onChangeHandler, onResetHandler];

}

export default useAgeInputField;