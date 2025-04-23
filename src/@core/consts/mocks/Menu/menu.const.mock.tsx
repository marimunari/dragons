// models
import { MenuItemModel } from '@/src/@core/models/Menu/menu.model';

// external icons
import { FaHome } from 'react-icons/fa';
import { FaListUl, FaPlus } from 'react-icons/fa6';

export const MenuConst: MenuItemModel[] = [
    {
      label: 'Início',
      href: '/',
      icon: <FaHome />,
    },
    {
      label: 'Lista de dragões',
      href: '/dragons/list',
      icon: <FaListUl />
    },
    {
      label: 'Cadastrar dragão',
      href: '/dragons/register',
      icon: <FaPlus />
    },
  ];
