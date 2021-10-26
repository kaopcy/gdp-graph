<template>
    <div class="wrapper">
        <h1>Hello my name is PAUL!</h1>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper{
    position: relative;
    width: 300px;
    height: 180px;
    background-color: hsl(100,70,70);
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    margin: 1rem;
    h1{
        margin: 1rem;
        color: var(--font--color);
        font-family: 'Roboto Mono', monospace;
        font-size: 2rem;
        font-weight: 900;
    }
}
</style>