document.addEventListener('DOMContentLoaded', function () {
    //panier
    var cart = []; 

    //Liste des articles
    var articles = [
        { title: "Chaise de Bureau", price: 120, date: "2023-09-15", liked: false, likes: 0, keywords: ["chaise", "bureau", "mobilier","meuble","maison"], tags: ["mobilier", "bureau"] },
        { title: "Table en Bois", price: 250, date: "2023-08-12", liked: false, likes: 0, keywords: ["table", "bois", "mobilier"], tags: ["mobilier", "bois"] },
        { title: "Lampe de Bureau", price: 35, date: "2023-09-05", liked: false, likes: 0, keywords: ["lampe", "éclairage", "bureau"], tags: ["éclairage", "bureau"] },
        { title: "Moniteur 24 pouces", price: 150, date: "2023-09-20", liked: false, likes: 0, keywords: ["moniteur", "écran", "ordinateur"], tags: ["électronique", "ordinateur"] },
        { title: "Clavier Mécanique", price: 80, date: "2023-09-01", liked: false, likes: 0, keywords: ["clavier", "ordinateur", "mécanique"], tags: ["électronique", "ordinateur"] },
        { title: "Casque", price: 60, date: "2023-09-10", liked: false, likes: 0, keywords: ["casque", "audio", "musique"], tags: ["audio", "musique"] },
        { title: "Souris Gaming", price: 45, date: "2023-08-30", liked: false, likes: 0, keywords: ["souris", "gaming", "ordinateur"], tags: ["électronique", "gaming"] },
        { title: "Imprimante", price: 200, date: "2023-08-25", liked: false, likes: 0, keywords: ["imprimante", "laser", "bureau"], tags: ["électronique", "bureau"] },
        { title: "Télévision 55 pouces", price: 600, date: "2023-09-22", liked: false, likes: 0, keywords: ["télévision", "écran", "maison"], tags: ["électronique", "maison"] },
        { title: "Appareil Photo", price: 400, date: "2023-08-28", liked: false, likes: 0, keywords: ["appareil photo", "numérique", "photographie"], tags: ["photographie", "numérique"] }
    ];

    //affichage des articles
    function displayArticles(articles) {
        var articlesList = document.getElementById('articlesList');
        articlesList.innerHTML = '';  

        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];  

            //Créer l'article
            var articleCard = document.createElement('div');
            articleCard.classList.add('article-card');
            articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <p class="price">${article.price} DT</p>
                <p>Date: ${article.date}</p>
                <button class="like-btn" id="like-${i}">
                    <i class="fas fa-heart"></i>
                    <span class="likes-count">${article.likes} likes</span>
                </button>
                <button class="add-to-cart-btn" id="add-to-cart-${i}">
                    Ajouter au panier
                </button>
            `;
            articlesList.appendChild(articleCard);

            //like dislike
            var likeBtn = document.getElementById(`like-${i}`);
            likeBtn.addEventListener('click', function(index) {
                return function() {
                    if (!articles[index].liked) {
                        articles[index].likes++;  
                    } else {
                        articles[index].likes--; 
                    }
                    articles[index].liked = !articles[index].liked;
                    this.classList.toggle('liked', articles[index].liked);  
                    this.querySelector('.likes-count').textContent = `${articles[index].likes} likes`;
                }
            }(i));

            //panier
            var addToCartBtn = document.getElementById(`add-to-cart-${i}`);
            addToCartBtn.addEventListener('click', function(article) {
                return function() {
                    addToCart(article);
                }
            }(article));
        }
    }


    function addToCart(article) {
        if (cart.indexOf(article) === -1) { 
            cart.push(article); 
            updateCart(); 
        }
    }

    //l'affichage du panier
    function updateCart() {
        var cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;  

        var cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';  


        for (var i = 0; i < cart.length; i++) {
            var item = cart[i]; 
            var cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.title} - ${item.price} €</p>
                <button class="remove-from-cart-btn" id="remove-from-cart-${i}">
                    Supprimer
                </button>
            `;
            cartItems.appendChild(cartItem);

            var removeFromCartBtn = document.getElementById(`remove-from-cart-${i}`);
            removeFromCartBtn.addEventListener('click', function(index) {
                return function() {
                    removeFromCart(cart[index]);
                }
            }(i));
        }
    }

    //supprimer article
    function removeFromCart(article) {
        cart = cart.filter(function(item) {
            return item !== article; 
        });
        updateCart();
    }

    //tri
    function sortArticles(crit) {
        var sortedArticles = articles.slice();

        if (crit === 'price') {
            sortedArticles.sort(function(a, b) {
                return a.price - b.price; 
            });
        } else if (crit === 'date') {
            sortedArticles.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        } else if (crit === 'likes') {
            sortedArticles.sort(function(a, b) {
                return b.likes - a.likes;
            });
        }

        displayArticles(sortedArticles);
    }

    
    function filterArticles(query, selectedTag) {
        var lowerCaseQuery = query.toLowerCase();
        var filteredArticles = articles.filter(function(article) {
            var matchTitle = article.title.toLowerCase().includes(lowerCaseQuery);
            var matchKeywords = article.keywords.some(function(keyword) {
                return keyword.toLowerCase().includes(lowerCaseQuery);
            });
            var matchTags = selectedTag === "" || article.tags.includes(selectedTag);

            return (matchTitle || matchKeywords) && matchTags;
        });

        displayArticles(filteredArticles); 
    }

    function filterByTag(selectedTag) {
        var query = document.getElementById('BarRech').value;  // Obtenir la valeur actuelle de la barre de recherche
        filterArticles(query, selectedTag);  // Filtrer les articles par mots-clés et tag
    }

    
    var tags = ["mobilier", "bois", "bureau", "éclairage", "électronique", "ordinateur", "audio", "musique", "gaming", "photographie", "numérique", "maison"];
    var tagFilter = document.getElementById('tagFilter');

    for (var i = 0; i < tags.length; i++) {
        var option = document.createElement('option');
        option.value = tags[i];
        option.textContent = tags[i];
        tagFilter.appendChild(option);
    }

    
    tagFilter.addEventListener('change', function() {
        filterByTag(tagFilter.value);
    });

    document.getElementById('BarRech').addEventListener('input', function(e) {
        filterArticles(e.target.value, tagFilter.value);
    });

    document.getElementById('SOption').addEventListener('change', function(e) {
        sortArticles(e.target.value);
    });

    displayArticles(articles);
});
