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
        if (e.target.id == 'edit-btn') {
        console.log('edit')
        document.getElementById('update-song-form').innerHTML = song.renderUpdateForm();
        getCategories()
        }
        else if (e.target.id == 'delete-btn'){
        console.log('delete')
        deleteFetch(songId)
        getSongs()
        }
        
        
    } )
    

    document.getElementById('update-song-form').addEventListener('submit', (e) => {
        updateFormHandler(e)
        getSongs()
    })

    

})

    function createFormHandler(e) {
        e.preventDefault()
        const nameInput = document.querySelector('#input-name').value;
        const lyricsInput = document.querySelector('#input-lyrics').value;
        const chordsInput = document.querySelector('#input-chords').value;
        const categoryId = parseInt(document.querySelector('#input-category').value);
        
        postFetch(nameInput,lyricsInput,chordsInput,categoryId)   
    }
    function updateFormHandler(e) {
        e.preventDefault()
        const id = parseInt(e.target.dataset.id);
        const nameInput = document.querySelector('#update-input-name').value;
        const lyricsInput = document.querySelector('#update-input-lyrics').value;
        const chordsInput = document.querySelector('#update-input-chords').value;
        const categoryId = parseInt(document.querySelector('#update-input-category').value);
        
        patchFetch(nameInput,lyricsInput,chordsInput,categoryId,id)   
        getSongs()
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

            document.querySelector('#song-container').innerHTML += newSong.renderSongCard()
            

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
            console.log(song)
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
            console.log(song)
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