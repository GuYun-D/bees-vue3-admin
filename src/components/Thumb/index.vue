<template>
  <div class="thumb" :style="thumbStyle">
    <!-- inner -->
    <div class="thumb-inner">
      <div class="thumb-inner-container">
        <slot></slot>
      </div>
    </div>

    <!-- outer -->
    <div
      :style="{
        backgroundImage: `url(${image})`
      }"
      class="thumb-outer"
    ></div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})

const thumbStyle = computed(() => {
  return {
    'z-index': props.zIndex,
    width: props.width,
    height: props.height
  }
})
</script>

<style lang="scss" scoped>
.thumb {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    .thumb-outer {
      transform: rotate(-110deg);
    }

    .thumb-inner {
      a {
        opacity: 1;
        transform: translateX(0px) rotate(0deg);
      }
    }
  }

  .thumb-inner {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

    h3 {
      color: #fff;
      text-transform: uppercase;
      position: relative;
      letter-spacing: 2px;
      font-size: 14px;
      margin: 0 60px;
      padding: 22px 0 0 0;
      height: 85px;
      font-family: 'Open Sans', Arial, sans-serif;
      text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    p {
      color: #fff;
      padding: 10px 5px;
      font-style: italic;
      margin: 0 30px;
      font-size: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      a {
        display: block;
        color: #333;
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        color: #fff;
        font-style: normal;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 9px;
        letter-spacing: 1px;
        padding-top: 24px;
        margin: 7px auto 0;
        font-family: 'Open Sans', Arial, sans-serif;
        opacity: 0;
        transition: transform 0.3s ease-in-out 0.2s,
          opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
        transform: translateX(60px) rotate(90deg);

        &:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      }
    }

    .thumb-inner-container {
      padding: 20px;
      text-align: center;
    }
  }

  .thumb-outer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center center;
    border-radius: 50%;
    background-size: cover;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}
</style>
