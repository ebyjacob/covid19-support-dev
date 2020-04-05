<template>
  <div>
    <div class="container mt-4">
      <div class="animated fadeIn">
      
    <!-- <form @submit="submitRequest"> -->
      	 
        <div class="row" >
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                  <strong>Personal Details</strong>
                </div>
              </div>
              <div class="card-body">
                		
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="firstname">First Name</label>
                        <input
                          id="firstname"
                          type="text"
                          placeholder="First name"
                          class="form-control"
						  v-model="form.personal.firstname"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="lastname">Last Name</label>
                        <input
                          id="lastname"
                          type="text"
                          placeholder="Last name"
                          class="form-control"
						  v-model="form.personal.lastname"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				
				 <div class="row">
                  
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="idtype">Primary ID Type</label>
                        <input
                          id="idtype"
                          type="text"
                          placeholder="Eg: Passport Number, Driving License Number etc.."
                          class="form-control"
						  v-model="form.personal.idtype"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="idproof">Primary ID Number</label>
                        <input
                          id="idproof"
                          type="text"
                          placeholder="Eg: Passport Number, Driving License Number etc.."
                          class="form-control"
						  v-model="form.personal.idproof"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				<div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="sidtype">Secondary ID Type</label>
                        <input
                          id="sidtype"
                          type="text"
                          placeholder="Eg: Passprot, Driving License, BRP etc.."
                          class="form-control"
						  v-model="form.personal.sidtype"
                        />
                      </div>
                    </fieldset>
                  </div>
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="sidproof">Secondary ID Number</label>
                        <input
                          id="sidproof"
                          type="text"
                          placeholder="Eg: Passport Number, Driving License Number etc.."
                          class="form-control"
						  v-model="form.personal.sidproof"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="mobile">Mobile Number</label>
                        <input
                          id="mobile"
                          type="text"
                          placeholder="Mobile number"
                          class="form-control"
						  v-model="form.personal.mobile"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="altmobile">Alternate Number</label>
                        <input
                          id="altmobile"
                          type="text"
                          placeholder="Alternate Contact number "
                          class="form-control"
						  v-model="form.personal.altmobile"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>

        
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="email">Email</label>
                        <input id="email" type="text" placeholder="Email" class="form-control" v-model="form.personal.email"/>
                      </div>
                    </fieldset>
                  </div>
                  
                   <div class="col-sm-6" Password  v-if="user.loggedIn">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                      </div>
                    </fieldset>
                  </div>
                  
      			  <div class="col-sm-5" Password  v-else>
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Password"
                          class="form-control"
						  v-model="password"
                        /> 
                      </div>                   
                    </fieldset>
                  </div>
                  
                   <div class="col-sm-1" v-if="user.loggedIn">
                   </div>
                   
                    <div class="col-sm-1" v-else>
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                      	<label ></label>
		                  <span @click="togglePassword">
		                    <i class="fa fa-eye"></i>
		                  </span>
                      </div>
                   
                    </fieldset>
                  </div>
                </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
        
        
      	 
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                  <strong>Address Information</strong>
                </div>
              </div>
              <div class="card-body">
                		
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="housenumber">House Number</label>
                        <input
                          id="housenumber"
                          type="text"
                          placeholder="House Number of the person offering support"
                          class="form-control"
						  v-model="form.address.housenumber"
                        />
                      </div>
                    </fieldset>
                  </div>
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="buildname">Build  Name</label>
                        <input
                          id="buildname"
                          type="text"
                          placeholder="Build Name of the person offering support"
                          class="form-control"
						  v-model="form.address.buildname"
                        />
                      </div>
                    </fieldset>
                  </div>
			
                </div>
				
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address1">Address Line1</label>
                        <input
                          id="address1"
                          type="text"
                          placeholder="Address Line1"
                          class="form-control"
						  v-model="form.address.address1"
                        />
                      </div>
                    </fieldset>
                  </div>
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address2">Address Line2</label>
                        <input
                          id="address2"
                          type="text"
                          placeholder="Address Line2"
                          class="form-control"
						  v-model="form.address.address2"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				
			 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="area">City/Area</label>
                        <input
                          id="area"
                          type="text"
                          placeholder="Area"
                          class="form-control"
						  v-model="form.address.area"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="postcode">Postcode</label>
                        <input
                          id="postcode"
                          type="text"
                          placeholder="Postcode"
                          class="form-control"
						  v-model="form.address.postcode"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>       
       
              </div>
            </div>
          </div>
        </div>
        
    	<div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                  <strong>Availability Status</strong>
                </div>
              </div>
              <div class="card-body">
                		
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="accountstatus">Availability Status</label> 
                      </div>
                    </fieldset>
                  </div>
			      <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
						<input type="checkbox" v-model="form.accountstatus" id="accountstatus" value="true" unchecked-value="false" checked>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>              
            </div>
          </div>
	</div>       
        
        
        
         <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                   <strong>Availability Preferences</strong>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                           <label for="name">Locations you can support</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-sm-9">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <input
                              id="location"
                              type="text"
                              placeholder="Locations you can support"
                              class="form-control"
							   v-model="form.availability.location"
                            />
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    
                 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="area">Area of Interest to support</label>
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                      </div>
                    </fieldset>
                  </div>
                </div>  
        
        
                <div class="row">
                  <div class="col-sm-3">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                       <ul v-for="cat in categories"><input type="checkbox"  v-bind:value="cat.data.desc" v-model="form.availability.support" :id="cat.data.desc" >{{cat.data.desc}}</ul>
                      </div>
                    </fieldset>
                  </div>
                </div>       
                     
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		
		 <div class="row" v-if="user.loggedIn">
      	 
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-8">
					<div v-if="error" class="alert alert-danger">{{error}}</div>
                    <div
                      v-if="status==='submitted'"
                      class="alert alert-success"
                    >Your request submitted successfully.</div>
                    <div>
                      <p>By Update, I am agreeing the T&C and sharing all the above information with the support team.</p>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="text-right mr-4">
                      <button  class="btn btn-primary"  @click="submitRequest"  v-if="!submitted" >Agree & Update Request</button>
					  <button class="btn btn-secondary" v-else>Submitting...</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
			
        <div class="row"  v-else>
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-8">
					<div v-if="error" class="alert alert-danger">{{error}}</div>
                    <div
                      v-if="status==='submitted'"
                      class="alert alert-success"
                    >Your request submitted successfully.</div>
                    <div>
                      <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="text-right mr-4">
                      <button  class="btn btn-primary" type=“button”  @click="submitRequest" v-if="!submitted" >Agree & Submit Request</button>
                      <button class="btn btn-secondary" v-else>Submitting...</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <!--</form> -->
        
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { ValidationProvider } from 'vee-validate';
import { required, email, numeric } from "vuelidate/lib/validators";
import Router from 'vue-router'

const validName = function (name) {
    return (name.length >= 2 && /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name));
}

const validPhoneNo = function (phone) {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone));
}


export default {
 name: "FormComponent",
  data() {
    return {
      form: {
      	 "accountstatus" : "",
         "availability": {
          "location": "",
          "time": "",
          "support" : []
        },
        "personal": {
          "firstname": "",
          "lastname": "",
          "idtype": "",
		  "idproof": "",
          "sidtype": "",
		  "sidproof": "",
          "mobile": "",
          "altmobile": "",
          "email": ""
        },
        "address": {
          "housenumber": "",
          "buildname": "",
          "address1": "",
          "address2": "",
          "area": "",
          "postcode": ""
        }
        
      },
      password : "",
      submitted: false,
      error: null,
      vol: null,
      categories : null,
      useralreadyexist: false,
      status: "new"
    };
  },
/* validations: {
		form: {
			personal : {
				firstName: { required }
			}
		}
	},*/
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    this.fetchUser();
    this.fetchCategories();
    this.form.accountstatus=true;
  },
  methods: {
     submitRequest() {
      this.submitted = "true";
      /*if (this.$v.$invalid) {
        //alert("ERROR");
            return;
        }*/
        
        
     // alert("2"+ this.$v.$touch());
      /* if its still pending or an error is returned do not submit
      
      
        if (this.$v.$invalid) {
        alert("ERROR");
            return;
        }
      if (this.$v.$pending || this.$v.$error) {
	  alert("ERROR");
		return;
	  }*/
      
      this.register();
      if (this.user.loggedIn && this.user.data) {
        this.form.user_displayName =  this.user.data.displayName || this.user.data.email;
        this.form.user_email = this.user.data.email;
      } else {
      	this.form.user_displayName =this.form.personal.firstname;
      	this.form.user_email=this.form.personal.email;
      }
      this.form.verified = false;
      this.form.upvotes = [];
      this.form.downvotes = [];
      this.form.timestamp = new Date();
     
      if (!this.useralreadyexist) {
      var db = firebase.firestore();
      db.collection("can_support")
		.doc(this.form.user_email)
        .set(this.form)
        .then(docRef => {
          this.status = "submitted";
          this.error = null;
          this.submitted = "false";
          setTimeout(() => {
            this.status = "new";
            this.error = null;
          }, 5 * 1000);
          this.redirect();
        })
        .catch(error => {
          this.error = error;
          this.status = "error";
        });
        }
    },
	fetchUser() {
		if( this.user != null) {
			if (this.user.loggedIn && this.user.data) {		
				this.email = this.user.data.email;
				//alert("Fetch user" + this.user.data.email);
				var db = firebase.firestore();
				let voldata = db.collection('can_support').doc(this.email)
				let getDoc = voldata.get()
				  .then(doc => {
					if (!doc.exists) {
					  console.log('No such document!');
					} else {
					  console.log('Document data:', doc.data());
					   let vol = doc.data();
					   this.vol = vol;
					   //alert("Fetch user" + this.user.data.email);
					   this.populateUserDetails();
					}
				  })
				  .catch(err => {
					console.log('Error getting document', err);
				  });
			}
		}
	},
	updateUser() {
		this.$router.push({ path: '/profile' })
		
	},
	fetchCategories() {		
		var db = firebase.firestore();					  
		let catRef = db.collection('categories');
		
		//let allCats = catRef.orderBy('cid')
		let allCats = catRef.orderBy('cid').get()
		  .then(snapshot => {
		   let categories_response = [];
			snapshot.forEach(doc => {
			  //console.log(doc.id, '=>', doc.data());		
			  this.categories= doc.data();	  
			  categories_response.push({
	            id: doc.id,
	            data: doc.data()
	          });
			});
			this.categories = categories_response;
			
		  })
		  .catch(err => {
			console.log('Error getting documents', err);
		  });
		  
		 this.categories=allCats;
	},
	redirect() {
		if (this.user.loggedIn && this.user.data) {		
			//this.$router.push({ path: '/profile' });
			setTimeout( () => this.$router.push({ path: '/profile'}), 1000);
		} else {
			//alert("ELSE");
			this.login();
			//this.$router.push({ path: '/profile' });
			setTimeout( () => this.$router.push({ path: '/profile'}), 1000);
		}		
		/* else{
			this.$router.push({ path: '/profile' });
		}  */
		
		
	},
	register() {
	this.useralreadyexist = false;
	let statuscheck = this.user.loggedIn && this.user.data;
	//alert("Registeration status"+statuscheck);
	if(!statuscheck) {
	
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.personal.email, this.password)
        .then(result => {
          this.status = "submitted";
          this.error = null;
          result.user
            .updateProfile({
              displayName: this.form.personal.firstname + " " + this.form.personal.lastname
            })
            .then(msg => {
              this.$store.dispatch("fetchUser", result.user);
              //this.$router.replace({ name: "profile" });
              this.useralreadyexist = false;
            });
        })
        .catch(err => {
          this.error = err.message;
          this.status = "error";
          this.useralreadyexist = true;
          this.submitted = false;
        });
        }
    },
    togglePassword() {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    populateUserDetails() {
    	let vol = this.vol;
    	this.form.personal.firstname=vol.personal.firstname;
    	this.form.personal.lastname=vol.personal.lastname;
    	this.form.personal.idtype=vol.personal.idtype; 	
    	this.form.personal.idproof=vol.personal.idproof;
    	this.form.personal.sidtype=vol.personal.sidtype;
    	this.form.personal.sidproof=vol.personal.sidproof;
    	this.form.personal.mobile=vol.personal.mobile;
    	this.form.personal.altmobile=vol.personal.altmobile;
    	this.form.personal.email=vol.personal.email;
    	
    	this.form.address.housenumber=vol.address.housenumber;
    	this.form.address.buildname=vol.address.buildname;
    	this.form.address.address1=vol.address.address1;
    	this.form.address.address2=vol.address.address2;
    	this.form.address.area=vol.address.area;
    	this.form.address.postcode=vol.address.postcode;
    	
    	this.form.availability.location=vol.availability.location;
    	this.form.availability.time=vol.availability.time;
    	this.form.accountstatus=vol.accountstatus;
    	//alert(vol.availability.support);
    	this.form.availability.support=vol.availability.support;
          
	},
    login() {
      //alert("Inside");
      //alert("Login:"+this.form.personal.email);
	  //alert("Pass:"+this.password );
        
      const auth = firebase
        .auth()
        .signInWithEmailAndPassword(this.form.pesonal.email, this.password);
      	auth
        .then(data => {
          if (data && data.user) {
          	//alert(data.user);
            this.$store.dispatch("fetchUser", data.user);
            //this.$router.replace({ name: "profile" });
            //alert("push");
            this.$router.push({ path: '/profile' });
          } else {
         	 //alert("error");
            this.error = "Unknown error";
          }
        })
        .catch(err => {
          alert("push");
          this.error = err.message;
        });
    }
}
 
};

</script>

/*then(querySnapshot => {
       
        querySnapshot.forEach(doc => {
          support_requests.push({
            id: doc.id,
            data: doc.data()
          });
        });*/
        

<style>
input[type=checkbox] {
    vertical-align: middle;
    position: relative;
    bottom: 1px;
}

</style>
