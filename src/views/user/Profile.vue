<template>
  <div>
    <div class="container mt-4">
      <div v-if="user && user.loggedIn">
        <div class="row">
          <div class="col-md-12">
            <h4>Hi {{user.data.displayName}}!</h4>
          </div>
        </div>
        <div class="row mt-4" v-if="user && user.data && user.data.verifiedvolunteer">
          <div class="col-sm-6" v-if="support_requests_assigned_to_me">
            <div class="card">
              <div class="card-header">Jobs assigned to me</div>
              <div class="card-body">
                <div v-for="myassignment in support_requests_assigned_to_me" :key="myassignment.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: myassignment.id }}"
                    >{{myassignment.data.request.title}}</router-link>
                  </span>&nbsp;&nbsp;-&nbsp;&nbsp;
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: myassignment.id }}"
                  >More details</router-link>
                  Status : {{myassignment.data.request.status}}
                  <br />
                  For {{ myassignment.data.contact.name || myassignment.data.contact.email }} by
                  <i>{{myassignment.data.user_displayName || myassignment.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <br />
                </div>
                <div v-if="support_requests_assigned_to_me.length ===0">No Support requests available for action.</div> 
              </div>
            </div>
          </div>
          <div class="col-sm-6" v-if="donations_assigned_to_me">
            <div class="card">
              <div class="card-header">Donations assigned to me</div>
              <div class="card-body">
                <div v-for="donation in donations_assigned_to_me" :key="donation.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'donation', params: { donationid: donation.id }}"
                    >{{donation.data.donation.title}}</router-link>
                  </span>&nbsp;&nbsp;-&nbsp;&nbsp;
                  <router-link
                    :to="{ name: 'donation', params: { donationid: donation.id }}"
                  >More details</router-link>
                  Status : {{donation.data.donation_status}}
                  <br />
                  For {{ donation.data.contact.name || donation.data.contact.email }} by
                  <i>{{donation.data.user_displayName || donation.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <br />
                </div>
                <div v-if="donations_assigned_to_me.length ===0">No donations available for action.</div> 
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-6" v-if="support_requests_created_by_me">
            <div class="card">
              <div class="card-header">Support Requests created by you</div>
              <div class="card-body">
                <div v-for="mysupportrequest in support_requests_created_by_me" :key="mysupportrequest.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: mysupportrequest.id }}"
                    >{{mysupportrequest.data.request.title}}</router-link>
                  </span>&nbsp;&nbsp;--&nbsp;&nbsp;
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: mysupportrequest.id }}"
                  >More details</router-link>
                  <br />
                  For {{ mysupportrequest.data.contact.name || mysupportrequest.data.contact.email }} by
                  <i>{{mysupportrequest.data.user_displayName || mysupportrequest.data.user_email || 'Unknown User' }}</i>
                  <hr />
                </div>
                <div v-if="support_requests_created_by_me.length ===0">
                  No Support request created by you. <router-link to="need/support">Request for help here</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6" v-if="donations_created_by_me">
            <div class="card">
              <div class="card-header">Donation Requests created by you</div>
              <div class="card-body">
                <div v-for="donation in donations_created_by_me" :key="donation.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'donation', params: { donationid: donation.id }}"
                    >{{donation.data.donation.title}}</router-link>
                  </span>
                  <br />
                  <i>{{donation.data.user_displayName || donation.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <p>{{donation.data.donation.message}}</p>
                  <hr />
                </div>                
                <div v-if="donations_created_by_me.length ===0">
                  No Donations offered by you / No active requests. <router-link to="donate">Offer your donation here</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>You are not logged in</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { profile_get_open_jobs_of_user, profile_get_open_jobs_created_by_user, profile_get_open_donations_created_by_user, profile_get_open_donation_assigments_of_user } from "@/app/backend"
export default {
  data() {
    return {
      donations_created_by_me: null,
      support_requests_created_by_me: null,
      support_requests_assigned_to_me: null,
      donations_assigned_to_me: null,
    };
  },
  methods: {
    async fetchDonationsList() {
      if(this.user && this.user.loggedIn){
        this.donations_created_by_me = await profile_get_open_donations_created_by_user(this.user.data.email);
      }
    },
    async fetchSupportRequests() {
      if(this.user && this.user.loggedIn){
        this.support_requests_created_by_me = await profile_get_open_jobs_created_by_user(this.user.data.email);
      }
    },
    async fetchMyOpenAssigments() {
      if(this.user && this.user.data && this.user.data.verifiedvolunteer){
        this.support_requests_assigned_to_me = await profile_get_open_jobs_of_user(this.user.data.email);      
      }
    },
    async fetchMyOpenDonationAssigments() {
      if(this.user && this.user.data && this.user.data.verifiedvolunteer){
        this.donations_assigned_to_me = await profile_get_open_donation_assigments_of_user(this.user.data.email);      
      }
    }
  },
  created() {
    if(this.user && this.user.loggedIn){
      this.fetchDonationsList();
      this.fetchSupportRequests();
      this.fetchMyOpenAssigments();
      this.fetchMyOpenDonationAssigments();
    } else {
      this.$router.replace({ name: "login" });
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>