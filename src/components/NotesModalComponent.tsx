import { Modal, Box, Button, Typography } from "@mui/material";
import { NotesModalProps } from "../types/Candidate";
import { Textarea } from "flowbite-react";

export const NotesModalComponent: React.FC<NotesModalProps> = ({
  id,
  handleClose,
  open,
  notes,
  updateNotes,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Add Notes{" "}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <div>
            <Textarea
              value={notes}
              onChange={(e) => updateNotes(id, e.target.value)}
            />
          </div>{" "}
        </Typography>
        <Button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => handleClose()}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
