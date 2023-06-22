import React from "react";

// redux imports
import store from '../../../store/_storeConfig';
import { addTask, updateCardProp } from '../../../store/progressHandle';

// material-ui imports
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

// local imports
import Editable from "../../Editable/Editable";
import "./CardInfo.css";

function CardInfo(props) {
    const {
        isOpen,
        onClose,
        card,
        boardId,
    } = props;

    const updateTitle = (value) => {
        store.dispatch(updateCardProp(boardId, card.id, 'title', value));
    };

    const updateDesc = (value) => {
        store.dispatch(updateCardProp(boardId, card.id, 'desc', value));
    };

    const saveTask = (value) => {
        const task = {
            id: card.tasks.length,
            completed: false,
            text: value,
        };

        store.dispatch(addTask(boardId, card.id, task));
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth={true}
            maxWidth={'xs'}
        >
            <DialogTitle>
                Edit Card
            </DialogTitle>
            <Divider />
            <DialogContent>
                <div className="cardinfo">
                    <div className="cardinfo_box">
                        <p>Title</p>
                        <Editable
                            defaultValue={card.title}
                            text={card.title}
                            placeholder="Enter Title"
                            onSubmit={updateTitle}
                        />
                    </div>

                    <div className="cardinfo_box">
                        <p>Description</p>
                        <Editable
                            defaultValue={card.desc}
                            text={card.desc || "Add a Description"}
                            placeholder="Enter description"
                            onSubmit={updateDesc}
                        />
                    </div>

                    <div className="cardinfo_box">
                        <div style={{ gridColumn: '1 / span 2' }}>
                            <Editable
                                text={"Add a Task"}
                                placeholder="Enter task"
                                onSubmit={saveTask}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CardInfo;
