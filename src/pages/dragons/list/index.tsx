// system
import React, { JSX, useEffect, useState } from "react";
import { useRouter } from "next/router";

// services
import { deleteDragon, getAllDragons } from "@/src/@core/services/dragon/dragonService";

// models
import { ColumnsModel } from "@/src/@core/models/Table/table.model";
import { DragonModel } from "@/src/@core/interfaces/Dragon/dragon.interface";
import { SelectOptionModel } from "@/src/@core/models/Select/select.model";

// contexts
import { useToaster } from "@/src/@core/contexts/Toast/ToastContext";
import { useAuth } from "@/src/@core/contexts/Auth/AuthContext";

// internal components
import Button from "@/src/components/Button/Button";
import EditModal from "@/src/components/EditModal/EditModal";
import Loading from "@/src/components/Loading/Loading";
import Modal from "@/src/components/Modal/Modal";
import Table from "@/src/components/Table/Table";
import Tooltip from "@/src/components/Tooltip/Tooltip";

// utils
import { formatIsoToDateTime } from "@/src/@core/utils/date/date.utils";

// external icons
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";

// mocks
import { SelectOptionsConst } from "@/src/@core/consts/mocks/Select/select.const.mock";

// styles
import styles from './index.module.scss';

export default function DragonsList() {
  const [dragons, setDragons] = useState<DragonModel[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [dragonToDelete, setDragonToDelete] = useState<DragonModel  | null>(null);
  const [dragonToEdit, setDragonToEdit] = useState<any | null>(null);

  const { addToast } = useToaster();

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    getDragons();
  }, []);

  /**
   * Method responsible for fetching all dragons and updating the state
   * @returns {Promise<void>}
   */
  async function getDragons(): Promise<void> {
    try {
      const data = await getAllDragons();
      setDragons(data);
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao carregar dragões",
        description: "Ocorreu um erro ao tentar carregar a lista de dragões.",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Method responsible for deleting a dragon and updating the list
   * @returns {Promise<void>}
   */
  async function handleDelete(): Promise<void> {
    if (dragonToDelete) {
      try {
        setIsDeleting(true);
        await deleteDragon(dragonToDelete.id);
        addToast({
          type: "success",
          title: "Dragão removido com sucesso!",
        });
        setDragons(dragons.filter(dragon => dragon.id !== dragonToDelete.id));
        setIsModalOpen(false);
      } catch (error) {
        addToast({
          type: "error",
          title: "Erro ao excluir dragão",
          description: "Ocorreu um erro ao tentar excluir o dragão.",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  /**
   * Method responsible for redirecting to the dragon details page
   * @param {string} id - ID of the dragon to view
   * @returns {void}
   */
  function handleView(id: string): void {
    router.push(`/dragons/details?id=${id}`);
  };

  /**
   * Method responsible for opening the edit modal with selected dragon data
   * @param {any} dragon - Dragon to edit
   * @returns {void}
   */
  function handleEdit(dragon: any): void {
    //const { createdAt, ...dragonWithoutCreatedAt } = dragon;
    setDragonToEdit(dragon);
    setIsEditModalOpen(true);
  };

  /**
   * Method responsible for save the updated dragon
   * @param {any} dragon - Dragon to edit
   * @returns {void}
   */
  function handleSaveEdit(updatedDragon: any): void {
    setDragons(prevDragons =>
      prevDragons.map(dragon =>
        dragon.id === updatedDragon.id
          ? { ...updatedDragon, createdAt: dragon.createdAt }
          : dragon
      )
    );
    setIsEditModalOpen(false);
  }

  /**
   * Method responsible for opening the delete confirmation modal
   * @param {DragonModel} dragon - Dragon to delete
   * @returns {void}
   */
  function openModal(dragon: DragonModel): void {
    setDragonToDelete(dragon);
    setIsModalOpen(true);
  };

  /**
   * Method responsible for rendering action buttons in the table
   * @param {DragonModel} rowData - Data of the current row
   * @returns {JSX.Element}
   */
  function renderActions(rowData: DragonModel): JSX.Element {
    return (
      <div className={styles['dragons-list__actions']}>
        <Tooltip text="Visualizar">
          <Button
            variant="icon"
            color="blue"
            icon={<FaEye />}
            onClick={() => handleView(rowData.id)}
          />
        </Tooltip>
        <Tooltip text="Editar">
          <Button
            variant="icon"
            color="yellow"
            icon={<FaPen />}
            onClick={() => handleEdit(rowData)}
          />
        </Tooltip>
        <Tooltip text="Excluir">
          <Button
            variant="icon"
            color="red"
            icon={<FaTrash />}
            onClick={() => openModal(rowData)}
          />
        </Tooltip>
      </div>
    );
  };  

  const columns: ColumnsModel = {
    total: 3,
    columns: [
      {
        id: 'name',
        title: 'Nome',
        sortable: true,
        filterable: true,
      },
      {
        id: 'type',
        title: 'Tipo',
        sortable: true,
        filterable: false,
        render: (data: DragonModel) => {
          const typeOption = SelectOptionsConst.find((option: SelectOptionModel) => option.value === data.type);
          return typeOption ? typeOption.label : '-';
        },
      },
      {
        id: 'createdAt',
        title: 'Criado em',
        sortable: true,
        filterable: false,
        render: (data: DragonModel) => {
          return data.createdAt ? formatIsoToDateTime(data.createdAt) : '-';
        },
      },
      {
        id: 'actions',
        title: 'Ações',
        sortable: false,
        filterable: false,
        render: renderActions,
      },
    ],
  };

  return (
      <section className={styles['dragons-list']}>
        <div className={styles['dragons-list__header']}>
          <h1 className={styles['dragons-list__title']}>Lista de dragões</h1>
          <div>
            <Button
              variant="iconText"
              color="green"
              text="Cadastrar dragão"
              icon={<FaPlus />}
              onClick={() => router.push('/dragons/register')}
            />
          </div>
        </div>
    
        {loading ? (
          <Loading />
        ) : (
          <div className={styles['dragons-list__table']}>
            <Table columns={columns} data={dragons} />
          </div>
        )}
    
        <Modal
          isOpen={isModalOpen}
          title="Confirmar exclusão"
          message="Você tem certeza que deseja deletar este dragão?"
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
    
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          dragonId={dragonToEdit?.id}
          dragonName={dragonToEdit?.name}
          dragonType={dragonToEdit?.type}
          dragonHistories={dragonToEdit?.histories || []}
          onSave={handleSaveEdit}
        />
      </section>
  );
};