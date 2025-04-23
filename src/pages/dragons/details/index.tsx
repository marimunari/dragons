// system
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// models
import { DragonModel } from "@/src/@core/interfaces/Dragon/dragon.interface";
import { SelectOptionModel } from "@/src/@core/models/Select/select.model";

// contexts
import { useToaster } from "@/src/@core/contexts/Toast/ToastContext";
import { useAuth } from "@/src/@core/contexts/Auth/AuthContext";

// services
import { getDragonById, deleteDragon } from "@/src/@core/services/dragon/dragonService";

// internal components
import Button from "@/src/components/Button/Button";
import Collapse from "@/src/components/Collapse/Collapse";
import EditModal from "@/src/components/EditModal/EditModal";
import Loading from "@/src/components/Loading/Loading";
import Modal from "@/src/components/Modal/Modal";

// utils
import { formatIsoToDateTime } from "@/src/@core/utils/date/date.utils";

// mocks
import { SelectOptionsConst } from "@/src/@core/consts/mocks/Select/select.const.mock";

// styles
import styles from './index.module.scss';

export default function DragonDetails() {
  const [dragon, setDragon] = useState<any | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const typeLabel = SelectOptionsConst.find((option: SelectOptionModel) => option.value === dragon?.type)?.label || "-";

  const router = useRouter();
  const { id } = router.query;
    
  const { isAuthenticated } = useAuth();
      
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  const { addToast } = useToaster();

  useEffect(() => {
    if (id) {
      getDragonById(String(id))
        .then((data: DragonModel) => {
          if (data) {
            setDragon(data);
          } else {
            router.push("/404");
          }
        })
        .catch((error: any) => {
          addToast({
            type: "error",
            title: "Erro ao buscar dragão",
            description: "Ocorreu um problema ao tentar buscar dragão.",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [addToast, id, router]);

  /**
   * Method responsible for handling dragon deletion
   * @returns {Promise<void>}
   */
  async function handleDelete(): Promise<void> {
    setIsDeleting(true);
    try {
      await deleteDragon(id as string);
      addToast({
        type: "success",
        title: "Sucesso!",
        description: "Dragão removido com sucesso!",
      });
      router.push("/dragons");
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Erro ao excluir dragão",
        description: "Ocorreu um problema ao excluir o dragão.",
        // backendMessage: error,
      });
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  /**
   * Method responsible for opening the edit modal
   * @returns {void}
   */
  function handleEdit(): void {
    setIsEditModalOpen(true);
  };

  /**
   * Method responsible for handling the save operation in the edit modal
   * @param updatedDragon - the updated dragon data
   * @returns {void}
   */
  function handleSave(updatedDragon: { id: string; name: string; type: string; histories: string[] }): void {
    setDragon(updatedDragon);
    setIsEditModalOpen(false);
    addToast({
      type: "success",
      title: "Dragão editado com sucesso!",
      description: "Os dados do dragão foram atualizados com sucesso.",
    });
  }

  if (loading) return <Loading />;

  return (
    <>
      <section className={styles.dragonDetails}>
        <div className={styles.dragonDetails__header}>
          <h1 className={styles.dragonDetails__header__title}>Dragão {dragon?.name}</h1>
          <div className={styles.dragonDetails__header__actions}>
            <Button variant="text" color="blue" text="Editar" onClick={handleEdit} />
            <Button variant="text" color="red" text="Excluir" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <div className={styles.dragonDetails__content}>
          <div className={styles.dragonDetails__section}>
            <p className={styles.dragonDetails__section__label}>Tipo do Dragão</p>
            <p className={styles.dragonDetails__section__value}>{typeLabel}</p>
          </div>

          <div className={styles.dragonDetails__section}>
            <p className={styles.dragonDetails__section__label}>Data de Criação</p>
            <p className={styles.dragonDetails__section__value}>
              {dragon?.createdAt && formatIsoToDateTime(dragon?.createdAt)}
            </p>
          </div>

          {dragon && dragon.histories && dragon.histories.length > 0 ? (
            <>
              <h3 className={styles.dragonDetails__section__label}>Histórias</h3>
              <div>
                {dragon.histories.map((history: string, index: number) => (
                  <Collapse key={index} title={`História ${index + 1}`}>
                    {history}
                  </Collapse>
                ))}
              </div>
            </>
          ) : (
            <p className={styles.dragonDetails__stories__none}>
              <em>Nenhuma história cadastrada.</em>
            </p>
          )}
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Excluir Dragão"
        message="Tem certeza que deseja excluir este dragão? Essa ação não poderá ser desfeita."
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        dragonId={String(id)}
        dragonName={dragon?.name || ""}
        dragonType={dragon?.type || ""}
        dragonHistories={dragon?.histories || []}
        onSave={handleSave}
      />
    </>
  );
}