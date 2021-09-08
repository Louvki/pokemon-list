<template>
  <div class="card card-1">
    <div class="top">
      <img :src="image" :alt="name" />
    </div>
    <div class="bottom">
      <p class="title">{{ name }}</p>
      <div class="line">
        <p>Height:</p>
        <p style="display:contents">{{ height }}</p>
      </div>
      <div class="line">
        <p>Weight:</p>
        <p style="display:contents">{{ weight }}</p>
      </div>
      <p>Abilities:</p>
      <ul>
        <li v-for="ability of abilities" :key="ability.slot">- {{ ability.ability.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    abilities: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 3px;
  display: inline-block;
  width: 290px;
  min-height: 300px;
  margin: 1rem;
  position: relative;
  overflow: hidden;
}

.card .top {
  display: inline-flex;
  width: 100%;
  height: 220px;
  overflow: hidden;
  justify-content: center;
}

.card .top img {
  height: 220px;
}

.card .bottom {
   padding: 0 20px 20px 20px;
}

.card .bottom p,
.card .bottom li
{
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #444;
  font-size: 18px;
  font-family: Roboto, sans-serif;
}

.card .bottom ul {
  margin-top: 5px;
}

.card .bottom .title {
  position: relative;
  justify-content: center;
  margin-bottom: 14px;
  font-size: 20px;
}


.card .bottom .line {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
  font-size: 20px;
}


.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
}
</style>
