import Action, { updateError } from '../../actions'
const _followers = require('../../data/followers.json')

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

		if (!method){
			_followers.followers.forEach((f)=>{
				dispatch({type:Action.ADD_FOLLOWER, follower:f})
			})
			return
		}
		if (method==="ADD"){
			return dispatch({type:Action.ADD_FOLLOWER, follower:{"name":name,"headline":"hs4","avatar":"https://randomuser.me/api/portraits/thumb/men/99.jpg"}})
		}
		if (method==="DEL"){
			console.log(name)
			return dispatch({type:Action.REMOVE_FOLLOWER,name:name})
		}
	}
}