
import React from "react";
import {  DragDropContext } from "react-beautiful-dnd";

// redux imports
import { useSelector } from "react-redux";
import store from '../../store/_storeConfig';
import {
    changeBoard
} from '../../store/progressHandle';

// local imports
import { Board } from "../../components";
import "./Styles.css";

function Progress() {
    const boards = useSelector((state) => state.entities.progress.boards);

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return;
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }

        store.dispatch(changeBoard(source.droppableId, destination.droppableId, source.index, destination.index));
    };

    return (
        <div className="progress">
            <div className="app_boards_container">
                <div className="app_boards">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {boards.map((board) => (
                            <Board
                                key={board.id}
                                board={board}
                            />
                        ))}
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}

export default Progress;
