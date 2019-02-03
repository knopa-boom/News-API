// API ссылка на новости и API ключ
const config = {
    api_url:"https://newsapi.org/v2",
    api_key: "347ecb5cd74e406a9128df416b761bfc"
};

/**
 * Храним текущие новости в массиве news
 */
const state = {
    news: [],
};

/**
 * Создаем экземпляр класса fetchHttp.
 */
const fetchHttp = new FetchHttp();

/**
 * Создаем экземпляр класса UI.
 */
const ui = new UI();

/**
 * Создаем экземпляр класса Favorites.
 */
const favorites = new Favorites();

//Делаем запрос на API через fetch (получаем все новости)
fetchHttp.get(`${config.api_url}/top-headlines?country=ua&category=health&apiKey=${config.api_key}`)
    .then(res => {
        res.articles.forEach((news, i) => news._id = i);
        state.news = res.articles;
        //Получаем все избранные новости
        favorites.getAllNews()
            .then(({docs}) => {
                // На каждой иттерации перебираем новости от сервера и сравниваем похожий publishedAt у полученной новости с избранной новостью
                state.news.forEach(news => {
                    const findTheSame = docs.find((doc) => doc.data().publishedAt === news.publishedAt);
                    
                    // Если publishedAt совпал , то закрашиваем сердечко
                    if (findTheSame) ui.addNews(news, true, findTheSame.id);
                    else ui.addNews(news);
                })
            })
    })
    .catch(err => reject(err));

/**
 * Вешаем событие change
 * Ф-я promise_selectCountry - на промисах
 * При смене страны у нас будет происходить новый запрос на API News
 * @param {e} e 
 */
ui.selectCountry.addEventListener("change", function promise_selectCountry (e) {
    
    const fetchHttp = new FetchHttp();
    fetchHttp.get((`${config.api_url}/top-headlines?country=${ui.selectCountry.value}&apiKey=${config.api_key}`))
        .then((res) => {
            ui.clearContainer(); //удаляем предыдущие новости из разметки
            res.articles.forEach((news, i) => news._id = i);
            state.news = res.articles;
            res.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => console.log(err));
});


/**
 * Вешаем событие change
 * Ф-я promise_SelectCategory - на промисах
 * При смене страны у нас будет происходить новый запрос на API News
 * @param {e} e 
 */
ui.selectCategory.addEventListener("change", function promise_SelectCategory (e) {
    const fetchHttp = new FetchHttp();
    fetchHttp.get(`${config.api_url}/top-headlines?country=${ui.selectCountry.value}&category=${ui.selectCategory.value}&apiKey=${config.api_key}`)
        .then((res) => {
            if(res.totalResults !== 0) {
                ui.clearContainer();
                res.articles.forEach((news, i) => news._id = i);
                state.news = res.articles;
                res.articles.forEach(news => ui.addNews(news));
            }else {
                ui.clearContainer();
                ui.noNews();
            }
            resolve(e);
        })
        .catch(err => console.log(err));
});

/**
 * Favorites handler
 * Вешаем событие на сердечко, чтобы добавлять в избранные
 */
ui.newsContainer.addEventListener("click", function(e) {
    if(e.target.closest(".favorite-btn")) {
        const id = e.target.closest("[data-id]").dataset.id;//ищем ближ-го родителя с атрибутом data-id и у этого эл-та забираем id

        // Передаем в метод save() новость с полученным id, и она уже будет в БД
        favorites.save(state.news[id])
            .then((doc) => {
                // на карточку с новостью вешаем аттрибут data-firestore-id и туда записываем id, под которым она в БД
                e.target.closest("[data-id]").setAttribute("data-firestore-id", doc.id);
                e.target.classList.add("remove-favorite");
                e.target.innerHTML = "favorite";
            })
            .then(doc => M.toast({html: 'Added successed!', classes: "00e676 green accent-3"}))
            .catch(err => M.toast({html: 'Error!'}));
    }
});





