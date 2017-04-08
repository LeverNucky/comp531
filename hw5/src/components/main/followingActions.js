import Action, { updateError, resource} from '../../actions'
import { fetchArticles } from '../article/articleActions'
import Promise from 'bluebird'

export function delFollower(name) {
	return (dispatch)=>{
        resource('DELETE','following/'+name).then((r)=>{
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        })
    } 
}
export function addFollower(name) { 
	return (dispatch)=>{
        if(!name||name==''){
            dispatch(updateError("Invalid username"))
            return;
        }
        resource('PUT','following/'+name).then((r)=>{
            if(r.following.indexOf(name)<0){
                dispatch(updateError("No such user"))
                return;
            }
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        })
    }   
}

export function fetchFollowers() {
	return (dispatch)=>{
		//Update the followers list whenever adding or deleting or initiating
        resource('GET','following')
        .then((r)=>{
        	
	        const followers =  r.following.reduce((followerMap,follower)=>{
	                followerMap[follower] = {name: follower}
	                return followerMap;
	            },{})
	        const followersQuery = r.following.join(',')
	 

	        const followersHeadline = resource('GET',`headlines/${followersQuery}`)
                                  .then((r)=>{
                                    r.headlines.forEach((item)=>{
                                        followers[item.username].headline = item.headline; 
                                    })
                                  })
        	const followersAvatar = resource('GET',`avatars/${followersQuery}`)
                                  .then((r)=>{
                                    r.avatars.forEach((item)=>{
                                        followers[item.username].avatar = item.avatar; 
                                    })
                                  })
            //Make the promise, otherwise the headline and avatar would not show up
	        Promise.all([followersHeadline,followersAvatar])
	        .then(()=>{
	            dispatch({type:Action.UPDATE_FOLLOWERS, followers})
	        	})
        	})
        	.catch((err)=>{dispatch(updateError(err))
    	})
    }
}
