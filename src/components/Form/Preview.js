import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// redux imports
import { useSelector } from 'react-redux';

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
    dragIndicator: {
        transform: 'rotate(-90deg)',
        color: '#666',
        margin: '10px'
    },
    accordion: {
        width: '100%',
        borderTop: '1px solid #f4f4f9',
        backgroundColor: 'white', 
        borderRadius: '8px', 
        marginTop: '20px'
    },
    tempAnswers: {
        marginTop: '10px',
        marginRight: '30px',
        gridColumn: '2 / span 1',
    },
    questionPreview: {
        display: 'grid',
        gridTemplateColumns: '20px 1fr',
        columnGap: '10px',
        padding: '10px',
    },
    questionEdit: {
        display: 'grid',
        gridTemplateColumns: '20px 1fr 180px',
        columnGap: '10px',
        alignItems: 'center',
    },
    optionEdit: {
        display: 'grid',
        gridTemplateColumns: '40px 1fr 40px',
        columnGap: '10px',
        alignItems: 'center',
    }
}));

const Preview = ({ formId }) => {
    const styles = formStyles();

    const form = useSelector((state) => state.entities.feedbackForms.list.find((form) => form.formId === formId));

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setAnswers(form.questions.map((question) => {
            return {
                id: question.questionId,
                answer: '',
            }
        }));
    }, [form]);

    return (
        <div className={styles.form}>
            <div className={styles.section}>
                <div className={styles.formTop}>
                    <Typography variant='h4' style={{ marginBottom: '10px' }}>{form.name}</Typography>
                    <Typography variant='subtitle'>{form.description}</Typography>
                </div>
                {form?.questions?.map((question, index) => (
                    <div className={styles.accordion} key={index}>
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
                                                value={answers.find((answer) => answer.id === question.questionId) && answers.find((answer) => answer.id === question.questionId).answer}
                                                onChange={(event) => {
                                                    answers && setAnswers(answers.map((answer) =>
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
                                    ) : (
                                        <div>
                                            <TextField
                                                fullWidth
                                                variant='outlined'
                                                size="small"
                                                multiline={question.type === 'para'}
                                                rows={question.type === 'para' ? 4 : 1}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Preview;
