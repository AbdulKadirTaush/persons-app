import React, { useEffect, useState, useCallback } from 'react';
import classes from './AddPersonForm.module.css';
import { dispatchPerson } from '../../store/actions/persons';
import { useDispatch, useSelector } from 'react-redux';
import { relationshipStatusObj } from '../../misc/relationshipStatus';
import { getOptionsByObj, inputHasError, inputIsEmpty } from '../../helpers/helpers';
import useInputField from '../../hooks/useInputField';
import useAgeInputField from '../../hooks/useAgeInputField';

const inputFieldWarning = (warningString) => {
    return <p
        className={classes['AddPersonForm-paragraph-warning']}>
        {`Please ${warningString} a value`}
    </p>
}

const AddPersonForm = () => {
    const resetInputFields = useCallback(() => {
        resetName();
        resetAge();
        resetRelationshipStatus();
    }, []);

    const [nameHasError, setNameHasError] = useState(false);
    const [ageHasError, setAgeHasError] = useState(false);
    const [relationshipStatusHasError, setRelationshipStatusHasError] = useState(false);

    const [name, setName, resetName] = useInputField('');
    const [age, setAge, resetAge] = useAgeInputField('');
    const [relationshipStatus, setRelationshipStatus, resetRelationshipStatus] = useInputField('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.persons.isLoading);

    useEffect(() => {
        resetInputFields();
    }, [resetInputFields])

    let content = getOptionsByObj(relationshipStatusObj)

    const onSubmitHandler = (event) => {
        event.preventDefault();

        inputIsEmpty(name) ? setNameHasError(true) : setNameHasError(false);
        inputIsEmpty(age) ? setAgeHasError(true) : setAgeHasError(false);
        inputIsEmpty(relationshipStatus) ? setRelationshipStatusHasError(true) : setRelationshipStatusHasError(false);
        if (inputHasError(name, age, relationshipStatus)) {
            return;
        }
        else {
            const personObj = {
                name: name,
                age: +age,
                relationshipStatus: relationshipStatus
            }
            dispatch(dispatchPerson(personObj));
            resetInputFields();
        }
    }

    return (
        <div className={classes.AddPersonForm}>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="name">Name</label>
                <input
                    disabled={isLoading}
                    value={name}
                    onChange={setName}
                    maxLength={200}
                    className={classes['AddPersonForm-input']}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Person's name"
                    style={{
                        borderColor: nameHasError ? 'red' : 'black'
                    }} />
                {nameHasError ? inputFieldWarning('enter') : null}
                <label htmlFor="age">Age</label>
                <input
                    onChange={setAge}
                    value={age}
                    disabled={isLoading}
                    min={0}
                    className={classes['AddPersonForm-input']}
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Person's age"
                    style={{
                        borderColor: ageHasError ? 'red' : 'black'
                    }}
                />
                {ageHasError ? inputFieldWarning('enter') : null}
                <label htmlFor="relationship-status">Relationship status</label>
                <select
                    value={relationshipStatus}
                    onChange={setRelationshipStatus}
                    disabled={isLoading}
                    className={classes['AddPersonForm-input']}
                    id="relationship-status"
                    name="relationship-status"
                    style={{
                        borderColor: relationshipStatusHasError ? 'red' : 'black'
                    }}>
                    <option value=''></option>
                    {content}
                </select>
                {relationshipStatusHasError ? inputFieldWarning('select') : null}
                <p
                    className={classes['AddPersonForm-paragraph']}
                >All fields are mandatory
                </p>
                <button
                    disabled={isLoading}
                    type='submit'
                    className={classes['AddPersonForm-button']}>
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    )
}

export default AddPersonForm;