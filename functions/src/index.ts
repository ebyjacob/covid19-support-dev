import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const superadmins = [ 'eby7jacob@gmail.com' , 'masteruser@covid19-support-dev-eby.web.app' ];

export const helloWorld = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers','*');
    response.send({ data: "Hello from Firebase!" });
});

export const addAdmin = functions.https.onCall((data,context)=>{
    if(data.email){
        return admin.auth().getUserByEmail(data.email).then(user =>{
            if(context.auth?.token.admin === true || superadmins.indexOf(data.email.toLowerCase()) > -1 ){
                return admin.auth().setCustomUserClaims(user.uid,{
                    admin:true,
                    moderator:context.auth?.token.moderator === true,
                    verifiedvolunteer :context.auth?.token.verifiedvolunteer === true,
                })
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
    } else {
        return {
            data: `Not a valid email address`
        }
    }
});

export const addModerator = functions.https.onCall((data,context)=>{
    if(data.email){
        return admin.auth().getUserByEmail(data.email).then(user =>{
            if(context.auth?.token.admin === true || context.auth?.token.moderator === true || superadmins.indexOf(data.email.toLowerCase()) > -1 ){
                return admin.auth().setCustomUserClaims(user.uid,{
                    admin:context.auth?.token.admin === true,
                    moderator:true,
                    verifiedvolunteer :context.auth?.token.verifiedvolunteer === true,
                })
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
    } else {
        return {
            data: `Not a valid email address`
        }
    }
});

export const verifyVolunteer = functions.https.onCall((data,context)=>{
    if(data.email){
        return admin.auth().getUserByEmail(data.email).then(user =>{
            if(context.auth?.token.admin === true || context.auth?.token.moderator === true || context.auth?.token.verifiedvolunteer === true || superadmins.indexOf(data.email.toLowerCase()) > -1 ){
                return admin.auth().setCustomUserClaims(user.uid,{
                    admin:context.auth?.token.admin === true,
                    moderator:context.auth?.token.moderator === true,
                    verifiedvolunteer :true,
                })
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
            data: `Not a valid email address`
        }
    }
});
