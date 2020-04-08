import * as _ from "lodash";
import firebase from "firebase";
import { submitAudit } from "./comments_and_audit";

export const ENTITY_TYPES = {
    SUPPORT_REQUEST : "support_request"
};

const db = firebase.firestore();

export const fetchSupportRequestById = (supportrequestid) => {
    return new Promise((resolve,reject)=>{
        db.collection("support_requests")
        .doc(supportrequestid)
        .get()
        .then(docRef => {
            let supportrequest = docRef.data();
            supportrequest.comments = supportrequest.comments || [];
            resolve(supportrequest);
        })
        .catch(err => {
            reject({
                msg : "Failed to retreive support request details",
                err
            })
        });
    })
};
export const fetchCommentsForSupportRequest = (supportrequestid) =>{
    return new Promise((resolve,reject)=>{
        db.collection("comments")
        .where("entityid","==",supportrequestid)
        .where("entity","==",ENTITY_TYPES.SUPPORT_REQUEST)
        .limit(20)
        .get()
        .then((querySnapshot)=>{
            let comments = [];
            querySnapshot.forEach(doc => {
                comments.push({
                  id: doc.id,
                  data: doc.data()
                });
            });
            resolve(comments);
        }).catch(ex=>{
            reject(ex);
        })
    })
};
export const fetchHistoryForSupportRequest = (supportrequestid) =>{
    return new Promise((resolve,reject)=>{
        db.collection("audit")
        .where("entityid","==",supportrequestid)
        .where("entity","==",ENTITY_TYPES.SUPPORT_REQUEST)
        .limit(20)
        .get()
        .then((querySnapshot)=>{
            let auditentries = [];
            querySnapshot.forEach(doc => {
                auditentries.push({
                  id: doc.id,
                  data: doc.data()
                });
            });
            resolve(_.orderBy(auditentries,"data.timestamp","desc"));
        }).catch(ex=>{
            reject(ex);
        })
    })
};
export const deleteSupportRequest = (supportrequestid, requestor_email) => {
    return new Promise((resolve,reject)=>{
        db
          .collection("support_requests")
          .doc(supportrequestid)
          .delete()
          .then(async (result)=>{
              let auditmsg = await submitAudit(ENTITY_TYPES.SUPPORT_REQUEST,supportrequestid,"Deleted Support Request",requestor_email);
              resolve({
                  msg: "Support request deleted successfully",
                  result
              })
          })
          .catch((ex)=>{
            reject({
                msg : "Error while deleting exception",
                ex
            })
          })
    })
};
export const updateSupportRequestStatus = (supportrequestid, supportrequest , new_status, updated_by_email) => {
    if(new_status === 'new') {
        supportrequest = _.set(supportrequest,"picked_up_by", '');
    } else if(new_status === 'pickedup') {
        supportrequest = _.set(supportrequest,"picked_up_by", updated_by_email);
        supportrequest = _.set(supportrequest,"picked_up_on", new Date());
    } else if(new_status === 'completed'){
        supportrequest = _.set(supportrequest,"completed_by", updated_by_email);
        supportrequest = _.set(supportrequest,"completed_on", new Date());
    }
    supportrequest = _.set(supportrequest,"request.status",new_status);
    return new Promise((resolve,reject)=>{
        db
          .collection("support_requests")
          .doc(supportrequestid)
          .set(supportrequest,{merge:true})
          .then(async (result) => {
            await submitAudit(ENTITY_TYPES.SUPPORT_REQUEST,supportrequestid,`State Changed to ${new_status}`,updated_by_email);
            resolve({
                msg: "Status updates successfully",
                result
            })
          }).catch(ex=>{
              reject({
                  msg: "Failed to update the job",
                  ex
              })
          })
    })
};
