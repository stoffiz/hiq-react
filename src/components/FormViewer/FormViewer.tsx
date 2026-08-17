import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { InputField } from "../InputField";
import { FormattedField } from "../FormBuilder/FormBuilder";
import styles from "./FormViewer.module.css";
import ImagePreview from "./components/ImagePreview";

export type FormViewerValues = {
  answers: Record<string, string | Record<string, boolean>>;
};

type FormViewerProps = {
  fields: FormattedField[];
};

const FormViewer = ({ fields }: FormViewerProps) => {
  const { register, handleSubmit } = useForm<FormViewerValues>();

  const printFormValues = (data: FormViewerValues) => {
    const answersWithLabels = Object.entries(data.answers).map(
      ([fieldId, answer]) => {
        const field = fields.find((f) => f.id === fieldId);
        const label = field?.values.question ?? field?.values.label;

        switch (field?.type) {
          case "radio-buttons": {
            const alternatives = (field.values.alternatives ??
              {}) as unknown as Record<string, string>;
            return {
              id: fieldId,
              label,
              answer: alternatives[answer as string],
            };
          }
          case "checkboxes": {
            const checkboxes = (field.values.checkboxes ??
              {}) as unknown as Record<string, string>;
            const selected = Object.entries(
              (answer ?? {}) as Record<string, boolean>,
            )
              .filter(([, checked]) => checked)
              .map(([key]) => ({ id: key, label: checkboxes[key] }));
            return { id: fieldId, label, answer: selected };
          }
          default:
            return { id: fieldId, label, answer };
        }
      },
    );

    console.log(answersWithLabels);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Förhandsgranskning</h2>
      <form onSubmit={handleSubmit(printFormValues)}>
        <ul className={styles.fields}>
          {fields.map((field) => {
            const values = field.values;

            switch (field.type) {
              case "text":
                // No need to render empty valus.
                // TODO: Make some fields required before saving form.
                if (!values.text) return null;
                return (
                  <li key={field.id}>
                    {/* Casting as we know these are strings */}
                    <p>{values.text as string}</p>
                  </li>
                );
              case "input-text":
                return (
                  <li key={field.id}>
                    <InputField
                      label={values.label as string}
                      placeholder={values.placeholder as string}
                      {...register(`answers.${field.id}`)}
                    />
                  </li>
                );
              case "radio-buttons": {
                const alternatives = (values.alternatives ??
                  {}) as unknown as Record<string, string>;
                // No need to render empty valus.
                if (Object.keys(alternatives).length === 0) return null;
                return (
                  <li key={field.id}>
                    <div className={styles.container}>
                      <p className={styles.question}>
                        {values.question as string}
                      </p>
                      {values.informationText && (
                        <span className={styles.info}>
                          {values.informationText as string}
                        </span>
                      )}
                    </div>
                    {Object.entries(alternatives).map(([key, label]) => (
                      <label key={key} className={styles.option}>
                        <input
                          type="radio"
                          value={key}
                          {...register(`answers.${field.id}`)}
                        />
                        {label}
                      </label>
                    ))}
                  </li>
                );
              }
              case "checkboxes": {
                const checkboxes = (values.checkboxes ??
                  {}) as unknown as Record<string, string>;
                // No need to render empty valus.
                if (Object.keys(checkboxes).length === 0) return null;
                return (
                  <li key={field.id}>
                    <div className={styles.container}>
                      <p className={styles.question}>
                        {values.question as string}
                      </p>
                      {values.informationText && (
                        <span className={styles.info}>
                          {values.informationText as string}
                        </span>
                      )}
                    </div>
                    {Object.entries(checkboxes).map(([key, label]) => (
                      <label key={key} className={styles.option}>
                        <input
                          type="checkbox"
                          {...register(`answers.${field.id}.${key}`)}
                        />
                        {label}
                      </label>
                    ))}
                  </li>
                );
              }
              case "image": {
                // A bit verbose casting here but works as a preview. Should probably add a more stricter typing as noted in FormBuilder.tsx
                const file = (
                  values.file as unknown as FileList | undefined
                )?.[0];
                return (
                  <li key={field.id}>{file && <ImagePreview file={file} />}</li>
                );
              }
              default:
                return null;
            }
          })}
        </ul>
        <Button type="submit">Skicka</Button>
      </form>
    </div>
  );
};

export default FormViewer;
