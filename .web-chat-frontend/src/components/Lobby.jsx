'use strict';
import React from "react"
import { useState } from "react";

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return (
        <>
            <form className='lobby' onSubmit={e => {
                e.preventDefault();
                joinRoom(user, room);
            }}>

                <input placeholder='name' onChange={e => setUser(e.target.value)} />
                <input placeholder='room' onChange={e => setRoom(e.target.value)} />

                <button variant='success' type='submit' disabled={!user || !room}>Join</button>
            </form>
        </>
    )
}
export default Lobby;