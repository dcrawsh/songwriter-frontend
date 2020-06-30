const songEndPoint = "http://localhost:3000/api/v1/songs"
const categoryEndPoint = "http://localhost:3000/api/v1/categories"
const formContainer = document.getElementById('form-container')

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

    const sortBtn = document.getElementById('sort-button')

    sortBtn.addEventListener('click', (e) => {
        e.preventDefault()
        alphabetizeSongs()
    } )


    songContainer.addEventListener("click", (e) => {
        const songId = e.target.dataset.id
        const song = Song.findById(songId)
        if (e.target.id == 'edit-btn') {
       
        document.getElementById('update-song-form').innerHTML = song.renderUpdateForm();
        getCategories()
        }
        else if (e.target.id == 'delete-btn'){
        
        deleteFetch(songId)
        
        
        }   
    } )
    

    document.getElementById('update-song-form').addEventListener('submit', (e) => {
        updateFormHandler(e)
        
    })

    

})

    function clearCreate(){
        const nameInput = document.querySelector('#input-name').value = '';
        const lyricsInput = document.querySelector('#input-lyrics').value = '';
        const chordsInput = document.querySelector('#input-chords').value = '';
        const categoryId = parseInt(document.querySelector('#input-category').value = '')
    }

    function clearPatch(){
        document.getElementById('update-song-form').innerHTML = ''
        formContainer.innerHTML = `<form id="create-song-form">
        <div class="display-4">Create a New Song!</div>

        <input id='input-name' type="text" name="name" value="" placeholder="Enter your song name..." class="input-text">
        <br><br>
        <textarea id='input-lyrics' name="description" rows="8" cols="80" value="" placeholder="Enter your lyrics..."></textarea>
        <br><br>
        <input id='input-chords' type="text" name="chords" value="" placeholder="Enter your chords..." class="input-text">
        <br><br>

        <p>Choose A category </p>
        <select id="input-category" name="categories">
        </select>
        <br><br>

        <input id= 'create-button' type="submit" name="submit" value="Create New Song" class="submit">
        </form>` 
        getCategories();
    }

    function createFormHandler(e) {
        e.preventDefault()
        const nameInput = document.querySelector('#input-name').value;
        const lyricsInput = document.querySelector('#input-lyrics').value;
        const chordsInput = document.querySelector('#input-chords').value;
        const categoryId = parseInt(document.querySelector('#input-category').value);
        
        postFetch(nameInput,lyricsInput,chordsInput,categoryId)   
        clearCreate()
    }
    function updateFormHandler(e) {
        e.preventDefault()
        const id = parseInt(e.target.dataset.id);
        const nameInput = document.querySelector('#update-input-name').value;
        const lyricsInput = document.querySelector('#update-input-lyrics').value;
        const chordsInput = document.querySelector('#update-input-chords').value;
        const categoryId = parseInt(document.querySelector('#update-input-category').value);
        
        patchFetch(nameInput,lyricsInput,chordsInput,categoryId,id) 
        clearPatch()  
        
    }

    function postFetch(name, lyrics, chords, category_id){
        let formData = {name, lyrics, chords, category_id}
        
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch(songEndPoint, configObj)
        .then(response => response.json())
        .then(song => {
            
            const songData = song.data
            let newSong = new Song(songData, songData.attributes)

            Song.all = []
            getSongs()

            // document.querySelector('#song-container').innerHTML += newSong.renderSongCard()
            
        })
        .catch(err => console.log(err))
    }
    
    function patchFetch(name, lyrics, chords, category_id, id){
        let formData = {name, lyrics, chords, category_id}

        let configObj = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }
        
        fetch(`http://localhost:3000/api/v1/songs/${id}`, configObj)
        .then(response => response.json())
        .then(song => {
            const songData = song.data 
            // Object.assign(Song.findById(id),songData.attributes)
            console.log(song)
            Song.all = []
            getSongs()
        })
        .catch(err => console.log(err))  
    }
    
    function deleteFetch(id){
        
        let configObj = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }
        
        fetch(`http://localhost:3000/api/v1/songs/${id}`, configObj)
        .then(response => response.json())
        .then(song => {
            // let findSong = Song.findById(song.id)
            // let songIndex = Song.all.indexOf(findSong)
            // Song.all.splice(songIndex,1)
            console.log(song)
            Song.all = []
            getSongs()
            
        })
        .catch(err => console.log(err))  

        
    }

    function getSongs() {
        document.querySelector('#song-container').innerHTML = ''
        fetch(songEndPoint)
        .then(response => response.json())
        .then(songs => {
            
          songs.data.forEach(song => {
            // double check how your data is nested in the console so you can successfully access the attributes of each individual object
            let findSong = Song.findById(song.id)
            
            let newSong = new Song(song, song.attributes)
            
            document.querySelector('#song-container').innerHTML += newSong.renderSongCard()
          })
        // .catch(err => console.log(err))
        })
      }

      function alphabetizeSongs() {
        document.querySelector('#song-container').innerHTML = ''
        fetch(songEndPoint)
        .then(response => response.json())
        .then(songs => {
            const songlist = Song.sortSongs(songs.data)
        
          songs.data.forEach(song => {
            // double check how your data is nested in the console so you can successfully access the attributes of each individual object
            let findSong = Song.findById(song.id)
            
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
            
            let newCategory = new Category(category)
            const categoryMarkup = `<option value=${category.id}>${category.attributes.name}</option>`
            
            if(document.getElementById('update-input-category')){
                document.getElementById('update-input-category').innerHTML += categoryMarkup
                
            }
            else {
            document.querySelector("#input-category").innerHTML += categoryMarkup
            }
                
            
            
            
            

           
        })
    })

    
    
}