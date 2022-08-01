import React from 'react';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import { Checkbox, IconButton } from '@material-ui/core';
import './EmailRow.css'
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMail } from '../../features/mailSlice';

function EmailRow({ id, title, subject, description, time }) {
    const history = useNavigate();
    const dispatch = useDispatch();
    const openMail = () => {
        dispatch(selectMail({
            id,
            title,
            subject,
            description,
            time
        }));
        history("/mail")
    }

  return (
    <div onClick={openMail} className='emailRow'>
        <div className='emailRow__options'>
            <Checkbox />
            <IconButton>
                <StarBorderOutlinedIcon />
            </IconButton>
            <IconButton>
                <LabelImportantOutlinedIcon />
            </IconButton>
        </div>
        <h3 className='emailRow__title'>
            {title}
        </h3>
        <div className='emailRow__message'>
            <h4>{subject} {" "} 
                <span className='emailRow__description'>
                    - {description}
                </span>
            </h4>
        </div>
        <p className='emailRow__time'>
            {time }
        </p>
    </div>
  )
}

export default EmailRow