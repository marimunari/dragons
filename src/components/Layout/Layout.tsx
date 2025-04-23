// system
import { ReactNode, useState } from 'react'

// hooks
import { useBreadcrumbs } from '@/src/@core/hooks/useBreadcrumbs/useBreadcrumbs';

// contexts
import { useAuth } from '@/src/@core/contexts/Auth/AuthContext';

// internal components
import Breadcrumbs from '@/src/components/Breadcrumbs/Breadcrumbs';
import Header from '@/src/components/Header/Header'
import Menu from '@/src/components/Menu/Menu'

// mocks
import { MenuConst } from '@/src/@core/consts/mocks/Menu/menu.const.mock';

// styles
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  
  const menuWidth = isMenuOpen ? 250 : 60;
  
  const breadcrumbAlias = {
    '/dragons/list': 'Lista de dragões',
    '/dragons/register': 'Cadastrar dragão',
    '/dragons/details': 'Detalhes do dragão',
  }

  const breadcrumbItems = useBreadcrumbs(breadcrumbAlias);
  
  /** 
   * Method responsible for toggling menu visibility
   * @returns {void}
  */
  function toggleMenu(): void {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className={styles.layout}>
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} items={MenuConst} />

      <div
        className={styles['layout__content']}
        style={{ marginLeft: `${menuWidth}px` }}
      >
        <Header
          userName={user?.userName}
          userImage={null}
          onLogout={logout}
        />

        <div className={styles['layout__breadcrumbs']}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className={styles['layout__mainWrapper']}>
          <main className={styles['layout__main']}>{children}</main>
        </div>
      </div>
    </section>
  );
};