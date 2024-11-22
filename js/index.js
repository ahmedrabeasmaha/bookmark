var siteName = document.querySelector("#bookmarkName");
var siteURL = document.querySelector("#bookmarkURL");
var submitBtn = document.querySelector("#submitBtn");
var tableContent = document.querySelector("#tableContent");
var table = document.querySelector(".table");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmark();
}

tableContent.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("btn-info") ||
    e.target.classList.contains("fa-eye")
  ) {
    visitWebsite(e);
  }
  if (
    e.target.classList.contains("btn-warning") ||
    e.target.classList.contains("fa-trash-can")
  ) {
    deleteBookmark(e);
  }
});
table.addEventListener("click", function (e) {
  e.stopPropagation();
});
function displayBookmark() {
  var newBookmark = "";
  for (var i = 0; i < bookmarks.length; i++) {
    newBookmark += `
              <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].siteName}</td>              
                <td>
                  <button class="btn btn-info" id="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-warning pe-2" id="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  }
  tableContent.innerHTML = newBookmark;
}

function clearInput() {
  siteName.value = null;
  siteURL.value = null;
}

submitBtn.addEventListener("click", function () {
  if (validate(siteName, nameRegex) && validate(siteURL, urlRegex)) {
    var bookmark = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark();
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    new bootstrap.Modal("#exampleModal").show();
  }
});

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.id;
  bookmarks.splice(deletedIndex, 1);
  displayBookmark();
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

function visitWebsite(e) {
  var websiteIndex = e.target.id;
  open(bookmarks[websiteIndex].siteURL);
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(el, regex) {
  if (regex.test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    return false;
  }
}
