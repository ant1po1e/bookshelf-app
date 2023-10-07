// Mendapatkan referensi ke elemen-elemen HTML yang diperlukan
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const bookSubmit = document.getElementById("bookSubmit");
const incompleteBookshelfList = document.getElementById(
   "incompleteBookshelfList"
);
const completeBookshelfList = document.getElementById("completeBookshelfList");
const searchBookTitle = document.getElementById("searchBookTitle");
const searchSubmit = document.getElementById("searchSubmit");

// Memeriksa apakah localStorage sudah memiliki data buku atau belum
if (!localStorage.getItem("books")) {
   localStorage.setItem("books", JSON.stringify([]));
}

// Fungsi untuk menambahkan buku baru
function addBook() {
   const title = inputBookTitle.value;
   const author = inputBookAuthor.value;
   const year = inputBookYear.value;
   const isComplete = inputBookIsComplete.checked;

   const newBook = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year),
      isComplete,
   };

   const books = JSON.parse(localStorage.getItem("books"));
   books.push(newBook);
   localStorage.setItem("books", JSON.stringify(books));

   inputBookTitle.value = "";
   inputBookAuthor.value = "";
   inputBookYear.value = "";
   inputBookIsComplete.checked = false;

   showBooks();
}

// Fungsi untuk menampilkan buku-buku pada rak
function showBooks() {
   const books = JSON.parse(localStorage.getItem("books"));

   let incompleteBookHtml = "";
   let completeBookHtml = "";

   books.forEach((book) => {
      const bookItem = `
      <article class="rounded-xl bg-navy shadow-lg overflow-hidden hover:scale-105 py-12 hover:shadow-navy transition duration-300 mb-10 sm:w-64 md:w-80 lg:w-96 justify-center text-center">
         <div class="px-6 py-4">
            <h3 class="font-bold text-2xl mb-3 text-white">${book.title}</h3>
            <p class="font-medium text-slate-400 mb-2 leading-relaxed lg:text-lg">Penulis: ${book.author
         }</p>
            <p class="font-medium text-slate-400 mb-2 leading-relaxed lg:text-lg">Tahun: ${book.year
         }</p>
         </div>
         <div class="float self-center">
            <button class="text-base font-semibold text-white py-2 px-4 mb-3 rounded-lg inline-block mr-3 hover:scale-110 transition duration-300 bg-green-500 hover:bg-green-400" onclick="toggleComplete(${book.id
         })">${book.isComplete ? "Mark as Incomplete" : "Mark as Complete"
         }</button>
            <button class="text-base font-semibold text-white py-2 px-4 mb-3 rounded-lg inline-block mr-3 hover:scale-110 transition duration-300 bg-red-500 hover:bg-red-400" onclick="deleteBook(${book.id
         })">Delete</button>
         </div>
      </article>
   `;

      if (book.isComplete) {
         completeBookHtml += bookItem;
      } else {
         incompleteBookHtml += bookItem;
      }
   });

   incompleteBookshelfList.innerHTML = incompleteBookHtml;
   completeBookshelfList.innerHTML = completeBookHtml;
}

// Fungsi untuk memindahkan buku antar rak
function toggleComplete(bookId) {
   const books = JSON.parse(localStorage.getItem("books"));
   const bookIndex = books.findIndex((book) => book.id === bookId);
   if (bookIndex !== -1) {
      books[bookIndex].isComplete = !books[bookIndex].isComplete;
      localStorage.setItem("books", JSON.stringify(books));
      showBooks();
   }
}

// Fungsi untuk menghapus buku
function deleteBook(bookId) {
   const books = JSON.parse(localStorage.getItem("books"));
   const newBooks = books.filter((book) => book.id !== bookId);
   localStorage.setItem("books", JSON.stringify(newBooks));
   showBooks();
}

// Fungsi untuk mencari buku berdasarkan judul
function searchBooks() {
   const searchTerm = searchBookTitle.value.toLowerCase();
   const books = JSON.parse(localStorage.getItem("books"));

   let searchResultsHtml = "";

   books.forEach((book) => {
      if (book.title.toLowerCase().includes(searchTerm)) {
         const bookItem = `
         <article class="rounded-xl bg-navy shadow-lg overflow-hidden hover:scale-105 py-12 hover:shadow-navy transition duration-300 mb-10 sm:w-64 md:w-80 lg:w-96 justify-center text-center">
            <div class="px-6 py-4">
               <h3 class="font-bold text-2xl mb-3 text-white">${book.title}</h3>
               <p class="font-medium text-slate-400 mb-2 leading-relaxed lg:text-lg">Penulis: ${book.author
            }</p>
               <p class="font-medium text-slate-400 mb-2 leading-relaxed lg:text-lg">Tahun: ${book.year
            }</p>
            </div>
            <div class="float self-center">
               <button class="text-base font-semibold text-white py-2 px-4 mb-3 rounded-lg inline-block mr-3 hover:scale-110 transition duration-300 bg-green-500 hover:bg-green-400" onclick="toggleComplete(${book.id
            })">${book.isComplete ? "Mark as Incomplete" : "Mark as Complete"
            }</button>
               <button class="text-base font-semibold text-white py-2 px-4 mb-3 rounded-lg inline-block mr-3 hover:scale-110 transition duration-300 bg-red-500 hover:bg-red-400" onclick="deleteBook(${book.id
            })">Delete</button>
            </div>
         </article>
      `;

         searchResultsHtml += bookItem;
      }
   });

   incompleteBookshelfList.innerHTML = searchResultsHtml;
}

// Menampilkan buku saat halaman pertama kali dimuat
showBooks();

// Menangani submit form untuk menambahkan buku
bookSubmit.addEventListener("click", (e) => {
   e.preventDefault();
   addBook();
});

// Menangani submit form pencarian buku
searchSubmit.addEventListener("click", (e) => {
   e.preventDefault();
   searchBooks();
});

window.onscroll = function () {
   const header = document.querySelector("header");
   const fixedNav = header.offsetTop;

   if (window.pageYOffset > fixedNav) {
      header.classList.add("navbar-fixed");
   } else {
      header.classList.remove("navbar-fixed");
   }
};

const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
   hamburger.classList.toggle("hamburger-active");
   navMenu.classList.toggle("hidden");
});

window.addEventListener("click", function (e) {
   if (e.target != hamburger && e.target != navMenu) {
      hamburger.classList.remove("hamburger-active");
      navMenu.classList.add("hidden");
   }
});

const back2Top = document.querySelector("#back2top");

window.addEventListener("scroll", () => {
   if (window.pageYOffset > 200) {
      back2Top.classList.remove("opacity-0");
      back2Top.classList.add("opacity-100");
   } else {
      back2Top.classList.add("opacity-0");
      back2Top.classList.remove("opacity-100");
   }
});

back2Top.addEventListener("click", (e) => {
   e.preventDefault();
   window.scroll({ top: 0, left: 0, behavior: "smooth" });
});

function sleep(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}
