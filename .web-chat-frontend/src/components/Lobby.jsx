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

                <input className='txt-box' placeholder='Name...' onChange={e => setUser(e.target.value)} />
                <input className='txt-box' placeholder='Room...' onChange={e => setRoom(e.target.value)} />

                <button className='btn' variant='success' type='submit' disabled={!user || !room}>Join Room</button>
            </form>
        </>
    )
}
export default Lobby;