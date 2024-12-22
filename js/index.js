var Finput = document.querySelector("#URL");
var Sinput = document.querySelector("#Website");
var bgValid = document.querySelector(".bg-all")

var bookmarkList;
if (localStorage.getItem("bookmarks") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}

function addBookmark() {

  if(Finput.classList.contains("is-valid") && Sinput.classList.contains("is-valid")){
    var bookmark = {
      siteName: Finput.value,
      // siteUrl: Sinput.value,
      siteUrl: normalizeURL(Sinput.value),
    };
  
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    display();
    clear();
  }
  else{
    bgValid.classList.remove("d-none")
  }
  Finput.classList.remove("is-valid")
  Sinput.classList.remove("is-valid")
}

function clear() {
  Finput.value = null;
  Sinput.value = null;
}

function display() {
  var cartona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `      <div
        class="w-100 bg-white my-4 py-2 d-flex justify-content-around fw-bold"
      >
        <p class="m-0 ms-4">${1 + i}</p>
        <p class="m-0 ms-5 ps-5">${bookmarkList[i].siteName}</p>
        <a href="${bookmarkList[i].siteUrl}">
  <button class="btn btn-success ms-5"><i class="fa-solid fa-eye"></i> Visit</button>
</a>
        <button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button>

      </div>`;
  }
  document.getElementById("cartonaa").innerHTML = cartona;
}

function deleteBookmark(deletedIndex) {
  bookmarkList.splice(deletedIndex, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  display();
}

function valid(element) {
  var regex = {
    URL : /^\w{3,}$/i ,
    Website : /^(http:\/\/|https:\/\/){0,1}www.[\w\-.]{5,20}.\w{2,5}\W{0,1}$/i

  }
  if(regex[element.id].test(element.value) == true){
    console.log("match");
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
    element.nextElementSibling.classList.add("d-none")

  }
  else{
    console.log("notmatch");
    element.classList.add("is-invalid")
    element.classList.remove("is-valid")
    element.nextElementSibling.classList.remove("d-none")  }
}

function removeValid(){
  bgValid.classList.add("d-none")

}


function normalizeURL(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  }
  return url;
}