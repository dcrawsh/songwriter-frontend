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
              <div data-id=${this.id} class='song-item'>
                <h3>${this.name}</h3>
                <p class="lead" class="text-justify">${this.lyrics}</p>
                <h4>${this.chords}</h4>
                <p><em>${this.category.name}</em></p>
                <button id="edit-btn" data-id=${this.id}>edit</button>
                <button id="delete-btn" data-id=${this.id}>delete</button>
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
          <input id='update-input-name' type="text" name="name" value="${this.name}" class="input-text">
          <br><br>
    
          <label>Lyrics</label>
          <textarea id='update-input-lyrics' name="lyrics" rows="8" cols="80" value="">${this.lyrics}</textarea>
          <br><br>

          <label>Chords</label>
          <textarea id='update-input-chords' name="chords" rows="8" cols="80" value="">${this.chords}</textarea>
          <br><br>
    
          
    
          <label>Category</label>
          <select id="update-input-category" name="category_id" value=${this.category.id} default=>

          </select>
          <br><br>
    
          <input id='edit-button' type="submit" name="submit" value="Edit Song" class="submit">
        </form>
      `;
      }
    

    static findById(id) {
        return this.all.find(song => song.id == id)
    }

    static sortSongs(songs) {
      const sortedNames = songs.sort((first,second) => first.attributes.name.toUpperCase() > second.attributes.name.toUpperCase() ? 1:-1)
      return sortedNames
    }
  }



    
  
  Song.all = [];
