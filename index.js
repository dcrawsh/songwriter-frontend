const endPoint = "http://localhost:3000/api/v1/songs"

document.addEventListener('DOMContentLoaded', () => {
    getSongs();
})

function getSongs() {
    fetch(endPoint)
    .then(response => response.json())
    .then(songs => {
        songs.data.forEach(song => {
            
           const songMarkup = `<h3> ${song.attributes.name} </h3
           <h3> ${song.attributes.lyrics} </h3>
           <h3> ${song.attributes.chords} </h3`



           document.querySelector("#song-container").innerHTML += songMarkup
            
            
            
            
            

           
        })
    })
}