import React, { useState } from "react";
import { Trash } from "react-feather";

// material-ui imports
import IconButton from '@mui/material/IconButton';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

// redux imports
import store from '../../store/_storeConfig';
import { removeCard, removeTask, updateTasks } from '../../store/progressHandle';

// local imports
import CardInfo from "./CardInfo/CardInfo";
import "./BoardCard.css";
import "./CardInfo/CardInfo.css";

function BoardCard(props) {
    const {
        card,
        boardId
    } = props;

    const [showModal, setShowModal] = useState(false);

    const deleteTask = (id) => {
        store.dispatch(removeTask(boardId, card.id, id));
    };

    const editTask = (id, value) => {
        store.dispatch(updateTasks(boardId, card.id, id, value));
    };

    const calculatePercent = () => {
        if (!card.tasks?.length) return 0;
        const completed = card.tasks?.filter((item) => item.completed)?.length;

        return (completed / card.tasks?.length) * 100;
    };

    return (
        <>
            <CardInfo
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                card={card}
                boardId={boardId}
            />

            <div
                className="card"
                draggable
            >
                <div className="card_top">
                    <div className="card_title">{card.title}</div>
                    <IconButton onClick={() => setShowModal(true)} sx={{ border: '1px solid gray', width: '30px', height: '30px' }}>
                        <EditOutlined style={{ fontSize: '0.8em' }} />
                    </IconButton>
                    <IconButton onClick={() => store.dispatch(removeCard(boardId, card.id))} sx={{ border: '1px solid gray', width: '30px', height: '30px' }}>
                        <DeleteOutlined style={{ fontSize: '0.8em' }} />
                    </IconButton>
                </div>

                <div className="card_footer">
                    <div>
                        <div className="cardinfo_box_title">
                            <p>Tasks</p>
                            <div className="cardinfo_box_progress-bar">
                                <div
                                    className="cardinfo_box_progress"
                                    style={{
                                        width: `${calculatePercent()}%`,
                                        backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div className="cardinfo_box_task_list">
                            {card.tasks?.map((item, index) => (
                                <div key={index} className="cardinfo_box_task_checkbox">
                                    <input
                                        type="checkbox"
                                        defaultChecked={item.completed}
                                        onChange={(event) =>
                                            editTask(item.id, event.target.checked)
                                        }
                                    />
                                    <p className={item.completed ? "completed" : ""}>{item.text}</p>
                                    <Trash onClick={() => deleteTask(item.id)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardCard;
