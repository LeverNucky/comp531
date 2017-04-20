import React from 'react'
import Headline from './headline.js'
import Following from './following'
import ArticlesView from '../article/articlesView'




const Main = () => (
    <div>
        <div className="container">
            <div className="col-lg-4 col-md-10 col-sm-4 col-xs-4">
                <Headline/>
                <Following/>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-8 col-xs-8">
                <ArticlesView/>
            </div>
        </div>
    </div>
)

export default Main