// system
import React, { useState, useEffect } from "react";

// contexts
import { useToaster } from "@/src/@core/contexts/Toast/ToastContext";

// services
import { updateDragon } from "@/src/@core/services/dragon/dragonService";

// internal components
import Button from "@/src/components/Button/Button";
import Input from "@/src/components/Input/Input";
import Select from "@/src/components/Select/Select";
import Textarea from "../Textarea/Textarea";

// external icons
import { FaPlus, FaTrash } from "react-icons/fa6";

// mocks
import { SelectOptionsConst } from "@/src/@core/consts/mocks/Select/select.const.mock";

// models
import { EditModalModel } from "@/src/@core/models/EditModal/editModal.model";
import { SelectOptionModel } from "@/src/@core/models/Select/select.model";

// styles
import styles from "./EditModal.module.scss";

export default function EditModal(props: EditModalModel) {
  const [name, setName] = useState(props.dragonName);
  const [type, setType] = useState(props.dragonType);
  const [histories, setHistories] = useState(props.dragonHistories);
  const [newHistory, setNewHistory] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToaster();

  useEffect(() => {
    if (props.isOpen) {
      setName(props.dragonName);
      setType(props.dragonType);
      setHistories(props.dragonHistories);
      setNewHistory("");
    }
  }, [props.isOpen, props.dragonName, props.dragonType, props.dragonHistories]);

  const isFormChanged = name !== props.dragonName || type !== props.dragonType || histories.length !== props.dragonHistories.length || histories.some((history, index) => history !== props.dragonHistories[index]);

  /**
   * Method responsible for handling the form submission
   * @param {React.FormEvent} e - the form submission event
   * @returns {Promise<void>}
   */
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!isFormChanged) return;

    if (histories.some((history) => history.trim() === "")) {
      addToast({
        type: "error",
        title: "História inválida",
        description: "Por favor, preencha todas as histórias antes de salvar.",
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateDragon(props.dragonId, { name, type, histories });
      props.onSave({ id: props.dragonId, name, type, histories });
      props.onClose();
      addToast({
        type: "success",
        title: "Sucesso!",
        description: "Dragão alterado com sucesso.",
      });
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Erro ao atualizar",
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Method responsible for updating a specific history item
   * @param {number} index - the index of the history item to be updated
   * @param {string} value - the new value for the history item
   * @returns {void}
   */
  function handleHistoryChange(index: number, value: string): void {
    const updatedHistories = [...histories];
    updatedHistories[index] = value;
    setHistories(updatedHistories);
  };

  /**
   * Method responsible for adding a new history to the list
   * @returns {void}
   */
  function handleAddHistory(): void {
    if ((newHistory || "").trim() === "") {
      addToast({
        type: "error",
        title: "História inválida",
        description: "Por favor, preencha a história antes de adicionar.",
      });
      return;
    }
  
    setHistories([...histories, newHistory]);
    setNewHistory("");
  };

  /**
   * Method responsible for removing a specific history item from the list
   * @param {number} index - the index of the history item to be removed
   * @returns {void }
   */
  function handleRemoveHistory(index: number): void  {
    setHistories(histories.filter((_, i) => i !== index));
  };

  /**
   * Method responsible for updating the value of the new history input field
   * @param {React.ChangeEvent<HTMLTextAreaElement>t} e - the change event from the textarea
   * @returns {void}
   */
  function handleNewHistoryChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setNewHistory(e.target.value);
  };

  /**
   * Method responsible for handling the change in the dragon type selection
   * @param {SelectOptionModel} selectedOption - the selected option from the Select component
   * @returns {void}
   */
  function handleTypeChange(selectedOption: SelectOptionModel): void {
    setType(selectedOption.value);
  };

  if (!props.isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Dragão</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" type="text" />

          <div>
            <label className={styles.historyLabel}>Tipo</label>
            <Select
              id="type"
              name="type"
              options={SelectOptionsConst}
              value={type}
              onChange={handleTypeChange}
            />
          </div>

          <div className={`${styles.historyContainer}`}>
            <label className={styles.historyLabel}>Histórias</label>
            {histories.map((history, index) => (
              <div key={index} className={styles.historyItem}>
                <div className={styles.textareaWrapper}>
                  <Textarea
                    value={history}
                    onChange={(e) => handleHistoryChange(index, e.target.value)}
                    name={`history-${index}`}
                    id={`history-${index}`}
                    placeholder="Descreva a história do dragão"
                  />
                </div>
                <Button
                  variant="icon"
                  icon={<FaTrash />}
                  type="rounded"
                  htmlType="button"
                  color="red"
                  onClick={() => handleRemoveHistory(index)}
                />
              </div>
            ))}
          
            <div className={styles.historyItem}>
              <div className={styles.textareaWrapper}>
                <Textarea
                  value={newHistory}
                  onChange={handleNewHistoryChange}
                  name="newHistory"
                  id="newHistory"
                  placeholder="Adicionar uma nova história"
                />
              </div>
              <Button
                variant="icon"
                type="rounded"
                htmlType="button"
                icon={<FaPlus />}
                color="green"
                onClick={handleAddHistory}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              variant="text"
              color="gray"
              text="Fechar"
              onClick={props.onClose}
            />
            <Button
              variant="text"
              color="green"
              text={isSaving ? "Salvando..." : "Salvar"}
              htmlType="submit"
              disabled={isSaving || !isFormChanged}
            />
          </div>
        </form>
      </div>
    </div>
  );
}