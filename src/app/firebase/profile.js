import * as _ from "lodash";
import firebase from "firebase";

const db = firebase.firestore();

export const profile_get_open_jobs_of_user = (user_email) => {
    return new Promise((resolve,reject)=>{
        db.collection("support_requests")
            .where("picked_up_by", "==", user_email)
            .where("request.status","in",["pickedup"])
            .orderBy("timestamp","desc")
            .get()
            .then(querySnapshot => {
                let myassignments = [];
                querySnapshot.forEach(doc => {
                    myassignments.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                resolve(myassignments)
            }).catch(ex=> {
                reject({
                    msg: "Error while retreiving open assignments",
                    ex
                });
            })
    })
}
export const profile_get_open_jobs_created_by_user = (user_email) => {
    return new Promise((resolve,reject)=>{
        db.collection("support_requests")
            .where("user_email", "==", user_email)
            .where("request.status","in",["new","pickedup"])
            .orderBy("timestamp","desc")
            .get()
            .then(querySnapshot => {
                let jobscreatedbyme = [];
                querySnapshot.forEach(doc => {
                    jobscreatedbyme.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                resolve(jobscreatedbyme)
            }).catch(ex=> {
                reject({
                    msg: "Error while retreiving open jobs",
                    ex
                });
            })
    })
}
export const profile_get_open_donations_created_by_user = (user_email) => {
    return new Promise((resolve,reject)=>{
        db.collection("donations")
            .where("user_email", "==", user_email)
            .where("donation_status","in",["new","pickedup"])
            .orderBy("timestamp","desc")
            .get()
            .then(querySnapshot => {
                let donationsbyme = [];
                querySnapshot.forEach(doc => {
                    donationsbyme.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                console.log(donationsbyme);
                resolve(donationsbyme)
            }).catch(ex=> {
                reject({
                    msg: "Error while retreiving donations",
                    ex
                });
            })
    })
}