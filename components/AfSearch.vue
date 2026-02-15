<template>
  <div class="search-component">
    <div class="search-modal-holder smh-fix" ref="searchInputWrapper"
    :class="[
              { 'is-active': isOpen, 'is-visible': isVisible },
              props.type
            ]">
      <div class="search-modal__input">
        <input v-model="searchQuery" type="text" placeholder="Поиск по сайту" @keyup.enter="handleSearchClick" :class="props_styles"/>
        <span class="search-modal__icon" @click="handleSearchClick" style="cursor: pointer;">
                <span class="header-search__link">
                  Поиск
                </span>
              </span>
      </div>
      <div :class="{ hidden: isOpen }" class="header-search__text" @click="toggleSearchModal">
        <span class="fa fa-search header-search__icon"></span>
        <text>Поиск</text>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, defineExpose } from "vue";

const isVisible = ref(true);
const isOpen = ref(false);
const searchQuery = ref("");

const toggleSearchModal = () => {
  isOpen.value = true;
};

const closeSearch = () => {
  isOpen.value = false;
};

const props = defineProps({
  type: {
    type: String,
    default: "white",
  },
});


const handleSearchClick = () => {
  const input = (searchQuery.value || "").trim();

  if (input === "") {
    return;
  } else {
    window.location.href = `/search?q=${encodeURIComponent(input)}`;
    // search();  // если у тебя была какая-то функция search, оставь, иначе убери
  }
};

const handleClickOutside = (e) => {
  if (
    isOpen.value &&
    e.target.closest(".search-modal-holder") === null &&
    e.target.closest(".search-modal__input") === null &&
    e.target.closest(".search-modal__icon") === null &&
    e.target.closest(".header-search__text") === null
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 👇 Делаем методы доступными снаружи (для header)
defineExpose({
  close: closeSearch,
});
</script>


<style>
  .search-component {
  display: flex;
  justify-content: space-between;
}

.header-search__text {
  width: 120px;
  top:0px
}

.header-search__text text {
  padding-left: 10px;
}

.search-modal-holder.smh-fix {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  z-index: 2;
  pointer-events: none;
  justify-content: space-between;
  margin-left: 20px;
  width: 34vw;
}

.search-modal-holder {
  position: relative;
  width: calc(100vw - 70vw);
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  z-index: 2;
  pointer-events: none;
  justify-content: center;
  margin-left: 20px;

  &.is-visible {
    pointer-events: auto;
  }

  .search-modal__input {
    position: relative;
    width: 26vw;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    opacity: 0;
    transform: translateY(-100px);
    transition: all 0.4s ease;

    input {
      width: 100%;
      height: 50px;
      padding: 0 10px;
      z-index: 24;
    }

    .search-modal__icon {
      position: absolute;
      right: 20px;
      font-size: 20px;
      color: #999;
      cursor: pointer;
      z-index: 26;
      padding: 10px;
    }
  }

  &.is-active .search-modal__input {
    opacity: 1;
    transform: translateY(0);
    z-index: 23;
  }

  & + div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    gap: 20px;
    margin-right: 20px;
  }

  &.blue {
    .search-modal__input input {
      color: #9c291b;
      border: 1px solid #3b45a9;
      &::placeholder {
        color: #9c291b;
      }
    }

    .search-modal__icon {
      color: #9b2719;
    }

    .header-search__text {
      color: #3b45a9;
      border: #3b45a9;
      .header-search__icon {
        color: #9c291b;
      }
    }
  }
}

.search-modal__icon:hover {
  background-color: rgb(201, 201, 201);
}

.header-search__text {
  cursor: pointer;
}

.header-search__text.hidden {
  opacity: 0;
  z-index: -1;
}

/* Media Queries for Responsive Styles */

/* For screens less than 1300px */
@media screen and (max-width: 1300px) {
  .header-content {
    width: 70vw;
  }

  .search-modal-holder + div {
    width: 350px;
  }
}

/* For screens less than 1000px */
@media screen and (max-width: 1000px) {
  .search-modal-holder {
    position: absolute;
    /* top: 80px; */
    width: 80vw;
    height: 30px;
    /* transform: translateX(-30%); */
    
    input {
      height: 30px;
    }
  }

  & + div {
    width: 250px;
  }
}

/* For screens less than 510px */
@media screen and (max-width: 510px) {
  .search-modal-holder {
    margin-left: 0;
    input {
      margin-left: 10px;
    }
  }

  .search-modal__icon {
    font-size: 10px;
    height: 10px;
    line-height: 10px;
  }

  .search-modal__icon:hover {
    padding: 0;
  }

  .search-modal__input {
    input {
      height: 34px;
    }
  }
}

/* For screens less than 425px */
@media screen and (max-width: 425px) {
  .search-modal-holder + div {
    width: 170px;
    font-size: 11px;
  }
}

/* For screens less than 768px */
@media only screen and (max-width: 768px) {
  .search-component{
    width:100vw;
  }
  .search-modal-holder {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    width: 100vw;
  }
  text{
    display:none;
  }
.header-search__text{
  width:auto;
}
  .search-modal-holder.is-active .search-modal__input {
    width: 100%;
  }

    .search-modal-holder .search-modal__input input{
    height: 30px;
    width:150px;
  }
  .search-modal-holder .search-modal__input .search-modal__icon{
    font-size:16px;
  }





}

</style>
