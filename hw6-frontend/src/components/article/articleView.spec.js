import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ArticlesView } from './articlesView'
import { NewArticle } from './newArticle'
import Reducer from '../../reducers'

describe('ArticlesView (component tests)', () => {
    
    it('should render articles', () => {
        const articles = [
            {
                _id:1,
                text:'Text Content 1',
                author:'sep1',
                date:'2000-11-11T11:23:45.678Z',
                comments: [],
                showComments:false,
                showAddcomment: false,
                editMode:false
            },
            {
                _id:2,
                text:'Text Content 2',
                author:'sep2',
                date:'2011-11-11T11:23:45.678Z',
                comments: [],
                showComments:false,
                showAddcomment: false,
                editMode:false
            }           
        ]
        const username = 'qw13'
        const node = shallow(
            <ArticlesView dispatch={_ => _} articles={articles} username={username} />
        )
        expect(node).to.exist
        expect(node.children().nodes[3].key).to.eql('2');
        expect(node.children().nodes[4].key).to.eql('1');
    })


    it('should dispatch actions to create a new article',() => {

        // this just handles complex actions that call complex actions (that take dispatch as an argument)
        // the real dispatch does something similar to this
        let state = undefined
        const dispatch = (action) => {
            state = Reducer(state, action)
        }
        dispatch({})
        let flag= false
        const node = TestUtils.renderIntoDocument(
            <div>
                <NewArticle dispatch={ _ => flag = true }/>
            </div>
        )
        const text = findDOMNode(node).children[0].children[0].children[0].children[1]
        text.value = 'This is a new article.'
        const button = findDOMNode(node).children[0].children[0].children[2].children[0].children[0]
        TestUtils.Simulate.click(button)
        expect(flag).to.be.true
    })
})