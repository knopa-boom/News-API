/**
 * Класс Favorites для добавления в избранные, удаления из них
 */
class Favorites {
    //метод save() добавляет в избранные
    save(news) {
    
        return db.collection("favorites").add((news)); //Добавляем в БД в поле favorites лайкнувшие новости; возврщаем,чтоб воспользоваться промисами, т.к метод add возвращает промис.
    }

    //Метод getNews() - получение всех новостей 
    getAllNews() {
        return db.collection("favorites").get();
    }

    //Метод удаления одной новости из избранных
    deleteOneNews(id) {
        return db.collection("cities").doc(id).delete();
    }

    //Метод удаления всех новостей из избранных
    clear() {
        localStorage.removeItem("favorites_news");
    }
}