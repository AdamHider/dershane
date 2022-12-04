<template>
    <div class="app-background">
        <div class="app-background-color"></div>
        <div class="app-background-image"></div>
    </div>
</template>

<script setup ></script>

<style>
.app-background.app-background-visible{
    display: block !important;
}
.app-background .app-background-color{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(#56abdd, #1356b0, #3f2899);
}
.app-background .app-background-image{
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: url(/src/assets/images/rocket_pattern.png);
    transform: rotate(27deg);
    background-size: 90px;
    background-repeat: repeat;
    opacity: 0.1;
    background-position-y: 0;
    -webkit-animation: 8s linear 0s infinite  backgroundPatternMovement;
    animation: 8s linear 0s infinite  backgroundPatternMovement;
}

@keyframes backgroundPatternMovement {
    from { background-position-y: 0; }
      to { background-position-y: -90px; }
}

</style>