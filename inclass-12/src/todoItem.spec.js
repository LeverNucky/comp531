import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        
        const node = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem id = {1} text = 'one' done = {false} toggle ={_ => _} remove = {_ => _}/>
            <ToDoItem id = {2} text = 'two' done = {false} toggle ={_ => _} remove = {_ => _}/>
            </div>
        );
        const elements = findDOMNode(node).children[1];
        //console.log(findDOMNode(node).children)
        expect(node.children.length).to.equal(2);
        expect(elements.children.length).to.equal(3);
        expect(elements.children[1].innerHTML).to.equal('two');

    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const node = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem id = {1} text = '' done = {false} toggle ={_ => _} remove = {_ => _}/>
            </div>
        );
        const elements = findDOMNode(node).children[0];
        expect(elements.children.length).to.equal(3);
        expect(findByClassname(elements.children,'completed')).to.be.null;
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        const node = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem id = {1} text = '' done = {false} toggle={() => {toggled=!toggled}} remove={_=>_}/>
            </div>
        );
        const elements = findDOMNode(node).children[0];
        expect(toggled).to.be.false;
        TestUtils.Simulate.click(elements.children[0]);
        expect(toggled).to.be.true;
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const node = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem id = {1} text = '' done = {false} toggle={_=>_} remove={() => {removed=!removed}}/>
            </div>
        );
        const elements = findDOMNode(node).children[0];
        TestUtils.Simulate.click(elements.children[2]);
        expect(removed).to.be.true;
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const node = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem id = {1} text = '' done = {true} toggle={_=>_} remove={_=>_}/>
            </div>
        );
        const elements = findDOMNode(node).children[0];
        expect(elements.children[1].className).to.equal("completed");
    })
    

})
