<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-4">
            <img src="https://images.unsplash.com/photo-1495042823740-46feea76a69c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" width="100%" height="400px"/>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="mb-4">
            <img src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" width="100%" height="400px"/>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="mb-4">
            <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" width="100%" height="400px"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body bg-primary text-center p-4">
              <router-link to="/need/help" class="text-white">
                <h4><i class="fa fa-life-ring fa-lg my-2"></i></h4>
                <h4>Need Help?</h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body bg-primary text-center p-4">
              <router-link to="/can/help" class="text-white">
                <h4><i class="fa fa-heart fa-lg my-2"></i></h4>
                <h4>Can Help?</h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body bg-primary text-center p-4">
              <router-link to="/donate" class="text-white">
                <h4><i class="fa fa-gift fa-lg my-2"></i></h4>
                <h4>Donate</h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5>Recent Support requests</h5>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5>Featured Support requests</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>