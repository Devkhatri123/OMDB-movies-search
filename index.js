let movie = document.getElementById("movie");
let container = document.getElementsByClassName("movies_container")[0];
let btn = document.getElementById("btn");
let actor = document.getElementsByClassName("actor")[0];
let movie_container = document.getElementsByClassName("movie_container")[0];
//c2f2659d
let message = document.getElementById("message");
let new_Array = [];

async function GetMovies(Searchterm) {
    if (Searchterm.trim() == "") {
        message.innerHTML = `No movie found`;
        console.log("no movie found");//
    } else {

        message.innerHTML = ``;
        const url = await `https://www.omdbapi.com/?s=${(Searchterm).trim()}&page=1&apikey=c2f2659d`;
        fetch(url).then((res) => {
            return res.json();

        }).then((res) => {
            new_Array = res.Search;
            ShowAllMovies();
        })
    }
}

movie.addEventListener("keyup", () => {
    let Searchterm = movie.value;
    GetMovies(Searchterm)
    // ShowAllMovies()
})

async function ShowAllMovies() {
    container.innerHTML = "";
    var img = ""

    new_Array.map((val) => {
        if (val.Poster !== "N/A") {
            img = val.Poster
        } else {
            img = "blank.jpeg"
        }
        container.innerHTML += `<div class="movie">
        <a href="movie.html?id=${val.imdbID}">
    <img src="${img}" alt="${val.Title}">
    <div class="title">
    <h4>${val.Title}</h4>
    <i class="fa fa-bookmark" aria-hidden="true" onClick=Savemovie('${val.imdbID}')></i>
    </div>`

    })

}
function Savemovie(id){
   
    let data = localStorage.getItem(id);
    localStorage.setItem(id,id);
 if (data) {
   
  // Check if the ID exists in the stored string
   if (data.includes(id)) {
        alert("Movie is already in watchlist.");
    } else {
        alert("Movie added to WatchList");
        // If not, append the ID to the existing string
          data += "" + id;
        localStorage.setItem(id, data);
   }
} else {
    alert("Movie added to WatchList");
    // If no data exists, initialize localStorage with the ID
    localStorage.setItem(id, id);
}
}
async function singleMovie() {
    // Finding ID of the movie from the URL
    var urlQueryParams = new URLSearchParams(window.location.search);
    var id = urlQueryParams.get("id")
   if(id!=null){
    const url = await `https://www.omdbapi.com/?i=${id}&page=1&apikey=c2f2659d`;
    await fetch(url).then((res)=>{
        return res.json();
    }).then((res)=>{
         movie_container.innerHTML+=` <div class="movie_container">
     <div class="left_movie_pic">
         <img src="${res.Poster}" alt="${res.Title}">
     </div>
     <div class="movie_details">
         <div>
             <h3>${res.Title}</h3>
             <i class="fa fa-bookmark" aria-hidden="true" onClick=Savemovie('${res.imdbID}')></i>
         </div>
         <p>${res.Released} • ${res.Country} • Rating - ${res.imdbRating=="N/A"?"":res.imdbRating}</p>
         <p>Actors: ${res.Actors}</p>
         <p>Director: ${res.Director=="N/A"?"":res.Director}</p>
         <p>Writers: ${res.Writer=="N/A"?"":res.Writer}</p>
         <p>Genre: ${res.Genre}</p>
         <p>Release Date: ${res.Year}</p>
         <p>Box Office:   ${res.BoxOffice=="N/A"?"":res.BoxOffice}</p>
         <p>Movie Runtime: ${res.Runtime=="N/A"?"":res.Runtime}</p>
         <p style="padding-right: 16px;">${res.Plot=="N/A"?"":res.Plot}</p>
     </div>`
    })
   }
}

async function FavouriteMovies(){
    container.innerHTML="";
    var img;
   

    

     for(i in localStorage){
      let id = localStorage.getItem(i);
     if(id!=null){
    const url = await `https://www.omdbapi.com/?i=${id}&page=1&apikey=c2f2659d`;
    await fetch(url).then((res)=>{
        return res.json();
    }).then((res)=>{
       if(res.Poster=="N/A"){
            img="blank.jpeg"
        }else{
            img=res.Poster;
        }
        container.innerHTML+=` <div class="movie">
        <a href="movie.html?id=${res.imdbID}">
        <img src="${img}" alt="">
        <div class="title">
        <h4>${res.Title}</h4>
        </a>
        <i class="fa-solid fa-trash" style="color:#800000;" onClick=RemoveFavouriteMovie('${res.imdbID}')></i>
    </div>
        </div>`
    
    })
}
     }
}//id==localStorage.getItem(i)
function RemoveFavouriteMovie(id){
    
  for (i in localStorage){

    if(localStorage.getItem(i).includes(id)){
        localStorage.removeItem(id);
        break;
    }
  }
  window.location.replace("favourite.html");
}