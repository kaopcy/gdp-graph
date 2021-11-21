<template>
  <div class="blank"></div>
  <div class="home">
    <div class="post">
      <div class="img-wrapper">
        <img :src="isDarkMode ? aseanGraphicDark : aseanGraphicLight" alt="" />
      </div>
      <div class="text">
        <h1>Gross Domestic Product In ASEAN</h1>
        <p>
          &emsp;&emsp;&emsp;&emsp;This website is part of the Elementary
          Differential Equations and Linear Algebra. We will look at the trend
          of GDP (Gross Domestic Product) in each country in ASEAN. Using linear
          regression to calculate and display the results in a graph.
        </p>
        <button class="button"><a href="#info" >EXPLORE!</a></button>
      </div>
    </div>
    <div class="post-purpose">
      <div class="img-purpose">
        <img src="../../public/members/purpose.jpg" alt="" />
      </div>
      <div class="text-purpose">
        <h1>Purpose of Project</h1>
        <p>
          &emsp;&emsp;&emsp;&emsp;GDP is important because it can tell if a
          country's economy is good enough. And if we can predict the GDP of
          each country in the future, it will be very useful for applying it in
          various fields.
        </p>
      </div>
    </div>
    <div class="post-GDP">
      <div class="text-GDP">
        <h1 id="info" >What is GDP ?</h1>
        <p>
          &emsp;&emsp;&emsp;&emsp;Gross domestic product (GDP) is the total
          monetary or market value of all the finished goods and services
          produced within a country’s borders in a specific time period. As a
          broad measure of overall domestic production, it functions as a
          comprehensive scorecard of a given country’s economic health.
        </p>
      </div>
      <iframe
        class="frame-youtube-gdp"
        src="https://www.youtube.com/embed/cftLVqSiU_4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="post-youtube">
      <div class="text-wrapper">
        <h1>What is Linear regression ?</h1>
        <p>
          &emsp;&emsp;&emsp;&emsp;Linear regression is a basic and commonly used
          type of predictive analysis. Linear approach for modelling the
          relationship between a scalar response and one or more explanatory
          variables. Let learn how it work in 5 minute !
        </p>
      </div>
      <iframe
        class="frame-youtube"
        src="https://www.youtube.com/embed/Ep8Ri2EKhrs"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="post2-wrapper">
      <div class="tensorflow-wrapper"></div>
      <div class="chartjs-wrapper"></div>
    </div>
  </div>
</template>

<script>
import aseanGraphicLight from "../assets/blog-pic-light.svg";
import aseanGraphicDark from "../assets/blog-pic-dark.svg";
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { store } from "../store";
export default {
  name: "Home",
  setup() {
    const isDarkMode = computed(() => store.state.isDarkMode);
    onMounted(() => {
      window.addEventListener("keyup", () => {
        console.log(isDarkMode.value);
      });
    });
    return { aseanGraphicLight, aseanGraphicDark, isDarkMode };
  },
};
</script>

<style lang="scss" scoped>
.blank {
  width: 100%;
  height: 90px;
}
.home {
  overflow: hidden;
  font-family: var(--primary--font);
  scroll-behavior: smooth;

  .post {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: calc(100vh - 90px);
    @media (max-width: 800px) {
      flex-direction: column;
      align-items: initial;
    }
    .img-wrapper {
      order: 1;
      flex: 4;
      @media (max-width: 800px) {
        flex: 5;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .text {
      flex: 3;
      order: 0;
      display: flex;
      flex-direction: column;
      padding: 0 2rem;
      position: relative;
      @media (max-width: 800px) {
        padding-top: 3rem;
        &::before {
          opacity: 0;
        }
        h1 {
          margin-top: 0;
        }
      }
      h1 {
        margin-top: 20px;
        margin-bottom: 2rem;
        margin-left: 1rem;
        text-align: left;
        color: var(--font--color);
        font-weight: 700;
        font-size: 3rem;
        @media (max-width: 800px) {
          margin-top: 0;
          margin-bottom: 0rem;
        }
      }
      h2 {
        margin-top: 0px;
        margin-bottom: 20px;
        margin-left: 20px;
        text-align: left;
        color: var(--font--color);
        font-weight: 700;
        font-size: 40px;
        @media (max-width: 800px) {
          margin-top: 0;
          margin-bottom: 0rem;
        }
      }
      p {
        margin-bottom: 2rem;
        margin-left: 1rem;
        font-size: 1.25rem;
        text-align: justify;
        color: var(--font--color);
        @media (max-width: 800px) {
          padding: 1rem;
        }
      }
      .button {
        font-weight: 700;
        align-self: end;
        padding: 0.75rem 1rem;
        margin-right: 1rem;
        padding: 1rem 2rem;
        color: #fff;
        background-color: var(--secondary--color);
        border: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 700;
          a{
            color: white;
            text-decoration: none;
          }
        &:hover {
          background-color: rgb(45, 223, 169);
        }
      }
    }
  }
  .post-purpose {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: calc(80vh - 90px);
    @media (max-width: 800px) {
      flex-direction: column;
      align-items: initial;
    }
    .img-purpose {
      order: 0;
      flex: 3;
      padding: 50px 50px 50px 50px;
      @media (max-width: 800px) {
        flex: 5;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .text-purpose {
      flex: 3;
      order: 0;
      display: flex;
      flex-direction: column;
      padding: 0 2.5rem;
      position: relative;
      @media (max-width: 800px) {
        padding-top: 3rem;
        &::before {
          opacity: 0;
        }
        h1 {
          margin-top: 0;
        }
      }
      h1 {
        margin-top: 20px;
        margin-bottom: 2rem;
        margin-right: 1rem;
        text-align: left;
        color: var(--font--color);
        font-weight: 700;
        font-size: 3rem;
        @media (max-width: 800px) {
          margin-top: 0;
          margin-bottom: 0rem;
        }
      }
      p {
        margin-bottom: 2rem;

        margin-right: 1rem;
        font-size: 1.25rem;
        text-align: justify;
        color: var(--font--color);
        @media (max-width: 800px) {
          padding: 1rem;
        }
      }
    }
  }

  .post-youtube {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .text-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 3rem;
      color: var(--font--color);
      flex-direction: column;
      max-width: 80%;
      h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
      }
      p {
        font-size: 1.25rem;
        text-align: justify;
      }
    }
    .frame-youtube {
      width: 70%;
      height: calc(0.4 * 100vw);
      margin-bottom: 3rem;
    }
  }

  .post-GDP {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    .text-GDP {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 3rem;
      color: var(--font--color);
      flex-direction: column;
      max-width: 80%;
      h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
      }
      p {
        font-size: 1.25rem;
        text-align: justify;
      }
    }
    .frame-youtube-gdp {
      width: 70%;
      height: calc(0.4 * 100vw);
      margin-bottom: 3rem;
    }
  }
}
</style>
