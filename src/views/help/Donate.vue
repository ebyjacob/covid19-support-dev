<template>
  <div>
    <div class="container mt-4">
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <h4 class="mb-4 text-primary">What you like to donate?</h4>
                    <input type="text" class="form-control mb-3" placeholder="What you would like to donate?"/>
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <textarea
                          id="donationdetails"
                          type="text"
                          placeholder="Description"
                          class="form-control"
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
              <div class="card-header">Contact Details</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="fullname">Full Name</label>
                        <input
                          id="fullname"
                          type="text"
                          placeholder="Full name of the person donating"
                          class="form-control"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address">Address</label>
                        <input id="address" type="text" placeholder="Address" class="form-control" />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="phonenumber">Phone Number</label>
                        <input
                          id="phonenumber"
                          type="text"
                          placeholder="Phone number"
                          class="form-control"
                        />
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="email">Email</label>
                        <input id="email" type="text" placeholder="Email" class="form-control" />
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
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-8">
                    <div>
                      <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="text-right mr-4">
                      <button type="button" class="btn btn-primary">Agree & Submit Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>