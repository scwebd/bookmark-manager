// ==============================
// GLOBAL VARIABLES
// ==============================
var bookmarksTable = document.querySelector("#bookmarks-table tbody");
var bookmarksStarter = {
    HTML: [],
    Git: [],
    Terminal: [],
    CSS: [],
    Bootstrap: [],
    JavaScript: [],
    jQuery: [],
    AJAX: []
}
// if there are bookmarks in localStorage, pull get them and store them into the variable, else create a new 
// starter object with arrays for each topic
var allBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || bookmarksStarter;

// ==============================
// FUNCTIONS
// ==============================
function renderBookmarks(topic) {
    var bookmarks = allBookmarks[topic]; // getting array of bookmarks that match our topic
    bookmarksTable.textContent = ""; // emptying out the previous table contents
    setTopic(topic); // setting the current topic and printing it to the page

    for (var i = 0; i < bookmarks.length; i++) {
        var tr = document.createElement("tr"); // creating a row
        var bookmarkTD = document.createElement("td"); // a td for the bookmark link
        var deleteTD = document.createElement("td"); // and another for the delete button
        var deleteIcon = document.createElement("i"); // and an i tag for the icon itself
        
        // setting HTML and attributes on our new elements
        bookmarkTD.innerHTML = "<a href='" + bookmarks[i].url + "' target='_blank'>" + bookmarks[i].name + "</a>";
        deleteTD.setAttribute("class", "delete-icon");
        deleteIcon.setAttribute("class", "fas fa-times");
        deleteIcon.setAttribute("data-id", i);

        // then appending all of the new elements into the wrapper tr and then into the table
        deleteTD.appendChild(deleteIcon);  
        tr.appendChild(bookmarkTD);
        tr.appendChild(deleteTD);
        bookmarksTable.appendChild(tr);

        // upon click of the deleteIcon, trigger the deleteBookmark function
        deleteIcon.addEventListener("click", function(event) {
            var index = event.target.getAttribute("data-id");
            deleteBookmark(topic, index);
        });
    }
}

function setTopic(topic) {
    var topic = topic;
    document.getElementById("topic").textContent = topic;
}

function updateStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));
}

function deleteBookmark(topic, index) {
    allBookmarks[topic].splice(index, 1); // using '.splice()' to remove the deleted bookmark from our array
    updateStorage(); // ...before updating localStorage to reflect the deletion
    renderBookmarks(topic); // ...and rerendering the bookmarks to reflect the deletion
}


// ==============================
// MAIN EXECUTION
// (tying it all together)
// ==============================
renderBookmarks("HTML");

document.getElementById("bookmark-submit").addEventListener("click", function(event) {
    event.preventDefault();
    var name = document.getElementById("bookmark-name").value;
    var url = document.getElementById("bookmark-url").value;
    var topic = document.getElementById("bookmark-topic").value;

    if (!topic) {
        alert("Specify a topic and then submit again!");
        return false;
    }

    document.getElementById("add-bookmark-form").reset(); // clearing out/resetting the form after info is collected

    var newBookmark = {
        name: name,
        url: url
    }

    allBookmarks[topic].push(newBookmark); // pushing new bookmark to array
    updateStorage(); // updating localStorage to reflect change
    renderBookmarks(topic); // updating bookmarks table
});

document.getElementById("filter-topic").addEventListener("change", function(event) {
    var newTopic = event.target.value;
    renderBookmarks(newTopic);
});
