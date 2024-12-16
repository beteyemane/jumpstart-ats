import { useDraggable } from "@dnd-kit/core";
import { ItemProps } from "../types/Candidate";
import { useState } from "react";
import { NotesModalComponent } from "./NotesModalComponent";

const Item = ({ id, item, columnId, updateNotes }: ItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { columnId },
  });
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
  };

  if (!item) return null;
  return (
    <>
      <div className="item-container">
        <div
          style={style}
          ref={setNodeRef}
          className="item"
          {...listeners}
          {...attributes}
        >
          <div className="basic-info-container">
            <img
              className="profile-photo"
              src={item.photo}
              alt={item.fullName}
            />
            <div className="side-container">
              <h3>{item.fullName}</h3>
              <div className="icon-container">
                <a target="_blank" href={item.linkedIn} rel="noreferrer">
                  <img width="20px" src="../linkedin.png" alt="linkedin"></img>
                </a>
                <a target="_blank" href={item.cvRaw} rel="noreferrer">
                  <img width="20px" src="../cv.png" alt="cv"></img>
                </a>
                <a target="_blank" href={item.videoIntro} rel="noreferrer">
                  <img width="20px" src="../video.png" alt="video"></img>
                </a>
              </div>
              <div>
                <p>
                  {item.minSalary}-{item.idealSalary}
                </p>
                <p>{item.preferredWorkingStyle}</p>
                <p>{item.technologies}</p>
              </div>
            </div>
          </div>
          <div className="button-container">
            {" "}
            <button
              onPointerDown={(e) => e.stopPropagation()}
              className="view-more"
              onClick={(e) => {
                e.preventDefault();
                toggleVisibility();
              }}
            >
              {isVisible ? "View Less" : "View More"}
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleOpen}
            >
              <img width="20px" src="../notes.png" alt="add notes" />
            </button>
            <NotesModalComponent
              id={columnId}
              handleClose={handleClose}
              notes={item.notes}
              open={open}
              updateNotes={updateNotes}
            />
          </div>
          <div
            className={`work-experience-container ${isVisible ? "visible" : "hidden"}`}
          >
            <div className="undergrad-container">
              <h3>
                {item.undergradDegreeType}
                {item.undergradSubject} @ {item.undergradUniversity} (
                {item.undergradGraduationYear})
              </h3>
            </div>
            {item.workExperience?.map((work) => (
              <div className="work-experience-item-container">
                <div>
                  <p className="work-title">
                    {work.role} @ {work.company} ({work.timeSpent})
                  </p>
                </div>
                <p>{work.description}</p>
              </div>
            ))}
            <div className="application-rationale">
              <p>"{item.applicationRationale}"</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
