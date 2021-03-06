import Action, { updateError } from '../../actions'
const _followers = require('../../data/followers.json')

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


export function delFollower(name) { return fetchFollowers('DEL', name) }
export function addFollower(name) { return fetchFollowers('ADD', name) }

export function fetchFollowers(method, name) {
	return (dispatch, getState) => {
		if (method == 'ADD' && getState().followers.followers[name]) {
			return dispatch(updateError(`Already following ${name}`))
		}

		if (method == 'ADD' && !name) {
			return dispatch(updateError(`${name} is not a valid user`))
		}
		//Three cases: ADD, DEL, or default 
		if (!method){
			_followers.followers.forEach((f)=>{
				dispatch({type:Action.ADD_FOLLOWER, follower:f})
			})
			return
		}
		if (method==="ADD"){
			return dispatch({type:Action.ADD_FOLLOWER, follower:{"name":name,"headline":makeid(),"avatar":"http://lorempixel.com/102/100/"}})
		}
		if (method==="DEL"){
			console.log(name)
			return dispatch({type:Action.REMOVE_FOLLOWER,name:name})
		}
	}
}