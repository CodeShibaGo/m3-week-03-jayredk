const limitPerPosts = 5;
let currentPage = 1;

const list = document.querySelector('.list');
const loader = document.querySelector('.loader');
const filterInput = document.querySelector('.filterInput');

// 監聽滾動事件
function onWindowScroll() {
  window.addEventListener('scroll', () => {
    // 如果目前篩選了文章就不觸發
    if (filterInput.value.trim() !== '') return;

    // 判斷是否滾動到頁面距底部 20px 處
    if (window.scrollY + window.innerHeight >= (document.body.offsetHeight - 20)) {
      showLoading();
    }
  })
}

function showLoading() {
  loader.classList.add('show')

  setTimeout(async () => {
    currentPage++;
    const posts = await getPosts(currentPage);
    renderPosts(posts);
    loader.classList.remove('show');
  }, 1000);
}

async function getPosts(page) {
  let url = `https://jsonplaceholder.typicode.com/posts?_limit=${limitPerPosts}&_page=${page}`;
  
  const posts = await fetch(url).then((res) => res.json());
  return posts;
}

function renderPosts(posts) {
  let str = ''
  posts.forEach(post => {
    str += `<li class="list__post">
        <h2 class="list__post-title">${post.title}</h2>
        <p class="list__post-content">${post.body}</p>
        <div class="list__item-number">${post.id}</div>
      </li>`
  });

  list.innerHTML += str;
}

function filterPosts(keyword) {
  const posts = document.querySelectorAll('.list__post');

  posts.forEach((post) => {
    const postTitle = post.children[0].textContent;

    if (!postTitle.includes(keyword)) {
      post.style.display = 'none';
    } else {
      post.style.display = 'block';
    }
  })
}


function onFilterInput() {
  filterInput.addEventListener('input', (e) => {
    const keyword = e.target.value;

    filterPosts(keyword);
  })
}

function bindEvent() {
  onWindowScroll();
  onFilterInput();
}

async function init() {
  bindEvent();

  const posts = await getPosts(currentPage);
  renderPosts(posts);
}

init();
