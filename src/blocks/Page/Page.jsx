import React from 'react';
import ArticlesList from 'blocks/ArticlesList/ArticlesList.jsx';

/**
 * Page
 */
class Page extends React.Component {
    render () {
        return (
            <div className='page'>
                <h1>Hello, world!</h1>
                <ArticlesList />
            </div>
        );
    }
}

export default Page;
