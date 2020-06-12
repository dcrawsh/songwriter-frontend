class Song {
    constructor(song, songAttributes) {
    
    
      this.id = song.id;
      this.name = songAttributes.name;
      this.lyrics = songAttributes.lyrics;
      this.chords = songAttributes.chords;
      this.category = songAttributes.category;
      Song.all.push(this);
    }
  
    renderSongCard() {
    
    return `
              <div data-id=${this.id}>
                <h3>${this.name}</h3>
                <h3>${this.lyrics}</h3>
                <h3>${this.chords}</h3>
                <p>${this.category.name}</p>
                <button data-id=${this.id}>edit</button>
              </div>
              <br><br>`;
    }

    renderUpdateForm() {
        let createSongForm = document.getElementById('create-song-form')
        createSongForm.style.display="none";
        return `
        <form data-id=${this.id} >
          <h3>Edit Song</h3>
    
          <label>Name</label>
          <input id='input-name' type="text" name="name" value="${this.name}" class="input-text">
          <br><br>
    
          <label>Lyrics</label>
          <textarea id='input-lyrics' name="lyrics" rows="8" cols="80" value="">${this.lyrics}</textarea>
          <br><br>

          <label>Chords</label>
          <textarea id='input-chords' name="chords" rows="8" cols="80" value="">${this.chords}</textarea>
          <br><br>
    
          
    
          <label>Category</label>
          <select id="categories" name="categories" value="${this.category.name}">

          </select>
          <br><br>
    
          <input id='edit-button' type="submit" name="submit" value="Edit Song" class="submit">
        </form>
      `;
      }
    

    static findById(id) {
        return this.all.find(song => song.id == id)
    }
  }

    
  
  Song.all = [];
