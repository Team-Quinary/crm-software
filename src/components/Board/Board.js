import React, { useState, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

// material-ui imports
import Typography from "@mui/material/Typography";

// redux imports
import store from '../../store/_storeConfig';
import { addCard } from '../../store/progressHandle';

// local imports
import BoardCard from "../BoardCard/BoardCard";
import Editable from "../Editable/Editable";
import "./Board.css";

const StrictModeDroppable = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return <Droppable {...props}>{children}</Droppable>;
};

function Board(props) {
    const {
        board,
    } = props;

    return (
        <div className="board">
            <div className="board_header">
                <Typography variant="h6">{board?.title}</Typography>
                <Typography variant="subtitle1">
                    Cards: <span>{board?.cards?.length || 0}</span>
                </Typography>
            </div>
            <div className="board_cards ">
                <Editable
                    text="+ Add Card"
                    placeholder="Enter Card Title"
                    displayClass="board_add-card"
                    editClass="board_add-card_edit"
                    onSubmit={(value) => store.dispatch(addCard(board?.id, value))}
                />
                <StrictModeDroppable droppableId={`${board.id}`}>
                    {(provided) =>
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={"droppable-col"}
                        >
                            {board?.cards?.map((item, index) => (
                                <Draggable key={index} index={index} draggableId={item.id}>
                                    {(provided, snapshot) =>
                                        <div
                                            className={`item ${snapshot.isDragging && "dragging"}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <BoardCard
                                                key={item.id}
                                                card={item}
                                                boardId={board.id}
                                            />
                                        </div>
                                    }
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    }
                </StrictModeDroppable>
            </div>
        </div>
    );
}

export default Board;
