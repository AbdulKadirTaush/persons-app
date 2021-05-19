import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchPersons } from '../store/actions/persons';

const useFetchAfterTimeout = (input, inputRef, modifiedParams, inputName) => {
    const dispatch = useDispatch();
    const FETCH_TIMEOUT = 1000;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (input === inputRef.current.value) {
                modifiedParams[inputName] = input;
                dispatch(dispatchPersons(modifiedParams));
            }
        }, FETCH_TIMEOUT)

        return () => {
            clearInterval(timer);
        }
    }, [input, inputRef])
}

export default useFetchAfterTimeout;