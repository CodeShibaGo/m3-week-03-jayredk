export default class InfiniteScroll {
  constructor() {
    this.limitPerPosts = 5;
    this.currentPage = 1;

    this.list = document.querySelector('.list');
  }

  async init(loader) {
    this.loader = loader;
    this.bindEvent();
    const posts = await this.getPosts(this.limitPerPosts, this.currentPage);
    this.render(posts);
  }

  render(posts) {
    let str = '';
    posts.forEach(post => {
      str += `<li class="list__post">
          <h2 class="list__post-title">${post.title}</h2>
          <p class="list__post-content">${post.body}</p>
          <div class="list__item-number">${post.id}</div>
        </li>`
    });

    this.list.innerHTML += str;
  }

  bindEvent() {
    this.onWindowScroll();
  }

  onWindowScroll() {
    window.addEventListener('scroll', () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const triggerHeight = document.body.offsetHeight - 20;

      if (scrollBottom >= triggerHeight) {
        this.loader.classList.add('show');
        setTimeout(async () => {
          this.currentPage++;
          const posts = await this.getPosts(this.limitPerPosts, this.currentPage);
          this.render(posts);
          this.loader.classList.remove('show');
        }, 1000);
      }
    })
  }

  async getPosts(limitPerPosts, page) {
    let url = `https://jsonplaceholder.typicode.com/posts?_limit=${limitPerPosts}&_page=${page}`;
  
    const posts = await fetch(url).then((res) => res.json());
    return posts;
  }
}