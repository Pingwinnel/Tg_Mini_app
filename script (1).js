const usernameElem = document.getElementById("username");
const token_countElem = document.getElementById("token-count");

const BASE_URL = "https://demo-pp-latest.onrender.com/api";

function fetchUsers() {
    fetch(`${BASE_URL}/users`) // Replace with your backend URL
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = ''; // Clear any existing content

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `ID: ${user.id}, Name: ${user.firstName} ${user.lastName}`;
                usersList.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

function fetchUserById(userId) {
    fetch(`${BASE_URL}/users/${userId}`)  // Replace with your backend URL
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(user => {
            const userInfo = document.getElementById('user-info');
            userInfo.innerHTML = `ID: ${user.id}, Name: ${user.firstName} ${user.lastName}, Tokens: ${user.tokens}, Level: ${user.level}, Exp: ${user.exp}, Total Exp: ${user.totalExp}`;
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            alert('User not found');
        });
}


window.onload = async function() {
    if (typeof Telegram !== "undefined" && Telegram.WebApp) {
        // Инициализируем Telegram Web App
        Telegram.WebApp.ready();

        // Получаем initData
        const initData = Telegram.WebApp.initData;
        alert(JSON.stringify(initData)); // Логируем для проверки данных
        const params = new URLSearchParams(initData);
        const userEncoded = params.get('user');
        const token = params.get('token');

        // 2. Декодируем URL-кодирование
        const userDecoded = decodeURIComponent(userEncoded);

        // 3. Преобразуем декодированную строку в объект JSON
        const userObj = JSON.parse(userDecoded);

        // 4. Получаем значение username
        const username = userObj.username;

        usernameElem.innerHTML = username;
    }
};
