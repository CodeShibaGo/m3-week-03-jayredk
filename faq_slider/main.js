const list = document.querySelector('.list')
const list__faq_all = document.querySelectorAll('.list__faq');

function slideUp(el) {
  el.style.maxHeight = 0;
}

function slideDown(el) {
  el.style.maxHeight = 'initial';
}

list.addEventListener('click', (e) => {
  const el = e.target;

  if (!el.className.includes('list__faq-q')) return;

  const el_tag = el.nodeName;
  
  // 判斷被點擊的是否為 div 元素（需要加上 active 的元素）
  // 不是的話就設為 el.prarentElement（要找的元素）
  const question_block = el_tag !== 'DIV' ? el.parentElement : el;
  const answer_block = question_block.nextElementSibling;

  if (question_block.className.includes('active')) {
    question_block.classList.remove('active');
    slideUp(answer_block);
  } else {
    // 移除所有區塊"開"的狀態
    list__faq_all.forEach((el) => {
      const question_block = el.children[0];
      question_block.classList.remove('active');
      
      const answer_block = el.children[1];
      slideUp(answer_block);
    })

    question_block.classList.add('active');
    slideDown(answer_block);
  }
})
