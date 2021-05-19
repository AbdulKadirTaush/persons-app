import React, { useEffect } from 'react';
import classes from './PersonsGrid.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchPersons } from '../../store/actions/persons';
import useToggleSort from '../../hooks/useToggleSort';
import { relationshipStatusObj } from '../../misc/relationshipStatus';
import { getKeyByValue } from '../../helpers/helpers';

const toggleSort = (firstResetColumn, secondResetColumn, targetedColumn) => {
    firstResetColumn('asc');
    secondResetColumn('asc');
    targetedColumn();
}

const PersonsGrid = () => {
    const dispatch = useDispatch();
    const persons = useSelector(state => state.persons.persons);
    const queryParams = useSelector(state => state.persons.queryParams);

    const [nameSort, setNameSort] = useToggleSort('desc');
    const [ageSort, setAgeSort] = useToggleSort('asc');
    const [relationshipStatusSort, setRelationshipStatusSort] = useToggleSort('asc');

    const modifiedParams = { ...queryParams };

    const setBgClass = (sortBy) => {
        if (queryParams.sortBy === sortBy) {
            return queryParams.sortDirection === 'asc' ? 'PersonsGrid-asc' : 'PersonsGrid-desc';
        }
        return null;
    }

    useEffect(() => {
        dispatch(dispatchPersons(modifiedParams))
    }, [])

    const onNameSortHandler = () => {
        toggleSort(setAgeSort, setRelationshipStatusSort, setNameSort);
        modifiedParams.sortDirection = nameSort;
        modifiedParams.sortBy = 'name';
        dispatch(dispatchPersons(modifiedParams));
    }

    const onAgeSortHandler = () => {
        toggleSort(setRelationshipStatusSort, setNameSort, setAgeSort);
        modifiedParams.sortDirection = ageSort;
        modifiedParams.sortBy = 'age';
        dispatch(dispatchPersons(modifiedParams));
    }

    const onRelationshipStatusSortHandler = () => {
        toggleSort(setNameSort, setAgeSort, setRelationshipStatusSort);
        modifiedParams.sortDirection = relationshipStatusSort;
        modifiedParams.sortBy = 'relationshipStatus';
        dispatch(dispatchPersons(modifiedParams));
    }

    let content = null;

    if (persons.length) {
        content = persons.map(person => {
            return <React.Fragment key={person.id}>
                <span>
                    {person.name}
                </span>
                <span>
                    {person.age}
                </span>
                <span>
                    {getKeyByValue(relationshipStatusObj, person.relationshipStatus)}
                </span>
            </React.Fragment>
        })
    }

    return (
        <div className={classes['PersonsGrid']}>
            <span onClick={onNameSortHandler}
                className={classes[setBgClass('name')]}>
                <strong>
                    Name
                </strong>
            </span>
            <span onClick={onAgeSortHandler}
                className={classes[setBgClass('age')]}>
                <strong>
                    Age
                </strong>
            </span>
            <span onClick={onRelationshipStatusSortHandler}
                className={classes[setBgClass('relationshipStatus')]}>
                <strong>
                    Relationship Status
                </strong>
            </span>
            {content}
        </div>
    )
}

export default PersonsGrid;