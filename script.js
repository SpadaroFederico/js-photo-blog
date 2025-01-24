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
    
            // Dopo aver aggiunto tutte le card, seleziono tutte le immagini
            const cardImages = document.querySelectorAll('.card img');
    
            // Aggiungo l'event listener a tutte le immagini
            cardImages.forEach(function(img) {
                img.addEventListener('click', function() {
                    // Se l'immagine è già un pop-up, rimuoo la classe o
                    if (img.classList.contains('popup-image')) {
                        img.classList.remove('popup-image');
                    } else {
                        // Altrimenti aggiungo la classe per mostrare l'immagine come pop-up
                        img.classList.add('popup-image');
                    }
                });
            });
    
        })
        .catch(error => {
            // se non funziona esegui:
            console.error(error);
        });

    
    