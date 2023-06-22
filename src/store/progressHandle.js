import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

// local imports
import { apiCallBegan, ENDPOINTS } from "./middleware/api";

export const progressSlice = createSlice({
    name: 'progress',
    initialState: {
        boards: [
            {
                id: 0,
                title: "To Do",
                cards: []
            },
            {
                id: 1,
                title: "Ongoing",
                cards: []
            },
            {
                id: 2,
                title: "Done",
                cards: []
            },
        ],
        loading: false,
    },
    reducers: {
        boardsRequested: (state) => {
            state.loading = true;
        },
        boardRequestFaild: (state) => {
            state.loading = false;
        },
        boardsReceived: (state, action) => {
            state.boards = action.payload;
            state.loading = false;
        },
        cardAdded: (state, action) => {
            const { bId, card } = action.payload;
            state.boards[bId].cards.push(card);
        },
        cardUpdated: (state, action) => {
            const { bid, cid, card } = action.payload;

            const index = state.boards[bid].cards?.findIndex(card => card.id === cid);
            if (index >= 0) state.boards[bid].cards[index] = card;
        },
        cardRemoved: (state, action) => {
            const { bid, cid } = action.payload;
            
            const index = state.boards[bid].cards?.findIndex(card => card.id === cid);
            if (index >= 0) state.boards[bid].cards.splice(index, 1);
        },
        taskAdded: (state, action) => {
            const { bid, cid, task } = action.payload;

            const index = state.boards[bid].cards?.findIndex(tasks => tasks.id === cid);
            if (index >= 0) state.boards[bid].cards[index].tasks.push(task);
        },
        tasksUpdated: (state, action) => {
            const { bid, cid, tid, value } = action.payload;

            const cIndex = state.boards[bid].cards?.findIndex(card => card.id === cid);
            if (cIndex < 0) return;
            
            const tIndex = state.boards[bid].cards[cIndex]?.tasks?.findIndex(task => task.id === tid);
            if (tIndex >= 0) state.boards[bid].cards[cIndex].tasks[tIndex].completed = value;
        },
        taskDeleted: (state, action) => {
            const { bid, cid, tid } = action.payload;

            const cIndex = state.boards[bid].cards?.findIndex(card => card.id === cid);
            if (cIndex < 0) return;
            
            const tIndex = state.boards[bid].cards[cIndex]?.tasks?.findIndex(task => task.id === tid);
            if (tIndex >= 0) state.boards[bid].cards[cIndex]?.tasks?.splice(tIndex, 1);
        },
        cardPropUpdated: (state, action) => {
            const { bid, cid, propType, prop } = action.payload;

            const index = state.boards[bid]?.cards?.findIndex(card => card.id === cid);
            if (index < 0) return;
            
            state.boards[bid].cards[index][propType] = prop;
        },
        boardChanged: (state, action) => {
            const { sbId, dbId, scId, dcId } = action.payload;
            
            const cardCopy = { ...state.boards[parseInt(sbId)].cards[scId] }

            state.boards[parseInt(sbId)].cards.splice(scId, 1);
            state.boards[parseInt(dbId)].cards.splice(dcId, 0, cardCopy)
        }
    }
})

const {
    cardAdded,
    cardUpdated,
    cardRemoved,
    taskAdded,
    tasksUpdated,
    taskDeleted,
    cardPropUpdated,
    boardsRequested,
    boardRequestFaild,
    boardsReceived,
    boardChanged,
} = progressSlice.actions;

export default progressSlice.reducer;

// Action Creators

const url = ENDPOINTS.progress;

export const loardBoards = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: boardsRequested.type,
            onSuccess: boardsReceived.type,
            onError: boardRequestFaild.type
        })
    );
};

export const updateBoards = (boards) => (dispatch) => {
    dispatch({
        type: boardsReceived.type,
        payload: boards
    });
};

export const addCard = (id, title) => (dispatch) => {
    const newCard = {
        bId: id,
        card: {
            id: v4(),
            title,
            desc: "",
            tasks: [],
        }
    };

    dispatch({
        type: cardAdded.type,
        payload: newCard
    });
};

export const updateCard = (bid, cid, card) => (dispatch) => {
    dispatch({
        type: cardUpdated.type,
        payload: { bid, cid, card }
    });
};

export const removeCard = (bid, cid) => (dispatch) => {
    dispatch({
        type: cardRemoved.type,
        payload: { bid, cid }
    });
};

export const addTask = (bid, cid, task) => (dispatch) => {
    dispatch({
        type: taskAdded.type,
        payload: { bid, cid, task }
    });
};

export const updateTasks = (bid, cid, tid, value) => (dispatch) => {
    dispatch({
        type: tasksUpdated.type,
        payload: { bid, cid, tid, value }
    });
};

export const removeTask = (bid, cid, tid) => (dispatch) => {
    dispatch({
        type: taskDeleted.type,
        payload: { bid, cid, tid }
    });
};

export const updateCardProp = (bid, cid, propType, prop) => (dispatch) => {
    dispatch({
        type: cardPropUpdated.type,
        payload: { bid, cid, propType, prop }
    });
};

export const changeBoard = (sbId, dbId, scId, dcId) => (dispatch) => {
    dispatch({
        type: boardChanged.type,
        payload: { sbId, dbId, scId, dcId }
    });
}
