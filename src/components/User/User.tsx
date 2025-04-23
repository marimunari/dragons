// system
import React, { useRef, useState } from 'react';
import Image from 'next/image';

// models
import { UserModel } from '@/src/@core/models/User/user.model';

// custom hooks
import { useOutsideClick } from '@/src/@core/hooks/useOutsideClick/useOutsideClick';

// internal images
import DefaultUserImage from '@/src/assets/images/user-profile-image.png';

// styles
import styles from './User.module.scss';

export default function User(props: UserModel) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the dropdown
  useOutsideClick(containerRef, () => setIsDropdownOpen(false));

  /**
   * Method responsible for toggling the visibility of the dropdown menu
   * @returns {void}
   */
  function handleDropdownToggle(): void {
    setIsDropdownOpen((prev) => !prev);
  };

  /**
   * Method responsible for handling the logout action
   * @returns {void}
   */
  function handleLogoutClick(): void {
    props.onLogout?.();
    setIsDropdownOpen(false);
  };

  return (
    <section
      ref={containerRef}
      onClick={handleDropdownToggle}
      className={styles['user-container']}
    >
      <div className={styles['user-container__avatar']}>
        <Image
          src={props.userImage || DefaultUserImage}
          alt="User Avatar"
          width={40}
          height={40}
          className={styles['user-container__avatar-image']}
        />
      </div>

      <span className={styles['user-container__name']}>{props.userName}</span>

      {isDropdownOpen && (
        <div className={styles['dropdown']}>
          <button
            onClick={handleLogoutClick}
            className={styles['dropdown__button']}
          >
            Sair
          </button>
        </div>
      )}
    </section>
  );
}