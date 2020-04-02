import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const superadmins = [ 'yesoreyeram@gmail.com' , 'masteruser@covid19-support-dev.web.app' ];

export const assignRole = functions.https.onCall((data,context)=>{
    if(data.typeofrole ===`admin`){
        if(data.email){
            return admin.auth().getUserByEmail(data.email).then(user =>{
                if(context.auth?.token.admin === true || superadmins.indexOf(data.email.toLowerCase()) > -1 ){
                    return admin.auth().setCustomUserClaims(user.uid,{
                        admin:true,
                        moderator: user && user.customClaims && user.customClaims.moderator,
                        verifiedvolunteer : user && user.customClaims && user.customClaims.verifiedvolunteer,
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
    } else if(data.typeofrole ===`moderator`){
        if(data.email){
            return admin.auth().getUserByEmail(data.email).then(user =>{
                if(context.auth?.token.admin === true || context.auth?.token.moderator === true || superadmins.indexOf(data.email.toLowerCase()) > -1 ){
                    return admin.auth().setCustomUserClaims(user.uid,{
                        admin: user && user.customClaims && user.customClaims.admin,
                        moderator:true,
                        verifiedvolunteer :user && user.customClaims && user.customClaims.verifiedvolunteer,
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
    } else if(data.typeofrole ===`verifiedvolunteer`){
        if(data.email){
            return admin.auth().getUserByEmail(data.email).then(user =>{
                if(context.auth && context.auth.token && (context.auth.token.admin === true || context.auth?.token.moderator === true || context.auth?.token.verifiedvolunteer === true || superadmins.indexOf(data.email.toLowerCase()) > -1) ){
                    return admin.auth().setCustomUserClaims(user.uid,{
                        admin: user && user.customClaims && user.customClaims.admin,
                        moderator:user && user.customClaims && user.customClaims.moderator,
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
    }  else {
        return {
            data: `Not a valid role`
        }
    }
});