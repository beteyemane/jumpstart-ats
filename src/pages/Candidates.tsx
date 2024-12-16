import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "../components/Column";
import { Data } from "../types/Candidate";
import { candidates } from "../mocks/candidates";

const Candidates = () => {
  const initialData: Data = {
    columns: {
      column1: {
        id: "column1",
        title: "Applied",
        items: ["item1", "item2", "item3", "item4"],
      },
      column2: { id: "column2", title: "1st Round Interview", items: [] },
      column3: { id: "column3", title: "Offer", items: [] },
      column4: { id: "column4", title: "Rejected", items: [] },
    },
    items: candidates,
  };

  const [data, setData] = useState<Data>(initialData);

  const updateNotes = (candidateId: string, newNotes: string) => {
    setData((prevData) => ({
      ...prevData,
      items: {
        ...prevData.items,
        [candidateId]: {
          ...prevData.items[candidateId],
          notes: newNotes,
        },
      },
    }));
  };

  const addColumn = () => {
    const newColumnId = `column${Object.keys(data.columns).length + 1}`;
    const newColumn = {
      id: newColumnId,
      title: `New Column ${Object.keys(data.columns).length + 1}`,
      items: [],
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
        const updatedFromItems = fromColumn.items.filter(
          (id) => id !== draggedItemId,
        );

        // Add the item to the target column
        const updatedToItems = [...toColumn.items, draggedItemId];

        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [fromColumnId]: { ...fromColumn, items: updatedFromItems },
            [toColumnId]: { ...toColumn, items: updatedToItems },
          },
        };
      });
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="container"
        style={{ display: "flex", gap: "16px", height: "100%" }}
      >
        {Object.values(data.columns).map((column) => (
          <>
            <Column
              key={column.id}
              column={column}
              items={data.items}
              updateNotes={updateNotes}
            />
            <button onClick={() => removeColumn(column.id, column.items)}>
              <img width="10px" src="../cross.webp" alt="remove column" />
            </button>
          </>
        ))}
        <button className="add-column" onClick={addColumn}>
          Add Column
        </button>
      </div>
    </DndContext>
  );
};

export default Candidates;
