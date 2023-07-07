<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";

const inputText = ref("");
const todoList = ref([]);

// 寫入 localStorage
watch(
  todoList,
  (val) => {
    localStorage.setItem("todoList", JSON.stringify(val));
  },
  { deep: true } // 目的是為了要觀察最底層的子元素
);

// 讀取 localStorage
const todoListInLocalStorage = localStorage.getItem("todoList");
if (todoListInLocalStorage) {
  todoList.value = JSON.parse(todoListInLocalStorage);
}

// 在 ref 包裝的狀態，要以 .value 去抓！
// const addToDoList = () => {
//   if (inputText.value !== "") {
//     todoList.value.push(inputText.value);
//   }
//   inputText.value = ""; // 輸入之後清空
// };
const addToDoList = () => {
  if (inputText.value !== "") {
    todoList.value.push({
      todoTitle: inputText.value,
      isCompleted: false,
    });
  }
  inputText.value = ""; // 輸入之後清空
};

// 刪除 ToDo，藉由陣列有的 splice 方法去移除 (index, 1) -> (索引值, 刪除數目)
// 要記得（ ）內要寫參數，不然此函式會被判定 (index = 0)
const removeToDo = (index) => {
  todoList.value.splice(index, 1);
};
</script>

<template>
  <section>
    <div class="toDoListContainer">
      <h1>
        <i class="fa-solid fa-list-check" id="listCheckIcon"></i>
        To Do List
      </h1>
      <div class="inputContainer">
        <!-- @keyup.enter = 讓 enter 可觸發事件新增內容 -->
        <input
          v-model="inputText"
          @keyup.enter="addToDoList()"
          type="text"
          id="taskInput"
          placeholder="Add your task here!" />
        <button @click="addToDoList()" id="addBtn">Add</button>
      </div>
      <ul id="taskListContainer">
        <!-- <li id="item" v-for="(i, idx) in todoList" :key="i">
          <input type="checkbox" class="checkBtn" />
          {{ i }}
          <i
            @click="removeToDo(idx)"
            class="fa-solid fa-trash-can"
            id="delBtn"></i>
        </li> -->
        <!-- element 為固定寫法 -->
        <draggable v-model="todoList" group="todo" item-key="todoList">
          <template #item="{ element, index }">
            <li id="item">
              <!-- label 可以讓 input, checkbox 能勾選 -->
              <label>
                <input
                  type="checkbox"
                  class="checkBtn"
                  v-model="element.isCompleted" />
                <span
                  :class="{
                    completed: element.isCompleted,
                  }"
                  >{{ element.todoTitle }}</span
                >
              </label>
              <i
                @click="removeToDo(index)"
                class="fa-solid fa-trash-can"
                id="delBtn"></i>
            </li>
          </template>
        </draggable>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
