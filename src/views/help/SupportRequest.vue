<template>
  <div>
    <div class="container mt-4">
      <div v-if="user && user.loggedIn && supportrequest">
        <div class="row">
          <div class="col-sm-12">
            <div class="card mt-4">
              <div class="card-body" v-if="supportrequest && supportrequest.request">
                <h4 class="text-primary">{{supportrequest.request.title}}</h4>
                <div class="row my-4">
                  <div class="col-sm-4">Status</div>
                  <div class="col-sm-8">{{supportrequest.request.status ||'New / UnAssigned'}}</div>
                </div>
                <div class="row my-4" v-if="supportrequest.request.status === 'pickedup'">
                  <div class="col-sm-4">Pickup Status</div>
                  <div
                    class="col-sm-8"
                  >Picked up by {{supportrequest.picked_up_by}} on {{new Date(supportrequest.picked_up_on.seconds* 1000)}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Details</div>
                  <div class="col-sm-8">{{supportrequest.request.detail || 'No details provided'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Requested for</div>
                  <div class="col-sm-8">{{supportrequest.contact.name||'Not Available'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Contact Address</div>
                  <div class="col-sm-8">{{supportrequest.contact.address||'Not Available'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Contact Phone</div>
                  <div class="col-sm-8">{{supportrequest.contact.phone||'Not Available'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Contact Email</div>
                  <div class="col-sm-8">{{supportrequest.contact.email||'Not Available'}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-right">
            <div
              class="card"
              v-if="supportrequest && supportrequest.request && (supportrequest.request.status === '' || supportrequest.request.status==='new')"
            >
              <div class="card-body">
                <button
                  class="btn btn-primary mr-4"
                  v-if="supportrequest.request.status === '' || supportrequest.request.status==='new'"
                  @click="pickupJobMyself"
                >Assign to myself</button>
              </div>
            </div>
            <div
              class="card"
              v-if="supportrequest && supportrequest.request && supportrequest.picked_up_by === user.data.email && (supportrequest.request.status === 'pickedup' || supportrequest.request.status==='inprogress')"
            >
              <div class="card-body">
                <button class="btn btn-primary mr-4" @click="releaseJob">Release Job</button>
                <button class="btn btn-primary mr-4" @click="markJobAsCompleted">Complete Job</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-primary">Comments</h5>
                <div v-if="supportrequest">
                  <div v-for="(comment,index) in supportrequest.comments" :key="index" class="row">
                    <div class="col-sm-12 py-2">
                      {{comment.comment ||'-----------------'}}
                      <br />-
                      <i>{{comment.commentor}}</i>
                      - {{new Date(comment.timestamp.seconds * 1000)}}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <textarea
                          id="newcomment"
                          type="text"
                          placeholder="Comment"
                          class="form-control"
                          rows="3"
                          v-model="newcomment"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-8"></div>
                  <div class="col-sm-4">
                    <div class="text-right mr-4">
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="submitComment"
                      >Submit Comment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="user && user.data && user.data.admin">
          <div class="col-sm-12">
            <div
              class="card"
              v-if="supportrequest && supportrequest.request && user && user.data && user.data.admin"
            >
              <div class="card-body">
                <button
                  class="btn btn-danger mr-4"
                  @click="deleteJob"
                >Delete Job</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>Loading...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import * as _ from "lodash";
export default {
  data() {
    return {
      newcomment: "",
      supportrequest: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    this.fetchJob();
  },
  methods: {
    fetchJob() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.supportrequestid
      ) {
        var db = firebase.firestore();
        db.collection("support_requests")
          .doc(this.$route.params.supportrequestid)
          .get()
          .then(docRef => {
            let supportrequest = docRef.data();
            supportrequest.comments = supportrequest.comments || [];
            this.supportrequest = supportrequest;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submitComment() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.supportrequestid
      ) {
        let comments = this.supportrequest.comments.concat({
          comment: this.newcomment,
          timestamp: new Date(),
          commentor: this.user.data.email || "unknown"
        });
        var db = firebase.firestore();
        var docRef = db
          .collection("support_requests")
          .doc(this.$route.params.supportrequestid);
        docRef
          .set(
            {
              comments
            },
            { merge: true }
          )
          .then(result => {
            this.fetchJob();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    pickupJobMyself() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.supportrequestid
      ) {
        var db = firebase.firestore();
        var docRef = db
          .collection("support_requests")
          .doc(this.$route.params.supportrequestid);
        let newcomments = this.supportrequest.comments || [];
        newcomments.push({
          commentor: this.user.data.email,
          comment: "Job picked up",
          timestamp: new Date()
        });
        docRef
          .set(
            {
              request: _.set(this.supportrequest.request, "status", "pickedup"),
              comments: newcomments,
              picked_up_by: this.user.data.email,
              picked_up_on: new Date()
            },
            { merge: true }
          )
          .then(result => {
            this.fetchJob();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    releaseJob() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.supportrequestid
      ) {
        let newcomments = this.supportrequest.comments || [];
        newcomments.push({
          commentor: this.user.data.email,
          comment: "Released Job",
          timestamp: new Date()
        });
        var db = firebase.firestore();
        var docRef = db
          .collection("support_requests")
          .doc(this.$route.params.supportrequestid);
        docRef
          .set(
            {
              comments: newcomments,
              request: _.set(this.supportrequest.request, "status", "new"),
              picked_up_by: ""
            },
            { merge: true }
          )
          .then(result => {
            console.log(result);
            this.fetchJob();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    markJobAsCompleted() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.supportrequestid
      ) {
        let newcomments = this.supportrequest.comments || [];
        newcomments.push({
          commentor: this.user.data.email,
          comment: "Completed Job",
          timestamp: new Date()
        });
        var db = firebase.firestore();
        var docRef = db
          .collection("support_requests")
          .doc(this.$route.params.supportrequestid);
        docRef
          .set(
            {
              request: _.set(
                this.supportrequest.request,
                "status",
                "completed"
              ),
              comments: newcomments,
              completed_by: this.user.data.email,
              completed_on: new Date()
            },
            { merge: true }
          )
          .then(result => {
            console.log(result);
            this.fetchJob();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteJob() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.supportrequestid &&
        this.user.data.admin
      ) {
        let newcomments = this.supportrequest.comments || [];
        newcomments.push({
          commentor: this.user.data.email,
          comment: "Completed Job",
          timestamp: new Date()
        });
        var db = firebase.firestore();
        var docRef = db
          .collection("support_requests")
          .doc(this.$route.params.supportrequestid);
        docRef
          .delete()
          .then(result => {
            this.$router.replace({
              name: "support-requests"
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>