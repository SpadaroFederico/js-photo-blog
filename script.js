// Seleziono gli elementi di input
const ContainerOfCard = document.querySelector('.container');

// setto ora l'endpoint e i parametri
const endpoint = `https://lanciweb.github.io/demo/api/pictures/`

// richiesta ajax verso API
axios.get(endpoint)
    .then(responseObj => {

        // se funziona esegui:
        const posts = responseObj.data;
        console.log(posts);

        for (let i = 0; i < posts.length; i++) {
            let SinglePost = posts[i];
            console.log(SinglePost);
            
            // destructuring oggetto

            const {title, date, url} = SinglePost;

            // creo le singole card
            ContainerOfCard.innerHTML += `
                <div class="card">
                    <img src="${SinglePost.url}">
                    <h2 class="CardTitle">${title}</h2>
                    <p class="CardDate">${date}</p>
                </div>
            ` 
            }
            
            // Definisco l'overlay
            addOverlayFunctionality();
        })

        .catch(error => {
            console.error('Errore nel recupero dei dati:', error);
        });
    
    // Funzione per l'overlay
    function addOverlayFunctionality() {
        
        // Creazione in html dell'overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.innerHTML = `
            <div class="overlay-content">
                <img class="overlay-image" src="" alt="Immagine">
                <button class="close-overlay">Chiudi</button>
            </div>
        `;

        // aggiungo l'overlay alla fine del contenuto già presente all'interno del tag 
        document.body.appendChild(overlay);
    
        const overlayImage = overlay.querySelector('.overlay-image');
        const closeOverlayButton = overlay.querySelector('.close-overlay');
    
        // aggiungo l'apertura dell'overlay al click
        const cardImages = document.querySelectorAll('.card img');
        cardImages.forEach(img => {
            img.addEventListener('click', () => {
                overlayImage.src = img.src;
                overlay.classList.add('active');
            });
        });
    
        // aggiungo la chiusura dell'overlay al click
        closeOverlayButton.addEventListener('click', () => {
            overlay.classList.remove('active');

            // svuoto il contenuto
            overlayImage.src = ''; 
        });
    }