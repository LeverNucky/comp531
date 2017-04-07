import React from 'react'
import { connect } from 'react-redux'

import Article from './article'
import NewArticle from './newArticle'
import { searchKeyword } from './articleActions'

const ArticlesView = ({username, articles, dispatch}) => {
    let keyword = ''
    return (
        <div>
            <h3>News Feed</h3>
            <div className="well">
                <div>
                    <input className="form-control" type="text" placeholder="search your feed"
                           ref={(node) => keyword = node }
                           onChange={() => { dispatch(searchKeyword(keyword.value)) }}/>
                </div>
            </div>
            <NewArticle/>
            
            {
                articles.sort((a,b) => {
                if (new Date(a.date) < new Date(b.date))
                    return 1
                if (new Date(a.date) > new Date(b.date))
                    return -1
                return 0
            }).map((article) =>
                <Article key={article._id} _id={article._id} username={username} author={article.author}
                    date={article.date} text={article.text} img={article.img} avatar={article.avatar}
                    comments={article.comments} showComments = {article.showComments}
                    showAddcomment = {article.showAddcomment} editMode={article.editMode}/>
            )}

        </div>
    )
}

export const filterArticles=(articles,keyword)=>{
    return articles.filter((a) => {
                if (Array.isArray(a.text)){
                    a.text=a.text[0]
                }
                return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
                    a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
            })
}
export default connect(
    (state) => {
        const avatars = state.articles.avatars
        const keyword = state.articles.searchKeyword
        let articles = Object.keys(state.articles.articles).map((id) => state.articles.articles[id])

        if (keyword && keyword.length > 0) {
            articles = filterArticles(articles,keyword)
        }
        
        //add avatars for comments
        articles = articles.map((a) => {
            return {...a, avatar: avatars[a.author], comments: a.comments.map((c) => {
                return { ...c, avatar: avatars[c.author],date: new Date(c.date).toString() }
            })}
        })
        return {
            username: state.profile.username,
            articles
        }
    }
)(ArticlesView)

export { ArticlesView as PureArticlesView }