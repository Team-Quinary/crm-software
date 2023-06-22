import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// local imports
import { apiCallBegan, ENDPOINTS } from "./middleware/api";

export const feedbackFormSlice = createSlice({
    name: 'feedbackForms',
    initialState: {
        list: [
            {
                id: 1,
                name: "Feedback Survey",
                description: "Please provide your feedback on our services.",
                questions: [
                    {
                        id: 1,
                        text: "What is your overall satisfaction level?",
                        type: "radio",
                        isRequired: 1,
                        options: [
                            { id: 1, text: "Very Satisfied" },
                            { id: 2, text: "Satisfied" },
                            { id: 3, text: "Neutral" },
                            { id: 4, text: "Unsatisfied" },
                            { id: 5, text: "Very Unsatisfied" },
                        ],
                    },
                    {
                        id: 2,
                        text: "Please provide any suggestions or comments.",
                        type: "para",
                        isRequired: 0,
                    },
                ],
            },
            {
                id: 2,
                name: "Registration Form",
                description: "Please fill out the registration form.",
                questions: [
                    {
                        id: 1,
                        text: "Full Name",
                        type: "short",
                        isRequired: 1,
                    },
                    {
                        id: 2,
                        text: "Email Address",
                        type: "short",
                        isRequired: 1,
                    },
                    {
                        id: 3,
                        text: "Gender",
                        type: "radio",
                        isRequired: 1,
                        options: [
                            { id: 1, text: "Male" },
                            { id: 2, text: "Female" },
                        ],
                    },
                    {
                        id: 4,
                        text: "Which programming languages do you know? (Select all that apply)",
                        type: "check",
                        isRequired: 0,
                        options: [
                            { id: 1, text: "C" },
                            { id: 2, text: "C++" },
                            { id: 3, text: "Java" },
                            { id: 4, text: "Python" },
                            { id: 5, text: "JavaScript" },
                        ]
                    },
                ],
            },
            {
                id: 3,
                name: "Customer Satisfaction Survey",
                description: "Please rate your satisfaction with our product.",
                questions: [
                    {
                        id: 1,
                        text: "How likely are you to recommend our product to others?",
                        type: "radio",
                        isRequired: 1,
                        options: [
                            { id: 1, text: "Very Likely" },
                            { id: 2, text: "Likely" },
                            { id: 3, text: "Neutral" },
                            { id: 4, text: "Unlikely" },
                            { id: 5, text: "Very Unlikely" },
                        ],
                    },
                    {
                        id: 2,
                        text: "Please provide any additional comments.",
                        type: "para",
                        isRequired: 0,
                    },
                ],
            },
        ],
        loading: false,
    },
    reducers: {
        formsRequested: (state) => {
            state.loading = true;
        },
        formsRequestFailed: (state) => {
            state.loading = false;
        },
        formsReceived: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        formAdded: (state, action) => {
            state.list.push(action.payload);
        },
        formNameUpdated: (state, action) => {
            const { id, name } = action.payload;
            const index = state.list.findIndex((form) => form.formId === id);
            state.list[index].name = name;
        },
        formDescriptionUpdated: (state, action) => {
            const { id, description } = action.payload;
            const index = state.list.findIndex((form) => form.formId === id);
            state.list[index].description = description;
        },
        formUpdated: (state, action) => {
            const { id, type, value } = action.payload;
            const index = state.list.findIndex((form) => form.formId === id);
            state.list[index][type] = value;
        },
        formDeleted: (state, action) => {
            const index = state.list.findIndex((form) => form.formId === action.payload.formId);
            state.list.splice(index, 1);
        },
        questionAdded: (state, action) => {
            const { formId, question } = action.payload;
            const index = state.list.findIndex((form) => form.formId === formId);
            state.list[index].questions.push({
                text: question,
                type: "short",
                isRequired: 0,
                options: [],
            });
        },
        questionUpdated: (state, action) => {
            const { formId, question } = action.payload;
            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === question.questionId
            );
            state.list[index].questions[questionIndex] = question;
        },
        questionTextChanged: (state, action) => {
            const { formId, questionId, text } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            state.list[index].questions[questionIndex].text = text;
        },
        questionTypeChanged: (state, action) => {
            const { formId, questionId, type } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            state.list[index].questions[questionIndex].type = type;
        },
        questionRequiredChanged: (state, action) => {
            const { formId, questionId, isRequired } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            state.list[index].questions[questionIndex].isRequired = isRequired;
        },
        questionOptionAdded: (state, action) => {
            const { formId, questionId, option } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            
            if(!state.list[index].questions[questionIndex].options) {
                state.list[index].questions[questionIndex].options = [];
            }

            state.list[index].questions[questionIndex].options.push({
                id: state.list[index].questions[questionIndex].options.length + 1,
                text: option,
            });
        },
        questionOptionUpdated: (state, action) => {
            const { formId, questionId, optionId, text } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            const optionIndex = state.list[index].questions[questionIndex].options.findIndex(
                (o) => o.id === optionId
            );
            state.list[index].questions[questionIndex].options[optionIndex].text = text;
        },
        questionOptionDeleted: (state, action) => {
            const { formId, questionId, optionId } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            const optionIndex = state.list[index].questions[questionIndex].options.findIndex(
                (o) => o.id === optionId
            );
            state.list[index].questions[questionIndex].options.splice(optionIndex, 1);
        },
        questionDeleted: (state, action) => {
            const { formId, questionId } = action.payload;
            const index = state.list.findIndex((form) => form.formId === formId);
            const questionIndex = state.list[index].questions.findIndex(
                (q) => q.questionId === questionId
            );
            state.list[index].questions.splice(questionIndex, 1);
        },
        questionOrderChanged: (state, action) => {
            const { formId, sIndex, dIndex } = action.payload;

            const index = state.list.findIndex((form) => form.formId === formId);
            if(index < 0) return;

            const [removed] = state.list[index].questions.splice(sIndex, 1);
            state.list[index].questions.splice(dIndex, 0, removed);
        }
    }
})

const {
    formsRequested,
    formsRequestFailed,
    formsReceived,
    formAdded,
    formNameUpdated,
    formDescriptionUpdated,
    formUpdated,
    formDeleted,
    questionAdded,
    questionUpdated,
    questionDeleted,
    questionOrderChanged,
    questionTypeChanged,
    questionTextChanged,
    questionRequiredChanged,
    questionOptionAdded,
    questionOptionUpdated,
    questionOptionDeleted
} = feedbackFormSlice.actions;

export default feedbackFormSlice.reducer;

// Action Creators

const url = ENDPOINTS.feedbackForm;

export const loadFeedbackForms = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: formsRequested.type,
            onSuccess: formsReceived.type,
            onError: formsRequestFailed.type
        })
    );
};

export const saveForm = (form) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.feedbackSaveChanges,
            method: 'post',
            data: form,
        })
    );
};

export const addForm = (formName) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: { name: formName, questions: [] },
            onSuccess: formAdded.type,
        })
    );
    // dispatch({
    //     type: formAdded.type,
    //     payload: formName,
    // });
};

export const deleteForm = (feedbackFormId) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + feedbackFormId,
            method: 'delete',
            data: feedbackFormId,
            onSuccess: formDeleted.type,
        })
    );
    // dispatch({
    //     type: formDeleted.type,
    //     payload: id,
    // });
};

export const updateFormName = (id, name) => (dispatch) => {
    dispatch({
        type: formNameUpdated.type,
        payload: { id, name },
    });
};

export const updateFormDescription = (id, description) => (dispatch) => {
    dispatch({
        type: formDescriptionUpdated.type,
        payload: { id, description },
    });
};

export const updateForm = (id, type, value) => (dispatch) => {
    dispatch({
        type: formUpdated.type,
        payload: { id, type, value },
    });
};

export const addQuestion = (formId, question) => (dispatch) => {
    dispatch({
        type: questionAdded.type,
        payload: { formId, question },
    });
}

export const updateQuestion = (formId, question) => (dispatch) => {
    dispatch({
        type: questionUpdated.type,
        payload: { formId, question },
    });
}

export const deleteQuestion = (formId, questionId) => (dispatch) => {
    dispatch({
        type: questionDeleted.type,
        payload: { formId, questionId },
    });
}

export const changeQuestionOrder = (formId, sIndex, dIndex) => (dispatch) => {
    dispatch({
        type: questionOrderChanged.type,
        payload: { formId, sIndex, dIndex },
    });
}

export const changeQuestionType = (formId, questionId, type) => (dispatch) => {
    dispatch({
        type: questionTypeChanged.type,
        payload: { formId, questionId, type },
    });
}

export const changeQuestionText = (formId, questionId, text) => (dispatch) => {
    dispatch({
        type: questionTextChanged.type,
        payload: { formId, questionId, text },
    });
}

export const changeQuestionRequired = (formId, questionId, isRequired) => (dispatch) => {
    dispatch({
        type: questionRequiredChanged.type,
        payload: { formId, questionId, isRequired },
    });
}

export const addQuestionOption = (formId, questionId, option) => (dispatch) => {
    dispatch({
        type: questionOptionAdded.type,
        payload: { formId, questionId, option },
    });
}

export const updateQuestionOption = (formId, questionId, optionId, text) => (dispatch) => {
    dispatch({
        type: questionOptionUpdated.type,
        payload: { formId, questionId, optionId, text },
    });
}

export const deleteQuestionOption = (formId, questionId, optionId) => (dispatch) => {
    dispatch({
        type: questionOptionDeleted.type,
        payload: { formId, questionId, optionId },
    });
}

// Selectors

export const getFormById = (id) => createSelector(
    state => state.entities.feedbackForms.list,
    feedbackForms => feedbackForms.filter(form => form.formId === id)
);
