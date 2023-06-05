import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { grupoListReducers, grupoDetailsReducers } from './reducers/grupoReducers';
import { blogListReducers, blogDetailsReducers, blogDetailCreateReducer, blogCreateReducer, blogDeleteReducer, blogUpdateReducer } from './reducers/blogReducers';
import { forumListReducer, forumDetailsReducer, forumCreateReducer, forumDeleteReducer, forumUpdateReducer } from './reducers/forumReducers';
import { profileListReducer, profileDetailsReducer, profileCreateReducer, profileDeleteReducer, profileUpdateReducer, profileListMyReducer } from './reducers/profileReducers';
import { podcastListReducers, podcastDetailsReducers, podcastCreateReducer, podcastDeleteReducer, podcastUpdateReducer } from './reducers/podcastReducers';
import { recordingListReducers, recordingDetailsReducers, recordingCreateReducer, recordingDeleteReducer, recordingUpdateReducer, recordingCategoryReducer } from './reducers/recordingReducers';
import { radioListReducers, radioDetailsReducers, radioCreateReducer, radioDeleteReducer, radioUpdateReducer } from './reducers/radioReducers';
import { projectListReducers, projectDetailsReducers, projectCreateReducer, projectDeleteReducer, projectUpdateReducer } from './reducers/projectReducers';
import { resourceListReducers, resourcetDetailsReducers, resourceCreateReducer, resourceDeleteReducer, resourceUpdateReducer } from './reducers/resourceReducers';
import { topicListReducer, topicDetailsReducer, topicDeleteReducer, topicCreateReducer, topicUpdateReducer } from './reducers/topicReducers'
import { articleListReducers, articleDetailsReducers, articleDeleteReducer, articleCreateReducer, articleUpdateReducer } from './reducers/articleReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'

const reducer = combineReducers({
    blogList: blogListReducers,
    blogDetails: blogDetailsReducers,
    blogDetailCreate: blogDetailCreateReducer,
    blogDelete: blogDeleteReducer,
    blogCreate: blogCreateReducer,
    blogUpdate: blogUpdateReducer,
    forumList: forumListReducer,
    forumDetails: forumDetailsReducer,
    forumDelete: forumDeleteReducer,
    forumCreate: forumCreateReducer,
    forumUpdate: forumUpdateReducer,
    profileList: profileListReducer,
    profileDetails: profileDetailsReducer,
    profileDelete: profileDeleteReducer,
    profileCreate: profileCreateReducer,
    profileUpdate: profileUpdateReducer,
    profileListMy: profileListMyReducer,          
    podcastList: podcastListReducers,
    podcastDetails: podcastDetailsReducers,
    podcastDelete: podcastDeleteReducer,
    podcastCreate: podcastCreateReducer,
    podcastUpdate: podcastUpdateReducer,
    recordingList: recordingListReducers,
    recordingDetails: recordingDetailsReducers,
    recordingDelete: recordingDeleteReducer,
    recordingCreate: recordingCreateReducer,
    recordingUpdate: recordingUpdateReducer,
    recordingCategory: recordingCategoryReducer,
    radioList: radioListReducers,
    radioDetails: radioDetailsReducers,
    radioDelete: radioDeleteReducer,
    radioCreate: radioCreateReducer,
    radioUpdate: radioUpdateReducer,    
    projectList: projectListReducers,
    projectDetails: projectDetailsReducers,
    projectDelete: projectDeleteReducer,
    projectCreate: projectCreateReducer,
    projectUpdate: projectUpdateReducer,
    resourceList: resourceListReducers,
    resourceDetails: resourcetDetailsReducers,
    resourceDelete: resourceDeleteReducer,
    resourceCreate: resourceCreateReducer,
    resourceUpdate: resourceUpdateReducer,
    topicList: topicListReducer,
    topicDetails: topicDetailsReducer,
    topicDelete: topicDeleteReducer,
    topicCreate: topicCreateReducer,
    topicUpdate: topicUpdateReducer,
    articleList: articleListReducers,
    articleDetails: articleDetailsReducers,
    articleDelete: articleDeleteReducer,
    articleCreate: articleCreateReducer,
    articleUpdate: articleUpdateReducer,    
    grupoList: grupoListReducers,
    grupoDetails: grupoDetailsReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,    
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store