// system
import React, { useState } from "react";

// models
import { CollapseModel } from "@/src/@core/models/Collapse/collapse.model";

// styles
import styles from "./Collapse.module.scss";

export default function Collapse(props: CollapseModel) {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.collapse}>
      <div
        className={styles.collapse__header}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.collapse__title}>{props.title}</span>
        <span className={styles.collapse__toggle}>{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className={styles.collapse__content}>
          {props.children}
        </div>
      )}
    </section>
  );
}