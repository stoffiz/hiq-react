import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../Button";
import CheckboxesQuestionBlock from "./components/CheckboxesQuestionBlock";
import ImageBlock from "./components/ImageBlock";
import RadioButtonsQuestionBlock from "./components/RadioButtonsQuestionBlock";
import TextBlock from "./components/TextBlock";
import styles from "./FormBuilder.module.css";
import { FormItemBlockProps } from "./types";

export type InputType =
  | "image"
  | "text"
  | "radio-buttons"
  | "checkboxes"
  | "dropdown";

export type FormItem = {
  name: string;
  type: InputType;
  component: (props: FormItemBlockProps) => JSX.Element;
  props: {
    id: string;
    expanded: boolean;
  };
  values: Record<string, string>;
};

export type FormattedField = {
  type: InputType;
  id: string;
  values: Record<string, string | string[]>;
};

type FormElement = Omit<FormItem, "props" | "values">;

export type FormValues = {
  fields: FormItem[];
};

const FormBuilder = ({
  onSubmit,
}: {
  onSubmit: (form: FormattedField[]) => void;
}) => {
  const { register, control, setValue, unregister } = useForm<FormValues>();
  const { fields, append, remove, update, replace } = useFieldArray({
    name: "fields",
    control,
  });

  const elements: FormElement[] = [
    {
      name: "Bild",
      type: "image",
      component: ImageBlock,
    },
    {
      name: "Text",
      type: "text",
      component: TextBlock,
    },
    {
      name: "Radio buttons",
      type: "radio-buttons",
      component: RadioButtonsQuestionBlock,
    },
    {
      name: "Checkboxar",
      type: "checkboxes",
      component: CheckboxesQuestionBlock,
    },
  ];

  const addItem = (item: FormElement) => {
    append({ ...item, props: { id: uuidv4(), expanded: true }, values: {} });
  };

  const handleToggleExpanded = (index: number, field: FormItem) => {
    update(index, {
      ...field,
      props: { ...field.props, expanded: !field.props.expanded },
    });
  };

  const saveForm = (fields: FormItem[]) => {
    const formattedForm: FormattedField[] = fields.map((block) => ({
      type: block.type,
      id: block.props.id,
      values: block.values,
    }));
    onSubmit(formattedForm);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Välj element</h2>
      <div className={styles.buttonWrapper}>
        {elements.map((item) => (
          <Button key={item.name} onClick={() => addItem(item)}>
            {item.name}
          </Button>
        ))}
      </div>
      {!fields.length && <div>Lägg till nya fält med hjälp av knapparna.</div>}
      {!!fields.length && (
        <>
          <ul className={styles.formItems}>
            {fields.map((field, i) => {
              const Component = field.component;
              return (
                <Component
                  key={field.props.id}
                  {...field.props}
                  onRemove={() => remove(i)}
                  onToggleExpanded={() => handleToggleExpanded(i, field)}
                  register={register}
                  unregister={unregister}
                  setValue={setValue}
                  index={i}
                  onMove={(dir) => {
                    const newForm = [...fields];
                    newForm.splice(i, 1);
                    newForm.splice(i + (dir === "down" ? 1 : -1), 0, fields[i]);
                    replace(newForm);
                  }}
                />
              );
            })}
          </ul>
          <Button onClick={() => saveForm(fields)} disabled={!fields.length}>
            Spara formulär
          </Button>
        </>
      )}
    </div>
  );
};

export default FormBuilder;
