<template>
    <div class="blank"></div>
    <div class="home">
        <div class="post">
            <div class="img-wrapper">
                <img :src="isDarkMode ? aseanGraphicDark : aseanGraphicLight" alt="" />
            </div>
            <div class="text">
                <h1>Linear Regression</h1>
                <p>
                    &emsp;&emsp;&emsp;Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Possimus eveniet doloremque asperiores iusto, ad nemo ab
                    nesciunt neque natus,
                </p>
                <button class="button">EXPLORE!</button>
            </div>
        </div>

        <div class="post-youtube">
            <div class="text-wrapper">
                <h1>What is Linear regression ?</h1> 
                <p>&emsp;&emsp;&emsp;Linear regression is a basic and commonly used type of predictive analysis. Let learn how it work in 5 minute !</p> 
            </div>
            <iframe 
                class="frame-youtube"
                src="https://www.youtube.com/embed/Ep8Ri2EKhrs" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>

        <div class="post2-wrapper">
            <div class="tensorflow-wrapper">

            </div>
            <div class="chartjs-wrapper">

            </div>
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
            window.addEventListener("keyup", ()=>{
                console.log(isDarkMode.value);
            });
        });
        return { aseanGraphicLight, aseanGraphicDark, isDarkMode };
    },
};
</script>

<style lang="scss" scoped>
.blank{
    width: 100vw;
    height: 90px;
}

.home {
    overflow: hidden;
    font-family: var(--primary--font);
    
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
                h1{
                    margin-top: 0;
                }
            }
            h1 {
                margin-top: 3rem;
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
            p {
                margin-bottom: 2rem;
                margin-left: 1rem;
                font-size: 1.25rem;
                text-align: left;
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
                &:hover {
                    background-color: rgb(45, 223, 169);
                }
            }
        }
    }
    
    .post-youtube{
        width: 100vw;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .text-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 3rem;
            color: var(--font--color);
            flex-direction: column;
            max-width: 80%;
            h1{
                font-size: 3rem;
                margin-bottom: 2rem;
            }
            p{
                font-size: 1.25rem;   
            }
        }
        .frame-youtube{
            width: 70%;
            height: calc(0.4*100vw);
            margin-bottom: 3rem;
        }

    }
}
</style>
