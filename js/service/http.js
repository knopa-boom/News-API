// /**
//  * Кастомный класс, который является типом данных (http). Содержит методы, с помощью
//  * которых можно выполнять запросы
//  */

// class Http {
//     /**
//      * Метод get осущ-т запросы GET, куда мы ему скажем
//      * @param {link} - url, куда будем делать запрос
//      * @param {function} - callback, эта ф-я отработает, когда придет ответ от сервера
//      */

//     get(url, callback) {
//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", url); //делаем запрос; url, которое передали в get()
//         xhr.send(); //отправляем запрос
//         //подписываемся на получение ответа
//         xhr.addEventListener("load", function() {
//             callback(JSON.parse(xhr.responseText)); //callback,который передан в get()
//         });
//     }
// }


// Запрос на фетче

class FetchHttp {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((res) => res.json()) //ответ в виде обьекта
                .then((response_body) => resolve(response_body)) // в resolve промиса передаем ответ response_body
                .catch(err => reject(err));
        });
    }
}