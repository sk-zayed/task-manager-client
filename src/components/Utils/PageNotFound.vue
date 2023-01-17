<template>
    <img
        :src="require('../../../public/page-not-found.png')"
        class="img-size"
    />
</template>
<style>
.img-size {
    margin: auto;
    height: 40em;
    width: 40em;
}

@media (max-width: 650px) {
    .img-size {
        margin: auto;
        height: 25em;
        width: 25em;
    }
}

@media (max-width: 400px) {
    .img-size {
        margin: auto;
        height: 15em;
        width: 15em;
    }
}
</style>
