import React from 'react';

import Comment from 'blocks/Comment/Comment.jsx';

class Comments extends React.Component {

    render () {
        var {article, toggleComments, showComments, renderComment, addComment, this_} = this.props;

        return (
            <div className='comments'>
                <div className='comments-bar' onClick={toggleComments.bind(this, article.id)}>
                    {article.comments && `Comments: ${article.comments.length}`}
                </div>

                <div className='comments-list' style={{display: showComments ? 'block' : 'none'}}>
                    <div className="add-comment" id={`addcomment_${article.id}`}>
                        <input type="test" placeholder="Name" />
                        <textarea placeholder="Add comment"></textarea>
                        <button onClick={addComment.bind(this_,article.id)}>Add</button>
                    </div>

                    {article.comments && article.comments.map(
                        comment => <Comment
                            key = {comment.id}
                            comment = {comment}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Comments;