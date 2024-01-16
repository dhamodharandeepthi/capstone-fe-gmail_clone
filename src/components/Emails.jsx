
import { useOutletContext, useParams } from 'react-router-dom';
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { Checkbox, Box,List,ListItem } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from '../components/Email';
import NoMails from '../components/common/NoMails';
import { EMPTY_TABS } from '../constants/constant';



const Emails = () => {

  const [selectedEmails, setSelectedemails] = useState([]);
  const [starredEmail, setStarredEmail] = useState(false);

  const { openDrawer } = useOutletContext();

  const { type } = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailService = useApi(API_URLS.deleteEmails);

  useEffect(() => {
    getEmailsService.call({}, type);
  }, [type, starredEmail]);

  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailsService?.response?.map(email => email._id)
      setSelectedemails(emails);
    } else {
      setSelectedemails([]);
        }
  }

  const deleteSelectedEmails = (e) => {
    if (type === 'bin') {
      deleteEmailService.call(selectedEmails);
    } else {
      moveEmailsToBinService.call(selectedEmails);
      }
    setStarredEmail(prevState => !prevState);
    
  }

  return (
    <Box style={openDrawer ? { marginLeft: 250, width:'calc(100% - 250px)' }: { width: '100%' }}>
      <Box style={{padding: '20px 10px 0 10px',display:'flex',alignItems:'center'}} >
        <Checkbox size='small' onChange={(e) => selectAllEmails(e) } />
        <DeleteOutline onClick={(e) => deleteSelectedEmails(e)} />
      </Box>
      <List>
        {
          getEmailsService?.response?.map(email => (
            <Email
              key={email._id}
              email={email}
              selectedEmails={selectedEmails}
              setStarredEmail={setStarredEmail} 
              setSelectedemails={setSelectedemails}
            />
          ))
        }
      </List>
      {
        getEmailsService?.response?.length === 0 &&
        <NoMails message={EMPTY_TABS[type]} />
      }
    </Box>
  )
}

export default Emails