import { useEffect, useState } from "react";
import styles from "./ImagePreview.module.css";

const ImagePreview = ({ file }: { file: File }) => {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!src) return null;
  return <img className={styles.image} src={src} />;
};

export default ImagePreview;
