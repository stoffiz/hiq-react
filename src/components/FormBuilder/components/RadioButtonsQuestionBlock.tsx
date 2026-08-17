import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as BinIcon } from "../../../assets/bin.svg";
import { Button } from "../../Button";
import { InputField } from "../../InputField";

import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";
import { MultiValue, MultiValues, MultiValueWrapper } from "./MultiValueLayout";

const RadioButtonsQuestionBlock = ({
  register,
  unregister,
  id,
  index,
  ...rest
}: FormItemBlockProps) => {
  const [alternatives, setAlternatives] = useState<string[]>([]);

  return (
    <FormItem
      title="Radioknappar"
      description="Kunden kan välja ett av alternativen."
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
            <label id="alternatives-label">Alternativ</label>
            {!alternatives.length && <div>Inga alternativ tillagda</div>}

            <MultiValues>
              {alternatives.map((alternative) => (
                <MultiValue key={alternative}>
                  <InputField
                    labelledBy="alternatives-label"
                    {...register(
                      `fields.${index}.values.alternatives.${alternative}`
                    )}
                  />
                  <BinIcon
                    onClick={() => {
                      unregister &&
                        unregister(
                          `fields.${index}.values.alternatives.${alternative}`
                        );
                      setAlternatives((alternatives) =>
                        alternatives.filter((c) => c !== alternative)
                      );
                    }}
                  />
                </MultiValue>
              ))}
            </MultiValues>
          </MultiValueWrapper>

          <Button
            onClick={() =>
              setAlternatives((alternatives) => [...alternatives, uuidv4()])
            }
          >
            + Lägg till alternativ
          </Button>
        </>
      )}
      id={id}
      {...rest}
    />
  );
};

export default RadioButtonsQuestionBlock;
