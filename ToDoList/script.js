const btnElements = document.getElementsByClassName("btn-header");
const todoListContainer = document.getElementsByClassName(
  "todo-list-container"
);
const todoFormContainer = document.getElementsByClassName(
  "todo-form-container"
);
const formBtns = document.getElementsByClassName("confirm-btn");
const inputs = document.getElementsByClassName("inputText");
const cardContainer = document.getElementsByClassName("todo-list-container");

//making event listener for butons in navbar
for (let i = 0; i < 2; i++) {
  if (i === 0) {
    btnElements[i].addEventListener("click", (e) => {
      btnElements[i].classList.add("active");
      btnElements[i + 1].classList.remove("active");
      btnElements[i + 2].classList.add("hide");
      btnElements[i + 1].classList.remove("active");
      todoFormContainer[0].classList.remove("hide");
      todoListContainer[0].classList.add("hide");
      todoFormContainer[1].classList.add("hide");
    });
  } else {
    btnElements[i].addEventListener("click", (e) => {
      btnElements[i].classList.add("active");
      btnElements[i - 1].classList.remove("active");
      btnElements[i + 1].classList.add("hide");
      btnElements[i + 1].classList.remove("active");
      todoListContainer[0].classList.remove("hide");
      todoFormContainer[0].classList.add("hide");
      todoFormContainer[1].classList.add("hide");
    });
  }
}

// making event for modifying each todo card
const modifyTodos = (todoCard) => {
  btnElements[2].classList.remove("hide");
  btnElements[2].classList.add("active");
  btnElements[1].classList.remove("active");
  todoFormContainer[1].classList.remove("hide");
  todoListContainer[0].classList.add("hide");
  const subjElement = todoCard.children[0];
  const descriptElement = todoCard.children[2];
  inputs[2].value = subjElement.innerHTML;
  inputs[3].value = descriptElement.innerHTML;
  formBtns[1].addEventListener("click", (e) => {
    e.preventDefault();
    const subject = inputs[2].value;
    const description = inputs[3].value;
    if (
      subject !== "" &&
      description !== "" &&
      subject !== " " &&
      description !== " "
    ) {
      window.alert("کار با موفقیت ویرایش شد.");
      subjElement.innerHTML = inputs[2].value;
      descriptElement.innerHTML = inputs[3].value;
      todoFormContainer[1].classList.add("hide");
      todoListContainer[0].classList.remove("hide");
      btnElements[2].classList.add("hide");
      btnElements[2].classList.remove("active");
      btnElements[1].classList.add("active");
    } else {
      window.alert("لطفا عنوان و توضیحات کار را وارد کنید.");
    }
  });
};

//making cards for todo list
const makeTodoListCards = (e) => {
  e.preventDefault();
  const subject = inputs[0].value;
  const description = inputs[1].value;
  console.log(description);
  console.log(subject);
  if (
    subject !== "" &&
    description !== "" &&
    subject !== " " &&
    description !== " "
  ) {
    window.alert("کار جدید با موفقیت ثبت شد.");
    inputs[0].value = "";
    inputs[1].value = "";
    const cardElement = document.createElement("div");
    cardElement.classList.add("todo-list-cards");

    const subjElement = document.createElement("h2");
    subjElement.classList.add("subject", "large-font");

    const timeElement = document.createElement("p");
    timeElement.classList.add("time", "small-font");

    const descElement = document.createElement("p");
    descElement.classList.add("description", "medium-font");

    const doneElement = document.createElement("span");
    doneElement.classList.add("done-sign");
    doneElement.title = "انحام کار";

    const deleteElement = document.createElement("span");
    deleteElement.classList.add("delete-sign");
    deleteElement.title = "حذف کار";

    const editElement = document.createElement("span");
    editElement.classList.add("edit-sign");
    editElement.title = "ویرایش کار";

    cardContainer[0].appendChild(cardElement);
    cardElement.appendChild(subjElement);
    cardElement.appendChild(timeElement);
    cardElement.appendChild(descElement);
    cardElement.appendChild(doneElement);
    cardElement.appendChild(deleteElement);
    cardElement.appendChild(editElement);

    subjElement.innerHTML = subject;
    descElement.innerHTML = description;
    doneElement.innerHTML = "&#9989;";
    deleteElement.innerHTML = "&#10060;";
    editElement.innerHTML = "&#9997;";

    const time = new Date();
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const day = String(time.getDate() + 1).padStart(2, "0");
    const formatTime = `${year}/${month}/${day}`;
    timeElement.innerHTML = formatTime;

    doneElement.addEventListener("click", (e) => {
      let signOrArrow = cardElement.classList.toggle("done");
      doneElement.innerHTML = !signOrArrow ? "&#9989" : "&#128281;";
      doneElement.title = !signOrArrow ? "انحام کار" : "کار انجام نشده است";
      console.log(doneElement.parentElement);
    });

    deleteElement.addEventListener("click", (e) => {
      cardElement.classList.add("hide");
    });

    editElement.addEventListener("click", (e) => {
      modifyTodos(e.target.parentElement);
    });
  } else {
    window.alert("لطفا عنوان و توضیحات کار را وارد کنید.");
  }
};

formBtns[0].addEventListener("click", makeTodoListCards);
