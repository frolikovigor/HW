import React from 'react';

import Comments from 'blocks/Comment/Comments.jsx';

/**
 * Article
 * @param {Object}      article
 * @param {Boolean}     showComments
 * @param {Function}    toggleComments={this.toggleComments.bind(this, article.id)}
 */
class Article extends React.Component {
    static defaultProps = {
        showComments: false
    }

    state = {
        isShow: true,
        showArticle: ::this.showArticle,
        index: 0
    }

    showArticle () {
        var {article} = this.refs,
            {top} = article.getBoundingClientRect(),
            isShow = false;

        if (article && top < window.innerHeight && top > 100) {
            isShow = true;
        }

        this.setState({
            isShow: isShow
        });
    }

    componentDidMount () {
        // window.addEventListener('scroll', this.state.showArticle);
    }

    componentWillUnmount () {
        // window.removeEventListener('scroll', this.state.showArticle);
    }

    addComment(articleId) {
        var {article} = this.props;
        const fname = document.getElementById(`addcomment_${articleId}`).getElementsByTagName('input')[0].value;
        const value = document.getElementById(`addcomment_${articleId}`).getElementsByTagName('textarea')[0].value;

        if (value) {
            article.comments.push({
                "id": "217b9ab5-c24d-46bc-9ef8-87e1b406005b-" + this.state.index,
                "name": {
                    "first": fname,
                    "last": ""
                },
                "title": "",
                "text": value
            });
            this.setState({
                index: this.state.index + 1
            });
        }
    }

    render () {
        var {article, toggleComments, showComments} = this.props,
            {isShow} = this.state;

        return (
            <div ref='article' className='article' style={{opacity: isShow ? 1 : 0}} title={`Comments: ${article.comments.length}`}>
                <h2>{article.title}</h2>
                <div>
                    {article.text}
                </div>
                <Comments
                    article={article}
                    toggleComments={toggleComments}
                    showComments={showComments}
                    addComment={this.addComment}
                    this_={this}
                />
            </div>
        );
    }
}

export default Article;
