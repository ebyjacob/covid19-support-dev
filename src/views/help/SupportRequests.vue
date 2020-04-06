<template>
  <div>
    <div class="container mt-4">
      <div
        v-if="user && user.loggedIn && user.data && (user.data.admin || user.data.moderator || user.data.verifiedvolunteer)"
      >
        <div class="row mt-4">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-4">Filter By Status</div>
                  <div class="col-sm-8">
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'active' }}">Open</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'new' }}">New</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'pickedup' }}">Picked Up</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'waiting-for-pickup' }}">Waiting for pickup</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'closed' }}">Closed</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'completed' }}">Completed</router-link></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12" v-if="supportrequests">
            <div class="card">
              <div class="card-header">Support Requests<button type="button" class="btn btn-primary float-right ml-1" @click="nextPage(filterStatus)">&gt;</button><button type="button" class="btn btn-primary float-right" @click="prevPage(filterStatus)">&lt;&lt;</button></div>
              <div class="card-body">
                <div v-for="supportrequest in supportrequests" :key="supportrequest.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: supportrequest.id }}"
                    >{{supportrequest.data.request.title || 'No Title'}}</router-link>
                  </span> -
                  <span
                    style="font-size:16px;font-weight:light;"
                  >{{supportrequest.data.request.status || 'new'}}</span> -
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: supportrequest.id }}"
                  >More details</router-link>
                  <br />
                  For {{ supportrequest.data.contact.name || supportrequest.data.contact.email }} by
                  <i>{{supportrequest.data.user_displayName || supportrequest.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <p>{{supportrequest.data.request.detail}}</p>
                  <hr />
                </div>
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
var db = firebase.firestore();
export default {
  data() {
    return {
      supportrequests: null,
      pageSize: 5,
      firstSupportRequest: null,
      lastSupportRequest: null,
      filterStatus: []
    };
  },
  watch: {
    '$route.params.status': function (id) {
      this.fetchJobs()
    }
  },
  methods: {
    getAllJobs() {
      return db
        .collection("support_requests")
        .orderBy("timestamp", "desc")
        .limit(50)
        .get();
    },
    getActiveJobs() {
      return db
        .collection("support_requests")
        .where("request.status", "in", this.filterStatus)
        .orderBy("timestamp", "desc")
        .limit(this.pageSize)
        .get();
    },
    getJobsByStatus(s) {
      return db
        .collection("support_requests")
        .where("request.status", "==", s)
        .orderBy("timestamp", "desc")
        .limit(this.pageSize)
        .get();
    },
    nextPage(filterStatus) {
      return db
        .collection("support_requests")
        .where("request.status", "in", filterStatus)
        .orderBy("timestamp", "desc")
        .startAfter(this.lastSupportRequest)
        .limit(this.pageSize)
        .get()
        .then(querySnapshot => {
          this.supportrequests = this.getSupportRequests(querySnapshot);
        });  
   },
   prevPage(filterStatus) {
    return db
        .collection("support_requests")
        .where("request.status", "in", filterStatus)
        .orderBy("timestamp", "desc")
        .endBefore(this.firstSupportRequest)
        .limit(this.pageSize)
        .get()
        .then(querySnapshot => {
          this.supportrequests = this.getSupportRequests(querySnapshot);
        });        
  },
   lastPage(filterStatus) {
    return db
        .collection("support_requests")
        .where("request.status", "in", filterStatus)
        .orderBy("timestamp", "asc")
        .limit(this.pageSize)
        .get()
        .then(querySnapshot => {
          this.supportrequests = this.getSupportRequests(querySnapshot);
        });
  },
  getSupportRequests(querySnapshot){
    let support_requests = [],lastDoc=null,firstDoc=null;
    this.lastSupportRequest = querySnapshot.docs[querySnapshot.docs.length - 1];
    this.firstSupportRequest = querySnapshot.docs[0];

    querySnapshot.forEach(doc => {
        support_requests.push({
              id: doc.id,
              data: doc.data()
        });
    });

    return support_requests;

  },
  fetchJobs() {
      const filter_status = this.$route.params.status;
      if (!filter_status || filter_status === "active" || filter_status === "open") {
        this.filterStatus=["new", "pickedup", "waiting-for-pickup"];
        this.getActiveJobs().then(querySnapshot => {
          this.supportrequests = this.getSupportRequests(querySnapshot);
        });
      } else {
        if (filter_status)
        this.filterStatus.push(filter_status);
        this.getJobsByStatus(filter_status).then(querySnapshot => { 
          this.supportrequests = this.getSupportRequests(querySnapshot);
        });
      }
    }
  },
  created() {
    this.fetchJobs();
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style>

.divider{
    margin-right:0.1rem !important;
    margin-left:0.1rem !important;
    height:auto;
    display:inline-block;
}

</style>