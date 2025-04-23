// system
import React, { useState } from "react";

// models
import { TooltipModel } from "@/src/@core/models/Tooltip/tooltip.model";

// styles
import styles from "./Tooltip.module.scss";

export default function Tooltip(props: TooltipModel) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.tooltip}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {props.children}
      {show && (
        <div className={styles.tooltip__content}>
          {props.text}
          <span className={styles.tooltip__arrow} />
        </div>
      )}
    </div>
  );
}