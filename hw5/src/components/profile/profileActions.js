import Action, { updateError, resource } from '../../actions'

const _profile = require('../../data/profile.json')

export function validateProfile({email, zipcode, name, phone}) {
    //Validate the profile input content
    if (name) {
        if (!name.match('^[a-zA-Z][a-zA-Z0-9]+')) {
            return 'Invalid username. Username must start with a letter and can only contains letters and numbers.'
        }
    }

    if (email) {
        if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
            return 'Invalid email.  Must be have format a@b.c'
        }
    }

    if (zipcode) {
        if (!zipcode.match('^[0-9]{5}$')) {
            return 'Invalid zipcode. Must be 5 digits. e.g., 77005'
        }
    }
    if (phone) {
        if (!phone.match('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')) {
            return 'Invalid phone. Must have format as 123-123-1234'
        }
    }

    return ''
}

export function updateHeadline(headline) {
    return (dispatch) => {
        dispatch(updateField('headline', headline))
    }
}

export function updateProfile({email, zipcode, name, phone}) {
    return (dispatch) => {
        //Initialization for Profile 
        const err = validateProfile({email, zipcode, name, phone})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }
        dispatch(updateField('email', email))
        dispatch(updateField('zipcode', zipcode))
        dispatch(updateField('name', name))
        dispatch(updateField('phone', phone))
    }
}

export function fetchProfile() {
    return (dispatch) => {
        dispatch(fetchField('avatar'))
        dispatch(fetchField('zipcode'))
        dispatch(fetchField('email'))
        dispatch(fetchField('name'))
        dispatch(fetchField('dob'))
        dispatch(fetchField('phone'))

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
        switch(field) {
            case 'avatar':
                action.avatar = _profile.avatar; break;
            case 'email':
                action.email = _profile.email; break;
            case 'zipcode':
                action.zipcode = _profile.zipcode; break;
            case 'dob':
                action.dob = _profile.dob; break;
            case 'name':
                action.name = _profile.name; break;
            case 'phone':
                action.phone = _profile.phone; break;
        }
        dispatch(action)
    }
}

export function uploadImage(file) {
    return (dispatch) => {
        // Upload the new avatar (Not implemented yet)
        return dispatch(updateError("Upload not implemented yet"))
        
    }
}