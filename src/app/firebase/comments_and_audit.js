import * as _ from "lodash";
import firebase from "firebase";

const db = firebase.firestore();

export const submitComment = (parententity, parententityid, comment, commentor_email) => {
    const form = { entity: parententity, entityid: parententityid, comment, commentor: commentor_email, timestamp : new Date()};
    return new Promise((resolve,reject)=>{
         db.collection("comments")
        .add(form)
        .then(docRef => {
            resolve({
                msg: "Comment submitted successfully",
                docRef
            });
        }).catch((ex)=>{
            reject({
                msg: "Failed to submit comment",
                ex
            });
        })
    })
};
export const submitAudit = (parententity, parententityid, message, sender_email) => {
    const form = { entity: parententity, entityid: parententityid, message, sender: sender_email, timestamp : new Date()};
    return new Promise((resolve,reject)=>{
         db.collection("audit")
        .add(form)
        .then(docRef => {
            resolve({
                msg: "Audit entry submitted successfully",
                docRef
            });
        }).catch((ex)=>{
            reject({
                msg: "Failed to submit audit entry",
                ex
            });
        })
    })
};