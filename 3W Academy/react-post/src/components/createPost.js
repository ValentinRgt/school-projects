import React from 'react'

export default function CreatePost({userName, handlePostCreate}) {
    return (
        <div>
            <p>Author : <strong>{userName}</strong></p>
            <form method='POST' onSubmit={handlePostCreate}>
                <label>Title : </label><input type="text" name="title" /><br />
                <textarea name="content"></textarea><br />
                <button type="submit">Create</button>
            </form>
        </div>
    );

}