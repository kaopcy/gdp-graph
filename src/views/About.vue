<template>
    <section class="team-section">
        <div class="container">
            <div class="row">
                <div class="section-title">
                    <h1>Our team</h1>
                    <p>If there is any error we are sorry for the inconvenience, thank you.</p>
                </div>
            </div>
            <div class="row">
                <div class="team-items">
                    <div class=" item">
                        <img src="../../public/members/kao.jpg" alt="team">
                        <div class="inner">
                            <div class="info">
                                <h5>Piyachai</h5>
                                <h5>Kaewchum</h5>
                                <p>Web Developer</p>
                                <div class="social-links">
                                    <a href="https://www.facebook.com/9kaOclock" target="_blank"><fa :icon="['fab','facebook-square']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','line']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','instagram-square']"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" item">
                        <img src="../../public/members/boom.jpg" alt="team">
                        <div class="inner">
                            <div class="info">
                                <h5>Phomphiriya</h5>
                                <h5>Jaroenpanthongdee</h5>
                                <p>Web Developer</p>
                                <div class="social-links">
                                    <a href="https://www.facebook.com/profile.php?id=100009498314361" target="_blank"><fa :icon="['fab','facebook-square']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','line']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','instagram-square']"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" item">
                        <img src="../../public/members/ning.jpg" alt="team">
                        <div class="inner">
                            <div class="info">
                                <h5>Phanchita</h5>
                                <h5>Teeraphatanaroj</h5>
                                <p>Data Collector</p>
                                <div class="social-links">
                                    <a href="" target="_blank"><fa :icon="['fab','facebook-square']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','line']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','instagram-square']"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" item">
                        <img src="../../public/members/nunt.jpg" alt="team">
                        <div class="inner">
                            <div class="info">
                                <h5>Nonthicha</h5>
                                <h5>Sukcharoen</h5>
                                <p>Data Analyst</p>
                                <div class="social-links">
                                    <a href="https://www.facebook.com/nuntcha.nunt" target="_blank"><fa :icon="['fab','facebook-square']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','line']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','instagram-square']"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" item">
                        <img src="../../public/members/ploy.jpg" alt="team">
                        <div class="inner">
                            <div class="info">
                                <h5>Napasorn</h5>
                                <h5>Chalanumas</h5>
                                <p>Data Surveyor</p>
                                <div class="social-links">
                                    <a href="https://www.facebook.com/napasorn.chalanumas" target="_blank"><fa :icon="['fab','facebook-square']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','line']"/></a>
                                    <a href="" target="_blank"><fa :icon="['fab','instagram-square']"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    body{
        margin: 0;
    }
    *{
        box-sizing: border-box;
    }
    .team-section{
        background-color: whitesmoke;
        min-height: 100vh;
        padding: 70px 15px 30px;
    }
    .container{
        max-width: 1170px;
        margin: auto;

    .row{
        display: flex;
        flex-wrap: wrap;
    }

    }
    .team-section .section-title{
        flex-basis: 100%;
        max-width: 100%;
        margin: 50px 0px 70px;
        
    }
    
    .team-section .section-title h1{
        font-size: 48px;
        text-align: center;
        margin:0;
        font-family: 'Inter', sans-serif;
    }
    .team-section .section-title p{
        font-size: 16px;
        text-align: center;
        margin: 15px 0 0;
        font-family: 'Inter', sans-serif;
        color: #6b6b6b;
    }
    .team-section .team-items{
        
        flex-basis: 100%;
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .team-section .team-items .item{
        flex-basis: calc(20% - 30px);
        max-width: calc(20% - 30px);
        transition: all .5s ease;
        margin-bottom: 40px;
    }
    .team-section .team-items .item img{
        display: block;
        width: 100%;
        
        border-radius: 8px;
    }
    .team-section .team-items .item .inner{
        position: relative;
        z-index: 11;
    }
    .team-section .team-items .item .inner .info{
        background: lightgray;
        text-align: center;
        padding: 20px 15px;
        border-radius: 8px;
        transition: all .5s ease;
        margin-top: -10px;
    }
    .team-section .team-items .item:hover .info{
        transform: translateY(-20px);
    }
    .team-section .team-items .item:hover{
        transform: translateY(-10px);
    }
    .team-section .team-items .item .inner .info h5{
        margin: 0;
        font-size: 15px;
        font-weight: 500;
        color: black;
        font-family: 'Inter', sans-serif;
    }
    .team-section .team-items .item .inner .info p{
        font-size: 16px;
        font-weight: 400;
        color: darkblue;
        margin: 10px 0 0;
        font-family: 'Inter', sans-serif;
    }
    .team-section .team-items .item .inner .social-links{
        padding-top: 15px;
    }
    .team-section .team-items .item .inner .social-links a{
        display: inline-block;
        height: 32px;
        width: 32px;
        background-color: white;
        color: black;
        border-radius: 50%;
        margin: 0 2px;
        text-align: center;
        line-height: 32px;
        font-size: 16px;
        transition: all .5s ease;
    }
    .team-section .team-items .item .inner .social-links a:hover{
        box-shadow: 0 0 10px #000;
    }
    @media(max-width: 1000px){
        .team-section .team-items .item{
            flex-basis: calc(40% - 30px);
            max-width: calc(40% - 30px);
        }
    }
    @media(max-width: 900px){
        .team-section .team-items .item{
            flex-basis: calc(50% - 30px);
            max-width: calc(50% - 30px);
            
        }
    @media(max-width: 767px){
        .team-section .team-items .item{
            flex-basis: calc(100% - 30px);
            max-width: calc(100% - 30px);
            
        }
        }
    }
</style>