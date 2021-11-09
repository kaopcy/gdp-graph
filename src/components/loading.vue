<template>
<div class="loading">
  <h1>
    Loading
    <div class="dots">
      <span class="dot z"></span><span class="dot f"></span
      ><span class="dot s"></span
      ><span class="dot t"><span class="dot l"></span></span>
    </div>
  </h1>
</div>
</template>
<script>
export default {
    mounted() {
        let $ = (e) => document.querySelector(e);
        let dots = $(".dots");
        function animate(element, className) {
        element.classList.add(className);
        setTimeout(() => {
            element.classList.remove(className);
            setTimeout(() => {
            animate(element, className);
            }, 500);
        }, 2500);
        }
        animate(dots, "dots--animate");
    },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
body {
  display: grid;
  place-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 2px;
  box-sizing: border-box;
  overflow: hidden;
}
.loading{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.473);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
  font-family: 'Open Sans', -apple-system, 'Segoe UI', sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  box-sizing: border-box;
}

.dots {
  display: inline-flex;

  &--animate .dot {

    &.z {
      animation: scale .8s .2s forwards;
    }

    &.f,
    &.s {
      animation: right .5s forwards;
    }

    &.l {
      animation: rightDown .4s .1s forwards linear, drop 2s .4s forwards linear;
    }

  }
}

.dot {

  & {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    margin-left: 6px;
  }

  &.z {
    position: absolute;
    transform: scale(0);

    @keyframes scale {
      100% {
        transform: scale(1);
      }
    }
  }

  &.f,
  &.s {
    transform: translateX(0px);

    @keyframes right {
      100% {
        transform: translateX(16px);
      }
    }
  }

  &.t {
    background: transparent;
  }

  .l {
    margin-left: 0;
    position: absolute;
    top: 0;
    left: 0;

    @keyframes rightDown {

      50% {
        top: 4px;
        left: 16px;
      }

      100% {
        top: 12px;
        left: 24px;
      }
    }

    @keyframes drop {
      100% {
        transform: translate(70px, calc(35px + (100vh/2)));
      }
    }
  }

}

.abs-twitter {

  & {
    position: fixed;
    right: calc(24px + .6vw);
    top: calc(22px + .6vw);
    transform: translate(-8px, 4px);
    opacity: 0;
    transition: .3s ease-in;
  }

  &--show {
    transform: translate(0, 0);
    opacity: 1;
    animation: birdie 1s .8s linear infinite;
  }

  @keyframes birdie {
    13% {
      transform: rotate(14deg);
    }

    26% {
      transform: rotate(28deg)
    }

    100% {
      transform: rotate(0deg)
    }
  }

}
</style>
