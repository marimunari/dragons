// system
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// contexts
import { useToaster } from '@/src/@core/contexts/Toast/ToastContext';
import { useAuth } from '@/src/@core/contexts/Auth/AuthContext';

// services
import { createDragon } from '@/src/@core/services/dragon/dragonService';

// internal components
import Button from '@/src/components/Button/Button';
import Input from '@/src/components/Input/Input';
import Loading from '@/src/components/Loading/Loading';
import Select from '@/src/components/Select/Select';
import Textarea from '@/src/components/Textarea/Textarea';

// external icons
import { FaPlus, FaTrash } from 'react-icons/fa';

// mocks
import { SelectOptionsConst } from '@/src/@core/consts/mocks/Select/select.const.mock';

// styles
import styles from './index.module.scss';

export default function RegisterDragon() {
  const [dragons, setDragons] = useState({
    name: '',
    type: '',
    histories: [] as string[],
  });
  const [newHistory, setNewHistory] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);

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

  /**
   * Method responsible for adding a new history to the dragon
   * @returns {void}
   */
  function handleAddHistory(): void {
    if (!newHistory.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção!',
        description: 'Por favor, forneça uma história antes de adicioná-la.',
      });
      return;
    }

    if (newHistory.trim()) {
      setDragons((prev) => ({
        ...prev,
        histories: [...prev.histories, newHistory],
      }));
      setNewHistory('');
    }
  };

  /**
   * Method responsible for removing a specific history from the dragon
   * @param {number} index - the index of the history to be removed
   * @returns {void}
   */
  function handleRemoveHistory(index: number): void {
    setDragons((prev) => ({
      ...prev,
      histories: prev.histories.filter((_, i) => i !== index),
    }));
  };

  /**
   * Method responsible for submitting the dragon data to the backend
   * @param {React.FormEvent} e - the form submit event
   * @returns {Promise<void>}
   */
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!dragons.name || !dragons.type) {
      addToast({
        type: "warning",
        title: "Atenção!",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createDragon(dragons);
      setDragons({ name: '', type: '', histories: [] });
      setNewHistory('');
      addToast({
        type: "success",
        title: "Sucesso!",
        description: "Dragão cadastro com sucesso!",
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro ao excluir dragão",
        description: "Ocorreu um erro ao tentar excluir o dragão.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className={styles.registerDragon}>
      <div className={styles.registerDragon__header}>
        <h1 className={styles.registerDragon__title}>Cadastrar Dragão</h1>
      </div>

      <div className={styles.registerDragon__formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.registerDragon__inputGroup}>
            <label htmlFor="name">Nome do Dragão*</label>
            <Input
              type="text"
              placeholder="Digite o nome do dragão"
              value={dragons.name}
              onChange={(e) => setDragons({ ...dragons, name: e.target.value })}
              id="name"
              name="name"
            />
          </div>

          <div className={styles.registerDragon__inputGroup}>
            <label htmlFor="type">Tipo do Dragão*</label>
            <Select
              value={dragons.type}
              onChange={(selectedOption) => setDragons({ ...dragons, type: selectedOption.value })}
              name="type"
              id="type"
              options={SelectOptionsConst}
            />
          </div>

          <div className={styles.registerDragon__inputGroup}>
            <label htmlFor="histories">Histórias do Dragão</label>
            <div className={styles.registerDragon__textareaGroup}>
              <Textarea
                placeholder="Adicione uma nova história"
                value={newHistory}
                name="histories"
                id="histories"
                onChange={(e) => setNewHistory(e.target.value)}
              />
              <Button
                variant="icon"
                icon={<FaPlus />}
                type="rounded"
                htmlType="button"
                color="green"
                onClick={handleAddHistory}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {dragons.histories.length > 0 && (
            <ul className={styles.registerDragon__historiesList}>
              {dragons.histories.map((history, index) => (
                <li
                  key={index}
                  className={styles.registerDragon__historyItem}
                >
                  <span className={styles.registerDragon__historyText}>
                    {history}
                  </span>
                  <Button
                    variant="icon"
                    icon={<FaTrash />}
                    type="rounded"
                    htmlType="button"
                    color="red"
                    onClick={() => handleRemoveHistory(index)}
                    disabled={isSubmitting}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className={styles.registerDragon__actions}>
            <Button
              variant='text'
              color="gray"
              text="Limpar"
              htmlType="button"
              onClick={() => {
                setDragons({ name: '', type: '', histories: [] });
                setNewHistory('');
              }}
              disabled={!dragons.name && !dragons.type && !dragons.histories.length}
            />
            <Button
              variant='text'
              color="green"
              text={isSubmitting ? 'Enviando...' : 'Cadastrar'}
              htmlType="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </section>
  );
}