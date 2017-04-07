import Action, {updateSuccess, updateError, resource } from '../../actions'



export function updateHeadline(headline) {
    return (dispatch) => {
        dispatch(updateField('headline', headline))
    }
}

export function fetchHeadline(username) {
    return (dispatch) => {
        return resource('GET',username?`headlines/${username}`:'headlines').then((r)=>{
            dispatch({type:Action.UPDATE_PROFILE, username:r.headlines[0].username, headline: r.headlines[0].headline})
        })
    }
}

export function updateProfile(profile) {
    return (dispatch) => {
        //Initialization for Profile 

        if ((profile.pw.value!==profile.pwconf.value)){
            dispatch(updateError("password and password confirmation don't match"))
            return
        }
        dispatch(updateField('email', profile.email.value))
        dispatch(updateField('zipcode', profile.zipcode.value))
        dispatch(updateField('password', profile.pw.value))
        dispatch(updateSuccess("Successfully updated!"))
    }
}

export function fetchProfile() {
    return (dispatch) => {
        dispatch(fetchField('avatars'))
        dispatch(fetchField('zipcode'))
        dispatch(fetchField('email'))
        dispatch(fetchField('dob'))

    }
}

function updateField(field, value) {
    return (dispatch) => {
        //General method for updating one field
        const action = { type: Action.UPDATE_PROFILE }
        action[field] = value
        if (field == 'dob')
            dispatch(updateError('Can\'t change dob'))
        else
            dispatch(action)
    }
}

function fetchField(field) {
    return (dispatch) => {
        //General method for fetching one field
        const action = { type: Action.UPDATE_PROFILE }
        resource('GET',field)
        .then((r)=>{
            switch(field) {
                case 'avatars':
                    action.avatar = r.avatars[0].avatar; break;
                case 'email':
                    action.email = r.email; break;
                case 'zipcode':
                    action.zipcode = r.zipcode; break;
                case 'dob':
                    action.dob = r.dob; break;
            }
            dispatch(action)
        })
        
    }
}

export const uploadImage=(fd)=> {
    return (dispatch)=>{
        resource('PUT','avatar',fd,false)
        .then((response)=>{
            dispatch(updateSuccess("Successfully updated!"))
            dispatch(updateField('avatar',response.avatar))
        }).catch((err)=>{
            dispatch(updateError(err))
        })
    }
}