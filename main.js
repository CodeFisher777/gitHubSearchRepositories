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
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  const trHead = document.createElement('tr');
  trHead.innerHTML = ` <th>Название</th><th>Полное имя</th><th>Владелец</th>`;
  table.prepend(trHead);
  let items = Array.from(repoData).slice(0, 10);

  items.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `

   <td><a target="_blanck" href="${item.html_url}">${item.name}</a></td>
   <td>${item.full_name}</td>
   <td>${item.owner.login}</td>
   `;
    tbody.append(tr);
  });
  wrapper.appendChild(table);
}
