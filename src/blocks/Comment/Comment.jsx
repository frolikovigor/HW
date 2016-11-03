import React from 'react';

class Comment extends React.Component {

    render () {
        var {comment} = this.props;

        return (
            <div key={comment.id} className='comment'>
                <div>{`${comment.name.first} ${comment.name.last}`}</div>
                {comment.text}
            </div>
        );
    }
}

export default Comment;