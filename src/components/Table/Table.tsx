import React, { JSX, useMemo, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaFilter, FaSort } from "react-icons/fa6";

// types
import { SortDirection } from "@/src/@core/types/Table/table.type";

// models
import { TableModel } from "@/src/@core/models/Table/table.model";

// custom hooks
import { useOutsideClick } from "@/src/@core/hooks/useOutsideClick/useOutsideClick";

// styles
import styles from './Table.module.scss';

export default function Table(props: TableModel) {
  const [sortBy, setSortBy] = useState<string>(props.columns.columns[0].id);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [filterActiveId, setFilterActiveId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const inputRef = useRef<HTMLDivElement>(null);
  useOutsideClick(inputRef, () => setFilterActiveId(null));

  /**
   * Method responsible for handling the logic for column sorting.
   * If already sorted by the column, toggles between ascending and descending.
   * @param colId - ID of the column to sort by
   */
  function handleSortClick(colId: string): void {
    if (sortBy === colId) {
      setSortDirection((prev: SortDirection) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(colId);
      setSortDirection("asc");
    }
  }

  /**
   * Method responsible for updating the filter value for a specific column.
   * @param colId - Column ID
   * @param value - Filter value
   */
  function handleFilterChange(colId: string, value: string): void {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value) {
        newFilters[colId] = value;
      } else {
        delete newFilters[colId];
      }
      return newFilters;
    });
  }
  
  /**
   * Method responsible for filtering the data based on active filters.
   * @returns Filtered data
   */
  const filteredData = useMemo(() => {
    return props.data.filter((item) =>
      Object.entries(filters).every(([colId, value]) => {
        const field = String((item as unknown as Record<string, unknown>)[colId] ?? "").toLowerCase();
        return field.includes(value.toLowerCase());
      })
    );
  }, [filters, props.data]);
  
  /**
   * Method responsible for sorting the filtered data based on selected column and direction.
   * @returns Sorted data
   */
  const sortedData = useMemo(() => {
    const sortedRows = [...filteredData].sort((rowA, rowB) => {
      const valueA = String((rowA as Record<string, unknown>)[sortBy] ?? "");
      const valueB  = String((rowB as Record<string, unknown>)[sortBy] ?? "");
      return valueA.localeCompare(valueB);
    });
    return sortDirection === "desc" ? sortedRows.reverse() : sortedRows;
  }, [sortBy, filteredData, sortDirection]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  /**
   * Method responsible for handling the change of the current page.
   * @param page - the number of page
   * @returns {void}
   */
  function handlePageChange(page: number): void {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  /**
   * Method responsible for generating a list of visible page numbers with ellipsis when needed.
   * @returns {(number | string)[]}
   */
  function getPageNumbers(): (number | string)[] {
    const pageNumbers: (number | string)[] = [];
    const delta = 2;

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  /**
   * Method responsible for rendering the page buttons based on the current page.
   * @returns {JSX.Element[]}
   */
  function renderPageNumbers(): JSX.Element[] {
    const pageNumbers = getPageNumbers();
    const pageList: (number | string)[] = [];
  
    if (typeof pageNumbers[0] === "number" && pageNumbers[0] > 1) {
      pageList.push(1);
      if (pageNumbers[0] > 2) pageList.push("...");
    }
  
    pageNumbers.forEach((page) => pageList.push(page));
  
    if (
      typeof pageNumbers[pageNumbers.length - 1] === "number" &&
      (pageNumbers[pageNumbers.length - 1] as number) < totalPages
    ) {
      if ((pageNumbers[pageNumbers.length - 1] as number) < totalPages - 1)
        pageList.push("...");
      pageList.push(totalPages);
    }
  
    return pageList.map((item, index) => (
      <button
        key={index}
        onClick={() => typeof item === "number" && handlePageChange(item)}
        className={`${styles["table__pagination-button"]} ${
          currentPage === item ? styles["table__pagination-button--active"] : ""
        }`}
        disabled={typeof item !== "number"}
      >
        {item}
      </button>
    ));   
  };
  
  
  /**
   * Method responsible for updating the number of items displayed per page.
   * @param event - The change event from the select input
   * @returns {void}
   */
  function handleItemsPerPageChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.table}>
      <div className={styles["table__info"]}>
        <span>
          {sortedData.length === 0
            ? "Nenhum registro a ser exibido"
            : <span>Exibindo <strong>{paginatedData.length}</strong> de <strong>{sortedData.length}</strong> registros
          </span>
          }
        </span>
      </div>

      <table className={styles["table__wrapper"]}>
        <thead className={styles["table__thead"]}>
          <tr>
            {props.columns.columns.map((column) => (
              <th key={column.id} className={styles["table__thead-cell"]}>
                <div className={styles["table__thead-cell-content"]}>
                  <span className={styles["table__thead-cell-title"]}>{column.title}</span>
                  <div className={styles["table__thead-cell-actions"]}>
                    {column.sortable && (
                      <FaSort
                        size={12}
                        title="Sort"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSortClick(column.id)}
                      />
                    )}
                    {column.filterable && (
                      <div ref={inputRef} className={styles["table__filter-box"]}>
                        <FaFilter
                          size={12}
                          title="Filter"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilterActiveId((prev) => (prev === column.id ? null : column.id));
                          }}
                        />
                        {filterActiveId === column.id && (
                          <div className={styles["table__filter-box-popup"]}>
                            <input
                              type="text"
                              placeholder="Filtrar..."
                              value={filters[column.id] || ""}
                              onChange={(e) => handleFilterChange(column.id, e.target.value)}
                              autoFocus
                              className={styles["table__filter-box-input"]}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex} className={styles["table__tbody-row"]}>
                {props.columns.columns.map((column) => (
                  <td key={column.id} className={styles["table__tbody-row-cell"]}>
                    {column.render ? column.render(row) : row[column.id] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={props.columns.columns.length} className={styles["table__no-data"]}>
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles["table__pagination"]}>
        <div className={styles["table__pagination-items-per-page"]}>
          <label htmlFor="items-per-page">Itens por página:</label>
          <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className={styles["table__pagination-controls"]}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles["table__pagination-button"]} ${
              currentPage === 1 ? styles["table__pagination-button--disabled"] : ""
            }`}
          >
            <FaAngleLeft size={10} />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles["table__pagination-button"]} ${
              currentPage === totalPages ? styles["table__pagination-button--disabled"] : ""
            }`}
          >
            <FaAngleRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}
