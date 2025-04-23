// system
import React from 'react';
import Link from 'next/link';

// models
import { BreadcrumbsModel, BreadcrumbItemModel } from '@/src/@core/models/Breadcrumbs/breadcrumbs.model';

// styles
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs(props: BreadcrumbsModel) {
  return (
    <nav className={styles.breadcrumbs}>
      {props.items && props.items.map((item: BreadcrumbItemModel, itemIndex: number) => {
        const isLast = itemIndex === props.items.length - 1;

        const content = (
          <span className={styles.breadcrumbs__content}>
            {item.icon}
            {item.label}
          </span>
        );

        return (
          <span key={itemIndex} className={styles.breadcrumbs__item}>
            {item.href && !isLast ? (
              <Link href={item.href} className={styles.breadcrumbs__link}>
                {content}
              </Link>
            ) : (
              <span className={styles.breadcrumbs__current}>
                {content}
              </span>
            )}
            {!isLast && <span className={styles.breadcrumbs__separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}