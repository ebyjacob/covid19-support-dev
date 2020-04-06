import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const superadmins = [ 'yesoreyeram@gmail.com' , 'masteruser@covid19-support-dev.web.app', 'superadmin@covid19-support-dev.web.app' ];

const doesAuthTokenExist = (context:any) => context && context.auth && context.auth.token;
const isSuperAdmin = (email:string) => superadmins.indexOf(email.toLowerCase()) > -1;
const isAdmin = (context:any) => doesAuthTokenExist(context) && context.auth?.token.admin === true;
const isModerator = (context:any) => doesAuthTokenExist(context) && context.auth?.token.moderator === true;
const isVerifiedVolunteer = (context:any) => doesAuthTokenExist(context) && context.auth?.token.verifiedvolunteer === true;
const canAssignAdminRole = (data:any,context:any) => doesAuthTokenExist(context) && (isAdmin(context) || isSuperAdmin(data.email));
const canAssignModeratorRole =  (data:any, context:any) => canAssignAdminRole(data,context) || isModerator(context) ;
const canVerifyVolunteerRole = (data:any,context:any) => canAssignModeratorRole(data,context) || isVerifiedVolunteer(context);

export const markUserAsAdmin = (email:string) => {
    return new Promise((resolve,reject)=>{
        let newProfile :any = {};
        newProfile.isadmin = true;
        var userRef = admin.firestore().collection('user_profiles').doc(email.toLowerCase());
        userRef.set(newProfile,{merge: true}).then((res)=>{
            resolve();
        }).catch((ex)=>{
            reject();
        })
    })
};

export const markUserAsModerator = (email:string) => {
    return new Promise((resolve,reject)=>{
        let newProfile :any = {};
        newProfile.ismoderator = true;
        var userRef = admin.firestore().collection('user_profiles').doc(email.toLowerCase());
        userRef.set(newProfile,{merge: true}).then((res)=>{
            resolve();
        }).catch((ex)=>{
            reject();
        })
    })
};

export const markUserAsVerifiedVolunteer = (email:string) => {
    return new Promise((resolve,reject)=>{
        let newProfile :any = {};
        newProfile.isverifiedvolunteer = true;
        var userRef = admin.firestore().collection('user_profiles').doc(email.toLowerCase());
        userRef.set(newProfile,{merge: true}).then((res)=>{
            resolve();
        }).catch((ex)=>{
            reject();
        })
    })
};

export const updateUserProfile = functions.https.onCall((data,context)=>{
    return new Promise((resolve,reject)=>{
        // need to verify user
        let newProfile :any = {};
        newProfile.firstname = data && data.firstname ? data.firstname : "";
        newProfile.lastname = data && data.lastname ? data.lastname : "";
        newProfile.fullname = data && data.fullname ? data.fullname : "";
        newProfile.last_login_time = new Date();
        var userRef = admin.firestore().collection('user_profiles').doc(data.username.toLowerCase());
        userRef.set(newProfile,{merge: true}).then((res)=>{
            resolve(res);
        }).catch((ex)=>{
            reject(ex);
        })
    })
});

export const updateUserProfileAll = functions.https.onCall((data,context)=>{
    return new Promise((resolve,reject)=>{
        // need to verify user
        let newProfile :any = {};
        newProfile.firstname = data && data.firstname ? data.firstname : "";
        newProfile.lastname = data && data.lastname ? data.lastname : "";
        newProfile.fullname = data && data.fullname ? data.fullname : "";
        newProfile.isavailablevolunteer = data.isavailablevolunteer;
		newProfile.isadult = data.isadult;
        newProfile.isregisteredvolunteer = true;        
        newProfile.last_login_time = new Date();
        var userRef = admin.firestore().collection('user_profiles').doc(data.username.toLowerCase());
        userRef.set(newProfile,{merge: true}).then((res)=>{
            resolve(res);
        }).catch((ex)=>{
            reject(ex);
        })
    })
});

export const registerUserAsVolunteer = functions.https.onCall((data,context)=>{
    return new Promise((resolve,reject)=>{
        // validate user
        let newProfile :any = {};
        newProfile.isregisteredvolunteer = true;
        newProfile.isavailablevolunteer = data.isavailablevolunteer;
        newProfile.last_login_time = new Date();
        var userRef = admin.firestore().collection('user_profiles').doc(data.username.toLowerCase());
        userRef.set(newProfile,{merge: true}).then((res)=>{
            resolve({
                msg: "User Registered as volunteer"
            });
        }).catch((ex)=>{
            reject(ex);
        })
    })
});

export const assignRole = functions.https.onCall((data,context)=>{
    if(data && data.email && data.typeofrole){
        if(data.typeofrole ===`admin`){
            return admin.auth().getUserByEmail(data.email).then(user =>{
                if(canAssignAdminRole(data,context)){
                    let adminClaims = {
                        admin:true,
                        moderator: user && user.customClaims && user.customClaims.moderator,
                        verifiedvolunteer : user && user.customClaims && user.customClaims.verifiedvolunteer,
                    };
                    return admin.auth().setCustomUserClaims(user.uid,adminClaims).then(async (ref)=>{
                        await markUserAsAdmin(data.email);
                        return ref;
                    });
                }  else{
                    throw new Error("Only admins can cascade admin rights");
                }      
            }).then(()=>{
                return {
                    data: `Added user ${data.email} as admin`
                }
            }).catch((err)=>{
                return err;
            })
        } else if(data.typeofrole ===`moderator`){
            return admin.auth().getUserByEmail(data.email).then(user =>{
                if(canAssignModeratorRole(data,context)){
                    let moderatorClaims = {
                        admin: user && user.customClaims && user.customClaims.admin,
                        moderator:true,
                        verifiedvolunteer :user && user.customClaims && user.customClaims.verifiedvolunteer,
                    };
                    return admin.auth().setCustomUserClaims(user.uid, moderatorClaims).then(async (ref)=>{
                        await markUserAsModerator(data.email);
                        return ref;
                    });
                }  else{
                    throw new Error("Only admins / moderator can cascade moderator rights");
                }      
            }).then(()=>{
                return {
                    data: `Added user ${data.email} as moderator`
                }
            }).catch((err)=>{
                return err;
            })
        } else if(data.typeofrole ===`verifiedvolunteer`){
            return admin.auth().getUserByEmail(data.email).then(user =>{
                if(canVerifyVolunteerRole(data,context)){
                    let volunteerClaims = {
                        admin: user && user.customClaims && user.customClaims.admin,
                        moderator:user && user.customClaims && user.customClaims.moderator,
                        verifiedvolunteer :true,
                    };
                    return admin.auth().setCustomUserClaims(user.uid, volunteerClaims).then(async (ref)=>{
                        await markUserAsVerifiedVolunteer(data.email);
                        return ref;
                    });
                }  else{
                    throw new Error("Only admins / moderator / verified volunteers can verify other volunteers");
                }      
            }).then(()=>{
                return {
                    data: `Volunteer ${data.email} marked as verified`
                }
            }).catch((err)=>{
                return err;
            })
        } else {
            return {
                data: `Not a valid role`
            }
        }
    } else {
        return {
            data: `Not a valid email address`
        }
    }
});

export const sendSupportRequestNotification = functions.firestore.document('support_requests/{support_request}')
.onCreate((snap,ctx)=>{
    const data :any=snap.data();
    console.log(data.id);
    console.log(data);
    console.log("------------- firebase config");
    console.log(functions.config().admin_email.username);
    console.log("------------- done");
});