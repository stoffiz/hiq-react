import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as BinIcon } from "../../../assets/bin.svg";
import { Button } from "../../Button";
import { InputField } from "../../InputField";
import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";
import { MultiValue, MultiValues, MultiValueWrapper } from "./MultiValueLayout";

const CheckboxesQuestionBlock = ({
  register,
  unregister,
  id,
  index,
  setValue,
  ...rest
}: FormItemBlockProps) => {
  const [checkboxes, setCheckboxes] = useState<string[]>([]);

  return (
    <FormItem
      title="Checkboxar"
      description="Kunden kan välja att kryssa i ett fritt antal av checkboxarna."
      field={() => (
        <>
          <InputField
            label="Titel"
            placeholder="Titel"
            {...register(`fields.${index}.values.question`)}
          />
          <InputField
            label="Informationstext som visas under (valfri)"
            {...register(`fields.${index}.values.informationText`)}
          />

          <MultiValueWrapper>
            <label id="checkboxes-label">Checkboxar</label>
            {!checkboxes.length && <div>Inga checkboxar tillagda</div>}

            <MultiValues>
              {checkboxes.map((checkbox) => (
                <MultiValue key={checkbox}>
                  <InputField
                    labelledBy="checkboxes-label"
                    {...register(
                      `fields.${index}.values.checkboxes.${checkbox}`
                    )}
                  />
                  <BinIcon
                    onClick={() => {
                      unregister &&
                        unregister(
                          `fields.${index}.values.checkboxes.${checkbox}`
                        );
                      setCheckboxes((checkboxes) =>
                        checkboxes.filter((c) => c !== checkbox)
                      );
                    }}
                  />
                </MultiValue>
              ))}
            </MultiValues>
          </MultiValueWrapper>

          <Button
            onClick={() =>
              setCheckboxes((checkboxes) => [...checkboxes, uuidv4()])
            }
          >
            + Lägg till checkbox
          </Button>
        </>
      )}
      id={id}
      {...rest}
    />
  );
};

export default CheckboxesQuestionBlock;
