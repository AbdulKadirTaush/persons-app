import { useState } from 'react';

const useInputField = (initialValue = '') => {

    const [inputValue, setInputValue] = useState(initialValue)
    const onChangeHandler = (event) => {
        setInputValue(event.target.value)
    }

    const onResetHandler = () => {
        setInputValue('')
    }

    return [inputValue, onChangeHandler, onResetHandler];

}

export default useInputField