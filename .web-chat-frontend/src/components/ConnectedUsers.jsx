import React from "react";
import { useEffect } from "react";

const ConnectedUsers = ({ users }) => {

/*     useEffect(() => {
        console.log('ConnectedUsers updated', users);
    }, [users]);
 */

    return (
        <div className='user-list'>
            <h4>Connected Users</h4>
            {users.map((user, index) =>
                <div className='listed-user' key={index}>
                    <h6>{user}</h6>
                </div>
            )}
        </div>
    );
}

export default ConnectedUsers;