import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "../components/Column";
import { Candidate, ColumnKey, Data } from "../types/Candidate";
import { candidates } from "../mocks/candidates";

const Candidates = () => {
  const initialColumns = {
    applied: { id: "applied", title: "Applied", candidates: [] as string[] },
    interviewing: {
      id: "interviewing",
      title: "1st Round Interview",
      candidates: [] as string[],
    },
    offer: { id: "offer", title: "Offer", candidates: [] as string[] },
    rejected: { id: "rejected", title: "Rejected", candidates: [] as string[] },
  };

  const initializeData = (candidates: Record<string, Candidate>): Data => {
    // create a deep copy of the columns to avoid mutating the original structure
    const columns = JSON.parse(
      JSON.stringify(initialColumns),
    ) as typeof initialColumns;

    // populate candidates into the appropriate column
    for (const [key, candidate] of Object.entries(candidates)) {
      const columnKey = candidate.stage.toLowerCase() as ColumnKey;
      if (columns[columnKey]) {
        columns[columnKey].candidates.push(key);
      }
    }

    return { columns, candidates };
  };

  const [data, setData] = useState<Data>({
    columns: initialColumns,
    candidates: {},
  });

  useEffect(() => {
    setData(initializeData(candidates));
  }, []);

  const updateNotes = (candidateId: string, newNotes: string) => {
    setData((prevData) => ({
      ...prevData,
      candidates: {
        ...prevData.candidates,
        [candidateId]: {
          ...prevData.candidates[candidateId],
          notes: newNotes,
        },
      },
      columns: prevData?.columns ?? {}, // Ensure columns is not undefined
    }));
  };

  const addColumn = () => {
    // would need to create a new stage here

    const newColumnId = `column${Object.keys(data.columns).length + 1}`;
    const newColumn = {
      id: newColumnId,
      title: `New Column ${Object.keys(data.columns).length + 1}`,
      candidates: [],
    };

    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [newColumnId]: newColumn,
      },
    }));
  };

  const removeColumn = (columnId: string, columnItems: string[]) => {
    if (columnItems.length === 0) {
      setData((prevData) => {
        const { [columnId]: _, ...remainingColumns } = prevData.columns;
        return {
          ...prevData,
          columns: remainingColumns,
        };
      });
    } else {
      alert("Please move Candidates to another column");
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const fromColumnId = active.data.current?.columnId;
    const toColumnId = over.id;

    if (fromColumnId && fromColumnId !== toColumnId) {
      setData((prevData) => {
        const fromColumn = prevData.columns[fromColumnId];
        const toColumn = prevData.columns[toColumnId];

        const draggedItemId = active.id as string;

        // Remove the item from the source column
        const updatedFromItems = fromColumn.candidates.filter(
          (id) => id !== draggedItemId,
        );

        // Add the item to the target column
        const updatedToItems = [...toColumn.candidates, draggedItemId];

        return {
          ...prevData,
          columns: {
            ...prevData?.columns,
            [fromColumnId]: { ...fromColumn, candidates: updatedFromItems },
            [toColumnId]: { ...toColumn, candidates: updatedToItems },
          },
        };
      });
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {data ? (
        <div
          className="container"
          style={{ display: "flex", gap: "16px", height: "100%" }}
        >
          {Object.values(data.columns).map((column) => (
            <>
              <Column
                key={column.id}
                column={column}
                candidates={data.candidates}
                updateNotes={updateNotes}
              />
              <button
                onClick={() => removeColumn(column.id, column.candidates)}
              >
                <img width="10px" src="../cross.webp" alt="remove column" />
              </button>
            </>
          ))}
          <button className="add-column" onClick={addColumn}>
            Add Column
          </button>
        </div>
      ) : (
        <h1>Loading!</h1>
      )}
    </DndContext>
  );
};

export default Candidates;
