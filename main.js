let formEl = document.querySelector('form');
let buttonEl = document.querySelector('button');
const main = document.querySelector('.main');
const wrapper = document.querySelector('.wrapper');
const errorMessage = document.createElement('div');
errorMessage.classList.add('main-error');
const input = document.querySelector('input');
const clean = document.querySelector('.text-clean');
const online = window.navigator.onLine;

//очистка инпута
input.oninput = function () {
  {
    input.value
      ? (document.querySelector('.text-clean').style = 'display:block')
      : (document.querySelector('.text-clean').style = 'display:none');
  }
};

clean.onclick = function () {
  input.value = '';
  document.querySelector('.text-clean').style = 'display:none';
};
//eventListner на форму
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    wrapper.innerHTML = '';
    if (online) {
      if (input.value.length > 1) {
        const res = await fetch(`https://api.github.com/search/repositories?q=${input.value}`);
        const data = await res.json();

        if (data.items.length != 0) {
          createRepoEl(data.items);
        } else {
          errorMessage.innerHTML = 'Ничего не найдено';
          wrapper.appendChild(errorMessage);
        }
      } else {
        errorMessage.innerHTML = 'Недостаточно символов';
        wrapper.appendChild(errorMessage);
      }
    } else {
      errorMessage.innerHTML = 'Отсутствует интернет-соединение☹️';
      wrapper.appendChild(errorMessage);
    }
  } catch (err) {
    console.warn(err);
  }
});

//функция добавления списка
function createRepoEl(repoData) {
  const element = document.createElement('ul');
  const liName = document.createElement('li');
  element.classList.add('repositories');
  liName.innerHTML = `<div class="repositories-name">
 <p>Название</p>
 <p>Полное имя</p>
 <p>Владелец</p>
 </div>`;
  element.appendChild(liName);
  let items = Array.from(repoData).slice(0, 10);

  items.forEach((item) => {
    let li = document.createElement('li');
    li.innerHTML = `<div class="repositories-item">
 <a target="_blanck" href="${item.html_url}">${item.name}</a>
 <p class="repositories-item-full-name">${item.full_name}</p>
 <p>${item.owner.login}</p>
 </div>`;
    element.appendChild(li);
  });

  wrapper.appendChild(element);
}
