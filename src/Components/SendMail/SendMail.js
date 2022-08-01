import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './SendMail.css';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from '../../features/mailSlice';
import { db } from '../Firebase/Firebase';
import firebase from 'firebase/compat/app';

function SendMail() {
    const dispatch = useDispatch();
    const onSubmit = (formdata) => {
        // formdata.preventDefault();
        console.log(formdata[0]); 
        db.collection('emails').add({
            to: formdata.to,
            subject: formdata.subject,
            message: formdata.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        dispatch(closeSendMessage());
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  return (
    <div className='sendMail'>
        <div className='sendMail__header'>
            <h3>New Message</h3>
            <CloseIcon className='sendMail__close' onClick={() => dispatch(closeSendMessage())}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                name='to' 
                placeholder='To:' 
                type='email' 
                {...register('to', { required: true })}
            />
            
            <input 
                name='subject' 
                placeholder='Subject:' 
                type='text'
                {...register('subject', { required: true })}
            />
            
            <input
                name='message'
                className='sendMail__message' 
                placeholder='Message..' 
                type='text'
                {...register('message', { required: true })}
            />
            
            <div className='sendMail__options'>
                <Button 
                    className='sendMail__send'
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Send
                </Button>
            </div>
        </form>
    </div>
  )
}

export default SendMail