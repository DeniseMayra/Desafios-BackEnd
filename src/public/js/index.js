const socketClient = io();

const tableDataElement = document.getElementById('table-data');
const formElement = document.getElementById('form');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = Object.fromEntries(
    new FormData(event.target)
  );
  
  socketClient.emit('newProduct', data);
});

socketClient.on('update', (data) => {
  createHTML(data);
});

function createHTML(data) {
  let content = '';
  data.forEach((ele, index) => {
    content = content + `<tr>
        <th scope="row">${index+1}</th>
        <td>${ele.code}</td>
        <td>${ele.title}</td>
        <td>${ele.desc}</td>
        <td>$ ${ele.price}</td>
      </tr>`
    tableDataElement.innerHTML = content;
  })
}
