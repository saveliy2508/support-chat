import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../redux/actions/userActions";

const MainPage = () => {
    const dispatch = useDispatch()
    const {email} = useSelector(state => state.user)
    return (
        <div>
            <h1>HOMEPAGE</h1>
            <button onClick={() => dispatch(removeUser())}>Log out from {email}</button>
        </div>
    );
};

export default MainPage;