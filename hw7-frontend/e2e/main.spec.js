import { expect } from 'chai'
import { go, sleep, findId, findClass, findCSS, By } from './selenium'
import common from './common'

describe('End to End Test On Main Page', () => {
    before('should log in and stay in the main page', (done) => {
        go().then(common.login).then(sleep(500)).then(done)
    })
     it("Create a new article and validate the article appears in the feed", (done)=>{
        let oldlen = 0;
        const newArticle = "My new article";
        
        sleep(500)
        .then(findClass('article-text').then(
            (articles)=>{
                oldlen = articles.length;
            }
        ))
        .then(findId('newPostBody').clear())
        .then(findId('newPostBody').sendKeys(newArticle))
        .then(findId('newArticle_btn').click())
        .then(sleep(2000))
        .then(findClass('article-text').then(
            (articles)=>{
                if(articles.length==10){
                    expect(articles.length).to.eql(10)
                }else{
                    expect(articles.length).to.eql(oldlen+1)
                }          
            }
        ))
        .then(findClass('article-text').then((texts)=>texts[0].getText())
            .then((text0)=>{
                expect(text0).to.eql(newArticle);
            }
        ))
        .then(done)
    })
    it("Edit an article and validate the article text has updated", (done)=>{
        const editedAtrticle = "Edited the new article";
        sleep(500)
        .then(findClass('edit_post_btn').then((buttons)=>buttons[0]).then((button)=>{
            button.click()
        }))
        .then(findClass('article-text').then((articles)=>articles[0])
        .then((article)=>{
            article.clear()
            article.sendKeys(editedAtrticle)
        }))
        .then(sleep(500))
        .then(findClass('edit_post_btn').then((buttons)=>buttons[0]).then((button)=>{
            button.click()
        }))
        .then(findClass('article-text').then((texts)=>texts[0].getText())
            .then((text0)=>{
                expect(text0).to.eql(editedAtrticle);
            }
        ))
        .then(done)
    })
    it("Update the status headline and verify the change", (done)=>{
        
        const newHeadline = 'New Headline!';
        sleep(500)
        .then(findId('headline').clear())
        .then(findId('headline').sendKeys(newHeadline))
        .then(findId('headline_btn').click())
        .then(sleep(2000))
        .then(findId('headline_show').getText().then(text=>{
            expect(text).to.eql(newHeadline)
        }))
        .then(done)
    })
    it("Count the number of followed users", (done) => {
            
            sleep(500)
            .then(findClass('follower').then(
                (followers) => {
                    expect(followers.length).to.be.at.least(0)
                }
            ))
            .then(done)        
        })

    it("Add the 'Follower' user and verify following count increases by one", (done)=>{
        const followerName = "Follower"
        let length = 0;
        sleep(500)
        .then(findClass('follower').then(followers=>{
            length = followers.length;
        }))
        .then(findId('follower_input').clear())
        .then(findId('follower_input').sendKeys(followerName))
        .then(findId('follower_btn').click())
        .then(sleep(3000))
        .then(findClass('follower').then(followers=>{
            expect(followers.length).to.eql(length+1)
        }))
        .then(done)
    })
    it("Remove the 'Follower' user and verify following count decreases by one", (done)=>{
        const followerName = "Follower"
        let length = 0;
        let found = false;
        sleep(500)
        .then(findClass('follower').then(followers=>{
            length = followers.length;
        }))
        .then(findClass('follower_rm_btn').then((buttons)=>{
            buttons[length-1].click();
        }))
        .then(sleep(2000))
        .then(findClass('follower').then(followers=>{
            expect(followers.length).to.eql(length-1)
            
        }))
        .then(done)

    })
    

    
    
    it("Search for \"Only One Article Like This\" and verify only one article shows, and verify the author", (done)=>{
        const searchWord = 'Only One Article Like This';
        sleep(500)
        .then(findId('search').clear())
        .then(findId('search').sendKeys(searchWord))
        .then(sleep(500))
        .then(findClass('article-text').then(
            (articles) => {
                expect(articles.length).to.eql(1)
            }
        ))
        .then(findClass('article_author')
            .then((authors)=>authors[0].getText())
            .then((author0)=>{
                expect(author0.indexOf(common.cred.username)).to.eql(0);
            }
        ))
        .then(done)
    })

})