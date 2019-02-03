/**
 * Класс UI для разметки
 */

class UI {
    /**
     * В конструкторе объявляем html-элементы
     */
    constructor() {
        this.newsContainer = document.querySelector(".news-container .row");
        this.selectCountry = document.getElementById("country");
        this.selectCategory = document.getElementById("category");
    }

    /**
     * Метод addNews - добавляет в разметку новости
     * @param {object} - news, принимает одну новость
     * @param {bool} - is_favorite указывает, какая иконка сердечка должна быть
     */

    addNews(news, is_favorite, db_doc_id) {
        // console.log(news);
        const template = `
            <div class="col s12 m6">
                <div class="card news-card" data-id="${news._id}" data-firestore-id="${db_doc_id || ""}">
                    <div class="card-image">
                        <img src="${news.urlToImage || "img/news-placeholder.png"}">
                        <span class="card-title">${news.title}</span>
                    </div>
                    <div class="card-content">
                        <p>${news.description || ""}</p>
                    </div>
                    <div class="card-action">
                        <a href="${news.url} target="_blank">Read more</a>
                        ${
                            is_favorite ? '<i class="material-icons favorite-btn remove-favorite">favorite</i>' :
                            '<i class="material-icons favorite-btn">favorite_border</i>'
                        }
                    </div>
                </div>
            </div>
        `;

        //Добавляем в наш контейнер(newsContainer) разметку(template) в начало
        this.newsContainer.insertAdjacentHTML("afterbegin", template);
    }

    /**
     * Метод clearContainer - удаляет всю разметку, т.е новости
     */
    clearContainer() {
        this.newsContainer.innerHTML = "";
    }
    
    /**
     * Метод noNews - выдает карточку с ошибкой, если для выбранной категории нет новостей
     */
    noNews() {
        const templateNoNews = `
            <div class="card-content pink accent-1">
                <p>По выбранной категории нет новостей.</p>
            </div>
        `;

        this.newsContainer.insertAdjacentHTML("afterbegin", templateNoNews);
    }
}
