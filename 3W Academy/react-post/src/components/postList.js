import React from 'react'

function Post(props) {
    return (
        <div>
            <h3>{props.post.title}</h3>
            <p>{props.post.content}</p>
            <p>Written by <strong>{props.post.writer}</strong></p>
            <hr />
        </div>
    );
}

export default function PostList({publications}) {
    
    return (
        <div>
            <hr />
            { publications.map(element =>
                <Post post={element} />
            )}
        </div>
    );

}