import Action, { resource, updateSuccess, updateError, navToMain, navToLanding, apiUrl} from '../../actions'
import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile,fetchHeadline } from '../profile/profileActions'

//Init for first time login and refresh
export function initialMainView() {
    return (dispatch) => {
        return resource('GET','dob')
        .then((r)=>{
            dispatch({type: Action.LOGIN,username: r.username})
            dispatch(navToMain())
            dispatch(fetchHeadline())
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        })
        .catch((err)=>{})
    }
}

export function login(username, password) {
    return (dispatch)=>{
        return resource('POST', 'login', {
            username,password
        })
        .then((r)=>{
            dispatch(initialMainView())
        })
        .catch((err)=>dispatch(updateError('Invalid login')))
    };
}

export function facebookLogin() {
    return (dispatch)=>{
        window.location = apiUrl+'/login/facebook'
    };
}

export function logout() {
    return (dispatch)=>{         
        return resource('PUT', 'logout')
        .then((r)=>{
            dispatch({type:Action.LOGOUT})
            dispatch(navToLanding()) 
        })
        .catch((err)=>dispatch(updateError('Invalid logout')))
    };
}

export function registerAction(info){
    //validate the register input
    return (dispatch)=>{
        if(info.pw.value!==info.pwconf.value){
              dispatch(updateError('password and password confirm is not equal'))
              return;
        }
        const birthdate=new Date(info.dob.value);
        const curdate=new Date();
        const diffyear=curdate.getFullYear()-birthdate.getFullYear();
        const diffmon=curdate.getMonth()-birthdate.getMonth();
        const diffday=curdate.getDate()-birthdate.getDate();
        if (!(diffyear>18||(diffyear==18&&diffmon>=0)||(diffyear==18&&diffmon==0&&diffday>=0))) {
            dispatch(updateError('Only people age more than 18 are eligible to register'))
            return;           
        }
        const payload = {
            username: info.username.value,
            email: info.email.value,
            dob: info.dob.value,
            zipcode: info.zipcode.value,
            password: info.pw.value
        }
        resource('POST', 'register', payload)
        .then((response) => {
            dispatch(updateSuccess("Register succeed!"))
        })
        .catch((error) => {
            dispatch(updateError("Register error: "+error));
        })
    }
}