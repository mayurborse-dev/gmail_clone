import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Header.css';
import { ArrowDropDown } from '@material-ui/icons';
import { logout, selectUser } from '../../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../Firebase/Firebase';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    }
  return (
    <div className='header'>
        <div className='header__left'>
            <IconButton>
                <MenuIcon />
            </IconButton>
            <img src='https://i.pinimg.com/originals/ae/47/fa/ae47fa9a8fd263aa364018517020552d.png' alt='' />
        </div>

        <div className='header__middle'>
            <SearchIcon />
            <input placeholder='Search mail' type='text' />
            <ArrowDropDown className='header__inputCaret' />
        </div>

        <div className='header__right'>
            <IconButton>
                <AppsIcon />
            </IconButton>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <Avatar onClick={signOut} src={user?.photoUrl}/>
        </div>
    </div>
  )
}

export default Header