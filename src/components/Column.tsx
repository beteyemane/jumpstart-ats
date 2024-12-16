import { useDroppable } from "@dnd-kit/core";
import Item from "./Item";
import { ColumnProps } from "../types/Candidate";

const Column = ({ column, items, updateNotes }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        width: "200px",
        minHeight: "150px",
      }}
      className="column"
    >
      <h3>{column.title}</h3>
      {column.items.map((itemId) => (
        <>
          <Item
            key={itemId}
            id={itemId}
            item={items[itemId]}
            columnId={column.id}
            updateNotes={updateNotes}
          />
        </>
      ))}
    </div>
  );
};

export default Column;
