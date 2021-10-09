<template>
  <div class="home">
    <div class="post">
      <div class="img-wrapper">
        <img :src="aseanGraphic" alt="">
      </div>
      <div class="text">
        <h1>Linear Regression with Asean GDP.</h1>
        <p>&emsp;&emsp;&emsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        eveniet doloremque asperiores iusto, ad nemo ab nesciunt neque natus,
        </p>
        <button class="button"> Let's start-></button>
      </div>
    </div>
  </div>
</template>

<script>
import aseanGraphic from '../assets/asean-svg-vector.svg'
export default {
  name: 'Home',
  setup(){


    return { aseanGraphic }
  }
}
</script>

<style lang="scss" scoped>
.home{
  overflow: hidden;
  .post{
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: 800px) {
      flex-direction: column;
    }
    .img-wrapper{
      padding-left: 1rem;
      padding-top: 1rem;
      order: 1;
      flex: 4;
      @media (max-width: 800px) {
        flex: 5;
      }
      img{
        display: block;
        width: 90%;
        height: 90%;
        object-fit: cover;
      }
    }
    .text{
      flex: 3;
      order: 0;
      display: flex;
      flex-direction: column;
      padding: 0 2rem;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        inset: 0;
        background-color: transparent;
        border-right: 2px solid rgb(202, 202, 202);
        transform: scaleY(150%);
        z-index: -1;
      }
      @media (max-width: 800px) {
        padding-top: 3rem;
      }
      h1{
        text-align: center;
        font-family: 'Montserrat' , sans-serif !important;
        color: #333333;
      }
      p{
        padding: 3rem;
        color: #7c7c7D;
        @media (max-width: 800px) {
          padding: 1rem;
        }
        
      }
      .button{
        align-self: end;

        padding: .75rem 1rem;
        margin-right: 1rem;
        color: #fff;
        background-color: rgb(47, 241, 183);
        border: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 700;
        &:hover{
          background-color: rgb(45, 223, 169);
        }
      }

    }
  }
}
</style>  