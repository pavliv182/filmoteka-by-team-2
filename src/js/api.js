import axios from 'axios';

export default class API {
  static API_KEY = 'b01160fe65872b7102c85dbc7141a795';
  static BASE_URL_TRENDING = 'https://api.themoviedb.org/3/trending/all/day';
  static BASE_URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list';
  static BASE_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie';

   static LAST_QUERY = '';

  static async fetchTrendingMovies(page, screenloaderShow) {
    try {
      screenloaderShow();
      const data = await axios.get(this.BASE_URL_TRENDING, {
        params: { api_key: this.API_KEY, page },
      });
      
      this.LAST_QUERY = '';
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchGenres() {
    try {
      const data = await axios.get(this.BASE_URL_GENRES, {
        params: { api_key: this.API_KEY },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchSearchByQuery(query, page, screenloaderShow) {
    try {
      screenloaderShow();
      const data = await axios.get(this.BASE_URL_SEARCH, {
        params: { api_key: this.API_KEY, query, page },
      });
      if(data.data.total_pages !== 0){
        this.LAST_QUERY = query;
      }
      
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchSearchByPagination(page, screenloaderShow) {
    try {
      screenloaderShow();
      const data = await axios.get(this.LAST_QUERY ? this.BASE_URL_SEARCH : this.BASE_URL_TRENDING, {
        params: this.LAST_QUERY ? { api_key: this.API_KEY, query: this.LAST_QUERY, page } : { api_key: this.API_KEY, page }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}


