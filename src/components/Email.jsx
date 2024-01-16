import React from 'react'
import { Box, Typography, Checkbox, styled } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS  } from '../services/api.urls';



const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& > div': {
        display: 'flex',
        width: '100%',
        '& > p': {
            fontsize: 14
        }
    }
});

const Indicataor = styled(Typography)({
    fontSize: '12px important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6

});

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5f6368'

})

const Email = ({ email, selectedEmails,setStarredEmail,setSelectedemails}) => {

    const navigate = useNavigate();

    const toggleStarredService = useApi(API_URLS.toggleStarredEmail);

    const toggleStarredEmails = () => {
        toggleStarredService.call({ id: email._id, value: !email.starred })
        setStarredEmail(prevState => !prevState);
    }

    const onValueChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedemails(prevState => prevState.filter(id => id != email._id));
        } else {
            setSelectedemails(prevState => [...prevState, email._id])
        }
    }

    return (
        <Wrapper>
            <Checkbox
                size='small'
                checked={selectedEmails.includes(email._id)}
                onChange ={() => onValueChange()}
            />

            {
                email.starred ?
                    <Star fontSize='small' style={{ marginRight: 10,color:'#fff200' }} onClick={() => toggleStarredEmails()} />
                    :
                    <StarBorder fontSize='small' style={{ marginRight: 10 }} onClick={() => toggleStarredEmails()} />
            }

            

            <Box onClick={() => navigate(routes.view.path,{ state:{ email: email} } )} >
                <Typography style={{ width: 200, overflow: 'hidden' }} >  {email.name}</Typography>
                <Indicataor>Inbox</Indicataor>
                <Typography>{email.subject}{email.body && '-'} {email.body} </Typography>
                <Date>
                    {(new window.Date(email.date)).getDate()}
                    {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                </Date>
            </Box>

        </Wrapper>
    )
}

export default Email