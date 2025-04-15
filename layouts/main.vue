<template>
    <div class="layout-wrapper">
        <div class="layout-main-container">
            <div class="layout-main">
                <NuxtPage />
            </div>
            <AppFooter />
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>

<style lang="scss" scoped>
.layout-main-container {
    padding: 0 0 !important;
}
</style>