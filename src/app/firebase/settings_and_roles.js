import * as _ from "lodash";
import firebase from "firebase";

const db = firebase.firestore();

export const updateApplicationSettings = (appSettings, user_email) => {
    return new Promise((resolve,reject)=>{
        db.collection("application_settings")
        .doc("application_settings")
        .set(appSettings,{merge:true})
        .then((res)=>{
            resolve({
                msg: "Settings saved Successfully",
                res
            });
        }).catch((ex)=>{
            reject({
                msg: "Failed to save settings",
                ex
            })
        })
    })
};
export const updateUserRoles = (email,typeofrole) => {
    return new Promise((resolve,reject)=>{
        const addRole = firebase.functions().httpsCallable("assignRole");
        addRole({ email, typeofrole})
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{ 
                reject(err);
            })

    })
}