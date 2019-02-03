const state = {
    news: []
};

const ui = new UI();
const favorites = new Favorites();

//Получаем все избранные новости
favorites.getAllNews()
    .then(querySnapshot => {
        //Передаем обьект новостей и значение true - сердце должно быть закрашено,т.к. новость добавлена
        querySnapshot.forEach(doc => ui.addNews(doc.data(), true, doc.id));
    })
    .catch(err => console.log(err));

//Передаем их в разметку
// state.news.forEach((news, i) => ui.addNews(news, i));

/**
 * Favorites remove handler
 * Вешаем событие на сердечко, чтобы удалять из избранных
 */
ui.newsContainer.addEventListener("click", function(e) {
    if (e.target.closest(".remove-favorite")) {
        const newsElement =  e.target.closest("[data-firestore-id]"); //Находим элемент с аттрибутом data-firestore-id
        const id = newsElement.dataset.firestoreId;//забираем Id у эл-та newsElement

        // Передаем в метод deleteOneNews () новость с полученным id
        favorites.deleteOneNews(id)
            //Теперь можно промиссифицировать
           .then(() => newsElement.remove())//удаляем э-т newsElement
           .then(() => M.toast({html: 'Removed successed!', classes: "00e676 green accent-3"}))
           .catch((error) => M.toast({html: 'Error'}));
    }
});