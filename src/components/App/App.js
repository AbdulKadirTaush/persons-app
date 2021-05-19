import AddPersonForm from '../AddPersonForm/AddPersonForm';
import PersonsGrid from '../PersonsGrid/PersonsGrid';
import PersonsFilter from '../PersonsFilter/PersonsFilter';

const App = () => {
  return (
    <div>
      <AddPersonForm />
      <PersonsGrid />
      <PersonsFilter />
    </div>
  );
}

export default App;
