import React, { useEffect, useRef } from 'react';
import classes from './PersonsFilter.module.css';
import useInputField from '../../hooks/useInputField';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchPersons } from '../../store/actions/persons';
import { relationshipStatusObj } from '../../misc/relationshipStatus';
import { getOptionsByObj, resetInputFields } from '../../helpers/helpers';
import useFetchAfterTimeout from '../../hooks/useFetchAfterTimeout';
import useAgeInputField from '../../hooks/useAgeInputField';

const PersonsFilter = () => {
    const dispatch = useDispatch();
    const queryParams = useSelector(state => state.persons.queryParams);

    const [name, setName, resetName] = useInputField('');
    const [ageFrom, setAgeFrom, resetAgeFrom] = useAgeInputField('');
    const [ageTo, setAgeTo, resetAgeTo] = useAgeInputField('');
    const [relationshipStatus, setRelationshipStatus, resetRelationshipStatus] = useInputField('');

    const modifiedParams = { ...queryParams };

    const nameRef = useRef();
    const ageFromRef = useRef();
    const ageToRef = useRef();

    useEffect(() => {
        resetInputFields(resetName, resetAgeFrom, resetAgeTo, resetRelationshipStatus);
    }, []);

    useFetchAfterTimeout(name, nameRef, modifiedParams, 'name');
    useFetchAfterTimeout(ageFrom, ageFromRef, modifiedParams, 'ageFrom');
    useFetchAfterTimeout(ageTo, ageToRef, modifiedParams, 'ageTo');

    useEffect(() => {
        modifiedParams.relationshipStatus = relationshipStatus;
        dispatch(dispatchPersons(modifiedParams));
    }, [relationshipStatus, dispatch])

    let content = getOptionsByObj(relationshipStatusObj);

    return (
        <div className={classes['PersonsFilter']}>
            <label htmlFor='name-filter'>Name</label>
            <input
                ref={nameRef}
                onChange={setName}
                value={name}
                type='text'
                maxLength={200}
                id='name-filter'
                className={classes['PersonsFilter-input']} />
            <label htmlFor='age-from'>Age from</label>
            <input
                ref={ageFromRef}
                onChange={setAgeFrom}
                value={ageFrom}
                type='number'
                min={0}
                id='age-from'
                className={classes['PersonsFilter-input']} />
            <label htmlFor='age-to'>Age to</label>
            <input
                ref={ageToRef}
                onChange={setAgeTo}
                value={ageTo}
                type='number'
                min={0}
                id='age-to'
                className={classes['PersonsFilter-input']} />
            <label htmlFor='relationship-status'>Relationship Status</label>
            <select
                onChange={setRelationshipStatus}
                value={relationshipStatus}
                id='relationship-status'
                className={classes['PersonsFilter-input']}
            >
                <option value=''></option>
                {content}
            </select>
        </div>
    )
}

export default PersonsFilter;