;(() => {
  const brandsRank = [
    "Apple Inc.",
    "Amazon.com Inc.",
    "Microsoft",
    "Google",
    "Samsung",
    "Coca-Cola",
    "Toyota",
    "Mercedes-Benz",
    "McDonald’s",
    "Disney",
  ];

  const listItems = [];
  let dragStartIndex;

  // TODO: createList
  function createList(arr) {
    // 創造一個亂序的陣列
    const shuffleBrands = [...arr]
      .map((item) => ({ value: item, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)  // 排序由小到大
      .map((item) => item.value)  // 還原

    return shuffleBrands;
  }

  // TODO: createListItem
  function createListItem(arr) {
    const fragment = document.createDocumentFragment();

    arr.forEach((company, index) => {
      const listItem = document.createElement('li');

      listItem.dataset.index = index;
      listItem.className = 'draggable-list__item';

      listItem.innerHTML = `
          <span class="draggable-list__item__number">${index + 1}</span>
        <div class="draggable-list__item__trigger" draggable="true">
          <p class="draggable-list__item__trigger__name">${company}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      fragment.appendChild(listItem);
      listItems.push(listItem);
    })

    return fragment;
  }

  // TODO: renderList
  function renderList(fragment) {
    const list = document.querySelector('.draggable-list');

    list.innerHTML = '';
    list.appendChild(fragment)
  }

  // TODO: dragStart
  function dragStart(e) {
    const el = e.target;
    const listItem = el.nodeName === 'LI' ? el : el.closest('li');
    dragStartIndex = +listItem.dataset.index;
  }

  // TODO: dragOver
  function dragOver(e) {
    e.preventDefault();
  }

  // TODO: dragDrop
  function dragDrop(e) {
    const el = e.target;
    const listItem = el.nodeName === 'LI' ? el : el.closest('li');
    const dragEndIndex = +listItem.dataset.index;

    swapItems(dragStartIndex, dragEndIndex);
    listItem.classList.remove('over');
  }
  // TODO: dragEnter
  function dragEnter(e) {
    const el = e.target;
    const listItem = el.nodeName === 'LI' ? el : el.closest('li');
    listItem.classList.add('over');
  }

  // TODO: dragLeave
  function dragLeave(e) {
    const el = e.target;
    const listItem = el.nodeName === 'LI' ? el : el.closest('li');
    listItem.classList.remove('over');
  }

  // TODO: swapItems
  function swapItems(fromIndex, toIndex) {
    const fromItem = listItems[fromIndex].querySelector('.draggable-list__item__trigger');
    const toItem = listItems[toIndex].querySelector('.draggable-list__item__trigger');

    listItems[fromIndex].appendChild(toItem);
    listItems[toIndex].appendChild(fromItem);
  }
  // TODO: checkOrder
  function checkOrder() {
    listItems.forEach((company, index) => {
      const brand = company.children[1].textContent.trim();
      
      if (brand === brandsRank[index]) {
        listItems[index].classList.remove('wrong')
        listItems[index].classList.add('right');
      } else {
        listItems[index].classList.remove('right')
        listItems[index].classList.add('wrong');
      }
    })
  }

  // TODO: bindEvent
  function bindEvent() {
    const list = document.querySelector('.draggable-list');

    list.addEventListener('dragstart', dragStart);
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', dragDrop);
    list.addEventListener('dragenter', dragEnter);
    list.addEventListener('dragleave', dragLeave);

    const checkBtn = document.querySelector('.check-btn');
    checkBtn.addEventListener('click', checkOrder);
  }

  // TODO: init
  function init() {
    const list = createList(brandsRank);
    const list_fragment = createListItem(list);
    renderList(list_fragment);

    bindEvent();
  }

  init();
  
})()