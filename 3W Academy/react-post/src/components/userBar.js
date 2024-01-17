import React from 'react'

function Guest({handleLogIn}) {
    return (
        <div>
            <h1>Unlogged</h1>
            <form onSubmit={handleLogIn}>
                <input type="text" name="username" />
                <button type="submit">Sign in</button>
            </form> 
        </div>
    );
}

function User({userName, handleLogOut}) {
    return (
        <div>
            <h1>Logged in as : <strong>{userName}</strong> !</h1>
            <button onClick={handleLogOut}>Sign Out</button>
        </div>
    );
}

export default function UserBar({isLogged, userName, handleLogIn, handleLogOut}) {
    return (
        <div>
            {isLogged ? <React.Fragment>
                <User userName={userName} handleLogOut={handleLogOut}/>
            </React.Fragment> : 
            <React.Fragment>
                <Guest handleLogIn={handleLogIn} />
            </React.Fragment> }
        </div>
    );

}