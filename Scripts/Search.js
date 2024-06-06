const Tabela = document.getElementById("TabelaConsultar");
const SearchFilter = document.getElementById("search");

document.addEventListener("DOMContentLoaded", function () {
  PopulateTable(SearchFilter.value);
});

SearchFilter.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    PopulateTable(SearchFilter.value);
  }
});

function PopulateTable(Filter) {
  let items = JSON.parse(localStorage.getItem("items"));
  while (Tabela.querySelector("tbody").firstChild) {
    Tabela.querySelector("tbody").removeChild(
      Tabela.querySelector("tbody").firstChild
    );
  }
  if (items) {
    items.forEach((StringItem) => {
      let item = JSON.parse(StringItem);
      if (Filter != null && Filter != "" && Filter != undefined) {
        if (
          !(
            item.Nome.includes(Filter) ||
            item.Origem.includes(Filter) ||
            item.Destino.includes(Filter) ||
            item.Capacidade.includes(Filter)
          )
        ) {
          return;
        }
      }

      let Data = DateFormat(item.DiaOrigem);

      let tr = document.createElement("tr");
      let tdName = document.createElement("td");
      let tdOrigem = document.createElement("td");
      let tdDestino = document.createElement("td");
      let tdDiaOrigem = document.createElement("td");
      let tdCapacidade = document.createElement("td");
      let tdAcao = document.createElement("td");
      tdName.innerHTML = item.Nome;
      tdOrigem.innerText = item.Origem;
      tdDestino.innerText = item.Destino;
      tdDiaOrigem.innerText = Data;
      tdCapacidade.innerText = item.Capacidade + "kg";
      tdAcao.innerHTML =
        "<a onclick=\"DeleteItem('" +
        String(StringItem).replace(/"/g, "<>") +
        '\')"><i class="fas fa-trash"></i></a>';
      tr.appendChild(tdName);
      tr.appendChild(tdOrigem);
      tr.appendChild(tdDestino);
      tr.appendChild(tdDiaOrigem);
      tr.appendChild(tdCapacidade);
      tr.appendChild(tdAcao);
      Tabela.querySelector("tbody").appendChild(tr);
    });
  }
}

function DateFormat(StringDate) {
  const date = new Date(StringDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function DeleteItem(Item) {
  Item = String(Item).replace(/<>/g, '"');
  let Items = localStorage.getItem("items");
  let itemsArray = [];
  if (Items) {
    itemsArray = JSON.parse(Items);
  }
  const index = itemsArray.indexOf(Item);
  if (index > -1) {
    itemsArray.splice(index, 1);
  }
  localStorage.setItem("items", JSON.stringify(itemsArray));
  PopulateTable();
}
