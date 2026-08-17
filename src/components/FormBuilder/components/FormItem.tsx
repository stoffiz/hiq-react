import { ReactComponent as BinIcon } from "../../../assets/bin.svg";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { Button } from "../../Button";
import { FormItemBlockProps } from "../types";
import styles from "./FormItem.module.css";

type FormItemProps = {
  title: string;
  description: string;
  field: () => JSX.Element;
  expanded: boolean;
} & Omit<FormItemBlockProps, "register" | "index">;

const FormItem = ({
  id,
  title,
  description,
  field,
  expanded = true,
  onRemove,
  onToggleExpanded,
  onMove,
}: FormItemProps) => {
  const Block = field;

  return (
    <li className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => onRemove(id)} variant="secondary">
            <BinIcon />
            Ta bort
          </Button>
          {onToggleExpanded && (
            <Button onClick={() => onToggleExpanded(id)} variant="secondary">
              {expanded ? <span className={styles.line} /> : <PlusIcon />}
            </Button>
          )}
          {onMove && (
            <>
              <Button onClick={() => onMove("up")} variant="secondary">
                Upp
              </Button>
              <Button onClick={() => onMove("down")} variant="secondary">
                Ner
              </Button>
            </>
          )}
        </div>
      </div>
      {expanded && (
        <div className={styles.content}>
          <div>{description}</div>
          <Block />
        </div>
      )}
    </li>
  );
};

export default FormItem;
