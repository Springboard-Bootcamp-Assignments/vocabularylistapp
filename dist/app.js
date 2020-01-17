// UI Variables
const form = document.querySelector("#vocabulary-form");
const vocabList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-vocabulary");
const filter = document.querySelector("#filter");
const vocabInput = document.querySelector("#vocabulary");

// Load all event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getVocabularies);
  // Add vocabulary event
  form.addEventListener("submit", addVocab);
  // Remove vocabulary event
  vocabList.addEventListener("click", removeVocab);
  // Clear all vocabulary
  clearBtn.addEventListener("click", clearAll);
  // Filter
  filter.addEventListener("keyup", filterVocabulary);
}

// Get vocabularies from Local Storage

function getVocabularies() {
  let vocabularies;

  if (localStorage.getItem("vocabularies") === null) {
    vocabularies = [];
  } else {
    vocabularies = JSON.parse(localStorage.getItem("vocabularies"));
  }

  vocabularies.forEach(function(vocab) {
    // Create "li" element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(vocab));
    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-vocabulary secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to "li"
    li.appendChild(link);

    // Append "li" to "ul"
    vocabList.appendChild(li);
  });
}

// Add Vocabulary

function addVocab(e) {
  if (vocabInput.value === "") {
    alert("Add vocabulary");
  } else {
    // Create "li" element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(vocabInput.value));
    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-vocabulary secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to "li"
    li.appendChild(link);

    // Append "li" to "ul"
    vocabList.appendChild(li);

    // Store in Local Storage
    storeVocabInLocalStorage(vocabInput.value);

    // Clear input
    vocabInput.value = "";

    e.preventDefault();
  }
}
// Store vocabulary

function storeVocabInLocalStorage(vocab) {
  let vocabularies;

  if (localStorage.getItem("vocabularies") === null) {
    vocabularies = [];
  } else {
    vocabularies = JSON.parse(localStorage.getItem("vocabularies"));
  }

  vocabularies.push(vocab);

  localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
}

// Remove Vocabulary

function removeVocab(e) {
  if (e.target.parentElement.classList.contains("delete-vocabulary")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeVocabFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeVocabFromLocalStorage(vocabItem) {
  let vocabularies;

  if (localStorage.getItem("vocabularies") === null) {
    vocabularies = [];
  } else {
    vocabularies = JSON.parse(localStorage.getItem("vocabularies"));
  }

  vocabularies.forEach(function(vocab, index) {
    if (vocabItem.textContent === vocab) {
      vocabularies.splice(index, 1);
    }
  });

  localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
}

// Clear all vocabulary

function clearAll(e) {
  if (confirm("Are you sure?")) {
    while (vocabList.firstChild) {
      vocabList.removeChild(vocabList.firstChild);
    }
  }
  clearVocabsFromLocalStorage();
}

// Clear Vocabs from Local Storage
function clearVocabsFromLocalStorage() {
  localStorage.clear();
}

// Filter

function filterVocabulary(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(vocab) {
    const item = vocab.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      vocab.style.display = "block";
    } else {
      vocab.style.display = "none";
    }
  });
}
