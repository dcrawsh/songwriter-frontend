const songEndPoint = "http://localhost:3000/api/v1/songs"
const categoryEndPoint = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
    getSongs();
    getCategories();

    const createSongForm = document.querySelector("#create-song-form")

    createSongForm.addEventListener("submit", (e) => {
        createFormHandler(e)
        
    })
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
            const songData = song.data.attributes
            const songMarkup = `<h3> ${songData.name} </h3
            <h3> ${songData.lyrics} </h3>
            <h3> ${songData.chords} </h3`

            document.querySelector("#song-container").innerHTML += songMarkup


        })

       
    }

    function getSongs() {
        fetch(songEndPoint)
        .then(response => response.json())
        .then(songs => {
            songs.data.forEach(song => {
                
            const songMarkup = `<h3> ${song.attributes.name} </h3
            <h3> ${song.attributes.lyrics} </h3>
            <h3> ${song.attributes.chords} </h3`



            document.querySelector("#song-container").innerHTML += songMarkup
                   
        })
    })}
    
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