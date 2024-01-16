import React, { useState } from "react";
import {
    Dialog,
    Box,
    Typography,
    styled,
    InputBase,
    TextField,
    Button,
} from "@mui/material";
import { Close, DeleteOutlined } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";




const dialogStyle = {
    height: "90%",
    width: "80%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 15px",
    background: "#f2f6fc",
    "& > p": {
        fontSize: 14,
        fontWeight: 500,
    },
});

const RecipientsWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: "0 15px",
    "& > div": {
        fontSize: 14,
        borderBottom: "1px solid #f5f5f5",
        marginTop: 10,
    },
});

const Footer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 15px",
});

const SendButton = styled(Button)({
    background: "#0b57d0",
    color: "#fff",
    fontWeight: 500,
    textTransform: "none",
    borderRadius: 18,
    width: 100,
});

function ComposeMail({ openDialog, setOpendialoge, }) {

    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        Host: "smtp.elasticemail.com",
        Username: import.meta.env.VITE_APP_USERNAME,
        Password: import.meta.env.VITE_APP_PASSWORD,
        port: 2525,

    }


    const closeComposeMail = (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: "rdhamodharan22@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'rdhamodharan22',
            starred: false,
            type: 'drafts'

        }
        console.log("payload:", payload); //Debug payload
        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            console.log('Draft sucessfully'); //Debug sucsess
            setOpendialoge(false);
            setData({});
        } else {
            console.log("Error drafting mail:", saveDraftService.error); //Debug error
        }


        setOpendialoge(false);
    };

    const sendMail = (e) => {
        e.preventDefault();

        if (window.Email) {
            window.Email.send({
                ...config,
                To: data.to,
                From: "rdhamodharan22@gmail.com",
                Subject: data.subject,
                Body: data.body
            }).then(
                message => alert(message)
            ).catch(error => { console.log(error) });
        }

        const payload = {
            to: data.to,
            from: "rdhamodharan22@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'rdhamodharan22',
            starred: false,
            type: 'sent'

        }
        console.log("payload:", payload); //Debug payload
        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            console.log('Email sent sucessfully'); //Debug sucsess
            setOpendialoge(false);
            setData({});
        } else {
            console.log("Error sending mail:", sentEmailService.error); //Debug error
        }

        setOpendialoge(false);
    }

    const onValueChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data)
    }



    return (
        <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>

            <RecipientsWrapper>
                <InputBase
                    placeholder="Recipients" onChange={(e) => onValueChange(e)}
                    name="to"

                />
                <InputBase
                    placeholder="Subject" onChange={(e) => onValueChange(e)}

                    name="subject"

                />
            </RecipientsWrapper>
            <TextField
                multiline
                rows={20}
                sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
                onChange={(e) => onValueChange(e)}
                name="body"

            />
            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>
                    Send
                </SendButton>
                <DeleteOutlined onClick={() => setOpendialoge(false)} />
            </Footer>
        </Dialog>
    );
}

export default ComposeMail;
