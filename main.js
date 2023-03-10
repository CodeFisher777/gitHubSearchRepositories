let formEl = document.querySelector('form');
let buttonEl = document.querySelector('button');
const main = document.querySelector('.main');
const wrapper = document.querySelector('.wrapper');
const errorMessage = document.createElement('div');
errorMessage.classList.add('main-error');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    wrapper.innerHTML = '';
    const inputValue = document.querySelector('input').value;

    if (inputValue.length > 1) {
      const res = await fetch(`https://api.github.com/search/repositories?q=${inputValue}`);
      const data = await res.json();

      if (data.items.length != 0) {
        createRepoEl(data.items);
      } else {
        errorMessage.innerHTML = 'Ничего не найдено';
        wrapper.appendChild(errorMessage);
      }
    } else {
      errorMessage.innerHTML = 'недостаточно символов';
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
