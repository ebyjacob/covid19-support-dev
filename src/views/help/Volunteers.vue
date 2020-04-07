<template>
  <div style="width: 1300px">
    <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
  </div>
  <!--https://github.com/TheoXiong/vue-table-dynamic -->
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import VueTableDynamic from 'vue-table-dynamic'
export default {
  name: 'Demo',
  data() {
    return {
    paramss: {
    	data: [
    	
    	  ['Full Name', 'First Name', 'Last Name','Email', 'AV', 'RV', 'Adult', 'Admin', 'Moderator'],
  		  ['Sakthi', 'vel', 'Sakthi', "sakti@email.com", "true", "true", "false", "false", "false"]
  		  
    	  ]
      },
      params: {
        data: [
      
        ],
        header: 'row',
        border: true,
        enableSearch: true,
        sort: [4,5,6,7,8],
        columnWidth: [{column: 0, width: 200}, {column: 1, width: 150},{column: 2, width: 150},{column: 3, width: 250},{column: 4, width: 100},{column:5, width: 100},{column: 6, width: 100},{column:7, width: 100},{column: 8, width: 100}],
        stripe: true,
        pagination: true,
        pageSize: 5,
        pageSizes: [5, 10, 20]
      }
    }
  },
  created() {
    this.fetchVolunteer();
  },
  methods: {

	fetchVolunteer() {
	
		var db = firebase.firestore();					  
		let catRef = db.collection('user_profiles');
		var fullname = "";
		let allCats = catRef.get()
		  .then(snapshot => {
		   let categories_response = [];
		   let index = 1;
		   categories_response[0] = ['Full Name', 'First Name', 'Last Name','Email', 'AV', 'RV', 'Adult', 'Admin', 'Moderator'];
		  
			snapshot.forEach(doc => {
			 	  let onedata = [];
  		          onedata[0]= doc.data().fullname ?  doc.data().fullname : "";
		          onedata[1]= doc.data().firstname ?  doc.data().firstname : "";
		          onedata[2]= doc.data().lastname ?  doc.data().lastname : "";
		          onedata[3]= doc.id;
		          onedata[4]= doc.data().isavailablevolunteer ?  doc.data().isavailablevolunteer : "false";
		          onedata[5]= doc.data().isregisteredvolunteer ?  doc.data().isregisteredvolunteer : "false";
		          onedata[6]= doc.data().isadult ?  doc.data().isadult : "false";
		          onedata[7]= doc.data().isadmin ?  doc.data().isadmin : "false";
		          onedata[8]= doc.data().ismoderator ?  doc.data().ismoderator : "false";
		          categories_response[index]=onedata;
		          index++;
			});
			this.params.data = categories_response;
			//console.log(this.params);
		  })
		  .catch(err => {
      		console.log('Error getting documents', err);
      		this.isbutton=false;
		  });
	}

  }
  //,
 // components: { VueTableDynamic }
}
</script>