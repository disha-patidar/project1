class ExpressError extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;

  }
}
module.exports=ExpressError;


/*<% layout("/layouts/boilerplate") %>
  <div class="row">
    <div class="col-8 offset-3">
        <h3  class="mt-3"><%= listing.title  %> </h3>
      </div>
  <div class="card col-6 offset-3 show-cards mt-3">
    <div class="card" style="width: 18rem;">
  <img src="<%= listing.image %>" class="card-img-top show-img" alt="listing_image">
  <div class="card-body">
    <p class="card-text">Owned By <i><%= listing.owner ? listing.owner.username : 'unknown-user' %></i></p> 
     <p class="card-text"><%= listing.title  %></p> 
<p class="card-text"><%= listing.description %></p>     
<p class="card-text"><%= listing.location  %> </p>
<p class="card-text">&#8377;<%= listing.price ? listing.price.toLocaleString("en-IN") : "Price not available" %></p>
<p class="card-text"><%= listing.country %></p>
  </div>
</div>
  </div>
  <% if(currUser && currUser._id.equals(listing.owner._id)) { %>
  <div class="btns">
<a href="/listings/<%= listing._id%>/edit" class="btn btn-dark edit-btn col-1 offset-3">Edit</a>
 <form method="POST" action="/listings/<%=listing._id%>?_method=DELETE">
    <button class="btn btn-dark del-btn offset-5">Delete</button>
  </form>
  </div>
  <%}%>

  <div class="col-8 offset-3 mb-3">
    <hr>
    <% if(currUser){%>
      <p class="mt-3"><b>Leave a Review</b></p>
    <form action="/listings/<%=listing.id%>/review" method="POST" novalidate class="needs-validation">
<div class="mt-3">
  <label for="rating" class="form-label" >Rating:</label>
  <input type="range" min="1" max="5" id="rating" name="review[rating]" class="from-range">
</div>
<div class="mt-3">
  <label for="comment" class="form-label">Comments</label>
  <textarea name="review[comment]" id="comment" cols="30" rows="5" class="form-control" required></textarea>
  <div class="invalid-feedback">
    Please submit some comments for reviews!
  </div>
</div>
<button class="btn btn-outline-dark mt-3 mb-3">Submit</button>
    </form>
        <hr>
    <% }%>

     <h5 class="card-title">
                <%= rev.author && rev.author.username ? rev.author.username : 'Anonymous' %>
              </h5> 

    <p class="mt-3"><b>All Reviews</b></p>
  <div class="row">
     <% if (listing.reviews && listing.reviews.length > 0) { %>
   <% for(rev of listing.reviews){ %>
<div class="card-main col-5 mb-3 ms-2">
  <div class="card-body">
                <h5 class="card-title">
                <%= rev.author && rev.author.username ? rev.author.username : 'Anonymous' %>
              </h5>
    <p class="card-text"><%= rev.comment %></p>
    <p class="card-text"><%= rev.rating%><i class="fa-solid fa-star"></i></p>
  </div>
<form class="mb-3" method="POST" action="/listings/<%= listing._id%>/review/<%= rev._id%>?_method=DELETE">
<button class="btn btn-sm btn-dark mt-2">Delete</button>
</form> 
</div>
  <% } %>
  <% } else { %>
    <p>No reviews available for this listing.</p>
  <% } %>
  </div>

  </div>
  </div>
<script src="/js/script/js">


 
*/


/*

<p class="mt-3"><b>All Reviews</b></p>
    <div class="row">
      <% if (listing.reviews && listing.reviews.length > 0) { %>
        <% for (let rev of listing.reviews) { %>
          <div class="card-main col-5 mb-3 ms-2">
            <div class="card-body">
              <h5 class="card-title">
                <%= rev.author && rev.author.username ? rev.author.username : 'unknown' %>
              </h5>

              <p class="card-text"><%= rev.comment %></p>
              <p class="card-text"><%= rev.rating %><i class="fa-solid fa-star"></i></p>
   
            </div>
            <form class="mb-3" method="POST" action="/listings/<%= listing._id %>/review/<%= rev._id %>?_method=DELETE">
              <button class="btn btn-sm btn-dark mt-2">Delete</button>
            </form>
          </div>
        <% } %>
      <% } else { %>
        <p>No reviews available for this listing.</p>
      <% } %>
    </div>
  </div> */