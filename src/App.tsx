import FormBuilder from "./components/FormBuilder/FormBuilder";

const App = () => {
  return <FormBuilder onSubmit={(form) => console.log(form)} />;
};

export default App;
