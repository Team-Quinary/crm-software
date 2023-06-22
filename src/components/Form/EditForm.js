import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// material-ui imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShortTextIcon from '@mui/icons-material/ShortText';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// redux imports
import { useSelector } from 'react-redux';
import store from "../../store/_storeConfig";
import {
    changeQuestionOrder, changeQuestionText, changeQuestionType, addQuestion,
    updateFormName, updateFormDescription, changeQuestionRequired,
    addQuestionOption, updateQuestionOption, deleteQuestionOption, deleteQuestion, 
} from "../../store/feedbackFormHandle";

// local imports
import Alert from '../Alert/Alert';

// styles
const formStyles = createUseStyles((theme) => ({
    form: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        margin: 'auto',
        width: '70%',
        borderRadius: '8px',
    },
    section: {
        width: '100%',
        '& .MuiAccordion-root': {
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
        },
        '& .MuiPaper-root': {
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
        }
    },
    formTop: {
        backgroundColor: 'white',
        borderTop: '8px solid rgb(103, 58, 183)',
        borderRadius: '8px',
        padding: '30px 25px',
        textTransform: 'capitalize',
    },
    formName: {
        fontSize: '50px',
    },
    formDescription: {
        boxSizing: 'border-box',
        marginTop: '10px',
        fontFamily: "'Google sans', 'Roboto', 'Arial', sans-serif",
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '40px',
        width: '100%',
        border: 'none',
        outline: 'none',
        borderBottom: '1px solid #f4f4f9',
        color: 'black',
        height: '20px',
    },
    dragIndicator: {
        transform: 'rotate(-90deg)',
        color: '#666',
        margin: '10px'
    },
    expandedQuestion: {
        borderLeft: '6px solid rgb(103, 58, 183)'
    },
    accordion: {
        width: '100%',
        borderTop: '1px solid #f4f4f9',
    },
    tempAnswers: {
        marginTop: '10px',
        gridColumn: '2 / span 1',
    },
    questionPreview: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '20px 1fr',
        columnGap: '10px',
    },
    questionEdit: {
        display: 'grid',
        gridTemplateColumns: '20px 1fr 180px',
        columnGap: '10px',
        alignItems: 'end',
    },
    optionEdit: {
        display: 'grid',
        gridTemplateColumns: '40px 1fr 40px',
        columnGap: '10px',
        alignItems: 'center',
    },
    addNewOption: {
        display: 'grid',
        gridTemplateColumns: '20px 1fr 0.5fr',
        columnGap: '20px',
        alignItems: 'center',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '8px',
        backgroundColor: '#f4f4f9',
    },
    addNewQuestion: {
        display: 'grid',
        gridTemplateColumns: '20px 1fr 0.5fr',
        columnGap: '20px',
        alignItems: 'center',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '8px',
        backgroundColor: '#fff',
    }
}));

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

const EditForm = ({ formId, formName }) => {
    const styles = formStyles();
    console.log(formId, formName)

    const form = useSelector((state) => state.entities.feedbackForms.list.find((form) => 
        (form.name === formName))
    );

    console.log(form)

    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [autoFocusField, setAutoFocusField] = useState('');

    const [answers, setAnswers] = useState([]);
    const [openedQuestion, setOpenedQuestion] = useState(form ? form.questions[0] : null);
    const [newOption, setNewOption] = useState('');
    const [newQuestion, setNewQuestion] = useState('');

    useEffect(() => {
        form && setAnswers(form.questions.map((question) => {
            return {
                id: question.questionId,
                answer: '',
            }
        }));
    }, [form && form.questions]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        store.dispatch(changeQuestionOrder(form.formId, result.source.index, result.destination.index));
    }

    const handleQuestionTextChange = (id, text) => {
        store.dispatch(changeQuestionText(form.formId, id, text));
    };

    const handleQuestionTypeChange = (id, type) => {
        store.dispatch(changeQuestionType(form.formId, id, type));
    };

    const DraggableItem = ({ question, index }) => {
        return (
            <Stack
                direction='column'

                alignItems='center'
                justifyContent={'center'}
                sx={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', mt: '20px' }}
                className={
                    openedQuestion !== null && openedQuestion !== undefined 
                    ? (openedQuestion.questionId === question.questionId ? styles.expandedQuestion : '')
                    : styles.expandedQuestion
                }
            >
                <DragIndicatorOutlinedIcon className={styles.dragIndicator} />
                <Accordion
                    className={styles.accordion}
                    expanded={
                        (openedQuestion !== null && openedQuestion !== undefined)
                        ? openedQuestion.questionId === question.questionId : true
                    }
                    onChange={() => setOpenedQuestion(question)}
                >
                    <AccordionSummary>
                        <div className={styles.questionPreview}>
                            <Typography sx={{ justifySelf: 'right' }}>
                                {index + 1}.
                            </Typography>
                            <Stack direction='row' alignItems='flex-start'>
                                {question.isRequired ? <span style={{ color: 'red', marginRight: '5px' }}>*</span> : null}
                                <Typography>
                                    {question.text}
                                </Typography>
                            </Stack>
                            <div className={styles.tempAnswers}>
                                {
                                    question.type === 'radio' && question.options ? (
                                        <FormControl>
                                            <RadioGroup
                                                value={answers.find((answer) => answer.id === question.questionId).answer}
                                                onChange={(event) => {
                                                    setAnswers(answers.map((answer) =>
                                                        answer.id === question.questionId
                                                            ? { ...answer, answer: event.target.value }
                                                            : answer
                                                    ))
                                                }}
                                            >
                                                {question.options.map((option, index) => (
                                                    <FormControlLabel key={index} value={option.optionId} control={<Radio />} label={option.text} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    ) : question.type === 'check' && question.options ? (
                                        <FormGroup>
                                            {question.options.map((option, index) => (
                                                <FormControlLabel key={index} control={<Checkbox />} value={option.optionId} label={option.text} />
                                            ))}
                                        </FormGroup>
                                    ) : question.type === 'para' || question.type === 'short' ? (
                                        <div>
                                            <TextField
                                                fullWidth
                                                variant='outlined'
                                                size="small"
                                                multiline={question.type === 'para'}
                                                rows={question.type === 'para' ? 2 : 1}
                                            />
                                        </div>
                                    ) : ""
                                }
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.questionEdit}>
                            <Typography sx={{ justifySelf: 'right' }}>
                                {index + 1}.
                            </Typography>

                            <Stack direction='row' alignItems='flex-start'>
                                {question.isRequired ? <span style={{ color: 'red', marginRight: '5px' }}>*</span> : null}
                                <TextField
                                    onFocus={() => setAutoFocusField('question')}
                                    autoFocus={autoFocusField === 'question'}
                                    fullWidth
                                    variant='standard'
                                    size="small"
                                    value={question.text}
                                    onChange={(e) => handleQuestionTextChange(question.questionId, e.target.value)}
                                />
                            </Stack>
                            <FormControl fullWidth>
                                <InputLabel>Question Type</InputLabel>
                                <Select
                                    variant='outlined'
                                    value={question.type}
                                    label="Question Type"
                                    size='small'
                                    onChange={(e) => handleQuestionTypeChange(question.questionId, e.target.value)}
                                    renderValue={(selected) => {
                                        if (selected === 'para') {
                                            return 'Paragraph';
                                        }
                                        if (selected === 'short') {
                                            return 'Short Answer';
                                        }
                                        if (selected === 'radio') {
                                            return 'Multi Choice';
                                        }
                                        if (selected === 'check') {
                                            return 'Checkboxes';
                                        }
                                        return '';
                                    }}
                                >
                                    <MenuItem value='para'>
                                        <ListItemIcon>
                                            <ViewHeadlineIcon />
                                        </ListItemIcon>
                                        Paragraph
                                    </MenuItem>
                                    <MenuItem value='short'>
                                        <ListItemIcon>
                                            <ShortTextIcon />
                                        </ListItemIcon>
                                        Short Answer
                                    </MenuItem>
                                    <MenuItem value='radio'>
                                        <ListItemIcon>
                                            <RadioButtonCheckedIcon />
                                        </ListItemIcon>
                                        Multi Choice
                                    </MenuItem>
                                    <MenuItem value='check'>
                                        <ListItemIcon>
                                            <CheckBoxIcon />
                                        </ListItemIcon>
                                        Checkboxes
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <div className={styles.tempAnswers}>
                                {
                                    question.type === 'radio' && question.options ? (
                                        <FormControl>
                                            {question.options.map((option, index) => (
                                                <div key={index} className={styles.optionEdit}>
                                                    <Radio disabled />
                                                    <TextField
                                                        onFocus={() => setAutoFocusField('option')}
                                                        autoFocus={autoFocusField === 'option'}
                                                        fullWidth
                                                        variant='standard'
                                                        value={option.text}
                                                        onChange={(e) => store.dispatch(updateQuestionOption(form.formId, question.questionId, option.optionId, e.target.value))}
                                                    />
                                                    <IconButton onClick={() => store.dispatch(deleteQuestionOption(form.formId, question.questionId, option.optionId))}>
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                </div>
                                            ))}
                                        </FormControl>
                                    ) : question.type === 'check' && question.options ? (
                                        <FormControl>
                                            {question.options.map((option, index) => (
                                                <div key={index} className={styles.optionEdit}>
                                                    <Checkbox disabled />
                                                    <TextField
                                                        onFocus={() => setAutoFocusField('option')}
                                                        autoFocus={autoFocusField === 'option'}
                                                        fullWidth
                                                        variant='standard'
                                                        value={option.text}
                                                        onChange={(e) => store.dispatch(updateQuestionOption(form.formId, question.questionId, option.optionId, e.target.value))}
                                                    />
                                                    <IconButton onClick={() => store.dispatch(deleteQuestionOption(form.formId, question.questionId, option.optionId))}>
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                </div>
                                            ))}
                                        </FormControl>
                                    ) : ""
                                }
                                {(question.type === 'radio' || question.type === 'check') && <div className={styles.addNewOption}>
                                    <AddCircleOutlineOutlinedIcon />
                                    <TextField
                                        autoFocus={autoFocusField === 'newOption'}
                                        onFocus={() => setAutoFocusField('newOption')}
                                        fullWidth
                                        variant='standard'
                                        size="small"
                                        value={newOption}
                                        placeholder='New Option'
                                        onChange={(e) => setNewOption(e.target.value)}
                                    />
                                    <Button
                                        variant='contained'
                                        onClick={() => {
                                            store.dispatch(addQuestionOption(form.formId, question.questionId, newOption));
                                            setNewOption('');
                                        }}
                                    >
                                        Add Option
                                    </Button>
                                </div>}
                            </div>
                            <div style={{ display: 'flex', marginTop: '20px' }}>
                                <IconButton onClick={() => store.dispatch(deleteQuestion(form.formId, question.questionId))}>
                                    <DeleteOutlined />
                                </IconButton>
                                <Stack direction="row" spacing={1} alignItems='center'>
                                    <Switch
                                        checked={question.isRequired}
                                        onChange={() => store.dispatch(changeQuestionRequired(form.formId, question.questionId, !(question.isRequired)))}
                                    />
                                    <Typography>Required</Typography>
                                </Stack>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        )
    };

    return (
        <div className={styles.form}>
            <div className={styles.section}>
                <div className={styles.formTop}>
                    <TextField
                        onFocus={() => setAutoFocusField('formName')}
                        autoFocus={autoFocusField === 'formName'}
                        variant='standard'
                        placeholder="Untitled Document"
                        value={form ? form.name : null}
                        onChange={(e) => store.dispatch(updateFormName(form.formId, e.target.value))}
                        InputProps={{
                            style: { fontSize: '34px' }
                        }}
                    />
                    <br />
                    <TextField
                        onFocus={() => setAutoFocusField('formDesc')}
                        autoFocus={autoFocusField === 'formDesc'}
                        fullWidth
                        variant='standard'
                        placeholder="Description"
                        value={form ? form.description : null}
                        onChange={(e) => store.dispatch(updateFormDescription(form.formId, e.target.value))}
                        InputProps={{
                            style: { fontSize: '16px', marginTop: '10px' }
                        }}
                    />
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <StrictModeDroppable droppableId="droppable">
                        {(provided, _snapshot_) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {form && form?.questions?.map((question, index) => (
                                    <Draggable key={index} draggableId={index + 'id'} index={index}>
                                        {(provided, _snapshot_) => (
                                            <div ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <DraggableItem question={question} index={index} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                <div className={styles.addNewQuestion}>
                                    <AddCircleOutlineOutlinedIcon />
                                    <TextField
                                        onFocus={() => setAutoFocusField('newQuestion')}
                                        autoFocus={autoFocusField === 'newQuestion'}
                                        fullWidth
                                        variant='standard'
                                        size="small"
                                        value={newQuestion}
                                        placeholder='New Question'
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                    />
                                    <Button
                                        variant='contained'
                                        onClick={() => {
                                            if (newQuestion.length > 0) {
                                                store.dispatch(addQuestion(form.formId, newQuestion));
                                                setNewQuestion('');
                                            }
                                            else setIsAlertOpened(true);
                                        }}
                                    >
                                        Add Question
                                    </Button>
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </StrictModeDroppable>
                </DragDropContext>
            </div>

            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message="Textfield is Required!"
                severity="warning"
            />
        </div>
    );
}

export default EditForm;
