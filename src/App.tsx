import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormBuilder, {
  FormattedField,
} from "./components/FormBuilder/FormBuilder";
import FormViewer from "./components/FormViewer/FormViewer";

type CurrentForm = {
  id: string;
  fields: FormattedField[];
};

const App = () => {
  const [currentForm, setCurrentForm] = useState<CurrentForm | null>(null);

  const createForm = (fields: FormattedField[]) => {
    console.log(fields);
    setCurrentForm({ id: uuidv4(), fields });
  };

  return (
    <>
      <FormBuilder onSubmit={createForm} />
      {currentForm && (
        <FormViewer key={currentForm.id} fields={currentForm.fields} />
      )}
    </>
  );
};

export default App;
