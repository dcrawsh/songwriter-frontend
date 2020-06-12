const songEndPoint = "http://localhost:3000/api/v1/songs"
const categoryEndPoint = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
    // fetch and load songs GET request
    getSongs();
    // fetch and load categories GET request
    getCategories();

    const createSongForm = document.querySelector("#create-song-form")
    const songContainer = document.querySelector('#song-container')
    
    createSongForm.addEventListener("submit", (e) => {
        createFormHandler(e)
        
    })

    songContainer.addEventListener("click", (e) => {
        const songId = e.target.dataset.id
        const song = Song.findById(songId)
        document.querySelector('#update-song').innerHTML = song.renderUpdateForm();
    } )


})

    function createFormHandler(e) {
        e.preventDefault()
        const nameInput = document.querySelector('#input-name').value;
        const lyricsInput = document.querySelector('#input-lyrics').value;
        const imageInput = document.querySelector('#input-image').value;
        const chordsInput = document.querySelector('#input-chords').value;
        const categoryId = parseInt(document.querySelector('#input-category').value);
        
        postFetch(nameInput,lyricsInput,imageInput,chordsInput,categoryId)   
    }

    function postFetch(name, lyrics, image_url, chords, category_id){
        const bodyData = {name, lyrics, image_url, chords, category_id}
        
        fetch(songEndPoint, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(song => {
            
            const songData = song.data
            let newSong = new Song(songData, songData.attributes)

            document.querySelector('#song-container').innerHTML += newSong.renderSongCard()

        })
        .catch(err => console.log(err))

       
    }

    function getSongs() {
        fetch(songEndPoint)
        .then(response => response.json())
        .then(songs => {
          songs.data.forEach(song => {
            // double check how your data is nested in the console so you can successfully access the attributes of each individual object
            
        
            let newSong = new Song(song, song.attributes)
      
            document.querySelector('#song-container').innerHTML += newSong.renderSongCard()
          })
        // .catch(err => console.log(err))
        })
      }
    
    function getCategories() {
        fetch(categoryEndPoint)
        .then(response => response.json())
        .then(categories => {
            categories.data.forEach(category => {
            const categoryMarkup = `<option value=${category.id}>${category.attributes.name}</option>`



            document.querySelector("#input-category").innerHTML += categoryMarkup
                
            
            
            
            

           
        })
    })

    
    
}