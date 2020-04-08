import * as _ from "lodash";
import firebase from "firebase";
const db = firebase.firestore();

export const track_support_request = (tracking_id, phone, email) => {
    return new Promise((resolve,reject)=>{
        db.collection("support_requests")
            .doc(tracking_id)
            .get()
            .then((docRef)=>{
                let supportrequest = docRef.data();
                if(supportrequest.contact && supportrequest.contact.email === email && supportrequest.contact.phone === phone){
                    resolve(supportrequest);
                } else {
                    reject({
                        msg: "No matching records found"
                    })
                }
            }).catch(ex=>{
                reject({
                    msg: "No matching records found"
                })
            })
    })
}
export const track_donation = (tracking_id, phone, email) => {
    return new Promise((resolve,reject)=>{
        db.collection("donations")
            .doc(tracking_id)
            .get()
            .then((docRef)=>{
                let donation = docRef.data();
                if(donation.contact && donation.contact.email === email && donation.contact.phone === phone){
                    resolve(donation);
                } else {
                    reject({
                        msg: "No matching records found"
                    })
                }
            }).catch(ex=>{
                reject({
                    msg: "No matching records found"
                })
            })
    })
}