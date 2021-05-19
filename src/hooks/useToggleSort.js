import { useState } from 'react';

const useToggleSort = (initialValue = null) => {

    const [toggleValue, setToggleValue] = useState(initialValue);

    const onToggleHandler = (value) => {
        if (value) {
            setToggleValue(value);
        } else {
            setToggleValue(toggleValue === 'asc' ? 'desc' : 'asc');
        }
    }

    return [toggleValue, onToggleHandler];
}

export default useToggleSort;