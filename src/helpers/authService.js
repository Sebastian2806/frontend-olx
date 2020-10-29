// const API_URL = 'http://localhost:8080/';

class AuthService {
  //   login(username, password) {
  //     return axios
  //       .post(API_URL + "signin", {
  //         username,
  //         password
  //       })
  //       .then(response => {
  //         if (response.data.accessToken) {
  //           localStorage.setItem("user", JSON.stringify(response.data));
  //         }

  //         return response.data;
  //       });
  //   }

  logout() {
    localStorage.removeItem('token');
  }

  //   register(username, email, password) {
  //     return axios.post(API_URL + "signup", {
  //       username,
  //       email,
  //       password
  //     });
  //   }

  getCurrentUser() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
