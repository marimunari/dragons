// system
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// models
import { MenuModel, MenuItemModel } from '@/src/@core/models/Menu/menu.model';

// internal images
import DragonFace from '@/src/assets/icons/dragon-face-icon.png';

// styles
import styles from './Menu.module.scss';

export default function Menu(props: MenuModel) {
  return (
    <section
      className={`${styles.menu} ${
        props.isOpen ? styles['menu--open'] : styles['menu--closed']
      }`}
    >
      <div
        className={`${styles.menu__header} ${
          props.isOpen
            ? styles['menu__header--start']
            : styles['menu__header--centered']
        }`}
        onClick={props.toggleMenu}
      >
        <Image
          src={DragonFace}
          alt="Dragon Logo"
          width={40}
          height={40}
          className={styles.menu__header__logo}
        />
        {props.isOpen && <h1 className={styles.menu__header__title}>dragons</h1>}
      </div>

      <ul className={styles.menu__list}>
        {props.items.map((item: MenuItemModel, index: number) => (
          <li key={index} className={styles.menu__item}>
            {item.href ? (
              <Link href={item.href} passHref>
                <span
                  className={`
                    ${styles.menu__item__link}
                    ${
                      props.isOpen
                        ? styles['menu__item__link--open']
                        : styles['menu__item__link--closed']
                    }
                  `}
                >
                  {item.icon && (
                    <span
                      className={`
                        ${styles.menu__item__link__icon}
                        ${
                          !props.isOpen
                            ? styles['menu__item__link__icon--only']
                            : ''
                        }
                      `}
                    >
                      {item.icon}
                    </span>
                  )}
                  {props.isOpen && item.label}
                </span>
              </Link>
            ) : (
              <span
                className={`
                  ${styles.menu__item__link}
                  ${
                    props.isOpen
                      ? styles['menu__item__link--open']
                      : styles['menu__item__link--closed']
                  }
                `}
                onClick={item.action}
              >
                {item.icon && (
                  <span
                    className={`
                      ${styles.menu__item__link__icon}
                      ${
                        !props.isOpen
                          ? styles['menu__item__link__icon--only']
                          : ''
                      }
                    `}
                  >
                    {item.icon}
                  </span>
                )}
                {props.isOpen && item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}