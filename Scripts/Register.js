const form = document.getElementById("form");
const Origem = document.getElementById("Origem");
const Destino = document.getElementById("Destino");
const DiaOrigem = document.getElementById("DiaOrigem");
const Nome = document.getElementById("Nome");
const Capacidade = document.getElementById("Capacidade");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const OrigemValue = Origem.value.trim();
  const DestinoValue = Destino.value.trim();
  const DiaOrigemValue = DiaOrigem.value.trim();
  const NomeValue = Nome.value.trim();
  const CapacidadeValue = Capacidade.value.trim();

  if (OrigemValue === "") {
    setErrorFor(Origem, "Origem é um campo obrigatório");
  } else {
    setSuccessFor(Origem);
  }
  if (DestinoValue === "") {
    setErrorFor(Destino, "Destino é um campo obrigatório");
  } else {
    setSuccessFor(Destino);
  }
  if (DiaOrigemValue === "") {
    setErrorFor(DiaOrigem, "Data é um campo obrigatório");
  } else {
    if (!CheckDate(DiaOrigemValue)) {
      setErrorFor(
        DiaOrigem,
        "Data inválida, por favor insira data a partir do dia atual"
      );
    } else {
      setSuccessFor(DiaOrigem);
    }
  }
  if (NomeValue === "") {
    setErrorFor(Nome, "Nome da embarcação é um campo obrigatório");
  } else {
    setSuccessFor(Nome);
  }
  if (CapacidadeValue === "" || CapacidadeValue == "0") {
    setErrorFor(Capacidade, "Capacidade de carga é um campo obrigatório");
  } else {
    setSuccessFor(Capacidade);
  }

  const formControls = form.querySelectorAll(".form-control").length;
  const formControlSuccess = form.querySelectorAll(
    ".form-control.success"
  ).length;
  if (formControls === formControlSuccess) {
    let NumericCapacidade = parseFloat(CapacidadeValue);
    if (CapacidadeValue.length > 4 && !isNaN(CapacidadeValue)) {
      NumericCapacidade = NumericCapacidade.toExponential(2);
    }

    const item = {
      Origem: OrigemValue,
      Destino: DestinoValue,
      DiaOrigem: DiaOrigemValue,
      Capacidade: NumericCapacidade,
      Nome: NomeValue,
    };
    AddItemToLocalStorage(JSON.stringify(item));
    ClearForms();
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;

  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function AddItemToLocalStorage(item) {
  let Items = localStorage.getItem("items");
  let itemsArray = [];
  if (Items) {
    itemsArray = JSON.parse(Items);
  }
  itemsArray.push(item);
  console.log(itemsArray);

  localStorage.setItem("items", JSON.stringify(itemsArray));
}

function ClearForms() {
  Origem.value = "";
  Destino.value = "";
  DiaOrigem.value = "";
  Nome.value = "";
  Capacidade.value = "";
}

function CheckDate(StringDate) {
  const inputDate = new Date(StringDate);
  const currentDate = new Date();

  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  return inputDate >= currentDate;
}
