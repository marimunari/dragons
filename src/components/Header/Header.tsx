// system
import React from "react";

// models
import { HeaderModel } from "@/src/@core/models/Header/header.model";

// internal components
import User from "@/src/components/User/User";

// styles
import styles from "./Header.module.scss";

export default function Header(props: HeaderModel) {
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <div className={styles['header__user-info']}>
          <User
            userName={props.userName}
            userImage={props.userImage}
            onLogout={props.onLogout}
          />
        </div>
      </div>
    </header>
  );
}