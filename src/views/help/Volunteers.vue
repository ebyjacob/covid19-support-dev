<template>
  <div>
    <div class="container mt-4">
      <div
        v-if="user && user.loggedIn && user.data && (user.data.admin || user.data.moderator || user.data.verifiedvolunteer)"
      >

	     <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group-cat">
                      <div role="group" class>
                        <b-form-group label="Verification Status" label-for="VerSelect" :label-cols="6">
                        <b-form-select
                          id="VerSelect"
                          :plain="true" 
                          :options="['All','Verified','Non Verified']"
						  @change="fetchJobs"
                          value="Please select"
                          v-model="filter.verifiedVolunteer"
                        ></b-form-select>
                      </b-form-group>
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group-cat">
                      <div role="group" class>
                        <b-form-group label="Availability" label-for="availableSelect" :label-cols="6">
                        <b-form-select
                          id="availableSelect"
                          :plain="true" 
                          :options="['All','Available','Not Available']"
						  @change="fetchJobs"
                          value="Please select"
                          v-model="filter.isavailablevolunteer"
                        ></b-form-select>
                      </b-form-group>
                      </div>
                    </fieldset>
                  </div>
            </div>
         <div class="row">
          <div class="col-sm-12" v-if="volunteers">
            <div class="card">
              <div class="card-header"><span class="btn btn-primary"><b>Volunteers</b></span>
                 <button type="button" class="btn btn-primary float-right" @click="lastPage()">&gt;&gt;</button>
                 <button type="button" class="btn btn-primary float-right ml-1" @click="nextPage()">&gt;</button>
                 <button type="button" class="btn btn-primary float-right" @click="prevPage()">&lt;</button>
                 <button type="button" class="btn btn-primary float-right" @click="fetchJobs()">&lt;&lt;</button>
              </div>
              
                <div v-for="Volunteer in volunteers" :key="Volunteer.id">
					 {{Volunteer}}
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
      volunteers: null,
      pageSize: 5,
      firstVolunteers: null,
      lastVolunteers: null,
      loadedFrom:"base",
	  filter:{
		  verifiedVolunteer: "All",
		  isavailablevolunteer: "All"
	  }
    };
  },
  methods: {
     getFilteredVolunteerList(){
        let volList=null
		volList=db
		.collection("user_profiles")
	 if(this.filter.verifiedVolunteer==="Verified"){
		 volList=volList.where("isverifiedvolunteer","==",true)
	 } else if(this.filter.verifiedVolunteer ==="Non Verified"){
		 volList=volList.where("isverifiedvolunteer","==",false)
	 }

	 if(this.filter.isavailablevolunteer==="Available"){
		 volList=volList.where("isavailablevolunteer","==",true)
	 } else if(this.filter.isavailablevolunteer ==="Not Available"){
		 volList=volList.where("isavailablevolunteer","==",false)
	 }

	  return volList;
	},
    getVolunteerList() {
	  return this.getFilteredVolunteerList()
	    .orderBy("username")
        .limit(this.pageSize)
        .get();
    },
    nextPage() {
	  this.loadedFrom="next";
      return this.getFilteredVolunteerList()
		.orderBy("username")
        .startAfter(this.lastVolunteers)
        .limit(this.pageSize)
        .get()
        .then(querySnapshot => {
          this.volunteers = this.getvolunteers(querySnapshot);
          if(this.volunteers.length<this.pageSize){
            this.lastPage();
          }
        }); 
   },
   prevPage() {
    this.volunteers =[];
    this.loadedFrom="prev";
    return this.getFilteredVolunteerList()
		.orderBy("username")
        .endBefore(this.firstVolunteers)
        .limitToLast(this.pageSize)
        .get()
        .then(querySnapshot => {
		  this.volunteers = this.getvolunteers(querySnapshot);
		  if(this.volunteers.length<this.pageSize){
            this.fetchJobs();
          }
        }); 
  },
   lastPage() {
    this.loadedFrom="base";
    return this.getFilteredVolunteerList()
		.orderBy("username","desc")
		.limit(this.pageSize)
        .get()
        .then(querySnapshot => {
          this.volunteers = this.getvolunteers(querySnapshot);
        });
  },
  getvolunteers(querySnapshot){
    let categories_response = [];
	let i=0;
    querySnapshot.forEach(doc => {
	  if(i==0){
        this.firstVolunteers = doc;
      }

      if(i == (this.pageSize -1)) {
        this.lastVolunteers = doc;
      }
       i++;
		categories_response.push({
              id: doc.id,
              data: doc.data()
        });
	});

	this.volunteers=categories_response;

    return categories_response;

  },
  fetchJobs() {
      this.volunteers =[];
      this.getVolunteerList().then(querySnapshot => {
          this.volunteers = this.getvolunteers(querySnapshot);
          this.pageNavStatusCheck();
      });
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

