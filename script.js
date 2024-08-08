// in this code also try to make a front page on which all the movies are displayed
// issue at line 64


const input = document.querySelector('.movieINP')
const button = document.querySelector('.searchmovie')
const body = document.querySelector('body')
// const information = document.querySelector('.information')
// const textAREA = document.querySelector('.textAREA')
// const imageAREA = document.querySelector('.imageAREA')
// const poster = document.querySelector('img')
// const viewmore = document.querySelector('.viewmore')
const base = document.querySelector('.base')

async function getMovieInfo(movie){

    const api_key =  "90532c7b"
    const url = `http://www.omdbapi.com/?apikey=${api_key}&t=${movie}`
    const response =await fetch(url)
    const data =await response.json()
    console.log(data); //to get full json of the selected movie
    // console.log(data.Ratings[0].Value);
    // console.log(data.Poster) to get poster
    // console.log(data.Actors) to fetch name of actors
    // console.log(data.Ratings[0]) for imdb ratings
    
    let base = document.createElement('div') 
    base.classList.add("base")
    let information =document.createElement('div')
    information.classList.add("information")
    let imageAREA = document.createElement('div')
    imageAREA.classList.add("imageAREA")
    // let poster = document.createElement('img')
    let textAREA = document.createElement('div')
    textAREA.classList.add("textAREA")
    let viewmore =  document.createElement('button')
    viewmore.classList.add('viewmore')

    imageAREA.innerHTML = `<img src='${data.Poster}'>`
    textAREA.innerHTML=`
    <b>Title : <i>${data.Title}</i></b> 
    <b>IMDB Ratings :  <i>${data.Ratings[0].Value}</i></b> 
    <b>Genre : <i>${data.Genre}</i></b>
    <b>Actors : <i>${data.Actors}</i></b>  ` 
    viewmore.innerHTML = 'View More'

    viewmore.addEventListener('click',function(movie){
        base.style.display = 'none'
        detailInfopopup(data)
    })


    information.appendChild(imageAREA)
    textAREA.appendChild(viewmore)
    information.appendChild(textAREA)
    base.appendChild(information)
    body.appendChild(base)
}


button.addEventListener('click',function(e){
    e.preventDefault()    

    // Here below i have written this code so that when a person searches another movie then the previous moie should get disappeared...this logic works fine untill 2 movies are displayed then after that it starts overriding
    const base = document.querySelector('.base')
    const ground = document.querySelector('.ground')
    const movieName = input.value.trim()
    getMovieInfo(movieName)
    base.style.display = 'none'
    ground.style.display = 'none'

})

function detailInfopopup(data){
    //data destructuring
    const  {imdbRating,Title,Runtime,Released,Poster,Plot,Language,Genre,Director,Actors} = data
    // console.log(Genre); this is how we can get direct acces to the genre

    const ground = document.createElement('div')
    ground.classList.add('ground')
    
    const moviePoster = document.createElement('div')
    moviePoster.classList.add('ImagePoster')
    moviePoster.innerHTML = `<img src='${data.Poster}'>`
    ground.appendChild(moviePoster)

    let movieElement =document.createElement('div')
    movieElement.classList.add('movieDetailss')
    movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Ratings: &#11088</strong>${imdbRating}</p>`
    
    // from line 83-91 we did this thing because....so that we can give a nice css proper to each genre of the movie ...and normally those were appearing along with comma ....so this is how we can iterate through them ...
    const genreOFmovie = document.createElement('div')
    genreOFmovie.classList.add('movieGenre')
    Genre.split(',').forEach(element => {
            const p = document.createElement('p')
            p.innerHTML = element
            genreOFmovie.appendChild(p)
        });
    movieElement.appendChild(genreOFmovie)
    genreOFmovie.classList.add('movieGenre')

    movieElement.innerHTML += `<p><strong>Release Date:</strong> ${Released}</p>
    <p><strong>Duration:</strong> ${Runtime}</p>
    <p><strong>Cast:</strong> ${Actors}</p>
    <p><strong>Plot:</strong> ${Plot}</p>`
    ground.appendChild(movieElement)
    body.appendChild(ground)
}